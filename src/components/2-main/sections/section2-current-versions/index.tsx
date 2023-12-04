import { useAtomValue } from 'jotai';
import { summaryExtensionsAtom } from '@/store/store';
import { TBrowserShort } from '@/store/apis';
import { reduceToFlat, reduceForTable } from './0-reduce-utils';
import { TableToBrowser } from './1-table-to-browser';

export function Section2_CurrentVersions() {
    const summary = useAtomValue(summaryExtensionsAtom);
    const res = reduceToFlat(reduceForTable(summary));
    const loaded = res[TBrowserShort.chrome] && res[TBrowserShort.firefox];
    if (!loaded) {
        return null;
    }
    return (
        <div className="py-2 text-sm flex flex-col space-y-2">
            <p>Summary table of QA and currently published extensions.</p>

            <div className="max-w-2xl grid grid-cols-2 gap-x-2">
                <TableToBrowser browser={TBrowserShort.chrome} table={res[TBrowserShort.chrome]} />
                <TableToBrowser browser={TBrowserShort.firefox} table={res[TBrowserShort.firefox]} />
            </div>

            <div className="text-xs">
                <p className="mb-1">Brand legend:</p>
                <ul className="ml-4 list-disc">
                    <li>DP - extension for HID DigitalPersona product</li>
                    <li>HP - extension for HP Client Secury product</li>
                    <li>Dell - extension for DELL Privacy Manager product</li>
                </ul>
            </div>

            <div className="text-xs">
                <p className="mb-1">Notes:</p>
                <ul className="ml-4 list-disc">
                    <li className="">HP and Dell extensions are still only available for historical reasons. You don't need to test them.</li>
                    <li className="">The Firefox extension is not currently updated due to issues from Moz://a, but still works.</li>
                </ul>
            </div>
        </div>
    );
}
