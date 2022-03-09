import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown.scss';

const md = `### Release --------- Notes Just a link: https://reactjs.com
Some *emphasis* and <strong>strong</strong>!
`;

export function ReleaseNotes() {
    return (
        <div className="notes">
            <ReactMarkdown children={md} remarkPlugins={[remarkGfm]} />
        </div>
    );
}
