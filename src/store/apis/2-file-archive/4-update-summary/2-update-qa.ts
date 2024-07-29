import { CurrentExtensions, Browser } from "../../types";
import { FilenameMetaVersion } from "../3-filename-meta-version";
import { updateSummaryItems } from "./1-update-summary-items";

type updateQaProps = {
    fromArchive: FilenameMetaVersion[];
    fromConfig: CurrentExtensions;
};

export function updateQa({ fromArchive, fromConfig }: updateQaProps) {
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
