import { useAtom } from 'jotai';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { releaseNotesAtom } from '../../store/store';
import { fetchReleaseNotes } from '../../store/utils/utils-release-notes';
import './markdown.scss';

const md = `### Release --------- Notes Just a link: https://reactjs.com
Some *emphasis* and <strong>strong</strong>!
`;

export function ReleaseNotes() {
    const [releaseNotes, setReleaseNotes] = useAtom(releaseNotesAtom);

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
        <div className="notes">
            <ReactMarkdown children={releaseNotes} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />
        </div>
    );
}
