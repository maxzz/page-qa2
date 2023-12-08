import { useAtomValue } from 'jotai';
import { summaryExtensionsAtom } from '@/store/store';
import { Browser } from '@/store/apis';
import { reduceToFlat, reduceForTable } from './0-reduce-utils';
import { BrowserVersionsTable } from './1-browser-versions-table';

export function Section2_CurrentVersions() {
    const summary = useAtomValue(summaryExtensionsAtom);
    const res = reduceToFlat(reduceForTable(summary));
    const loaded = res[Browser.chrome] && res[Browser.firefox];
    if (!loaded) {
        return null;
    }
    return (
        <div className="py-2 text-sm flex flex-col space-y-2">
            <p>Summary table of QA and currently published HID Password Manager extensions.</p>

            <div className="max-w-2xl grid grid-cols-2 gap-x-2">
                <BrowserVersionsTable browser={Browser.chrome} table={res[Browser.chrome]} />
                <BrowserVersionsTable browser={Browser.firefox} table={res[Browser.firefox]} />
            </div>

            <div className="text-xs md:text-sm">
                <p className="mb-1">Brand legend:</p>
                <ul className="ml-4 list-disc">
                    <li>HID - extension for HID DigitalPersona product</li>
                    <li>HP - extension for HP Client Secury product</li>
                    <li>Dell - extension for DELL Privacy Manager product</li>
                </ul>
            </div>

            <div className="text-xs md:text-sm">
                <p className="mb-1">Notes:</p>
                <ul className="ml-4 list-disc">
                    <li className="">HP and Dell extensions are still only available for historical reasons. You don't need to test them.</li>
                    <li className="">The Firefox extension is not currently updated due to issues from Moz://a, but still works.</li>
                </ul>
            </div>
        </div>
    );
}
