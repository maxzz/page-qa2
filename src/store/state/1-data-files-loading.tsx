import { atom } from 'jotai';
import { marked } from 'marked';
import { archiveByYears, areTheSameBrowserBrandQa, selectLatest, getLatestArchiveVersions, isAVersionGreaterB, getArchiveVersion, getCurrentConfig, TBrowserShort, ArchiveExtensionMeta, getExistingOnServer, fetchReleaseNotes, regexMarkdownPublicVersions, FormatCurrentCfg, CurrentExtensions } from '../apis';
import { toastError } from '@/components/ui/UiToaster';
import { configStateAtom, archiveStateAtom, releaseNotesStateAtom, publicVersionsAtom, byYearsAtom, latestChExtensionAtom, latestFfExtensionAtom, summaryExtensionsAtom } from './3-data-atoms';
import { LoadingDataState } from '@/hooks/atomsX';

const runFetchConfigAtom = atom(
    (get) => get(configStateAtom),
    (_get, set) => {
        fetchData();

        async function fetchData() {
            set(configStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                const data = await getCurrentConfig();
                set(configStateAtom, { loading: false, error: null, data });
            } catch (error) {
                set(configStateAtom, { loading: false, error, data: null });
                toastError((error as Error).message);
            }
            set(correlateAtom);
        }
    }
);
runFetchConfigAtom.onMount = (runFetch) => runFetch();

const runFetchArchiveAtom = atom(
    (get) => get(archiveStateAtom),
    (_get, set) => {
        fetchData();

        async function fetchData() {
            set(archiveStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                const existing: ArchiveExtensionMeta[] = await getExistingOnServer();
                set(archiveStateAtom, { loading: false, error: null, data: existing });
            } catch (error) {
                set(archiveStateAtom, { loading: false, error, data: null });
                toastError((error as Error).message);
            }
            set(correlateAtom);
        }
    }
);
runFetchArchiveAtom.onMount = (runFetch) => runFetch();

const runFetchReleaseNotesAtom = atom(
    (get) => get(releaseNotesStateAtom),
    (_get, set) => {
        fetchData();

        async function fetchData() {
            set(releaseNotesStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                const notesText = await fetchReleaseNotes();
                const markdown = await marked(notesText);
                set(publicVersionsAtom, [...notesText.matchAll(regexMarkdownPublicVersions)].map((match) => match[1]));
                set(releaseNotesStateAtom, { loading: false, error: null, data: markdown });
            } catch (error) {
                set(releaseNotesStateAtom, { loading: false, error, data: null });
                set(publicVersionsAtom, undefined);
                toastError((error as Error).message);
            }
            set(correlateAtom);
        }
    }
);
runFetchReleaseNotesAtom.onMount = (runFetch) => runFetch();

const correlateAtom = atom(
    null,
    (get, set) => {
        const stateNotes = get(releaseNotesStateAtom);
        const stateArchive = get(archiveStateAtom);
        const stateConfig = get(configStateAtom);

        if (stateNotes.loading || stateArchive.loading || stateConfig.loading) {
            return;
        }

        // 1. Combine extensions list with published information.
        const publicVersions = get(publicVersionsAtom);
        const byYears = archiveByYears(stateArchive.data, publicVersions);
        set(byYearsAtom, byYears);

        // // 2. Update stale config versions with the latest from FTP.
        // const latestArchive = getLatestArchiveVersions(stateArchive.data);

        // if (!stateConfig.data || !stateArchive.data) {
        //     return;
        // }

        // // 2.1. Update 'Current Versions'
        // const latestPublicStr = publicVersions?.[0];
        // const latestPublic = getArchiveVersion(stateArchive.data, latestPublicStr);

        // if (latestPublic) {
        //     const lookupFor = {
        //         brand: FormatCurrentCfg.TBrand.dp,
        //         browser: TBrowserShort.chrome, // No need this for Firefox at least now.
        //         qa: false
        //     };
        //     stateConfig.data.summary = stateConfig.data.summary.map(
        //         (item) => {
        //             const found = areTheSameBrowserBrandQa(item, lookupFor) && isAVersionGreaterB(latestPublicStr, item.version);
        //             if (found) {
        //                 item.version = latestPublic.version;
        //                 item.updated = latestPublic.updated;
        //             }
        //             return item;
        //         }
        //     );
        // }

        const res = updateCurrentVersions(publicVersions, stateArchive, stateConfig);
        if (res) {
            set(latestChExtensionAtom, res._latestChExtension);
            set(latestFfExtensionAtom, res._latestFfExtension);
            set(summaryExtensionsAtom, res._summaryExtensions);
        }

        // // 2.2. Update and apply 'QA latest'
        // set(latestChExtensionAtom, selectLatest(stateConfig.data.chrome, latestArchive.ch));
        // set(latestFfExtensionAtom, selectLatest(stateConfig.data.firefox, latestArchive.ff));

        // // 2.3. Apply 'Current Versions'
        // set(summaryExtensionsAtom, stateConfig.data.summary);
    }
);

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchReleaseNotesAtom);
        get(runFetchArchiveAtom);
        get(runFetchConfigAtom);
    }
);

function updateCurrentVersions(
    publicVersions: string[] | undefined,
    stateArchive: LoadingDataState<ArchiveExtensionMeta[]>,
    stateConfig: LoadingDataState<CurrentExtensions>
) {
    if (!stateConfig.data || !stateArchive.data) {
        return;
    }

    // 2. Update stale config versions with the latest from FTP.
    const latestArchive = getLatestArchiveVersions(stateArchive.data);

    const latestPublicStr = publicVersions?.[0];
    const latestPublic = getArchiveVersion(stateArchive.data, latestPublicStr);

    if (latestPublic) {
        const lookupFor = {
            brand: FormatCurrentCfg.TBrand.dp,
            browser: TBrowserShort.chrome, // No need this for Firefox at least now.
            qa: false
        };
        stateConfig.data.summary = stateConfig.data.summary.map(
            (item) => {
                const found = areTheSameBrowserBrandQa(item, lookupFor) && isAVersionGreaterB(latestPublicStr, item.version);
                if (found) {
                    item.version = latestPublic.version;
                    item.updated = latestPublic.updated;
                }
                return item;
            }
        );
    }

    // 2.2. Update and apply 'QA latest'
    const _latestChExtension = selectLatest(stateConfig.data.chrome, latestArchive.ch);
    const _latestFfExtension = selectLatest(stateConfig.data.firefox, latestArchive.ff);

    // 2.3. Apply 'Current Versions'
    const _summaryExtensions = stateConfig.data.summary;

    return { _latestChExtension, _latestFfExtension, _summaryExtensions };


    // // 2.2. Update and apply 'QA latest'
    // set(latestChExtensionAtom, selectLatest(stateConfig.data.chrome, latestArchive.ch));
    // set(latestFfExtensionAtom, selectLatest(stateConfig.data.firefox, latestArchive.ff));

    // // 2.3. Apply 'Current Versions'
    // set(summaryExtensionsAtom, stateConfig.data.summary);
}
