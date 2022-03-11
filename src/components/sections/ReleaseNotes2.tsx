import { useAtom } from 'jotai';
import React from 'react';
import { releaseNotesAtom, releaseNotesOpenAtom } from '../../store/store';
import { fetchReleaseNotes } from '../../store/utils/utils-release-notes';
import './markdown.scss';
import { UIListTransition } from '../UI/UIListTransition';
import { UISectionPane } from '../UI/UISectionPane';
import { UIAccordion } from '../UI/UIAccordion';
import {marked} from 'marked';

const md = `### Release --------- Notes Just a link: https://reactjs.com
Some *emphasis* and <strong>strong</strong>!
`;

const getMarkdownText = () => {
    const rawMarkup = marked("This is _Markdown_.", { sanitize: true   });
    return { __html: rawMarkup };
  };


export function ReleaseNotes2() {
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
                <div dangerouslySetInnerHTML={getMarkdownText()} />
                </div>
            </UIAccordion>
        </>
    );
}
