import { useAtom } from 'jotai';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { releaseNotesAtom } from '../../store/store';
import { fetchReleaseNotes } from '../../store/utils/utils-release-notes';
import './markdown.scss';

const md = `### Release --------- Notes Just a link: https://reactjs.com
Some *emphasis* and <strong>strong</strong>!
`;

export function ReleaseNotes() {
    const [releaseNotes] = useAtom(releaseNotesAtom);

    React.useEffect(() => {
        async function get() {
            try {
                await fetchReleaseNotes();
            } catch (error) {
                console.log('error', releaseNotes);
            }
        }
        get();
        console.log(releaseNotes);
    }, []);

    return (
        <div className="notes">
            <ReactMarkdown children={md} remarkPlugins={[remarkGfm]} />
        </div>
    );
}
