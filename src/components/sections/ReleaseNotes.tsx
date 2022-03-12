import React, { Suspense } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { releaseNotesAtom, releaseNotesOpenAtom, releaseNotesStateAtom, runFetchAtom } from '../../store/store';
import { marked } from 'marked';
import { fetchReleaseNotes } from '../../store/utils/utils-release-notes';
import { UISectionPane } from '../UI/UISectionPane';
import { UIAccordion } from '../UI/UIAccordion';
import './markdown.scss';

// const renderer = {
//     heading(text: string, level: number) {
//         const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
//         return `
//             <h${level}>
//                 <a name="${escapedText}" class="anchor" href="#${escapedText}">
//                     <span class="header-link">#</span>
//                 </a>
//                 ${text}
//             </h${level}>
//         `;
//     }
// };
// marked.use({ renderer });

export function ReleaseNotes() {
    const [open, setOpen] = useAtom(releaseNotesOpenAtom);
    const [releaseNotes, setReleaseNotes] = useAtom(releaseNotesAtom);
    const state = useAtomValue(releaseNotesStateAtom);
    const [_runFetch, setRunFetch] = useAtom(runFetchAtom);

    return (<div>
        <UISectionPane open={open} onClick={(event) => {
            if (!(event.target as HTMLElement)?.classList.contains('reload-button')) {
                setOpen(v => !v)
            }
        }}>
            <div className="flex-1 flex items-center justify-between">
                <div className="">
                    Release Notes
                </div>
                <button className="reload-button inline-block mr-4 px-2 py-1 text-xs normal-case border-slate-600 border rounded active:scale-x-[.97]" onClick={setRunFetch}>
                    Reload
                </button>
            </div>
        </UISectionPane>
        <UIAccordion toggle={open}>
            <div className="notes max-h-96 px-4 overflow-y-auto text-slate-900 bg-slate-100">
                <div dangerouslySetInnerHTML={{ __html: releaseNotes }} />
            </div>
        </UIAccordion>
    </div>);
}
