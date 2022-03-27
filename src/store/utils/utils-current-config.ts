/// <reference path="../external/web-file-formats-g01.d.ts" />
import * as CONST from './constants';

export enum TBrowser {
    unknown = 'u',
    chrome = 'c',
    firefox = 'f',
    edge = 'e'
}
export const TBrowserName = (v?: TBrowser) => v === TBrowser.chrome ? 'Chrome' : v === TBrowser.firefox ? 'Firefox' : v === TBrowser.edge ? 'Microsoft Edge' : '?';

export enum TBrand {
    dp = 'dp',
    hp = 'hp',
    de = 'de'
}
export const TBrandName = (v?: TBrand) => v === TBrand.dp ? 'DP' : v === TBrand.hp ? 'HP' : v === TBrand.de ? 'Dell' : '?';

export interface IExtnInfo { // Extension info
    url: string;                // "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/dppm-3.4.430_on_2022.03.04-r-chrome.zip"
    version: string;            // "3.4.430"
    updated: string;            // "2022.03.04"
    brand?: TBrand;             // "dp"
    browser?: TBrowser;         // "c"
    qa?: boolean;               // true
}

function parseFnameVersionDate(fname: string): FormatCfg.IFilenameMeta | undefined {
    // 0. Gets version and release date from: "dppm-3.0.137_on_2018.08.09-r-firefox.xpi"
    const match = fname.match(CONST.Regex_FNAME_VerDate);
    if (match) {
        return {
            version: match[1],
            updated: match[2]
        };
    }
}

function fnameVersionDate(fname: string, meta: IExtnInfo): void {
    // 0. Gets version and release date from: "dppm-3.0.137_on_2018.08.09-r-firefox.xpi"
    const match = fname.match(CONST.Regex_FNAME_VerDate);
    meta.version = match ? match[1] : '';
    meta.updated = match ? match[2] : '';
}

export function parseDate(date: string): Date | string {
    const dt = new Date(date.replace(/\./g, '-') + 'T00:00:00');
    return dt.toString() !== 'Invalid Date' ? dt : date;
}

function findInfo(ei: IExtnInfo[], browser: TBrowser, brand: TBrand, qa: boolean): IExtnInfo | undefined {
    return ei.find((_: IExtnInfo) => {
        return _.browser === browser && _.brand === brand && _.qa === qa;
    } );
}

function extensionUrl(eurl: FormatCfg.IExtensionUrl, browser: TBrowser, qa: boolean, rv: IExtnInfo[]): void {

    [TBrand.dp, TBrand.hp, TBrand.de].forEach((key: TBrand) => {
        if (!eurl[key]) {
            return;
        }

        let meta: FormatCfg.IVersionMeta = eurl[key];

        let newInfo: IExtnInfo = {
            url: meta.url,
            version: '',
            updated: '',
            brand: key,
            browser: browser,
            qa: qa
        } as any;

        if (meta.version && meta.updated) {
            newInfo.version = meta.version || '';
            newInfo.updated = meta.updated || '';
        } else {
            fnameVersionDate(newInfo.url, newInfo);
        }

        rv.push(newInfo);
    });

    // Fill out missing

    let dp: IExtnInfo | undefined = findInfo(rv, browser, TBrand.dp, qa);
    if (!dp) {
        throw new Error('Cannot get dp info');
    }
    let hp: IExtnInfo | undefined = findInfo(rv, browser, TBrand.hp, qa);
    if (!hp) {
        rv.push({
            url: dp.url,
            version: dp.version,
            updated: dp.updated,
            brand: TBrand.hp,
            browser: dp.browser,
            qa: dp.qa
        });
    }
    let de: IExtnInfo | undefined = findInfo(rv, browser, TBrand.de, qa);
    if (!de) {
        rv.push({
            url: dp.url,
            version: dp.version,
            updated: dp.updated,
            brand: TBrand.de,
            browser: dp.browser,
            qa: dp.qa
        });
    }

} //extensionUrl()

export interface IBrExtnInfos { // Browser extensions info
    firefox: IExtnInfo;
    chrome: IExtnInfo;
    summary: IExtnInfo[];
}

function parseCurrentConfig(config: FormatCfg.IConfigFile): IBrExtnInfos {
    const extInfoFfQA: IExtnInfo[] = [];
    extensionUrl(config.browsers['firefox'].qaUrl, TBrowser.firefox, true, extInfoFfQA);
    
    const extInfoFf: IExtnInfo[] = [];
    extensionUrl(config.browsers['firefox'].extensionUrl, TBrowser.firefox, false, extInfoFf);

    const extInfoChQA: IExtnInfo[] = [];
    extensionUrl(config.browsers['chrome'].qaUrl, TBrowser.chrome, true, extInfoChQA);

    const extInfoCh: IExtnInfo[] = [];
    extensionUrl(config.browsers['chrome'].extensionUrl, TBrowser.chrome, false, extInfoCh);

    return {
        firefox: extInfoFfQA[0],
        chrome: extInfoChQA[0],
        summary: [...extInfoFfQA, ...extInfoFf, ...extInfoChQA, ...extInfoCh]
    };
}

export async function fetchCurrentConfig(): Promise<Response> {
    console.log('Fetching: current config');

    const response = await fetch(`${CONST.API_URL}config.json`, { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error('No access to the HID server current configuration');
    }
    return response;
}

export async function getCurrentConfig(): Promise<IBrExtnInfos> {
    const response = await fetchCurrentConfig();
    const json = await response.json();
    return parseCurrentConfig(json);
}

export function extInfoNotAvailable(): IExtnInfo {
    return {
        url: 'Not avialable',
        version: '',
        updated: ''
    };
}
