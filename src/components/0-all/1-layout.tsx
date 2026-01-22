import { AppHeader } from '../1-header';
import { Section } from '../ui/01-section';
import { Section0_HeroSection, Section1_ReleaseNotes, Section2_CurrentVersions, Section3_Archive, Section4_TestApps, Section5_FinalNotes } from '../2-main/sections';
import { Section6_Footer_Spacer } from '../3-footer';
import { appSettings } from '@/store/state/0-app-settings';

export function Frontpage() {
    return (
        <div className="min-h-full overflow-hidden bg-slate-50">
            <div className="h-screen flex flex-col text-[#001845]">

                <AppHeader />

                <div className="flex-1 overflow-y-auto" style={{ overflow: 'overlay' }}>
                    {/* <div className="m-auto w-4/5 flex flex-col space-y-4"> */}
                    {/* <div className="m-auto max-w-[80vw] flex flex-col space-y-4"> */}
                    {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4"> */}
                    {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4" style={{ overflow: 'hidden', scrollbarGutter: 'stable' }}> */}
                    {/* <div className="ml-[calc(20vw/2)] mr-[calc(calc(20vw/2)-16px)] max-w-3xl flex flex-col space-y-4"> */}
                    {/* <div className="ml-[calc(20vw/2)] mr-auto max-w-3xl flex flex-col space-y-4"> */}

                    <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4">
                        <Section0_HeroSection />

                        <Section state={appSettings} name="open1" title={"Release Notes"}>
                            <Section1_ReleaseNotes />
                        </Section>

                        <Section state={appSettings} name="open2" title={"Current versions"}>
                            <Section2_CurrentVersions />
                        </Section>

                        <Section state={appSettings} name="open3" title={<div title="Previously released extensions">Archive</div>}>
                            <Section3_Archive />
                        </Section>

                        <Section state={appSettings} name="open4" title={"Test Applications for QA"}>
                            <Section4_TestApps />
                        </Section>

                        <Section state={appSettings} name="open5" title={"Final notes"}>
                            <Section5_FinalNotes />
                        </Section>

                        <Section6_Footer_Spacer />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
