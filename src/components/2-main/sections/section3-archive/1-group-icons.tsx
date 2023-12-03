import { Fragment } from 'react';
import { Meta, TBrowserShort } from '@/store/apis';
import { classNames } from '@/utils/classnames';
import { BrowserIcon } from '@/components/ui/icons/UIIcons';

type GroupItem = {
    main?: Meta;
    debug?: Meta;
};

export type OrderedGroup = {
    [key in TBrowserShort]?: GroupItem;
};

const isFirefoxWoMain = (groupItem: GroupItem) => !groupItem.main && groupItem.debug?.browser !== TBrowserShort.dev;
const isDevTools = (groupItem: GroupItem) => !groupItem.main || !groupItem.debug;

const iconClasses = (groupItem: GroupItem) => classNames(
    "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full",
    isFirefoxWoMain(groupItem) && "extension-small-icon-outline hue-rotate-[293deg]",
    !isDevTools(groupItem) && "extension-small-icon-outline",
);

export function GroupIcons({ orderedGroup }: { orderedGroup: OrderedGroup; }) {
    return (
        <div className="w-10 flex">
            {Object.values(orderedGroup).map(
                (groupItem, idx) => (
                    <Fragment key={idx}>
                        {(groupItem.main || groupItem.debug) && (
                            <BrowserIcon
                                browser={groupItem.main?.browser || groupItem.debug?.browser}
                                className={iconClasses(groupItem)}
                                key={idx}
                            />
                        )}
                    </Fragment>
                )
            )}
        </div>
    );
}
