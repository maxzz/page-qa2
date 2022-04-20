import { TBrowserShort } from "./api-formats-g01";
import { ArchiveExtensionMeta, ReleaseType } from "./file-archive";

export type Meta = {
    date: string;
    year: number;
    published?: boolean;        // published information from release notes
} & ArchiveExtensionMeta;

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

function transformToMeta(item: ArchiveExtensionMeta): Meta {
    const dt = new Date(item.updated.replace(/\./g, '-') + 'T00:00:00');
    const year = dt.getFullYear();
    return {
        ...item,
        date: dt.toLocaleDateString('en-US', options),
        year,
    } as Meta;
}

function splitToByYearsMap(archive: Meta[]): Record<string, Meta[]> {
    const res: Record<string, Meta[]> = {};
    archive.forEach((item) => {
        if (!res[item.year]) {
            res[item.year] = [];
        }
        res[item.year].push(item);
    });
    return res;
}

function itemSortIndex(item: Meta) {
    const types = {
        [TBrowserShort.chrome]: item.release === ReleaseType.release ? 1 : 3,
        [TBrowserShort.firefox]: item.release === ReleaseType.release ? 2 : 4,
    };
    return types[item.browser as keyof typeof types] || 5;
}

type VersionsMap = Record<string, Meta[]>; // extension version -> browser extensions

export type OneYearExts = {
    year: string;
    items: VersionsMap;
};

function splitToVersionsMap(items: Meta[]): VersionsMap {
    const rv: VersionsMap = {};
    items.forEach((item) => {
        if (!rv[item.version]) {
            rv[item.version] = [];
        }
        rv[item.version].push(item);
    });
    Object.values(rv).forEach((version) => version.sort((a, b) => itemSortIndex(a) - itemSortIndex(b))); // sort items inside each version
    return rv;
}

export function archiveByYears(archiveExtensions: ArchiveExtensionMeta[] | null, publicVersions: string[]): OneYearExts[] {
    const withMeta: Meta[] = (archiveExtensions || []).map(transformToMeta);

    if (publicVersions.length) {
        const versionsMap = splitToVersionsMap(withMeta);
        publicVersions.forEach((version) => {
            versionsMap[version]?.forEach((existingExt) => existingExt.published = true);
        });
    }

    const byYearsMap = splitToByYearsMap(withMeta);
    const byYearsArr = Object.entries(byYearsMap).map(([year, items]) => ({ year, items })); // can now sort by year if needed
    const grouped = byYearsArr.map<OneYearExts>(({ year, items: yearItems }) => ({ year, items: splitToVersionsMap(yearItems) }));
    return grouped;
}
