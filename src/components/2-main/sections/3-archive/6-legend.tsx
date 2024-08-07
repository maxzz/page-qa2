import { convBrowser2Name, Browser } from '@/store/apis';
import { classNames } from '@/utils/classnames';
import { IconBrowser } from '@/components/ui/icons';

const legendBrowsers = [
    Browser.chrome,   // 0. Chrome extension
    Browser.chrome,   // 1. Chrome extension with debug information
    Browser.chrome3,  // 2. Chrome extension v3
    Browser.chrome3,  // 3. Chrome extension v3 with debug information
    Browser.firefox,  // 4. Firefox extension
    Browser.firefox,  // 5. Firefox extension with debug information
    Browser.firefox,  // 6. Firefox extension (debug version only)
    Browser.dev       // 7. Dev extension with binaries (tow versions: txt and self extraction exe)
];

const withDebugText = (idx: number) => idx === 1 || idx === 3 || idx === 5;
const withDebugCyrcle = (idx: number) => idx === 1 || idx === 3 || idx === 5 || idx === 6;

function iconText(br: Browser, idx: number) {
    return `${convBrowser2Name(br)} extension${withDebugText(idx) ? ' with debug information' : (idx === 6) ? ' (debug version only)' : ''}`;
}

const iconCommonClasses = "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 m-px rounded-full";

const iconClasses = (idx: number) => classNames(
    iconCommonClasses,
    withDebugCyrcle(idx) && "extension-small-icon-outline",
    (idx === 6) && "hue-rotate-[293deg]",
);

export function Legend() {
    return (
        <div className="mt-2 text-xs md:text-sm">
            <div className="mb-0 md:mb-1">
                Legend:
            </div>

            {legendBrowsers.map((br, idx) => (
                <div className="ml-1 flex items-center space-x-2" key={idx}>
                    <IconBrowser browser={br} className={iconClasses(idx)} />
                    <div>
                        {iconText(br, idx)}
                    </div>
                </div>
            ))}

            <div className="ml-1 flex items-center space-x-2">
                <div className={`${iconCommonClasses} bg-slate-300`}></div>
                <div className="">Published extensions</div>
            </div>
        </div>
    );
}

//TODO: update text; should be like this: 'Chrome extension with manifest v3' i.e. not 'Chrome v3 extension'
