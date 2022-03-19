import React from 'react';
import { AppHeader } from './AppHeader';
import { HeroSection } from './sections/HeroSection';
import { ReleaseNotes } from './sections/ReleaseNotes';
import { VersionSummary } from './sections/VersionSummary';
import { PreviousVersions } from './sections/PreviousVersions';
import { Conclusion } from './sections/Conclusion';
import { QATestApps } from './sections/QATestApps';

export function SectionHeader({ children }: React.HTMLAttributes<HTMLElement>) {
    return (
        <section className="text-[#003f82] text-xl font-semibold uppercase tracking-tighter border-b border-[#003f82]">
            {children}
        </section>
    );
}

export function Frontpage() {
    return (
        <div className="h-screen flex flex-col">
            <AppHeader />
            <div className="flex-1 overflow-y-auto" style={{overflow: 'overlay'}}>
                <div className="m-auto max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl flex flex-col space-y-4">
                {/* <div className="m-auto w-4/5 flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80vw] flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4" style={{ overflow: 'hidden', scrollbarGutter: 'stable' }}> */}
                {/* <div className="ml-[calc(20vw/2)] mr-[calc(calc(20vw/2)-16px)] max-w-3xl flex flex-col space-y-4"> */}
                {/* <div className="ml-[calc(20vw/2)] mr-auto max-w-3xl flex flex-col space-y-4"> */}
                    <HeroSection />
                    <ReleaseNotes />
                    <VersionSummary />
                    <PreviousVersions />
                    <QATestApps />
                    <Conclusion />
                </div>
            </div>
        </div>
    );
}
