import { Fragment } from 'react';
import { FilenameMetaEx, Browser } from '@/store/apis';
import { classNames } from '@/utils/classnames';
import { IconBrowser } from '@/components/ui/icons';

type GroupItem = {
    main?: FilenameMetaEx;
    debug?: FilenameMetaEx;
};

export type OrderedGroup = {
    [key in Browser]?: GroupItem;
};

const isFirefoxWoMain = (groupItem: GroupItem) => !groupItem.main && groupItem.debug?.browser !== Browser.dev;
const isDevTools = (groupItem: GroupItem) => !groupItem.main || !groupItem.debug;

const iconClasses = (groupItem: GroupItem) => classNames(
    "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full",
    isFirefoxWoMain(groupItem) && "extension-small-icon-outline hue-rotate-[293deg]",
    !isDevTools(groupItem) && "extension-small-icon-outline",
);

export function ReleasedIcons({ orderedGroup }: { orderedGroup: OrderedGroup; }) {
    return (
        <div className="w-10 flex">
            {Object.values(orderedGroup).map(
                (groupItem, idx) => (
                    <Fragment key={idx}>
                        {(groupItem.main || groupItem.debug) && (
                            <IconBrowser
                                browser={groupItem.main?.broIcon || groupItem.debug?.broIcon}
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
