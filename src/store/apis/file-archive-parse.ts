import { LoadingDataState } from "@/hooks/atomsX";
import { ArchiveExtensionMeta } from "./file-archive";
import iconClasses from './browser-icons.module.scss';

export type Meta = {
    yearChanged: boolean;
    year: number;
    cls: string;
    date: string;
} & ArchiveExtensionMeta;

function getClass(item: ArchiveExtensionMeta) {
    const types = {
        chrome: 'iconCh',
        firefox: 'iconFf',
        maxz: 'iconTt',
    };
    return iconClasses[types[item.browser as keyof typeof types] || 'iconMs'];
}

function addDates(archive: ArchiveExtensionMeta[]): Meta[] {
    let prevYear = 0;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return archive.map((item) => {
        const dt = new Date(item.updated.replace(/\./g, '-') + 'T00:00:00');
        const year = dt.getFullYear();
        let yearChanged = year !== prevYear;
        prevYear = year;
        return {
            ...item,
            yearChanged,
            year,
            cls: getClass(item),
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

export function splitByYears(extArchiveState: LoadingDataState<ArchiveExtensionMeta[]>) {
    const byYears = _splitByYears(addDates(extArchiveState.data || []));
    return byYears;
}


// const lastYear = Object.keys(byYears).at(-1);
// const lastExt = lastYear && byYears[lastYear]?.at(-1);
// console.log('server', lastYear, lastExt);
