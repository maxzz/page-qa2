import { atom } from 'jotai';
import { marked } from 'marked';
import { archiveByYears, fetchCurrentConfig, fetchExistingOnServer, fetchReleaseNotes, regexMarkdownPublicVersions, updateCurrentVersions, FilenameMeta } from '../apis';
import { toastError } from '@/components/ui/UiToaster';
import { loadingStateConfigAtom, loadingStateArchiveAtom, loadingStateReleaseNotesAtom, publicVersionsAtom, byYearsAtom, latestChExtensionAtom, latestFfExtensionAtom, summaryExtensionsAtom, loadFailedAtom } from './3-data-atoms';

const runFetchConfigAtom = atom(
    null,
    (_get, set) => {
        fetchDataCo();

        async function fetchDataCo() {
            set(loadingStateConfigAtom, { loading: true, error: null, data: null });
            try {
                const data = await fetchCurrentConfig();
                set(loadingStateConfigAtom, { loading: false, error: null, data });
            } catch (error) {
                set(loadingStateConfigAtom, { loading: false, error, data: null });
                toastError((error as Error).message);
            }
            set(correlateAtom);
        }
    }
);
runFetchConfigAtom.onMount = (runFetch) => runFetch();

const runFetchArchiveAtom = atom(
    null,
    (_get, set) => {
        fetchDataAr();

        async function fetchDataAr() {
            set(loadingStateArchiveAtom, { loading: true, error: null, data: null });
            try {
                const existing: FilenameMeta[] = await fetchExistingOnServer();
                set(loadingStateArchiveAtom, { loading: false, error: null, data: existing });
            } catch (error) {
                set(loadingStateArchiveAtom, { loading: false, error, data: null });
                toastError((error as Error).message);
            }
            set(correlateAtom);
        }
    }
);
runFetchArchiveAtom.onMount = (runFetch) => runFetch();

const runFetchReleaseNotesAtom = atom(
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

const runOnceAtom = atom(false);

const correlateAtom = atom(
    null,
    (get, set) => {
        const stateNotes = get(loadingStateReleaseNotesAtom);
        const stateArchive = get(loadingStateArchiveAtom);
        const stateConfig = get(loadingStateConfigAtom);

        if (stateNotes.loading || stateArchive.loading || stateConfig.loading) {
            return;
        }
        
        const failed = !!stateNotes.error || !!stateArchive.error || !!stateConfig.error;
        set(loadFailedAtom, failed);
        if (failed) {
            return;
        }

        if (get(runOnceAtom)) {
            return;
        }
        set(runOnceAtom, true);

        // 1. Combine extensions list with published information.
        const publicVersions = get(publicVersionsAtom);

        const byYears = archiveByYears(stateArchive.data, publicVersions);
        set(byYearsAtom, byYears);

        // 2. Update stale config versions with the latest from FTP.
        const res = updateCurrentVersions(publicVersions, stateArchive, stateConfig);
        if (res) {
            set(latestChExtensionAtom, res.latestChExtension);
            set(latestFfExtensionAtom, res.latestFfExtension);
            set(summaryExtensionsAtom, res.summaryExtensions);
        }
    }
);

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchReleaseNotesAtom);
        get(runFetchArchiveAtom);
        get(runFetchConfigAtom);
    }
);
