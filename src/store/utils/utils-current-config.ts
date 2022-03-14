/// <reference path="../external/web-file-formats-g01.d.ts" />
import * as CONST from './constants';

const enum TBrowser {
    unknown = 'u',
    chrome = 'c',
    firefox = 'f',
    edge = 'e'
}

const enum TBrand {
    dp = 'dp',
    hp = 'hp',
    de = 'de'
}

export interface IExtnInfo { // Extension info
    url: string;
    version: string;
    updated: string;
    brand?: TBrand;
    browser?: TBrowser;
    qa?: boolean;
}

function parseFnameVersionDate(fname: string): FormatCfg.IFilenameMeta | undefined {
    // Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
    const match = fname.match(CONST.Regex_FNAME_VerDate);
    if (match) {
        return {
            version: match[1],
            updated: match[2]
        };
    }
}

function fnameVersionDate(fname: string, meta: IExtnInfo): void {
    // Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
    const match = fname.match(CONST.Regex_FNAME_VerDate);
    meta.version = match ? match[1] : '';
    meta.updated = match ? match[2] : '';
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

        let vm: FormatCfg.IVersionMeta = eurl[key];

        let ei: IExtnInfo = {
            url: vm.url,
            version: '',
            updated: '',
            brand: key,
            browser: browser,
            qa: qa
        } as any;

        if (vm.version && vm.updated) {
            ei.version = vm.version || '';
            ei.updated = vm.updated || '';
        } else {
            fnameVersionDate(ei.url, ei);
        }

        rv.push(ei);
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
    //console.log('Got current config', config);

    let extInfoFirefoxQA: IExtnInfo[] = [];
    let extInfoFirefox: IExtnInfo[] = [];
    let extInfoChromeQA: IExtnInfo[] = [];
    let extInfoChrome: IExtnInfo[] = [];

    extensionUrl(config.browsers['firefox'].qaUrl, TBrowser.firefox, true, extInfoFirefoxQA);
    extensionUrl(config.browsers['firefox'].extensionUrl, TBrowser.firefox, false, extInfoFirefox);

    extensionUrl(config.browsers['chrome'].qaUrl, TBrowser.chrome, true, extInfoChromeQA);
    extensionUrl(config.browsers['chrome'].extensionUrl, TBrowser.chrome, false, extInfoChrome);

    let state: IBrExtnInfos = {
        firefox: extInfoFirefoxQA[0],
        chrome: extInfoChromeQA[0],
        summary: [...extInfoFirefoxQA, ...extInfoFirefox, ...extInfoChromeQA, ...extInfoChrome]
    };

    //console.log(JSON.stringify(state.summary, null, 4));
    return state;
} //parseCurrentConfig()

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
