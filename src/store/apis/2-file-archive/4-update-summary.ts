import { Brand, Browser, CurrentExtensions, ExtnFromConfig, FilenameMeta } from "../types";
import { FilenameMetaVersion, isVersionAGreaterB } from "./3-filename-meta-version";

function getFilenameMetaVersionByVersion(archive: FilenameMetaVersion[] | null, version?: string): FilenameMetaVersion | undefined {
    return version ? archive?.find(({ item }) => item.version === version) : undefined;
}

type BrandBrowserQa = Pick<ExtnFromConfig, 'brand' | 'browser' | 'qa'>;

function sameBrandBrowserQa(a: BrandBrowserQa, b: BrandBrowserQa): boolean {
    const { brand: a_brand, browser: a_browser, qa: a_qa } = a;
    const { brand: b_brand, browser: b_browser, qa: b_qa } = b;
    return (b_brand === undefined || a_brand === b_brand) && a_browser === b_browser && a_qa === b_qa;
}

function updateSummaryItems(summary: ExtnFromConfig[], latest: FilenameMeta | undefined, lookupFor: BrandBrowserQa) {
    return (
        !latest
            ? summary
            : summary.map(
                (configItem) => {
                    const foundStale = sameBrandBrowserQa(configItem, lookupFor) && isVersionAGreaterB(latest.version, configItem.version);
                    if (foundStale) {
                        configItem.version = latest.version;
                        configItem.updated = latest.updated;
                        configItem.broIcon = latest.broIcon;
                        configItem.isV3 = latest.isV3;
                    }
                    return configItem;
                }
            )
    );
}

function updateQa(fromArchive: FilenameMetaVersion[], fromConfig: CurrentExtensions,) {
    const latestQa = fromArchive?.[0]?.item;

    if (latestQa) {
        const lookupFor = {
            brand: undefined,
            browser: Browser.chrome,
            qa: true,
        };
        fromConfig.summary = updateSummaryItems(fromConfig.summary, latestQa, lookupFor);
    }

    return fromConfig.summary;
}

function updatePublic(fromArchive: FilenameMetaVersion[], fromConfig: CurrentExtensions, publicVersions: string[] | undefined) {
    const latestPublicStr = publicVersions?.[0]; // ['3.4.700', '3.4.585', '3.4.442', ... ] from history.md file are sorted in descending order.
    const latestPublic = getFilenameMetaVersionByVersion(fromArchive, latestPublicStr)?.item;

    if (latestPublic) {
        const lookupFor = {
            brand: Brand.dp,
            browser: Browser.chrome, // No need this for Firefox at least now.
            qa: false,
        };
        fromConfig.summary = updateSummaryItems(fromConfig.summary, latestPublic, lookupFor);
    }

    return fromConfig.summary;
}

export function updateSummary(fromArchive: FilenameMetaVersion[], fromConfig: CurrentExtensions, publicVersions: string[] | undefined) {
    fromConfig.summary = updateQa(fromArchive, fromConfig);
    fromConfig.summary = updatePublic(fromArchive, fromConfig, publicVersions);

    // console.log('fromConfig.summary', fromConfig.summary.map((item) => ({ bro: item.browser, qa: item.qa, ...item })));
    // console.log('fromArchive', fromArchive);

    return fromConfig.summary;
}
