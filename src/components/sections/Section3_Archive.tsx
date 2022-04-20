import React, { Fragment } from 'react';
import { useAtomValue } from 'jotai';
import { byYearsAtom } from '@/store/store';
import { TBrowserName, TBrowserShort } from '@/store/apis/api-formats-g01';
import { Meta, OneYearExts } from '@/store/apis/file-archive-parse';
import { getArchiveExtensionUrl } from '@/store/apis/constants';
import { ReleaseType } from '@/store/apis/file-archive';
import { UITooltip } from '../UI/UITooltip';
import { classNames } from '@/utils/classnames';
import { getExtensionIconClass } from './browser-icons';

type GroupItem = {
    main?: Meta;
    debug?: Meta;
};

type OrderedGroup = {
    [key in TBrowserShort]?: GroupItem;
};

const isFirefoxWoMain = (groupItem: GroupItem) => !groupItem.main && groupItem.debug?.browser !== TBrowserShort.dev;
const isDevTools = (groupItem: GroupItem) => !groupItem.main || !groupItem.debug;

function GroupIcons({ orderedGroup }: { orderedGroup: OrderedGroup; }) {
    return (
        <div className="w-10 flex">
            {Object.values(orderedGroup).map((groupItem, idx) =>
                <Fragment key={idx}>
                    {(groupItem.main || groupItem.debug) &&
                        <div
                            className={classNames(
                                `w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full`,
                                getExtensionIconClass(groupItem.main?.browser || groupItem.debug?.browser),
                                isFirefoxWoMain(groupItem) && 'extension-small-icon-outline hue-rotate-[293deg]',
                                !isDevTools(groupItem) && 'extension-small-icon-outline',
                            )}
                            key={idx}
                        />
                    }
                </Fragment>
            )}
        </div>
    );
}

function getTooltip(item: Meta, multiple: boolean) {
    return `Extension${multiple ? 's' : ''} released on ${item.date}`;
}

function GridVersionItem({ orderedGroup, item, multiple }: { orderedGroup: OrderedGroup; item: Meta; multiple: boolean; }) {
    return (
        <div>
            <div className="leading-6 flex items-center hover:text-url hover:font-bold select-none cursor-pointer" title={getTooltip(item, multiple)}>
                <GroupIcons orderedGroup={orderedGroup} />
                <span className={classNames(item.published && 'bg-slate-300/40 rounded')}>{item.version}</span>
            </div>
        </div>
    );
}

function PopupVersionItem({ meta }: { meta?: Meta; }) {
    if (!meta) {
        return null;
    }
    return (
        <a className="h-5 flex items-center space-x-1" href={getArchiveExtensionUrl(meta.fname)}>
            <div className={classNames(`w-4 h-4 m-px rounded-full`, getExtensionIconClass(meta?.browser),)} />
            <div className="text-xs text-url hover:underline cursor-pointer">
                {`${TBrowserName(meta.browser)} version ${meta.version}${meta.release === ReleaseType.debug ? ' with debug information' : ''}`}
            </div>
        </a>
    );
}

function VersionItems({ items }: { items: Meta[]; }) {
    const item = items[0];
    if (!item) {
        return null;
    }

    const orderedGroup = items.reduce((acc, curr) => {
        const item = acc[curr.browser] || (acc[curr.browser] = {});
        item[curr.release === ReleaseType.release ? 'main' : 'debug'] = curr;
        return acc;
    }, {} as OrderedGroup);

    return (
        <UITooltip
            trigger={<GridVersionItem orderedGroup={orderedGroup} item={item} multiple={items.length > 1} />}
            runInPortal={true}
            arrow={true}
            popperConfig={{ interactive: true, trigger: 'click', }}
        >
            {/* Popup body */}
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

function YearsGrid() {
    const byYears: OneYearExts[] = [...useAtomValue(byYearsAtom)].reverse();
    return (
        <div className="mt-1 px-0.5 text-[.65rem] sm:text-xs select-none cursor-default">
            {/* All years */}
            {byYears.map(({ year, items }) => (
                <div key={year}>
                    {/* Year items */}
                    <div className="mt-2 mb-1 border-b border-slate-200 font-bold">Year {year}</div>
                    <div className="columns-7">
                        {Object.entries(items).map(([version, items], idx) => (
                            <VersionItems items={items} key={`${version || idx}`} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function Legend() {
    const legendBrowsers = [TBrowserShort.chrome, TBrowserShort.chrome, TBrowserShort.firefox, TBrowserShort.firefox, TBrowserShort.firefox, TBrowserShort.dev];
    return (
        <div className="mt-2 text-xs sm:text-sm">
            <div className="mb-0 sm:mb-1">
                Legend:
            </div>
            {legendBrowsers.map((br, idx) => (
                <div className="ml-1 flex items-center space-x-2" key={idx}>
                    <div
                        className={classNames(
                            `w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full`,
                            getExtensionIconClass(br),
                            (idx === 1 || idx === 3) && 'extension-small-icon-outline',
                            (idx === 4) && 'extension-small-icon-outline hue-rotate-[293deg]',
                        )}
                    />
                    <div>{`${TBrowserName(br)} extension${(idx === 1 || idx === 3) ? ' with debug information' : (idx === 4) ? ' (debug version only)' : ''}`}</div>
                </div>
            ))}
            <div className="ml-1 flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full bg-slate-300"></div>
                <div className="">Published extensions</div>
            </div>
        </div>
    );
}

export function Section3_Archive() {
    return (
        <div className="py-2 text-sm">
            <p>
                List of previously released extensions that are still available on the HID server.
                You can download any version for testing purposes or for any other reason.
                Click an item to download a specific version. Extensions with debug information are protected.
                Contact Max Zakharzhevskiy at HID global for a password.
            </p>
            <YearsGrid />
            <Legend />
        </div>
    );
}
