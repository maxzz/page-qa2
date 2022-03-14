import React from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { AppHeader } from './AppHeader';
import { HeroSection } from './sections/HeroSection';
import { ReleaseNotes } from './sections/ReleaseNotes';


// export function ReleaseNotes() {
//     const [open, setOpen] = React.useState(releaseNotesOpenAtom);

//     React.useEffect(() => {
//         async function get() {
//             try {
//                 setReleaseNotes(marked(await fetchReleaseNotes()));
//             } catch (error) {
//                 console.log('error', error);
//             }
//         }
//         get();
//     }, []);

//     return (<>
//         <UISectionPane open={open} onClick={() => setOpen(v => !v)}>
//             Release Notes
//         </UISectionPane>
//         <UIAccordion toggle={open}>
//             <div className="notes max-h-96 overflow-y-auto">
//                 <div dangerouslySetInnerHTML={{ __html: releaseNotes }} />
//             </div>
//         </UIAccordion>
//     </>);
// }


function SectionHeader({ children }: React.HTMLAttributes<HTMLElement>) {
    return (
        <section className="font-bold">
            {children}
        </section>
    );
}

function Summary() {
    return (
        <SectionHeader>
            <div className="">Current verions summary table</div>
        </SectionHeader>
    );
}

function PreviousVersions() {
    return (
        <SectionHeader>
            Previously released extensions
        </SectionHeader>
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
            <div className="m-auto max-w-[80%] flex flex-col space-y-2">
                <HeroSection />
                <ReleaseNotes />
                <Summary />
                <PreviousVersions />
                <Conclusion />
            </div>
        </div>
    );
}
