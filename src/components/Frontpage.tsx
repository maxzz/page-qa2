import React from 'react';
import { AppHeader } from './AppHeader';
import { Section0_HeroSection } from './sections/Section0_HeroSection';
import { Section1_ReleaseNotes } from './sections/Section1_ReleaseNotes';
import { Section2_CurrentVersions } from './sections/Section2_CurrentVersions';
import { Section3_Archive } from './sections/Section3_Archive';
import { Section5_Conclusion } from './sections/Section5_Conclusion';
import { Section4_TestApps } from './sections/Section4_TestApps';

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
                <div className="m-auto max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4">
                {/* <div className="m-auto w-4/5 flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80vw] flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4" style={{ overflow: 'hidden', scrollbarGutter: 'stable' }}> */}
                {/* <div className="ml-[calc(20vw/2)] mr-[calc(calc(20vw/2)-16px)] max-w-3xl flex flex-col space-y-4"> */}
                {/* <div className="ml-[calc(20vw/2)] mr-auto max-w-3xl flex flex-col space-y-4"> */}
                    <Section0_HeroSection />
                    <Section1_ReleaseNotes />
                    <Section2_CurrentVersions />
                    <Section3_Archive />
                    <Section4_TestApps />
                    <Section5_Conclusion />
                </div>
            </div>
        </div>
    );
}
