import { useAtomValue } from 'jotai';
import { byYearsAtom } from '@/store/store';
import { YearExts } from '@/store/apis';
import { ReleasedItemParent } from './3-grid-released-item-parent';

export function GridAllYears() {
    const byYears: YearExts[] = [...useAtomValue(byYearsAtom)].reverse();
    if (!byYears.length) {
        return null;
        // return ( //TODO: check state loading and error
        //     <div className="my-4 text-red-600 font-bold">Data not received from server.</div>
        // );
    }
    return (
        <div className="mt-1 px-0.5 text-[.65rem] sm:text-xs select-none cursor-default">
            {/* All years */}
            {byYears.map(
                ({ yearStr, items }) => (
                    <div key={yearStr}>

                        {/* Year items */}
                        <div className="mt-2 mb-1 border-b border-slate-200 font-bold">
                            Year {yearStr}
                        </div>

                        <div className="columns-7">
                            {Object.entries(items).map(
                                ([version, items], idx) => (
                                    <ReleasedItemParent items={items} key={`${version || idx}`} />
                                )
                            )}
                        </div>

                    </div>
                )
            )}
        </div>
    );
}
