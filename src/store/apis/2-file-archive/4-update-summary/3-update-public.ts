import { CurrentExtensions, Brand, Browser } from "../../9-types";
import { FilenameMetaVersion } from "../3-filename-meta-version";
import { updateSummaryItems } from "./1-update-summary-items";
import { getFilenameMetaVersionByVersion } from "./4-get-filename-meta-version-by-version";

type updatePublicProps = {
    fromArchive: FilenameMetaVersion[];
    fromConfig: CurrentExtensions;
    publicVersions: string[] | undefined;
};

export function updatePublic({ fromArchive, fromConfig, publicVersions }: updatePublicProps) {

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
