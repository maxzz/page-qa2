import React from 'react';
import { useAtomValue } from 'jotai';
import { releaseNotesAtom, section1_OpenReleaseNotesAtom } from '../../store/store';
import { Section } from './Section';
import './markdown.scss';

export function Body() {
    const releaseNotes = useAtomValue(releaseNotesAtom);
    return (
        <div className="py-2">
            <div className="notes max-h-96 px-4 overflow-y-auto text-slate-900 bg-slate-100">
                <div dangerouslySetInnerHTML={{ __html: releaseNotes }} />
            </div>
        </div>
    );
}

export function Section1_ReleaseNotes() {
    return (
        <Section openAtom={section1_OpenReleaseNotesAtom} title={"Release Notes"}>
            <Body />
        </Section>
    );
}

// export function Section1_ReleaseNotes() {
//     const [open, setOpen] = useAtom(section1_OpenReleaseNotesAtom);
//     const [releaseNotes, setReleaseNotes] = useAtom(releaseNotesAtom);
//     const state = useAtomValue(releaseNotesStateAtom);
//     const setRunFetch = useUpdateAtom(runFetchReleaseNotesAtom);

//     return (<div>
//         <UISectionPane open={open}
//             onClick={(event) => {
//                 if (!(event.target as HTMLElement)?.classList.contains('reload-button')) {
//                     setOpen(v => !v);
//                 }
//             }}
//         >
//             <div className="flex-1 flex items-center justify-between">
//                 <div className="">
//                     Release Notes
//                 </div>
//                 <button className="reload-button inline-block mr-4 px-2 py-1 text-xs normal-case border-slate-600 border rounded active:scale-x-[.97]" onClick={setRunFetch}>
//                     Reload
//                 </button>
//             </div>
//         </UISectionPane>
//         <UIAccordion toggle={open}>
//             <div className="notes max-h-96 px-4 overflow-y-auto text-slate-900 bg-slate-100">
//                 <div dangerouslySetInnerHTML={{ __html: releaseNotes }} />
//             </div>
//         </UIAccordion>
//     </div>);
// }
