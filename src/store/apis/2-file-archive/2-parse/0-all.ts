import { type FilenameMeta } from "../../9-types";
import { FilenameMetaEx, YearExts } from "./9-types";
import { convToFilenameMetaEx } from "./1-conv-to-filename-meta-ex";
import { convToByYearsMap } from "./2-conv-to-by-years-map";
import { convToVersionsMap } from "./3-conv-to-versions-map";

export function archiveByYears(archiveExtensions: FilenameMeta[] | null, publicVersions?: string[]): YearExts[] {
    const withMeta: FilenameMetaEx[] = (archiveExtensions || []).map(convToFilenameMetaEx);

    // 1. update published info
    if (publicVersions?.length) {
        const versionsMap = convToVersionsMap(withMeta);
        publicVersions.forEach((version) => {
            versionsMap[version]?.forEach((existingExt) => existingExt.published = true);
        });
    }

    // 2. group by years
    const byYearsMap = convToByYearsMap(withMeta);
    const byYearsArr = Object.entries(byYearsMap).map(([year, items]) => ({ year, items })); // can now sort by year if needed
    const grouped = byYearsArr.map<YearExts>(({ year, items: yearItems }) => ({
        yearStr: year,
        items: convToVersionsMap(yearItems),
    }));

    return grouped;
}
