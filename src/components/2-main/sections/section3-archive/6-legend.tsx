import { convTBrowserShort2Name, TBrowserShort } from '@/store/apis';
import { classNames } from '@/utils/classnames';
import { IconBrowser } from '@/components/ui/icons';

const legendBrowsers = [
    TBrowserShort.chrome,   // 0. Chrome extension
    TBrowserShort.chrome,   // 1. Chrome extension with debug information
    TBrowserShort.chrome3,  // 2. Chrome extension v3
    TBrowserShort.chrome3,  // 3. Chrome extension v3 with debug information
    TBrowserShort.firefox,  // 4. Firefox extension
    TBrowserShort.firefox,  // 5. Firefox extension with debug information
    TBrowserShort.firefox,  // 6. Firefox extension (debug version only)
    TBrowserShort.dev       // 7. Dev extension with binaries
];

const withDebugText = (idx: number) => idx === 1 || idx === 3 || idx === 5;
const withDebugCyrcle = (idx: number) => idx === 1 || idx === 3 || idx === 5 || idx === 6;

function iconText(br: TBrowserShort, idx: number) {
    return `${convTBrowserShort2Name(br)} extension${withDebugText(idx) ? ' with debug information' : (idx === 6) ? ' (debug version only)' : ''}`;
}

export function Legend() {
    return (
        <div className="mt-2 text-xs sm:text-sm">
            <div className="mb-0 sm:mb-1">
                Legend:
            </div>
            {legendBrowsers.map((br, idx) => (
                <div className="ml-1 flex items-center space-x-2" key={idx}>
                    <IconBrowser browser={br}
                        className={classNames(
                            "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full",
                            withDebugCyrcle(idx) && "extension-small-icon-outline",
                            (idx === 6) && "hue-rotate-[293deg]",
                        )}
                    />
                    <div>{iconText(br, idx)}</div>
                </div>
            ))}
            <div className="ml-1 flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full bg-slate-300"></div>
                <div className="">Published extensions</div>
            </div>
        </div>
    );
}
