import { atom } from 'jotai';
import { runFetchConfigAtom } from './2-run-fetch-config-atom';
import { runFetchArchiveAtom } from './3-run-fetch-archive-atom';
import { runFetchReleaseNotesAtom } from './4-run-fetch-release-notes-atom';

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchReleaseNotesAtom);
        get(runFetchArchiveAtom);
        get(runFetchConfigAtom);
    }
);
