import { PrimitiveAtom, useAtom } from 'jotai';
import React from 'react';
import { extensionChAtom, extensionFfAtom, LatestExtension } from '../store/store';
import { IconHIDLogo } from './UI/UIIcons';

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
        <div className="h-2 bg-[#002f87]"></div>
    </>);
}

function HeroImage() {
    return (
        <div className="">
            <img className="w-full m-auto object-cover hue-rotate-30" src="./src/assets/frontpage/qa-header.png" alt="hero" />
        </div>
    );
}

function CurrentVersion({extensionAtom}: {extensionAtom: PrimitiveAtom<LatestExtension>}) {
    const [extension] = useAtom(extensionAtom);
    return (
        <div className="px-4 py-3 border">
            <div className="">Current Version {extension.name}</div>
            <div className=""></div>
        </div>
    );
}

function CurrentVersions() {
    return (
        <div className="">
            <CurrentVersion extensionAtom={extensionChAtom}/>
            <CurrentVersion extensionAtom={extensionFfAtom}/>
        </div>
    );
}

function Summary() {
    return (
        <div className="">
            Summary
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
            <div className="m-auto w-3/4">
                <HeroImage />
                <CurrentVersions />
                <Summary />
                <PrevVersion />
                <Conclusion />
            </div>
        </div>
    );
}

export default Frontpage;
