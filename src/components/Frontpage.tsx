import React from 'react';
import { AppHeader } from './AppHeader';
import { Section } from './sections/Section';
import { section1_OpenReleaseNotesAtom, section2_OpenCurrentVersionsAtom, section3_OpenArchiveAtom, section4_OpenTestAppsAtom, section5_OpenFinalNotestom } from '@/store/store';
import { Section0_HeroSection } from './sections/Section0_HeroSection';
import { Section1_ReleaseNotes } from './sections/Section1_ReleaseNotes';
import { Section2_CurrentVersions } from './sections/Section2_CurrentVersions';
import { Section3_Archive } from './sections/Section3_Archive';
import { Section4_TestApps } from './sections/Section4_TestApps';
import { Section5_FinalNotes } from './sections/Section5_FinalNotes';
import { Section6_Footer } from './sections/Section6_Footer';

export function Frontpage() {
    return (
        <div className="h-screen flex flex-col text-[#001845]">
            <AppHeader />
            <div className="flex-1 overflow-y-auto" style={{ overflow: 'overlay' }}>
                <div className="m-auto max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4">
                    {/* <div className="m-auto w-4/5 flex flex-col space-y-4"> */}
                    {/* <div className="m-auto max-w-[80vw] flex flex-col space-y-4"> */}
                    {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4"> */}
                    {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4" style={{ overflow: 'hidden', scrollbarGutter: 'stable' }}> */}
                    {/* <div className="ml-[calc(20vw/2)] mr-[calc(calc(20vw/2)-16px)] max-w-3xl flex flex-col space-y-4"> */}
                    {/* <div className="ml-[calc(20vw/2)] mr-auto max-w-3xl flex flex-col space-y-4"> */}

                    <Section0_HeroSection />

                    <Section openAtom={section1_OpenReleaseNotesAtom} title={"Release Notes"}>
                        <Section1_ReleaseNotes />
                    </Section>

                    <Section openAtom={section2_OpenCurrentVersionsAtom} title={"Current verions"}>
                        <Section2_CurrentVersions />
                    </Section>

                    <Section openAtom={section3_OpenArchiveAtom} title={<div title="Previously released extensions">Archive</div>}>
                        <Section3_Archive />
                    </Section>

                    <Section openAtom={section4_OpenTestAppsAtom} title={"Test Applications for QA"}>
                        <Section4_TestApps />
                    </Section>

                    <Section openAtom={section5_OpenFinalNotestom} title={"Final notes"}>
                        <Section5_FinalNotes />
                    </Section>

                    <Section6_Footer />
                </div>
            </div>
        </div>
    );
}
