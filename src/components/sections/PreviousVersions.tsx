import React from 'react';
import { useAtom } from 'jotai';
import { extArchiveStateAtom } from '@/store/store';
import * as CONST from '@/store/utils/constants';
import { IFnameMeta } from '@/store/utils/utils-existing-on-server';
import { SectionHeader } from '../Frontpage';
import iconClasses from './browser-icons.module.scss';

function getUrl(name: string) {
    return `${CONST.API_URL}${name}`;
}

function getClass(mdfile: IFnameMeta) {
    if (mdfile.browser === 'chrome') {
        return iconClasses.iconCh;
    }
    if (mdfile.browser === 'firefox') {
        return iconClasses.iconFf;
    }
    if (mdfile.browser === 'maxz') {
        return iconClasses.iconTt;
    }
    return iconClasses.iconMs;
}

type Meta = IFnameMeta & {
    yearChanged: boolean;
    year: number;
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
            date: dt.toLocaleDateString('en-US', options),
        };
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

export function PreviousVersions() {
    const [extArchiveState] = useAtom(extArchiveStateAtom);
    const byYears = splitByYears(addDates(extArchiveState.data || []));
    return (
        <div className="">
            <SectionHeader>
                <div className="" title="Previously released extensions">Archive</div>
            </SectionHeader>
            <p className="mt-1 text-sm">List of previously released extensions that are still available on the HID server.</p>

            <div className="mt-1 text-xs cursor-default">
                {Object.entries(byYears).reverse().map(([year, items], idxYear) => (
                    <div key={idxYear}>
                        <div className="mt-2 mb-1 border-b border-slate-200 font-bold">{year}</div>
                        <div className="columns-7">
                            {items.map((item, idx) => (
                                <a className="leading-5 flex items-center" href={getUrl(item.fname)} target="_blank" title={item.date} key={idx}>
                                    <span className={`w-4 h-4 mr-1 ${getClass(item)} saturate-150`}></span>
                                    <span>{item.version}</span>
                                </a>
                            ))}
                            {/* {items.map((item, idx) => (
                                <div className="leading-5 flex items-center" key={`${idxYear}${idx}`}>
                                    <span className={`w-4 h-4 mr-1 ${getClass(item)} saturate-150`}></span>
                                    <a href={getUrl(item.fname)} target="_blank" title={item.date}>{item.version}</a>
                                </div>
                            ))} */}
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    );
}

//TODO: accordion
//TODO: icons - done
//TODO: links - done
//TODO: timeline
