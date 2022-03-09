import { PrimitiveAtom, useAtom } from 'jotai';
import React from 'react';
import { extensionChAtom, extensionFfAtom, LatestExtension } from '../store/store';
import { ReleaseNotes } from './sections/ReleaseNotes';
import { ReleaseNotes as ReleaseNotes1 } from './sections/ReleaseNotes1';
import { IconHIDLogo } from './UI/UIIcons';
import HERO_IMAGE from '../assets/frontpage/qa-header.png';

const textShadow = { textShadow: '1px 1px 2px #ffffffa0' };
function Header() {
    return (<>
        <div className="p-4 flex items-center justify-between bg-[#003f82] shadow-sm">
            <div className="flex items-center space-x-2">
                {/* <img src="./src/assets/traytools.png" alt="logo" /> */}
                <div className="w-28 px-3 py-2 flex items-center justify-center bg-white rounded-md">
                    <IconHIDLogo className="leading-6" fill="#002f87" />
                </div>
                <div className="pb-1 text-2xl tracking-tighter font-light text-slate-100 uppercase scale-y-150 whitespace-nowrap" style={textShadow}>
                    QA Extensions
                </div>
            </div>
            <div className="text-lg tracking-tighter font-light text-slate-100 uppercase scale-y-90 flex items-center" style={textShadow}>
                <ul className="flex items-center space-x-2">
                    <li>Current</li>
                    <li>Summary</li>
                    <li>History</li>
                    <li>Notes</li>
                </ul>
            </div>
        </div>
        <div className="h-1 bg-[#002f87]"></div>
    </>);
}

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
        <div className="px-4 py-3 border rounded">
            <div className="flex items-center space-x-3">
                {extension.icon}
                <div className="">
                    <div className="font-bold scale-y-125 whitespace-nowrap">{extension.name} QA extension</div>
                    <div className="text-sm">{extension.version}</div>
                </div>
            </div>

            {/* <IconCrLogo className="w-12 h-12" />
            <IconFfLogo className="w-12 h-12" />
            <IconMsLogo className="w-12 h-12" /> */}
            <div className="flex items-center justify-end space-x-2 text-sm">
                <div className="px-2 py-0.5 underline">Copy URL</div>
                <div className="px-2 py-0.5 underline">Install</div>
            </div>
        </div>
    );
}

function CurrentVersions() {
    return (
        <div className="flex flex-col justify-evenly">
            <CurrentVersion extensionAtom={extensionChAtom} />
            <CurrentVersion extensionAtom={extensionFfAtom} />
        </div>
    );
}

function HeroSection() {
    return (
        <div className="mt-4 grid grid-cols-[minmax(8rem,1fr),minmax(8rem,32rem)] gap-4">
            <HeroImage />
            <CurrentVersions />
        </div>
    );
}

function SectionHeader({ children }: React.HTMLAttributes<HTMLElement>) {
    return (
        <section>
            {children}
        </section>
    );
}

function Summary() {
    return (
        <SectionHeader>
            <div className="font-bold">Summary</div>
        </SectionHeader>
    );
}

function ReleaseHistory() {
    return (
        <div className="">
            Release History
        </div>
    );
}

function PrevVersion() {
    return (
        <div className="">
            previous extension versions
        </div>
    );
}

function Conclusion() {
    return (
        <div className="">
            <p>Browser extensions installation instructions</p>
            <p>The documents are on the Crossmatch Confluence web site.</p>

            <div className="h2">Check for duplicates</div>
            <p>
                Only one the DigitalPersona extension can run at the same time in the same browser.
                After finishing (or before starting) installation of the DigitalPersona extension,
                make sure that any previous versions of extension are uninstalled.
            </p>
        </div>
    );
}

function Frontpage() {
    return (
        <div>
            <Header />
            <div className="m-auto max-w-[80%] flex flex-col space-y-2">
                <HeroSection />
                <ReleaseNotes />
                <ReleaseNotes1 />
                <ReleaseHistory />
                <Summary />
                <PrevVersion />
                <Conclusion />
            </div>
        </div>
    );
}

export default Frontpage;
