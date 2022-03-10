import { useAtom } from 'jotai';
import React from 'react';
//import * as markdown from "markdown-wasm";
import { releaseNotesAtom } from '../../store/store';
import { fetchReleaseNotes } from '../../store/utils/utils-release-notes';
import './markdown.scss';

//await markdown.init();

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

                //debugger
                // const n = await markdown.parse(notes);
                // console.log('n', n);

            } catch (error) {
                console.log('error', error);
            }
        }
        get();
    }, []);

    return (
        <div className="notes">
            notes
        </div>
    );
}
