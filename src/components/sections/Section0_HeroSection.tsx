import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { extInfosStateAtom } from '@/store/store';
import { InAppExtnInfo } from '@/store/utils/utils-current-config';
import { toast } from '../UI/UiToaster';
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

function HeroImage() {
    return (
        <div className="">
            <img className="h-full object-cover grayscale" src={HERO_IMAGE} alt="hero" />
        </div>
    );
}

const boxShadow = {
    boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)'
};

function CurrentVersion({ extension, inAppExtnInfo }: { extension: LatestExtension, inAppExtnInfo: InAppExtnInfo; }) {
    const confettiRef = React.useRef<HTMLDivElement>(null);
    return (
        <div className="px-4 py-3 border" style={boxShadow}>
            <div className="flex items-center space-x-3">
                {extension.icon}
                <div className="">
                    <div className="font-bold scale-y-125 whitespace-nowrap">{extension.name} QA extension</div>
                    <div className="text-sm">{inAppExtnInfo.version}</div>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2 text-sm">
                <a
                    className="p-2 cursor-pointer flex items-center whitespace-nowrap rounded hover:bg-blue-100 active:scale-[.97] space-x-0.5"
                    href="https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/dppm-3.4.432_on_2022.03.16-r-chrome.zip"
                    title="Download extension"
                >
                    <IconDownload className="w-6 h-6" strokeWidth={1} />
                    <div className="">Download</div>
                </a>
                <div ref={confettiRef} className="p-2 cursor-pointer flex items-center whitespace-nowrap rounded hover:bg-blue-100 active:scale-[.97] space-x-0.5"
                    onClick={async () => {
                        await navigator.clipboard.writeText('here');
                        toast('copied to clipboard');
                        confetti(confettiRef.current!, confettiConfig);
                    }}
                    title="Copy URL to clipboard"
                >
                    <IconClipboard className="w-6 h-6" strokeWidth={1} />
                    <div className="">Copy link</div>
                </div>
            </div>
        </div>
    );
}

function CurrentVersions() {
    const inAppExtnInfos = useAtomValue(extInfosStateAtom);
    return (
        <div className="flex flex-col justify-center space-y-2">
            {inAppExtnInfos.data?.chrome && <CurrentVersion extension={extensionChAtom} inAppExtnInfo={inAppExtnInfos.data.chrome}/>}
            {inAppExtnInfos.data?.firefox && <CurrentVersion extension={extensionFfAtom} inAppExtnInfo={inAppExtnInfos.data.firefox}/>}
        </div>
    );
}

export function Section0_HeroSection() {
    return (
        <div className="mt-4 grid grid-cols-[minmax(8rem,1fr),minmax(8rem,32rem)] gap-4">
            <HeroImage />
            <CurrentVersions />
        </div>
    );
}
