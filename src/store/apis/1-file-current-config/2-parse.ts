import { CurrentExtensions, ExtnFromConfig, FormatCurrentCfg, Brand, BrowserShort, filename2Meta } from '../types';

function findInfo(extensions: ExtnFromConfig[], brand: Brand, browser: BrowserShort, qa: boolean): ExtnFromConfig | undefined {
    return extensions.find((item: ExtnFromConfig) => item.brand === brand && item.browser === browser && item.qa === qa);
}

function getExtensionInfo(brands: FormatCurrentCfg.BrandExtensionVersions, browser: BrowserShort, qa: boolean): ExtnFromConfig[] {
    const rv: ExtnFromConfig[] = [];

    [Brand.dp, Brand.hp, Brand.de].forEach((brand: Brand) => {
        const meta: FormatCurrentCfg.SingleExtensionInfo = brands[brand];
        if (meta) {
            const filenameMeta = filename2Meta(meta.url);
            rv.push({
                fname: meta.url, // "https://crossmatch.hid.gl/g02/current/dppm-3.4.710_on_2023.03.14-r-chrome.zip"
                version: meta.version || filenameMeta.version,
                updated: meta.updated || filenameMeta.updated,
                browser,
                broIcon: filenameMeta.broIcon,
                build: filenameMeta.build,
                isV3: filenameMeta.isV3,
                brand,
                qa,
            });
        }
    });

    // Fill out missing extensions

    let dp: ExtnFromConfig | undefined = findInfo(rv, Brand.dp, browser, qa);
    if (!dp) {
        throw new Error('DP info is missing. At least DP info should exist.');
    }

    !findInfo(rv, Brand.hp, browser, qa) && rv.push({ ...dp, brand: Brand.hp, });
    !findInfo(rv, Brand.de, browser, qa) && rv.push({ ...dp, brand: Brand.de, });

    return rv;
}

export function parseCurrentConfig(config: FormatCurrentCfg.FromFile): CurrentExtensions {
    const extInfoChQa: ExtnFromConfig[] = getExtensionInfo(config.browsers['chrome'].qaUrl, BrowserShort.chrome, true); // QA
    const extInfoChPu: ExtnFromConfig[] = getExtensionInfo(config.browsers['chrome'].extensionUrl, BrowserShort.chrome, false); // public

    const extInfoFfQa: ExtnFromConfig[] = getExtensionInfo(config.browsers['firefox'].qaUrl, BrowserShort.firefox, true);
    const extInfoFfPu: ExtnFromConfig[] = getExtensionInfo(config.browsers['firefox'].extensionUrl, BrowserShort.firefox, false);
    return {
        chrome: extInfoChQa[0],
        firefox: extInfoFfQa[0],
        summary: [...extInfoFfQa, ...extInfoFfPu, ...extInfoChQa, ...extInfoChPu]
    };
}
