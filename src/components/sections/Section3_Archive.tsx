import React from 'react';
import { useAtom } from 'jotai';
import { extArchiveStateAtom } from '@/store/store';
import * as CONST from '@/store/utils/constants';
import { IFnameMeta } from '@/store/utils/utils-existing-on-server';
import iconClasses from './browser-icons.module.scss';

function getUrl(name: string) {
    return `${CONST.API_URL}${name}`;
}

function getClass(item: IFnameMeta) {
    const types = {
        chrome: 'iconCh',
        firefox: 'iconFf',
        maxz: 'iconTt',
    };
    return iconClasses[types[item.browser as keyof typeof types] || 'iconMs'];
}

function getBrowserName(item: Meta) {
    const types = {
        chrome: 'Chrome',
        firefox: 'Firefox',
        maxz: 'DevTools'
    };
    return types[item.browser as keyof typeof types] || 'Microsoft Edge';
}

function getTooltip(item: Meta) {
    return `${getBrowserName(item)} extension released on ${item.date}`;
}

type Meta = IFnameMeta & {
    yearChanged: boolean;
    year: number;
    cls: string;
    date: string;
};

function addDates(archive: IFnameMeta[]): Meta[] {
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

export function Section3_Archive() {
    const [extArchiveState] = useAtom(extArchiveStateAtom);
    const byYears = splitByYears(addDates(extArchiveState.data || []));
    return (
        <div className="py-2">
            <p className="text-sm">
                List of previously released extensions that are still available on the HID server. You can download any version for testing.
            </p>

            <div className="mt-1 text-xs cursor-default">
                {Object.entries(byYears).reverse().map(([year, items], idxYear) => (
                    <div key={idxYear}>
                        <div className="mt-2 mb-1 border-b border-slate-200 font-bold">{year}</div>
                        <div className="columns-7">
                            {items.map((item, idx) => (
                                <a className="leading-5 flex items-center" href={getUrl(item.fname)} target="_blank" title={getTooltip(item)} key={idx}>
                                    <span className={`w-4 h-4 mr-1 ${item.cls} saturate-150`}></span>
                                    <span>{item.version}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}