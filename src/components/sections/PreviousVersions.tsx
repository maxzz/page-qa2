import React from 'react';
import { useAtom } from 'jotai';
import { extArchiveStateAtom, sectionArchiveOpenAtom } from '@/store/store';
import * as CONST from '@/store/utils/constants';
import { IFnameMeta } from '@/store/utils/utils-existing-on-server';
import { SectionHeader } from '../Frontpage';
import iconClasses from './browser-icons.module.scss';
import { UISectionPane } from '../UI/UISectionPane';
import { UIAccordion } from '../UI/UIAccordion';

function getUrl(name: string) {
    return `${CONST.API_URL}${name}`;
}

function getClass(item: IFnameMeta) {
    const types = {
        chrome: 'iconCh',
        firefox: 'iconFf',
        maxz: 'iconTt',
    }
    return iconClasses[types[item.browser as keyof typeof types] || 'iconMs'];

    // if (item.browser === 'chrome') {
    //     return iconClasses.iconCh;
    // }
    // if (item.browser === 'firefox') {
    //     return iconClasses.iconFf;
    // }
    // if (item.browser === 'maxz') {
    //     return iconClasses.iconTt;
    // }
    // return iconClasses.iconMs;
}

function getBrowserName(item: Meta) {
    const types = {
        chrome: 'Chrome',
        firefox: 'Firefox',
        maxz: 'DevTools'
    }
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

// export function PreviousVersions2() {
//     const [extArchiveState] = useAtom(extArchiveStateAtom);
//     const byYears = splitByYears(addDates(extArchiveState.data || []));
//     return (
//         <div className="">
//             <SectionHeader>
//                 <div className="" title="Previously released extensions">Archive</div>
//             </SectionHeader>
//             <p className="mt-1 text-sm">List of previously released extensions that are still available on the HID server.</p>
//             <div className="mt-1 text-xs cursor-default">
//                 {Object.entries(byYears).reverse().map(([year, items], idxYear) => (
//                     <div key={idxYear}>
//                         <div className="mt-2 mb-1 border-b border-slate-200 font-bold">{year}</div>
//                         <div className="columns-7">
//                             {items.map((item, idx) => (
//                                 <a className="leading-5 flex items-center" href={getUrl(item.fname)} target="_blank" title={getTooltip(item)} key={idx}>
//                                     <span className={`w-4 h-4 mr-1 ${item.cls} saturate-150`}></span>
//                                     <span>{item.version}</span>
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 )
//                 )}
//             </div>
//         </div>
//     );
// }

export function PreviousVersions() {
    const [open, setOpen] = useAtom(sectionArchiveOpenAtom);
    const [extArchiveState] = useAtom(extArchiveStateAtom);
    const byYears = splitByYears(addDates(extArchiveState.data || []));

    return (<div>
        <UISectionPane open={open} onClick={() => setOpen(v => !v)}>
            <div className="" title="Previously released extensions">
                Archive
            </div>
        </UISectionPane>
        <UIAccordion toggle={open}>
            <p className="mt-1 text-sm">
                List of previously released extensions that are still available on the HID server.
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
        </UIAccordion>
    </div>);
}
