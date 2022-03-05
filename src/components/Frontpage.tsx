import React from 'react';

function Header() {
    return (
        <div className="p-4 flex items-center justify-between bg-orange-300 shadow-sm">
            <div className="text-2xl tracking-tighter font-light text-orange-500 uppercase scale-y-125" style={{ textShadow: '1px 1px 2px #ffffffa0' }}>QA Extensions</div>
            <img src="./src/assets/traytools.png" alt="logo" />
        </div>
    );
}

function HeroImage() {
    return (
        <div className="">
            <img className="w-auto max-h-24 m-auto object-cover" src="./src/assets/frontpage/qa-header.png" alt="hero" />
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
            <HeroImage />
            <Summary />
            <PrevVersion />
            <Conclusion />
        </div>
    );
}

export default Frontpage;
