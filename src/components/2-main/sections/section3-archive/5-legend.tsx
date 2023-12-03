import { TBrowserName, TBrowserShort } from '@/store/apis';
import { classNames } from '@/utils/classnames';
import { BrowserIcon } from '@/components/ui/icons/UIIcons';

export function Legend() {
    const legendBrowsers = [TBrowserShort.chrome, TBrowserShort.chrome, TBrowserShort.firefox, TBrowserShort.firefox, TBrowserShort.firefox, TBrowserShort.dev];
    return (
        <div className="mt-2 text-xs sm:text-sm">
            <div className="mb-0 sm:mb-1">
                Legend:
            </div>
            {legendBrowsers.map((br, idx) => (
                <div className="ml-1 flex items-center space-x-2" key={idx}>
                    <BrowserIcon browser={br}
                        className={classNames(
                            `w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full`,
                            (idx === 1 || idx === 3) && 'extension-small-icon-outline',
                            (idx === 4) && 'extension-small-icon-outline hue-rotate-[293deg]',
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
