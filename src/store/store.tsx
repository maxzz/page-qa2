import { atom, Getter } from 'jotai';
import { atomWithCallback, LoadingDataState, loadingDataStateInit } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';
import { marked } from 'marked';
import { CurrentExtensions, getCurrentConfig, InAppExtnInfo } from './apis/file-current-config';
import { fetchReleaseNotes } from './apis/file-release-notes';
import { ArchiveExtensionMeta, getExistingOnServer, ReleaseType } from './apis/file-archive';
import { toastError } from '@/components/UI/UiToaster';
import { archiveByYears, getLatestArchiveVersions, isAVersionGreaterB, OneYearExts } from './apis/file-archive-parse';
import { getArchiveExtensionUrl, regexMarkdownPublicVersions } from './apis/constants';
import { TBrowserShort } from './apis/api-formats-g01';

//#region LocalStorage

namespace Storage {
    const KEY = 'react-page-qa2-01';

    type Store = {
        open1: boolean;
        open2: boolean;
        open3: boolean;
        open4: boolean;
        open5: boolean;
    };

    export let initialData: Store = {
        open1: false,
        open2: false,
        open3: false,
        open4: false,
        open5: false,
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = { ...initialData, ...obj };
            } catch (error) {
            }
        }
    }
    load();

    export const save = debounce(function _save(get: Getter) {
        let newStore: Store = {
            open1: get(section1_OpenAtom),
            open2: get(section2_OpenAtom),
            open3: get(section3_OpenAtom),
            open4: get(section4_OpenAtom),
            open5: get(section5_OpenAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

//#endregion LocalStorage

// Data files

//#region ServerCurrentConfig

export const configStateAtom = atom<LoadingDataState<CurrentExtensions>>(loadingDataStateInit());

const runFetchConfigAtom = atom(
    (get) => get(configStateAtom),
    (_get, set) => {
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
        };
        fetchData();
    }
);
runFetchConfigAtom.onMount = (runFetch) => runFetch();

//#endregion ServerCurrentConfig

//#region ServerArchive

const archiveStateAtom = atom<LoadingDataState<ArchiveExtensionMeta[]>>(loadingDataStateInit());

const runFetchArchiveAtom = atom(
    (get) => get(archiveStateAtom),
    (_get, set) => {
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
        };
        fetchData();
    }
);
runFetchArchiveAtom.onMount = (runFetch) => runFetch();

export const byYearsAtom = atom<OneYearExts[]>([]);

//#endregion ServerArchive

//#region ServerReleaseNotes

const releaseNotesStateAtom = atom<LoadingDataState<string>>(loadingDataStateInit());

// const renderer = {
//     heading(text: string, level: number) {
//         const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
//         return `
//             <h${level}>
//                 <a name="${escapedText}" class="anchor" href="#${escapedText}">
//                     <span class="header-link">#</span>
//                 </a>
//                 ${text}
//             </h${level}>
//         `;
//     }
// };
// marked.use({ renderer });

const runFetchReleaseNotesAtom = atom(
    (get) => get(releaseNotesStateAtom),
    (_get, set) => {
        async function fetchData() {
            set(releaseNotesStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                const notesText = await fetchReleaseNotes();
                const markdown = marked(notesText);
                set(publicVersionsAtom, [...notesText.matchAll(regexMarkdownPublicVersions)].map((match) => match[1]));
                set(releaseNotesStateAtom, { loading: false, error: null, data: markdown });
            } catch (error) {
                set(releaseNotesStateAtom, { loading: false, error, data: null });
                set(publicVersionsAtom, undefined);
                toastError((error as Error).message);
            }
            set(correlateAtom);
        };
        fetchData();
    }
);
runFetchReleaseNotesAtom.onMount = (runFetch) => runFetch();

export const releaseNotesAtom = atom<string>((get) => get(releaseNotesStateAtom).data || '');

//#endregion ServerReleaseNotes

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchReleaseNotesAtom);
        get(runFetchArchiveAtom);
        get(runFetchConfigAtom);
    }
);

// Derivative data

export const publicVersionsAtom = atom<string[] | undefined>(undefined); // ['3.4.419', '3.0.386', '3.0.378']

// const latestChAtom = atom<ArchiveExtensionMeta | undefined>(undefined);
// const latestFfAtom = atom<ArchiveExtensionMeta | undefined>(undefined);

export const latestChExtensionAtom = atom<InAppExtnInfo | undefined>(undefined);
export const latestFfExtensionAtom = atom<InAppExtnInfo | undefined>(undefined);
export const summaryExtensionsAtom = atom<InAppExtnInfo[]>([]);

const correlateAtom = atom(
    null,
    (get, set) => {
        const stateNotes = get(releaseNotesStateAtom);
        const stateArchive = get(archiveStateAtom);
        const stateConfig = get(configStateAtom);
        if (stateNotes.loading || stateArchive.loading || stateConfig.loading) {
            return;
        }

        const publicVersions = get(publicVersionsAtom);
        const byYears = archiveByYears(stateArchive.data, publicVersions);
        set(byYearsAtom, byYears);
        //console.log('publicVersions', publicVersions);
        //console.log('byYears', byYears);


        if (stateNotes.error) {
            return;
        }
        if (stateArchive.error) {
            return;
        }
        if (stateConfig.error) {
            return;
        }

        const latestArchive = getLatestArchiveVersions(stateArchive.data);

        if (stateConfig.data && stateArchive.data) {
            const latestConfigCh = stateConfig.data.chrome;
            const latestConfigFf = stateConfig.data.firefox;

            console.log('vvv', isAVersionGreaterB(latestConfigCh.version, latestArchive.ch?.version), 'c:', latestConfigCh, 'a:', latestArchive.ch );
            console.log('vvv', isAVersionGreaterB(latestConfigFf.version, latestArchive.ff?.version), 'c:', latestConfigFf.version, 'a:', latestArchive.ff?.version );

            let newConfigCh = latestConfigCh;
            let newConfigFf = latestConfigFf;

            if (latestArchive.ch && isAVersionGreaterB(latestConfigCh.version, latestArchive.ch.version)) {
                newConfigCh = {...latestConfigCh};
                newConfigCh.version = latestArchive.ch.version;
                newConfigCh.updated = latestArchive.ch.updated;
                newConfigCh.url = getArchiveExtensionUrl(latestArchive.ch.fname);
            }

            set(latestChExtensionAtom, newConfigCh);
            set(latestFfExtensionAtom, newConfigFf);

            set(summaryExtensionsAtom, stateConfig.data.summary);
        }

        // if (publicVersions && stateArchive.data) {
        //     //const archiveMap = Object.fromEntries(archive.data.map((item) => ([item.version, item])));
        //     const archiveMap = stateArchive.data.reduce<Record<string, ArchiveExtensionMeta[]>>((acc, curr) => {
        //         if (!acc[curr.version]) {
        //             acc[curr.version] = [];
        //         }
        //         acc[curr.version].push(curr);
        //         return acc;
        //     }, {});

        //     // console.log('published', archiveMap);
        // }

        //TODO:
        // if (stateArchive.data) {
        //     const reverse = [...stateArchive.data].reverse();
        //     const latestCh = reverse.find((item) => item.browser === TBrowserShort.chrome);
        //     const latestFf = reverse.find((item) => item.browser === TBrowserShort.firefox);

        //     set(latestChAtom, latestCh);
        //     set(latestFfAtom, latestFf);
        // }

        //TODO: split configStateAtom into versions and summary

        // const latestCh = get(latestChAtom);
        // if (latestCh) {
        //     console.log('latestCh', latestCh);
        // }

        // const latestFf = get(latestFfAtom);
        // if (latestFf) {
        //     console.log('latestFf', latestFf);
        // }

        // console.log('ready to rock');
    }
);

// UI state

export const section1_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open1, ({ get }) => Storage.save(get));
export const section2_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open2, ({ get }) => Storage.save(get));
export const section3_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open3, ({ get }) => Storage.save(get));
export const section4_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open4, ({ get }) => Storage.save(get));
export const section5_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open5, ({ get }) => Storage.save(get));
