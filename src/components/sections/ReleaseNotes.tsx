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
    const [state, setState] = useAtom(releaseNotesStateAtom);
    //useAtomValue(runFetchAtom);


    // React.useEffect(() => {
    //     async function get() {
    //         try {
    //             setReleaseNotes(marked(await fetchReleaseNotes()));
    //         } catch (error) {
    //             console.log('error', error);
    //         }
    //     }
    //     get();
    // }, []);

    return (<>
        <UISectionPane open={open} onClick={() => setOpen(v => !v)}>
            Release Notes
        </UISectionPane>
        <UIAccordion toggle={open}>
            <div className="notes max-h-96 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: releaseNotes }} />
            </div>
        </UIAccordion>
    </>);
}
