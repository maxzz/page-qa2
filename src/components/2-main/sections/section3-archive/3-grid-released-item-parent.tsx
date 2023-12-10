import { FilenameMetaEx, BuildType } from '@/store/apis';
import { UITooltip } from '@/components/ui/UITooltip';
import { OrderedGroup } from './1-grid-released-item-icons';
import { ReleasedItem } from './2-grid-released-item';
import { PopupBody } from './5-popup-body';

export function ReleasedItemParent({ items }: { items: FilenameMetaEx[]; }) {
    const item = items[0];
    if (!item) {
        return null;
    }

    const orderedGroup = items.reduce(
        (acc, curr) => {
            const item = acc[curr.browser] || (acc[curr.browser] = {});
            item[curr.build === BuildType.release ? 'main' : 'debug'] = curr;
            return acc;
        }, {} as OrderedGroup
    );

    return (
        <UITooltip
            trigger={<ReleasedItem orderedGroup={orderedGroup} item={item} multiple={items.length > 1} />}
            runInPortal={true}
            arrow={true}
            popperConfig={{ interactive: true, trigger: 'click', }}
        >
            <PopupBody orderedGroup={orderedGroup} item={item} />
        </UITooltip>
    );
}
