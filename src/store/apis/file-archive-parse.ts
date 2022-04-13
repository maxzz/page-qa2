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

function _splitByYears(archive: Meta[]): Record<string, Meta[]> {
    const res: Record<string, Meta[]> = {};
    archive.forEach((item) => {
        if (!res[item.year]) {
            res[item.year] = [];
        }
        res[item.year].push(item);
    });
    return res;
}

export function splitByYears(extArchiveState: ArchiveExtensionMeta[] | null) {
    const byYears = _splitByYears(addDates(extArchiveState));
    return byYears;
}

// const lastYear = Object.keys(byYears).at(-1);
// const lastExt = lastYear && byYears[lastYear]?.at(-1);
// console.log('server', lastYear, lastExt);
