import { CurrentExtensions, ExtnFromConfig, FormatCurrentCfg, Brand, Browser, filename2Meta } from '../9-types';

function findInfo(extensions: ExtnFromConfig[], brand: Brand, browser: Browser, qa: boolean): ExtnFromConfig | undefined {
    return extensions.find((item: ExtnFromConfig) => item.brand === brand && item.browser === browser && item.qa === qa);
}

function getExtensionInfo(brands: FormatCurrentCfg.BrandExtensionVersions, browser: Browser, qaOrPublic: boolean): ExtnFromConfig[] {
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
                qa: qaOrPublic,
            });
        }
    });

    // Fill out missing extensions

    let dp: ExtnFromConfig | undefined = findInfo(rv, Brand.dp, browser, qaOrPublic);
    if (!dp) {
        throw new Error('DP info is missing. At least DP info should exist.');
    }

    !findInfo(rv, Brand.hp, browser, qaOrPublic) && rv.push({ ...dp, brand: Brand.hp, });
    !findInfo(rv, Brand.de, browser, qaOrPublic) && rv.push({ ...dp, brand: Brand.de, });

    return rv;
}

export function parseCurrentConfig(config: FormatCurrentCfg.FromFile): CurrentExtensions {
    const { chrome, firefox } = config.browsers;
    const extInfoChromeQa: ExtnFromConfig[] = getExtensionInfo(chrome.qaUrl, Browser.chrome, true); // QA
    const extInfoChromePu: ExtnFromConfig[] = getExtensionInfo(chrome.extensionUrl, Browser.chrome, false); // public

    const extInfoFirefoxQa: ExtnFromConfig[] = getExtensionInfo(firefox.qaUrl, Browser.firefox, true);
    const extInfoFirefoxPu: ExtnFromConfig[] = getExtensionInfo(firefox.extensionUrl, Browser.firefox, false);
    return {
        chrome: extInfoChromeQa[0],
        firefox: extInfoFirefoxQa[0],
        summary: [...extInfoFirefoxQa, ...extInfoFirefoxPu, ...extInfoChromeQa, ...extInfoChromePu],
    };
}
