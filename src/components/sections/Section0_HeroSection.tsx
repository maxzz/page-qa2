import React from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { extensionChAtom, extensionFfAtom, LatestExtension } from '@/store/store';
import HERO_IMAGE from '@/assets/frontpage/qa-header.jpg';
import { toast } from '../UI/UiToaster';
import { confetti } from 'dom-confetti';

const confettiConfig = {
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

function CurrentVersion({ extensionAtom }: { extensionAtom: PrimitiveAtom<LatestExtension>; }) {
    const [extension] = useAtom(extensionAtom);
    const confettiRef = React.useRef<HTMLDivElement>(null);
    return (
        <div className="px-4 py-3 border" style={boxShadow}>
            <div className="flex items-center space-x-3">
                {extension.icon}
                <div className="">
                    <div className="font-bold scale-y-125 whitespace-nowrap">{extension.name} QA extension</div>
                    <div className="text-sm">{extension.version}</div>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2 text-sm">
                <a
                    className="px-2 py-0.5 uppercase underline"
                    href="https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/dppm-3.4.432_on_2022.03.16-r-chrome.zip"
                >
                    Download
                </a>
                <div ref={confettiRef} className="px-2 py-0.5 uppercase underline cursor-pointer confe"
                    onClick={async () => {
                        await navigator.clipboard.writeText('here');
                        toast('copied to clipboard');
                        confetti(confettiRef.current!, confettiConfig);
                    }}
                >
                    Copy URL
                </div>
            </div>
        </div>
    );
}

function CurrentVersions() {
    return (
        <div className="flex flex-col justify-center space-y-2">
            <CurrentVersion extensionAtom={extensionChAtom} />
            <CurrentVersion extensionAtom={extensionFfAtom} />
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
