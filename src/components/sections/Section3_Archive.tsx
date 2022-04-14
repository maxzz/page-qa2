import React from 'react';
import { useAtomValue } from 'jotai';
import { byYearsAtom } from '@/store/store';
import { TBrowserName, TBrowserShort } from '@/store/apis/api-formats-g01';
import { Meta, OneYearExts } from '@/store/apis/file-archive-parse';
import { getArchiveExtensionUrl } from '@/store/apis/constants';
import iconClasses from './browser-icons.module.scss';

function getClass(item: Meta) {
    const types = {
        [TBrowserShort.chrome]: 'iconCh',
        [TBrowserShort.firefox]: 'iconFf',
        [TBrowserShort.dev]: 'iconTt',
    };
    return iconClasses[types[item.browser as keyof typeof types] || 'iconMs'];
}

function getTooltip(item: Meta) {
    return `${TBrowserName(item.browser)} extension released on ${item.date}`;
}

export function Section3_Archive() {
    const byYears: OneYearExts[] = useAtomValue(byYearsAtom);
    return (
        <div className="py-2">
            <p className="text-sm">
                List of previously released extensions that are still available on the HID server. You can download any version for testing purposes or for any other reason.
            </p>

            <div className="mt-1 text-xs cursor-default">
                {byYears.map(({year, items}) => (
                    <div key={year}>
                        <div className="mt-2 mb-1 border-b border-slate-200 font-bold">{year}</div>
                        <div className="columns-7">
                            {items.map((item, idx) => (
                                <a className="leading-5 flex items-center" href={getArchiveExtensionUrl(item.fname)} title={getTooltip(item)} key={idx}>
                                    <span className={`w-4 h-4 mr-1 ${getClass(item)} saturate-150`}></span>
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

//TODO: group versions by browser and add drop-down menu
