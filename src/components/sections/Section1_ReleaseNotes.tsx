import React from 'react';
import { useAtomValue } from 'jotai';
import { releaseNotesAtom } from '../../store/store';
import './markdown.scss';

export function Section1_ReleaseNotes() {
    const releaseNotes = useAtomValue(releaseNotesAtom);
    return (
        <div className="py-2">
            <div className="notes max-h-96 px-4 overflow-y-auto bg-slate-100" dangerouslySetInnerHTML={{ __html: releaseNotes }} />
        </div>
    );
}
