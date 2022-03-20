import React from 'react';
import { AppHeader } from './AppHeader';
import { Section0HeroSection } from './sections/Section0HeroSection';
import { Section1ReleaseNotes } from './sections/Section1ReleaseNotes';
import { Section2CurrentVersions } from './sections/Section2CurrentVersions';
import { Section3Archive } from './sections/Section3Archive';
import { Section5Conclusion } from './sections/Section5Conclusion';
import { Section4TestApps } from './sections/Section4TestApps';

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
                    <Section0HeroSection />
                    <Section1ReleaseNotes />
                    <Section2CurrentVersions />
                    <Section3Archive />
                    <Section4TestApps />
                    <Section5Conclusion />
                </div>
            </div>
        </div>
    );
}
