import { TBrowserName, TBrowserShort } from '@/store/apis';
import { classNames } from '@/utils/classnames';
import { IconBrowser } from '@/components/ui/icons';

const legendBrowsers = [
    TBrowserShort.chrome,   // 0. Chrome extension
    TBrowserShort.chrome,   // 1. Chrome extension with debug information
    TBrowserShort.firefox,  // 2. Firefox extension
    TBrowserShort.firefox,  // 3. Firefox extension with debug information
    TBrowserShort.firefox,  // 4. Firefox extension (debug version only)
    TBrowserShort.dev       // 5. Dev extension with binaries
];

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
                            (idx === 1 || idx === 3 || idx === 4) && "extension-small-icon-outline",
                            (idx === 4) && "hue-rotate-[293deg]",
                        )}
                    />
                    <div>{`${TBrowserName(br)} extension${(idx === 1 || idx === 3) ? ' with debug information' : (idx === 4) ? ' (debug version only)' : ''}`}</div>
                </div>
            ))}
            <div className="ml-1 flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full bg-slate-300"></div>
                <div className="">Published extensions</div>
            </div>
        </div>
    );
}
