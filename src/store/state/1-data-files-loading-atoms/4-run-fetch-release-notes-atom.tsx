import { atom } from "jotai";
import { toastError } from "@/components/ui/UiToaster";
import { fetchReleaseNotes, regexMarkdownPublicVersions } from "@/store/apis";
import { marked } from "marked";
import { loadingStateReleaseNotesAtom, publicVersionsAtom } from "./0-atoms";
import { correlateAtom } from './1-correlate-atom';

export const runFetchReleaseNotesAtom = atom(
    null,
    (_get, set) => {
        fetchDataRn();

        async function fetchDataRn() {
            set(loadingStateReleaseNotesAtom, { loading: true, error: null, data: null });
            try {
                const notesText = await fetchReleaseNotes();
                const markdown = await marked(notesText);
                set(publicVersionsAtom, [...notesText.matchAll(regexMarkdownPublicVersions)].map((match) => match[1]));
                set(loadingStateReleaseNotesAtom, { loading: false, error: null, data: markdown });
            } catch (error) {
                set(loadingStateReleaseNotesAtom, { loading: false, error, data: null });
                set(publicVersionsAtom, undefined);
                toastError((error as Error).message);
            }
            set(correlateAtom);
        }
    }
);

runFetchReleaseNotesAtom.onMount = (runFetch) => runFetch();
