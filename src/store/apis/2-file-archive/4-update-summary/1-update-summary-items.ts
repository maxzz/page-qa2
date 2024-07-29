import { ExtnFromConfig, FilenameMeta } from "../../9-types";
import { isVersionAGreaterB } from "../3-filename-meta-version";

type BrandBrowserQa = Pick<ExtnFromConfig, 'brand' | 'browser' | 'qa'>;

function sameBrandBrowserQa(a: BrandBrowserQa, b: BrandBrowserQa): boolean {
    const { brand: a_brand, browser: a_browser, qa: a_qa } = a;
    const { brand: b_brand, browser: b_browser, qa: b_qa } = b;
    return (b_brand === undefined || a_brand === b_brand) && a_browser === b_browser && a_qa === b_qa;
}

export function updateSummaryItems(summary: ExtnFromConfig[], latest: FilenameMeta | undefined, lookupFor: BrandBrowserQa) {
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
