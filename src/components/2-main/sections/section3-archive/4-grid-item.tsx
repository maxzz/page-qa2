import { Meta, BuildType } from '@/store/apis';
import { UITooltip } from '@/components/ui/UITooltip';
import { OrderedGroup } from './1-group-icons';
import { GridVersionItem } from './2-grid-item';
import { PopupBody } from './3-popup-body';

export function YearItems({ items }: { items: Meta[]; }) {
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
            trigger={<GridVersionItem orderedGroup={orderedGroup} item={item} multiple={items.length > 1} />}
            runInPortal={true}
            arrow={true}
            popperConfig={{ interactive: true, trigger: 'click', }}
        >
            <PopupBody orderedGroup={orderedGroup} item={item} />
        </UITooltip>
    );
}
