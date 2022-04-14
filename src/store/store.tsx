import { atom, Getter } from 'jotai';
import { atomWithCallback, LoadingDataState, loadingDataStateInit } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';
import { marked } from 'marked';
import { CurrentExtensions, getCurrentConfig } from './apis/file-current-config';
import { fetchReleaseNotes } from './apis/file-release-notes';
import { ArchiveExtensionMeta, getExistingOnServer } from './apis/file-archive';
import { toastError } from '@/components/UI/UiToaster';
import { archiveByYears } from './apis/file-archive-parse';
import { regexMarkdownPublicVersions } from './apis/constants';
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

export const byYearsAtom = atom(
    (get) => {
        const extArchiveState = get(archiveStateAtom);
        const byYears = archiveByYears(extArchiveState.data);
        return byYears;
    }
);

//#endregion ServerArchive

//#region ServerReleaseNotes

export const releaseNotesStateAtom = atom<LoadingDataState<string>>(loadingDataStateInit());

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
                const data = await fetchReleaseNotes();
                const markdown = marked(data);
                set(releaseNotesStateAtom, { loading: false, error: null, data: markdown });
                set(publicVersionsAtom, [...data.matchAll(regexMarkdownPublicVersions)].map((match) => match[1]));
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

export const releaseNotesAtom = atom((get) => get(releaseNotesStateAtom).data || '');

//#endregion ServerReleaseNotes

export const publicVersionsAtom = atom<string[] | undefined>(undefined); // ['3.4.419', '3.0.386', '3.0.378']

export const latestChAtom = atom<ArchiveExtensionMeta | undefined>(undefined);
export const latestFfAtom = atom<ArchiveExtensionMeta | undefined>(undefined);

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchReleaseNotesAtom);
        get(runFetchArchiveAtom);
        get(runFetchConfigAtom);
    }
);

const correlateAtom = atom(
    null,
    (get, set) => {
        const notes = get(releaseNotesStateAtom);
        if (notes.loading || notes.error) {
            return;
        }
        const archive = get(archiveStateAtom);
        if (archive.loading || archive.error) {
            return;
        }
        const config = get(configStateAtom);
        if (config.loading || config.error) {
            return;
        }

        const publicVersions = get(publicVersionsAtom);
        if (publicVersions && archive.data) {
            //const archiveMap = Object.fromEntries(archive.data.map((item) => ([item.version, item])));
            const archiveMap = archive.data.reduce<Record<string, ArchiveExtensionMeta[]>>((acc, curr) => {
                if (!acc[curr.version]) {
                    acc[curr.version] = [];
                }
                acc[curr.version].push(curr);
                return acc;
            }, {});

            console.log('published', archiveMap);
        }

        if (archive.data) {
            const reverse = [...archive.data].reverse();
            const latestCh = reverse.find((item) => item.browser === TBrowserShort.chrome);
            const latestFf = reverse.find((item) => item.browser === TBrowserShort.firefox);

            set(latestChAtom, latestCh);
            set(latestFfAtom, latestFf);
        }


        const latestCh = get(latestChAtom);
        if (latestCh) {
            console.log('latestCh', latestCh);
        }

        const latestFf = get(latestFfAtom);
        if (latestFf) {
            console.log('latestFf', latestFf);
        }

        console.log('ready to rock');
    }
);

// UI state

export const section1_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open1, ({ get }) => Storage.save(get));
export const section2_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open2, ({ get }) => Storage.save(get));
export const section3_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open3, ({ get }) => Storage.save(get));
export const section4_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open4, ({ get }) => Storage.save(get));
export const section5_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open5, ({ get }) => Storage.save(get));
