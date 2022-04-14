import { ArchiveExtensionMeta } from "./file-archive";

export type Meta = {
    date: string;
    year: number;
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

export type OneYearExts = {
    year: string;
    items: Meta[];
};

export function archiveByYears(archiveExtensions: ArchiveExtensionMeta[] | null): OneYearExts[] {
    const withMeta: Meta[] = (archiveExtensions || []).map(transformToMeta);
    const byYearsMap = splitToByYearsMap(withMeta);
    const byYearsArr = Object.entries(byYearsMap).map(([year, items]) => ({year, items})); // can now sort if needed
    return byYearsArr;
}
