import { ArchiveExtensionMeta } from "./file-archive";

export type Meta = {
    date: string;
    year: number;
    yearChanged: boolean;
} & ArchiveExtensionMeta;

export function addDates(archive: ArchiveExtensionMeta[] | null): Meta[] {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    let prevYear = 0;
    
    function transformItem(item: ArchiveExtensionMeta) {
        const dt = new Date(item.updated.replace(/\./g, '-') + 'T00:00:00');
        const year = dt.getFullYear();
        prevYear = year;
        return {
            ...item,
            date: dt.toLocaleDateString('en-US', options),
            year,
            yearChanged: year !== prevYear,
        } as Meta;
    }

    return (archive || []).map(transformItem);
}

function splitByYears(archive: Meta[]): Record<string, Meta[]> {
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
    const byYears = splitByYears(addDates(archiveExtensions));
    return Object.entries(byYears).map(([year, items]) => ({year, items})); // can now sort if needed
}
