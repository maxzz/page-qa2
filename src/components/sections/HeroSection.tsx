import React from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { extensionChAtom, extensionFfAtom, LatestExtension } from '@/store/store';
import HERO_IMAGE from '@/assets/frontpage/qa-header.png';

function HeroImage() {
    return (
        <div className="flex items-center">
            <img className="object-cover grayscale" src={HERO_IMAGE} alt="hero" />
        </div>
    );
}

function CurrentVersion({ extensionAtom }: { extensionAtom: PrimitiveAtom<LatestExtension>; }) {
    const [extension] = useAtom(extensionAtom);
    return (
        <div className="px-4 py-3 border" style={{
            boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)'
        }}>
            <div className="flex items-center space-x-3">
                {extension.icon}
                <div className="">
                    <div className="font-bold scale-y-125 whitespace-nowrap">{extension.name} QA extension</div>
                    <div className="text-sm">{extension.version}</div>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2 text-sm">
                <div className="px-2 py-0.5 underline">Copy URL</div>
                <div className="px-2 py-0.5 underline">Install</div>
            </div>
        </div>
    );
}

function CurrentVersions() {
    return (
        <div className="flex flex-col justify-evenly space-y-2">
            <CurrentVersion extensionAtom={extensionChAtom} />
            <CurrentVersion extensionAtom={extensionFfAtom} />
        </div>
    );
}

export function HeroSection() {
    return (
        <div className="mt-4 grid grid-cols-[minmax(8rem,1fr),minmax(8rem,32rem)] gap-4">
            <HeroImage />
            <CurrentVersions />
        </div>
    );
}
