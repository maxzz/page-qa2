import React, { Fragment } from 'react';
import { useAtomValue } from 'jotai';
import { byYearsAtom } from '@/store/store';
import { TBrowserName, TBrowserShort } from '@/store/apis/api-formats-g01';
import { Meta, OneYearExts } from '@/store/apis/file-archive-parse';
import { getArchiveExtensionUrl } from '@/store/apis/constants';
import { ReleaseType } from '@/store/apis/file-archive';
import { UITooltip } from '../UI/UITooltip';
import { classNames } from '@/utils/classnames';
import iconClasses from './browser-icons.module.scss';

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

type GroupItem = {
    main?: Meta;
    debug?: Meta;
};

type OrderedGroup = {
    [key in TBrowserShort]?: GroupItem;
};

function GroupIcons({ orderedGroup }: { orderedGroup: OrderedGroup; }) {
    return (
        <div className="w-10 flex">
            {Object.entries(orderedGroup).map(([browser, groupItem], idx) =>
                <Fragment key={idx}>
                    {(groupItem.main || groupItem.debug) &&
                        <div
                            className={classNames(
                                `w-2 h-2 sm:w-4 sm:h-4 m-px rounded-full`,
                                getClass(groupItem.main || groupItem.debug),
                                groupItem.main && groupItem.debug ? 'outline outline-2 outline-offset outline-green-500/50 sm:outline-green-500/30' : '',
                            )}
                            key={idx}
                        />
                    }
                </Fragment>
            )}
        </div>
    );
}

function VersionItem({ meta }: { meta?: Meta; }) {
    if (!meta) {
        return null;
    }
    return (
        <a className="flex items-center space-x-1" href={getArchiveExtensionUrl(meta.fname)}>
            <div className={classNames(`w-4 h-4 m-px rounded-full`, getClass(meta),)} />
            <div className="text-xs leading-5 text-url hover:underline cursor-pointer">
                {`${TBrowserName(meta.browser)} version ${meta.version}${meta.release === ReleaseType.debug ? ' debug' : ''}`}
            </div>
        </a>
    );
}

function VersionItems({ items }: { items: Meta[]; }) {
    const item = items[0];
    if (!item) {
        return null;
    }

    const orderedGroup = sortGroup([...items]).reduce((acc, curr) => {
        const item = acc[curr.browser] || (acc[curr.browser] = {});
        item[curr.release === ReleaseType.release ? 'main' : 'debug'] = curr;
        return acc;
    }, {} as OrderedGroup);

    return (
        <UITooltip
            trigger={
                <div>
                    <div className="leading-6 flex items-center select-none cursor-pointer" title={getTooltip(item)}>
                        <GroupIcons orderedGroup={orderedGroup} />
                        <span>{item.version}</span>
                    </div>
                </div>
            }
            runInPortal={true}
            arrow={true}
            popperConfig={{ interactive: true, trigger: 'click', }}
        >
            <div className="min-w-[18rem] text-sm cursor-default">
                <div className="pl-1 pb-1 font-bold border-b border-slate-400">
                    Versions released on {item.date}
                </div>

                <div className="mt-2 mb-1">
                    {Object.entries(orderedGroup).map(([key, item], idx) => (
                        <Fragment key={idx}>
                            <VersionItem meta={item.main} />
                            <VersionItem meta={item.debug} />
                        </Fragment>
                    ))}
                </div>
            </div>
        </UITooltip>
    );
}

export function Section3_Archive() {
    const byYears: OneYearExts[] = [...useAtomValue(byYearsAtom)].reverse();
    return (
        <div className="py-2">
            <p className="text-sm">
                List of previously released extensions that are still available on the HID server. 
                You can download any version for testing purposes or for any other reason.
                Click an item to download a specific version. Debug versions are protected.
                Contact Max Zakharzhevskiy at HID global for a password.
            </p>

            <div className="mt-1 px-0.5 text-[.65rem] sm:text-xs select-none cursor-default">
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
