import React from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { AppHeader } from './AppHeader';
import { HeroSection } from './sections/HeroSection';
import { ReleaseNotes } from './sections/ReleaseNotes';
import { VersionSummary } from './sections/VersionSummary';
import { PreviousVersions } from './sections/PreviousVersions';

export function SectionHeader({ children }: React.HTMLAttributes<HTMLElement>) {
    return (
        <section className="text-[#003f82] text-xl font-semibold uppercase tracking-tighter">
            {children}
        </section>
    );
}

function Conclusion() {
    return (<>
        <SectionHeader>
            Conclusion
        </SectionHeader>

        <div className="">
            <p className="font-semibold">Browser extensions installation instructions</p>
            <p>The documents are on the Crossmatch Confluence web site.</p>

            <div className="font-semibold">Check for duplicates</div>
            <p>
                Only one the DigitalPersona extension can run at the same time in the same browser.
                After finishing (or before starting) installation of the DigitalPersona extension,
                make sure that any previous versions of extension are uninstalled.
            </p>
        </div>
    </>);
}

export function Frontpage() {
    return (
        <div>
            <AppHeader />
            <div className="m-auto max-w-[80%] flex flex-col space-y-4">
                <HeroSection />
                <ReleaseNotes />
                <VersionSummary />
                <PreviousVersions />
                <Conclusion />
            </div>
        </div>
    );
}
