import { CurrentExtensions } from "../../9-types";
import { FilenameMetaVersion } from "../3-filename-meta-version";
import { updateQa } from "./2-update-qa";
import { updatePublic } from "./3-update-public";

type updateSummaryProps = {
    fromArchive: FilenameMetaVersion[];
    fromConfig: CurrentExtensions;
    publicVersions: string[] | undefined;
};

export function updateSummary({ fromArchive, fromConfig, publicVersions }: updateSummaryProps) {
    fromConfig.summary = updateQa({ fromArchive, fromConfig });
    fromConfig.summary = updatePublic({ fromArchive, fromConfig, publicVersions });

    // console.log('fromConfig.summary', fromConfig.summary.map((item) => ({ bro: item.browser, qa: item.qa, ...item })));
    // console.log('fromArchive', fromArchive);

    return fromConfig.summary;
}
