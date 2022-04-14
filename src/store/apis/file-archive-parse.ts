import { ArchiveExtensionMeta } from "./file-archive";

export type Meta = {
    yearChanged: boolean;
    year: number;
    date: string;
} & ArchiveExtensionMeta;

export function addDates(archive: ArchiveExtensionMeta[] | null): Meta[] {
    let prevYear = 0;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return (archive || []).map((item) => {
        const dt = new Date(item.updated.replace(/\./g, '-') + 'T00:00:00');
        const year = dt.getFullYear();
        let yearChanged = year !== prevYear;
        prevYear = year;
        return {
            ...item,
            yearChanged,
            year,
            date: dt.toLocaleDateString('en-US', options),
        } as Meta;
    });
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

export function archiveByYears(extArchiveState: ArchiveExtensionMeta[] | null): OneYearExts[] {
    const byYears = splitByYears(addDates(extArchiveState));
    return Object.entries(byYears).map(([year, items]) => ({year, items})); // can now sort if needed
}
