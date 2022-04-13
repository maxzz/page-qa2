import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { byYearsAtom, extArchiveStateAtom } from '@/store/store';
import { getArchiveExtensionUrl } from '@/store/apis/constants';
import { Meta, splitByYears } from '@/store/apis/file-archive-parse';
import iconClasses from './browser-icons.module.scss';

function getClass(item: Meta) {
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

export function Section3_Archive() {
    // const [extArchiveState] = useAtom(extArchiveStateAtom);
    // const byYears = splitByYears(extArchiveState);
    const byYears = useAtomValue(byYearsAtom);
    return (
        <div className="py-2">
            <p className="text-sm">
                List of previously released extensions that are still available on the HID server. You can download any version for testing purposes or for any other reason.
            </p>

            <div className="mt-1 text-xs cursor-default">
                {Object.entries(byYears).reverse().map(([year, items], idxYear) => (
                    <div key={idxYear}>
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
