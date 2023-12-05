import { FormatCurrentCfg, TBrand, TBrowserShort } from '../types';
import { regexFnameVerDate } from '../constants';

export interface InAppExtnInfo {    // Extension info from config file
    url: string;                    // "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/dppm-3.4.430_on_2022.03.04-r-chrome.zip"
    brand?: TBrand;                 // "dp"
    browser?: TBrowserShort;        // "c"
    qa?: boolean;                   // true
    version: string;                // "3.4.430"
    updated: string;                // "2022.03.04"
}

function fnameVersionDate(fname: string) {
    // 0. Gets version and release date from: "dppm-3.0.137_on_2018.08.09-r-firefox.xpi"
    const match = fname.match(regexFnameVerDate);
    const meta = {
        version: match ? match[1] : '',
        updated: match ? match[2] : '',
    };
    return meta;
}

function findInfo(extensions: InAppExtnInfo[], brand: TBrand, browser: TBrowserShort, qa: boolean): InAppExtnInfo | undefined {
    return extensions.find((item: InAppExtnInfo) => item.brand === brand && item.browser === browser && item.qa === qa);
}

function getExtensionInfo(brands: FormatCurrentCfg.BrandExtensionVersions, browser: TBrowserShort, qa: boolean): InAppExtnInfo[] {
    const rv: InAppExtnInfo[] = [];

    [TBrand.dp, TBrand.hp, TBrand.de].forEach((brand: TBrand) => {
        const meta: FormatCurrentCfg.SingleExtensionInfo = brands[brand];
        if (meta) {
            const fromName = fnameVersionDate(meta.url);
            rv.push({
                url: meta.url, // "https://crossmatch.hid.gl/g02/current/dppm-3.4.710_on_2023.03.14-r-chrome.zip"
                brand,
                browser,
                qa,
                version: meta.version || fromName.version,
                updated: meta.updated || fromName.updated,
            });
        }
    });

    // Fill out missing

    let dp: InAppExtnInfo | undefined = findInfo(rv, TBrand.dp, browser, qa);
    if (!dp) {
        throw new Error('DP info is missing. At least DP info should exist.');
    }

    !findInfo(rv, TBrand.hp, browser, qa) && rv.push({ ...dp, brand: TBrand.hp, });
    !findInfo(rv, TBrand.de, browser, qa) && rv.push({ ...dp, brand: TBrand.de, });

    return rv;
}

export interface CurrentExtensions { // Extensions on Ftp server
    chrome: InAppExtnInfo;
    firefox: InAppExtnInfo;
    summary: InAppExtnInfo[];
}

export function parseCurrentConfig(config: FormatCurrentCfg.FromFile): CurrentExtensions {
    const extInfoChQa: InAppExtnInfo[] = getExtensionInfo(config.browsers['chrome'].qaUrl, TBrowserShort.chrome, true); // QA
    const extInfoChPu: InAppExtnInfo[] = getExtensionInfo(config.browsers['chrome'].extensionUrl, TBrowserShort.chrome, false); // public
    const extInfoFfQa: InAppExtnInfo[] = getExtensionInfo(config.browsers['firefox'].qaUrl, TBrowserShort.firefox, true);
    const extInfoFfPu: InAppExtnInfo[] = getExtensionInfo(config.browsers['firefox'].extensionUrl, TBrowserShort.firefox, false);
    return {
        chrome: extInfoChQa[0],
        firefox: extInfoFfQa[0],
        summary: [...extInfoFfQa, ...extInfoFfPu, ...extInfoChQa, ...extInfoChPu]
    };
}
