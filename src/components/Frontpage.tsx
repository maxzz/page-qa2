import React from 'react';
import { AppHeader } from './AppHeader';
import { HeroSection } from './sections/HeroSection';
import { ReleaseNotes } from './sections/ReleaseNotes';
import { VersionSummary } from './sections/VersionSummary';
import { PreviousVersions } from './sections/PreviousVersions';
import { Conclusion } from './sections/Conclusion';

export function SectionHeader({ children }: React.HTMLAttributes<HTMLElement>) {
    return (
        <section className="text-[#003f82] text-xl font-semibold uppercase tracking-tighter">
            {children}
        </section>
    );
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
