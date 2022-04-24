import { useRef } from 'react';
import { Atom, useAtomValue } from 'jotai';
import { configStateAtom, latestChExtensionAtom, latestFfExtensionAtom } from '@/store/store';
import { InAppExtnInfo } from '@/store/apis/file-current-config';
import { beautifyDate } from '@/utils/helpers';
import { TBrowserName, TBrowserShort } from '@/store/apis/api-formats-g01';
import { BrowserIcon, IconClipboard, IconDownload } from '../UI/UIIcons';
import { classNames } from '@/utils/classnames';
import { toastSucceeded } from '../UI/UiToaster';
import { confetti } from 'dom-confetti';
import HERO_IMAGE from '@/assets/frontpage/qa-header.jpg';
import { a, config, useSpring } from '@react-spring/web';

const confettiConfig = { //https://daniel-lundin.github.io/react-dom-confetti
    angle: 90,
    spread: 147,
    startVelocity: 60,
    elementCount: 130,
    dragFriction: 0.21,
    duration: 2000,
    stagger: 0,
    width: "8px",
    height: "4px",
    perspective: "1000px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const boxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

function HeroImage() {
    return (
        <div className="bg-slate-400" style={{ ...boxShadow, transition: "all .2s" }}>
            <img className="h-full object-cover border border-slate-300 border-b-slate-400" src={HERO_IMAGE} alt="hero" />
        </div>
    );
}

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

function ActionButtons({ url }: { url?: string; }) {
    const confettiRef = useRef<HTMLButtonElement>(null);
    return (
        <div className="flex items-center lg:justify-end space-x-2 text-sm">
            {/* Download button */}
            <a
                className={classNames(
                    "p-2 flex items-center whitespace-nowrap rounded hover:bg-blue-100 active:scale-[.97] space-x-0.5 select-none",
                    !url && "invisible pointer-events-none",
                )}
                href={url}
                title="Download extension"
            >
                <IconDownload className="w-6 h-6" strokeWidth={1} />
                <div>Download</div>
            </a>

            {/* Copy link */}
            <button
                className={classNames(
                    "p-2 flex items-center whitespace-nowrap rounded hover:bg-blue-100 active:scale-[.97] space-x-0.5 select-none",
                    !url && "invisible pointer-events-none",
                )}
                onClick={async () => {
                    await navigator.clipboard.writeText(url || '');
                    toastSucceeded('Link copied to clipboard');
                    confetti(confettiRef.current!, confettiConfig);
                }}
                ref={confettiRef}
                title="Copy extension URL to clipboard"
            >
                <IconClipboard className="w-6 h-6" strokeWidth={1} />
                <div>Copy link</div>
            </button>
        </div>
    );
}

function CurrentVersion({ browser, extInfoAtom, loading }: { browser: TBrowserShort; extInfoAtom: Atom<InAppExtnInfo | undefined>; loading: boolean; }) {
    const inAppExtnInfo = useAtomValue(extInfoAtom);
    const vis = inAppExtnInfo?.url;
    const btnStyles = useSpring({ opacity: vis ? 1 : 0, scaleY: vis ? 1 : 0, config: { duration: 150 }, });
    const txtStyles = useSpring({ opacity: vis ? 1 : 0, x: vis ? 0 : 200, config: { duration: 150 }, });
    return (
        <div className="px-2 pt-2 pb-1 sm:px-4 sm:py-3 border grid grid-cols-[auto,1fr]" style={{ ...boxShadow, transition: "all .2s" }}>

            {/* Icon, name, version, updated date */}
            <div className="content-center place-self-center"><BrowserIcon browser={browser} className={"w-9 h-8"} style={iconShadow} /></div>
            <div className="ml-3 text-xs overflow-hidden">
                <div className="text-base font-bold scale-y-125 whitespace-nowrap">{TBrowserName(browser)} QA extension</div>
                <a.div style={txtStyles}>
                    <div className="h-4">{inAppExtnInfo?.updated ? `Updated on ${beautifyDate(inAppExtnInfo.updated)}` : loading ? '' : 'update date not available'}</div>
                    <div className="h-4">{inAppExtnInfo?.version || (loading ? '' : 'version not available')}</div>
                </a.div>
            </div>

            {/* Action buttons */}
            <a.div className="col-start-2 mt-2 sm:mt-0" style={btnStyles}>
                <ActionButtons url={inAppExtnInfo?.url} />
            </a.div>
        </div>
    );
}

function CurrentVersions() {
    const configState = useAtomValue(configStateAtom);
    return (
        <div className="flex flex-col justify-center space-y-2">
            <CurrentVersion browser={TBrowserShort.chrome} extInfoAtom={latestChExtensionAtom} loading={configState.loading} />
            <CurrentVersion browser={TBrowserShort.firefox} extInfoAtom={latestFfExtensionAtom} loading={configState.loading} />
        </div>
    );
}

export function Section0_HeroSection() {
    return (
        <div className="mt-4 mb-3 h-60 grid grid-cols-[minmax(8rem,1fr),minmax(12rem,28rem)] gap-4">
            <HeroImage />
            <CurrentVersions />
        </div>
    );
}

//TODO: add loading state change animation
