/// <reference path="../external/file-formats-g01.d.ts" />
import * as CONST from './constants';

//#region Definitions

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

export interface InAppExtnInfo { // Extension info
    url: string;                // "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/dppm-3.4.430_on_2022.03.04-r-chrome.zip"
    version: string;            // "3.4.430"
    updated: string;            // "2022.03.04"
    brand?: TBrand;             // "dp"
    browser?: TBrowser;         // "c"
    qa?: boolean;               // true
}

//#endregion Definitions

export function parseDate(date: string): Date | string {
    const dt = new Date(date.replace(/\./g, '-') + 'T00:00:00');
    return dt.toString() !== 'Invalid Date' ? dt : date;
}

function fnameVersionDate(fname: string) {
    // 0. Gets version and release date from: "dppm-3.0.137_on_2018.08.09-r-firefox.xpi"
    const match = fname.match(CONST.Regex_FNAME_VerDate);
    const meta = {
        version: match ? match[1] : '',
        updated: match ? match[2] : '',
    };
    return meta;
}

function findInfo(ei: InAppExtnInfo[], browser: TBrowser, brand: TBrand, qa: boolean): InAppExtnInfo | undefined {
    return ei.find((_: InAppExtnInfo) => {
        return _.browser === browser && _.brand === brand && _.qa === qa;
    });
}

function getExtensionInfo(brands: FormatCurrentCfg.BrandExtensionVersions, browser: TBrowser, qa: boolean): InAppExtnInfo[] {
    const rv: InAppExtnInfo[] = [];

    [TBrand.dp, TBrand.hp, TBrand.de].forEach((brand: TBrand) => {
        const meta: FormatCurrentCfg.SingleExtensionInfo = brands[brand];
        if (meta) {
            const fromName = fnameVersionDate(meta.url);
            rv.push({
                url: meta.url,
                brand,
                browser,
                qa,
                version: meta.version || fromName.version,
                updated: meta.updated || fromName.updated,
            });
        }
    });

    // Fill out missing

    let dp: InAppExtnInfo | undefined = findInfo(rv, browser, TBrand.dp, qa);
    if (!dp) {
        throw new Error('DP info is missing. At least DP info should exist.');
    }

    let hp: InAppExtnInfo | undefined = findInfo(rv, browser, TBrand.hp, qa);
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

    let de: InAppExtnInfo | undefined = findInfo(rv, browser, TBrand.de, qa);
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

    return rv;
} //extensionUrl()

export interface ExtensionsOnFtp { // Extensions on Ftp server
    firefox: InAppExtnInfo;
    chrome: InAppExtnInfo;
    summary: InAppExtnInfo[];
}

function parseCurrentConfig(config: FormatCurrentCfg.CurrentConfigFile): ExtensionsOnFtp {
    const extInfoFfQa: InAppExtnInfo[] = getExtensionInfo(config.browsers['firefox'].qaUrl, TBrowser.firefox, true);
    const extInfoFfPu: InAppExtnInfo[] = getExtensionInfo(config.browsers['firefox'].extensionUrl, TBrowser.firefox, false); // public
    const extInfoChQa: InAppExtnInfo[] = getExtensionInfo(config.browsers['chrome'].qaUrl, TBrowser.chrome, true);
    const extInfoChPu: InAppExtnInfo[] = getExtensionInfo(config.browsers['chrome'].extensionUrl, TBrowser.chrome, false);
    return {
        firefox: extInfoFfQa[0],
        chrome: extInfoChQa[0],
        summary: [...extInfoFfQa, ...extInfoFfPu, ...extInfoChQa, ...extInfoChPu]
    };
}

//#region Data Fetch

export async function fetchCurrentConfig(): Promise<Response> {
    console.log('Fetching: current config');

    const response = await fetch(`${CONST.API_URL}config.json`, { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error('No access to the HID server current configuration');
    }
    return response;
}

export async function getCurrentConfig(): Promise<ExtensionsOnFtp> {
    const response = await fetchCurrentConfig();
    const json = await response.json();
    return parseCurrentConfig(json);
}

export function extInfoNotAvailable(): InAppExtnInfo {
    return {
        url: 'Not avialable',
        version: '',
        updated: ''
    };
}

//#endregion Data Fetch
