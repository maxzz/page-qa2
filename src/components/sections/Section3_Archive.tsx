import React, { Fragment } from 'react';
import { useAtomValue } from 'jotai';
import { byYearsAtom } from '@/store/store';
import { TBrowserName, TBrowserShort } from '@/store/apis/api-formats-g01';
import { Meta, OneYearExts } from '@/store/apis/file-archive-parse';
import { getArchiveExtensionUrl } from '@/store/apis/constants';
import iconClasses from './browser-icons.module.scss';
import { ReleaseType } from '@/store/apis/file-archive';
import { classNames } from '@/utils/classnames';

function getClass(item?: Meta) {
    const types = {
        [TBrowserShort.chrome]: 'iconCh',
        [TBrowserShort.firefox]: 'iconFf',
        [TBrowserShort.dev]: 'iconTt',
    };
    return iconClasses[types[item?.browser as keyof typeof types || TBrowserShort.dev] || 'iconMs'];
}

function getTooltip(item: Meta) {
    return `${TBrowserName(item.browser)} extension released on ${item.date}`;
}

function getItemIdx(item: Meta) {
    const types = {
        [TBrowserShort.chrome]: item.release === ReleaseType.release ? 1 : 3,
        [TBrowserShort.firefox]: item.release === ReleaseType.release ? 2 : 4,
    };
    return types[item.browser as keyof typeof types] || 5;
}

function sortGroup(group: Meta[]): Meta[] {
    return group.sort((a, b) => getItemIdx(a) - getItemIdx(b));
}

function GroupIcons({ group }: { group: Meta[]; }) {
    const orderedGroup = sortGroup([...group]);

    type GroupItem = {
        main?: Meta;
        debug?: Meta;
    };

    type OrderedGroup = {
        [key in TBrowserShort]?: GroupItem;
    };

    const grItems = orderedGroup.reduce((acc, curr) => {
        const item = acc[curr.browser] || (acc[curr.browser] = {});
        item[curr.release === ReleaseType.release ? 'main' : 'debug'] = curr;
        return acc;
    }, {} as OrderedGroup);

    return (
        <div className="w-10 flex">
            {Object.entries(grItems).map(([browser, groupItem], idx) =>
                <Fragment key={idx}>
                    {(groupItem.main || groupItem.debug) &&
                        <div
                            className={classNames(
                                `w-4 h-4 mr-px rounded-full`,
                                getClass(groupItem.main || groupItem.debug),
                                groupItem.main && groupItem.debug ? 'outline outline-2 outline-offset-1 outline-green-500/30' : '',
                            )}
                            key={idx}
                        />
                    }
                </Fragment>
            )}
        </div>
    );
}

function VersionItems({ items }: { items: Meta[]; }) {
    const item = items[0];
    if (!item) {
        return null;
    }
    return (
        <div className="">
            <a className="leading-6 flex items-center" href={getArchiveExtensionUrl(item.fname)} title={getTooltip(item)}>
                <GroupIcons group={items} />
                <span className="hover:bg-slate-400/40">{item.version}</span>
            </a>
        </div>
    );
}

export function Section3_Archive() {
    const byYears: OneYearExts[] = [...useAtomValue(byYearsAtom)].reverse();
    return (
        <div className="py-2">
            <p className="text-sm">
                List of previously released extensions that are still available on the HID server. You can download any version for testing purposes or for any other reason.
            </p>

            <div className="mt-1 text-xs cursor-default">
                {byYears.map(({ year, items }) => (
                    <div key={year}>
                        <div className="mt-2 mb-1 border-b border-slate-200 font-bold">{year}</div>
                        <div className="columns-7">
                            {Object.entries(items).map(([version, items], idx) => (
                                <VersionItems items={items} key={`${version || idx}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

//TODO: group versions by browser (done) and add drop-down menu
