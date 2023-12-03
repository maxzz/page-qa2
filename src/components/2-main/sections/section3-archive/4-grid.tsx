import { useAtomValue } from 'jotai';
import { byYearsAtom } from '@/store/store';
import { Meta, OneYearExts, ReleaseType } from '@/store/apis';
import { UITooltip } from '@/components/ui/UITooltip';
import { OrderedGroup } from './1-group-icons';
import { GridVersionItem } from './2-grid-item';
import { PopupBody } from './3-popup-body';

function YearItems({ items }: { items: Meta[]; }) {
    const item = items[0];
    if (!item) {
        return null;
    }

    const orderedGroup = items.reduce(
        (acc, curr) => {
            const item = acc[curr.browser] || (acc[curr.browser] = {});
            item[curr.release === ReleaseType.release ? 'main' : 'debug'] = curr;
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

export function YearsGrid() {
    const byYears: OneYearExts[] = [...useAtomValue(byYearsAtom)].reverse();
    if (!byYears.length) {
        return (
            <div className="my-4 text-red-600 font-bold">Data not received from server.</div>
        );
    }
    return (
        <div className="mt-1 px-0.5 text-[.65rem] sm:text-xs select-none cursor-default">
            {/* All years */}
            {byYears.map(
                ({ year, items }) => (
                    <div key={year}>

                        {/* Year items */}
                        <div className="mt-2 mb-1 border-b border-slate-200 font-bold">
                            Year {year}
                        </div>

                        <div className="columns-7">
                            {Object.entries(items).map(
                                ([version, items], idx) => (
                                    <YearItems items={items} key={`${version || idx}`} />
                                )
                            )}
                        </div>

                    </div>
                )
            )}
        </div>
    );
}
