import { atom, Getter } from "jotai";
import { atomWithCallback, LoadingDataState, loadingDataStateInit } from "@/hooks/atomsX";
import { debounce } from "@/utils/debounce";
import { marked } from "marked";
import { CurrentExtensions, getCurrentConfig } from "./apis/file-current-config";
import { fetchReleaseNotes } from "./apis/file-release-notes";
import { ArchiveExtensionMeta, getExistingOnServer } from "./apis/file-existing-on-server";
import { toast } from "@/components/UI/UiToaster";

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

//#region Server Config File

export const extInfosStateAtom = atom<LoadingDataState<CurrentExtensions>>(loadingDataStateInit());

export const runFetchConfigAtom = atom(
    (get) => get(extInfosStateAtom),
    (_get, set) => {
        async function fetchData() {
            set(extInfosStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                const data = await getCurrentConfig();
                set(extInfosStateAtom, { loading: false, error: null, data });
            } catch (error) {
                set(extInfosStateAtom, { loading: false, error, data: null });
                toast((error as Error).message);
            }
        };
        fetchData();
    }
);
runFetchConfigAtom.onMount = (runFetch) => runFetch();

//#endregion Server Config File

//#region Extensions Archive on server

export const extArchiveStateAtom = atom<LoadingDataState<ArchiveExtensionMeta[]>>(loadingDataStateInit());

export const runFetchArchiveAtom = atom(
    (get) => get(extArchiveStateAtom),
    (_get, set) => {
        async function fetchData() {
            set(extArchiveStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                const data = await getExistingOnServer();
                set(extArchiveStateAtom, { loading: false, error: null, data });
            } catch (error) {
                set(extArchiveStateAtom, { loading: false, error, data: null });
                toast((error as Error).message);
            }
        };
        fetchData();
    }
);
runFetchArchiveAtom.onMount = (runFetch) => runFetch();

//#endregion Extensions Archive on server

//#region Server Release Notes

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

export const runFetchReleaseNotesAtom = atom(
    (get) => get(releaseNotesStateAtom),
    (_get, set) => {
        async function fetchData() {
            set(releaseNotesStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                const data = marked(await fetchReleaseNotes());
                set(releaseNotesStateAtom, { loading: false, error: null, data });
            } catch (error) {
                set(releaseNotesStateAtom, { loading: false, error, data: null });
                toast((error as Error).message);
            }
        };
        fetchData();
    }
);
runFetchReleaseNotesAtom.onMount = (runFetch) => runFetch();

export const releaseNotesAtom = atom((get) => get(releaseNotesStateAtom).data || '');

//#endregion Server Release Notes

export const section1_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open1, ({ get }) => Storage.save(get));
export const section2_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open2, ({ get }) => Storage.save(get));
export const section3_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open3, ({ get }) => Storage.save(get));
export const section4_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open4, ({ get }) => Storage.save(get));
export const section5_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open5, ({ get }) => Storage.save(get));
