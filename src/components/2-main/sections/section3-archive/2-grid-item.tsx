import { FilenameMetaEx } from '@/store/apis';
import { classNames } from '@/utils/classnames';
import { OrderedGroup, GroupIcons } from './1-group-icons';

function getTooltip(item: FilenameMetaEx, multiple: boolean) {
    return `Extension${multiple ? 's' : ''} released on ${item.createDate}`;
}

export function GridVersionItem({ orderedGroup, item, multiple }: { orderedGroup: OrderedGroup; item: FilenameMetaEx; multiple: boolean; }) {
    return (
        <div className="leading-6 flex items-center hover:text-url hover:font-bold select-none cursor-pointer" title={getTooltip(item, multiple)}>
            <GroupIcons orderedGroup={orderedGroup} />

            <div className={classNames(item.published && 'bg-slate-300/40 rounded')}>
                {item.version}
            </div>
        </div>
    );
}
