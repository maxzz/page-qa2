import { FilenameMetaEx } from '@/store/apis';
import { classNames } from '@/utils/classnames';
import { OrderedGroup, ReleasedIcons } from './1-grid-released-item-icons';

function getTooltipText(item: FilenameMetaEx, multiple: boolean) {
    return `Extension${multiple ? 's' : ''} released on ${item.createDate}`;
}

export function ReleasedItem({ orderedGroup, item, multiple }: { orderedGroup: OrderedGroup; item: FilenameMetaEx; multiple: boolean; }) {
    return (
        <div className="leading-6 flex items-center hover:text-url hover:font-bold select-none cursor-pointer" title={getTooltipText(item, multiple)}>
            <ReleasedIcons orderedGroup={orderedGroup} />

            <div className={classNames(item.published && 'bg-slate-300/40 rounded')}>
                {item.version}
            </div>
        </div>
    );
}
