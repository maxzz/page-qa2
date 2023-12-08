import { Brand, Browser, CurrentExtensions, ExtnFromConfig, FilenameMeta } from "../types";

export function isVersionAGreaterB(a?: string, b?: string): boolean { // '3.4.429' vs. '3.4.430'
    const aArr = a?.split('.') || [];
    const bArr = b?.split('.') || [];
    if (aArr.length !== bArr.length) {
        return false;
    }
    const itemLess = aArr.find((ver, idx) => +ver < +bArr[idx]);
    return !itemLess;
}

export function updateSummary(publicVersions: string[] | undefined, fromArchive: FilenameMeta[], fromConfig: CurrentExtensions) {
    const latestPublicStr = publicVersions?.[0]; // ['3.4.585', '3.4.442', '3.4.432', ... ] from history.md file are sorted in descending order.
    const latestPublic = getArchiveVersion(fromArchive, latestPublicStr);

    // 1. Update 'Current Versions'
    if (latestPublic) {
        const lookupFor = {
            brand: Brand.dp,
            browser: Browser.chrome, // No need this for Firefox at least now.
            qa: false,
        };
        fromConfig.summary = fromConfig.summary.map(
            (item) => {
                const found = areTheSameBrowserBrandQa(item, lookupFor) && isVersionAGreaterB(latestPublicStr, item.version);
                if (found) {
                    item.version = latestPublic.version;
                    item.updated = latestPublic.updated;
                }
                return item;
            }
        );
    }

    return fromConfig.summary;

    function getArchiveVersion(archive: FilenameMeta[] | null, version?: string): FilenameMeta | undefined {
        return version ? archive?.find((item) => item.version === version) : undefined;
    }

    function areTheSameBrowserBrandQa(a: Pick<ExtnFromConfig, 'brand' | 'browser' | 'qa'>, b: Pick<ExtnFromConfig, 'brand' | 'browser' | 'qa'>): boolean {
        const { brand: a_brand, browser: a_browser, qa: a_qa } = a;
        const { brand: b_brand, browser: b_browser, qa: b_qa } = b;
        return a_browser === b_browser && a_brand === b_brand && a_qa === b_qa;
    }
}