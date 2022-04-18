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

function getClass(browser?: TBrowserShort | undefined) {
    const types = {
        [TBrowserShort.chrome]: 'iconCh',
        [TBrowserShort.firefox]: 'iconFf',
        [TBrowserShort.dev]: 'iconTt',
    };
    return iconClasses[types[browser as keyof typeof types || TBrowserShort.dev] || 'iconMs'];
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
                                `w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full`,
                                getClass(groupItem.main?.browser || groupItem.debug?.browser),
                                groupItem.main && groupItem.debug && 'extension-small-icon-outline',
                            )}
                            key={idx}
                        />
                    }
                </Fragment>
            )}
        </div>
    );
}

function PopupVersionItem({ meta }: { meta?: Meta; }) {
    if (!meta) {
        return null;
    }
    return (
        <a className="h-5 flex items-center space-x-1" href={getArchiveExtensionUrl(meta.fname)}>
            <div className={classNames(`w-4 h-4 m-px rounded-full`, getClass(meta?.browser),)} />
            <div className="text-xs text-url hover:underline cursor-pointer">
                {`${TBrowserName(meta.browser)} version ${meta.version}${meta.release === ReleaseType.debug ? ' debug' : ''}`}
            </div>
        </a>
    );
}

function GridVersionItem({ orderedGroup, item }: { orderedGroup: OrderedGroup; item: Meta; }) {
    return (
        <div>
            <div className="leading-6 flex items-center select-none cursor-pointer" title={getTooltip(item)}>
                <GroupIcons orderedGroup={orderedGroup} />
                <span>{item.version}</span>
            </div>
        </div>
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
            trigger={<GridVersionItem orderedGroup={orderedGroup} item={item} />}
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
                            <PopupVersionItem meta={item.main} />
                            <PopupVersionItem meta={item.debug} />
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
        <div className="py-2 text-sm">
            <p className="">
                List of previously released extensions that are still available on the HID server.
                You can download any version for testing purposes or for any other reason.
                Click an item to download a specific version. Debug versions are protected.
                Contact Max Zakharzhevskiy at HID global for a password.
            </p>

            <div className="mt-1 px-0.5 text-[.65rem] sm:text-xs select-none cursor-default">
                {/* All years */}
                {byYears.map(({ year, items }) => (
                    <div key={year}>
                        {/* Year items */}
                        <div className="mt-2 mb-1 border-b border-slate-200 font-bold">{year}</div>
                        <div className="columns-7">
                            {Object.entries(items).map(([version, items], idx) => (
                                <VersionItems items={items} key={`${version || idx}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-2 text-xs sm:text-sm">
                <div className="mb-0 sm:mb-1">Legend:</div>
                <div className="flex items-center space-x-2">
                    <div
                        className={classNames(
                            `w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full`,
                            getClass(TBrowserShort.chrome),
                            'extension-small-icon-outline',
                        )}
                    >
                    </div>
                    <div className="">{TBrowserName(TBrowserShort.chrome)}</div>
                </div>
            </p>
        </div>
    );
}
