import { Brand, Browser, CurrentExtensions, ExtnFromConfig } from "../types";
import { FilenameMetaVersion, isVersionAGreaterB } from "./3-filename-meta-version";

export function updateSummary(fromArchive: FilenameMetaVersion[], fromConfig: CurrentExtensions, publicVersions: string[] | undefined) {
    const latestPublicStr = publicVersions?.[0]; // ['3.4.585', '3.4.442', '3.4.432', ... ] from history.md file are sorted in descending order.
    const latestPublic = getArchiveByVersion(fromArchive, latestPublicStr)?.item;

    // 1. Update 'Current Versions'
    if (latestPublic) {
        const lookupFor = {
            brand: Brand.dp,
            browser: Browser.chrome, // No need this for Firefox at least now.
            qa: false,
        };
        fromConfig.summary = fromConfig.summary.map(
            (configItem) => {
                const foundStale = areTheSameBrandBrowserQa(configItem, lookupFor) && isVersionAGreaterB(latestPublicStr, configItem.version);
                if (foundStale) {
                    configItem.version = latestPublic.version;
                    configItem.updated = latestPublic.updated;
                }
                return configItem;
            }
        );
    }

    return fromConfig.summary;
}

function getArchiveByVersion(archive: FilenameMetaVersion[] | null, version?: string): FilenameMetaVersion | undefined {
    return version ? archive?.find(({item}) => item.version === version) : undefined;
}

function areTheSameBrandBrowserQa(a: Pick<ExtnFromConfig, 'brand' | 'browser' | 'qa'>, b: Pick<ExtnFromConfig, 'brand' | 'browser' | 'qa'>): boolean {
    const { brand: a_brand, browser: a_browser, qa: a_qa } = a;
    const { brand: b_brand, browser: b_browser, qa: b_qa } = b;
    return a_browser === b_browser && a_brand === b_brand && a_qa === b_qa;
}
