import { useAtom } from 'jotai';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { releaseNotesAtom, releaseNotesOpenAtom } from '../../store/store';
import { fetchReleaseNotes } from '../../store/utils/utils-release-notes';
import './markdown.scss';
import { UIListTransition } from '../UI/UIListTransition';
import { UISectionPane } from '../UI/UISectionPane';
import { UIAccordion } from '../UI/UIAccordion';

const md = `### Release --------- Notes Just a link: https://reactjs.com
Some *emphasis* and <strong>strong</strong>!
`;

export function ReleaseNotes() {
    const [releaseNotes, setReleaseNotes] = useAtom(releaseNotesAtom);
    const [open, setOpen] = useAtom(releaseNotesOpenAtom);

    React.useEffect(() => {
        async function get() {
            try {
                const notes = await fetchReleaseNotes();
                setReleaseNotes(notes);
            } catch (error) {
                console.log('error', error);
            }
        }
        get();
    }, []);

    return (
        <>
            <UISectionPane open={open} onClick={() => setOpen(v => !v)}>
                Release Notes
            </UISectionPane>
            <UIAccordion toggle={open}>
                <div className="notes max-h-96 overflow-y-auto">
                    <ReactMarkdown children={releaseNotes} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />
                </div>
            </UIAccordion>
        </>
    );
}
