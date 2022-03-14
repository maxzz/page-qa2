import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { releaseNotesAtom, releaseNotesOpenAtom, releaseNotesStateAtom, runFetchReleaseNotesAtom } from '../../store/store';
import { UISectionPane } from '../UI/UISectionPane';
import { UIAccordion } from '../UI/UIAccordion';
import './markdown.scss';

export function ReleaseNotes() {
    const [open, setOpen] = useAtom(releaseNotesOpenAtom);
    const [releaseNotes, setReleaseNotes] = useAtom(releaseNotesAtom);
    const state = useAtomValue(releaseNotesStateAtom);
    const setRunFetch = useUpdateAtom(runFetchReleaseNotesAtom);

    return (<div>
        <UISectionPane open={open}
            onClick={(event) => {
                if (!(event.target as HTMLElement)?.classList.contains('reload-button')) {
                    setOpen(v => !v);
                }
            }}
        >
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
