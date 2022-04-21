import React from 'react';
import { useAtomValue } from 'jotai';
import { configStateAtom } from '@/store/store';
import { InAppExtnInfo } from '@/store/apis/file-current-config';
import { beautifyDate } from '@/utils/helpers';
import { toastSucceeded } from '../UI/UiToaster';
import { confetti } from 'dom-confetti';
import { IconClipboard, IconCrLogo, IconDownload, IconFfLogo, IconMsLogo } from '../UI/UIIcons';
import HERO_IMAGE from '@/assets/frontpage/qa-header.jpg';

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

export type LatestExtension = {
    name: string;
    icon: React.ReactNode;
};

const extensionChAtom: LatestExtension = {
    name: 'Chrome',
    icon: <IconCrLogo className="w-8 h-8" />,
};

const extensionFfAtom: LatestExtension = {
    name: 'Firefox',
    icon: <IconFfLogo className="w-8 h-8" />,
};

const extensionMsAtom: LatestExtension = {
    name: 'Edge',
    icon: <IconMsLogo className="w-8 h-8" />,
};

const boxShadow = {
    boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)'
};

function HeroImage() {
    return (
        <div className="bg-slate-400" style={{...boxShadow, transition: "all .2s"}}>
            <img className="h-full object-cover border border-slate-300 border-b-slate-400" src={HERO_IMAGE} alt="hero" />
        </div>
    );
}

function CurrentVersion({ extension, inAppExtnInfo }: { extension: LatestExtension, inAppExtnInfo: InAppExtnInfo; }) {
    const confettiRef = React.useRef<HTMLButtonElement>(null);
    return (
        <div className="px-2 pt-2 pb-1 sm:px-4 sm:py-3 border grid grid-cols-[auto,1fr]" style={{...boxShadow, transition: "all .2s"}}>
            {/* Icon, name, version */}

            <div className="content-center place-self-center">{extension.icon}</div>
            <div className="ml-3">
                <div className="font-bold scale-y-125 whitespace-nowrap">{extension.name} QA extension</div>
                <div className="text-xs">Updated on {beautifyDate(inAppExtnInfo.updated)}</div>
                <div className="text-xs">{inAppExtnInfo.version}</div>
            </div>


            {/* Action buttons */}
            <div className="col-start-2 mt-2 sm:mt-0 flex items-center lg:justify-end space-x-2 text-sm">
                {/* Download button */}
                <a
                    className="p-2 flex items-center whitespace-nowrap rounded hover:bg-blue-100 active:scale-[.97] space-x-0.5"
                    href="https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/dppm-3.4.432_on_2022.03.16-r-chrome.zip"
                    title="Download extension"
                >
                    <IconDownload className="w-6 h-6" strokeWidth={1} />
                    <div className="">Download</div>
                </a>

                {/* Copy link */}
                <button ref={confettiRef} className="p-2 flex items-center whitespace-nowrap rounded hover:bg-blue-100 active:scale-[.97] space-x-0.5"
                    onClick={async () => {
                        await navigator.clipboard.writeText(inAppExtnInfo.url);
                        toastSucceeded('Link copied to clipboard');
                        confetti(confettiRef.current!, confettiConfig);
                    }}
                    title="Copy extension URL to clipboard"
                >
                    <IconClipboard className="w-6 h-6" strokeWidth={1} />
                    <div>Copy link</div>
                </button>
            </div>
        </div>
    );
}

function CurrentVersions() {
    const inAppExtnInfos = useAtomValue(configStateAtom);
    return (
        <div className="flex flex-col justify-center space-y-2">
            {inAppExtnInfos.data?.chrome && <CurrentVersion extension={extensionChAtom} inAppExtnInfo={inAppExtnInfos.data.chrome} />}
            {inAppExtnInfos.data?.firefox && <CurrentVersion extension={extensionFfAtom} inAppExtnInfo={inAppExtnInfos.data.firefox} />}
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
