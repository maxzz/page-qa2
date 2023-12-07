import { stringToDate } from "@/utils/helpers";
import { Browser, BuildType, FilenameMeta } from "../types";

export type FilenameMetaEx = Prettify<
    & FilenameMeta
    & {
        createDate: string;     // when extension was created
        year: number;           // year when extension was created
        published: boolean;     // published information from release notes
    }
>;

type VersionsMap = Record<string, FilenameMetaEx[]>; // extension version -> browser extensions

export type OneYearExts = {
    yearStr: string;            // TODO: check why it is string
    items: VersionsMap;
};

const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

function transformToMeta(item: FilenameMeta): FilenameMetaEx {
    const dt = stringToDate(item.updated);
    const year = dt.getFullYear();
    return {
        ...item,
        createDate: dt.toLocaleDateString('en-US', dateOptions),
        year,
        published: false,
    };
}

function splitToByYearsMap(archive: FilenameMetaEx[]): Record<string, FilenameMetaEx[]> {
    const res: Record<string, FilenameMetaEx[]> = {};
    archive.forEach((item) => {
        if (!res[item.year]) {
            res[item.year] = [];
        }
        res[item.year].push(item);
    });
    return res;
}

function splitToVersionsMap(items: FilenameMetaEx[]): VersionsMap {
    const rv: VersionsMap = {};
    items.forEach((item) => {
        if (!rv[item.version]) {
            rv[item.version] = [];
        }
        rv[item.version].push(item);
    });
    Object.values(rv).forEach((version) => version.sort((a, b) => itemSortIndex(a) - itemSortIndex(b))); // sort items inside each version

    return preserveStringKeysOrder(rv);

    function preserveStringKeysOrder<T>(items: { [k: string]: T; }): { [k: string]: T; } {
        const entries = Object.entries(items); // preserve insertion order.
        entries.sort((a, b) => a[0].localeCompare(b[0]));
        return Object.fromEntries(entries);
    }

    function itemSortIndex(item: FilenameMetaEx): number {
        const types = {
            [Browser.chrome]: item.build === BuildType.release ? 1 : 3,
            [Browser.firefox]: item.build === BuildType.release ? 2 : 4,
        };
        return types[item.browser as keyof typeof types] || 5;
    }
}

export function archiveByYears(archiveExtensions: FilenameMeta[] | null, publicVersions?: string[]): OneYearExts[] {
    const withMeta: FilenameMetaEx[] = (archiveExtensions || []).map(transformToMeta);

    if (publicVersions?.length) {
        const versionsMap = splitToVersionsMap(withMeta);
        publicVersions.forEach((version) => {
            versionsMap[version]?.forEach((existingExt) => existingExt.published = true);
        });
    }

    const byYearsMap = splitToByYearsMap(withMeta);
    const byYearsArr = Object.entries(byYearsMap).map(([year, items]) => ({ year, items })); // can now sort by year if needed
    const grouped = byYearsArr.map<OneYearExts>(({ year, items: yearItems }) => ({
        yearStr: year,
        items: splitToVersionsMap(yearItems),
    }));
    return grouped;
}
