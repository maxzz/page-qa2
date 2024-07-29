import { FilenameMetaEx } from "./9-types";

export function convToByYearsMap(archive: FilenameMetaEx[]): Record<string, FilenameMetaEx[]> {
    const res: Record<string, FilenameMetaEx[]> = {};

    archive.forEach(
        (item) => {
            if (!res[item.year]) {
                res[item.year] = [];
            }
            res[item.year].push(item);
        }
    );

    return res;
}
