import React from "react";
import { atom } from "jotai";
import { LoadingDataState, loadingDataStateInit } from "@/hooks/atomsX";
import { marked } from "marked";
import { getCurrentConfig, IBrExtnInfos } from "./utils/utils-current-config";
import { fetchReleaseNotes } from "./utils/utils-release-notes";
import { IconCrLogo, IconFfLogo, IconMsLogo } from "../components/UI/UIIcons";
import { getExistingOnServer, IFnameMeta } from "./utils/utils-existing-on-server";

export type LatestExtension = {
    name: string;
    icon: React.ReactNode;
    version: string;
    url: string;
};

export const extensionChAtom = atom<LatestExtension>({
    name: 'Chrome',
    icon: <IconCrLogo className="w-8 h-8" />,
    version: '3.4.430',
    url: 'chrome',
});

export const extensionFfAtom = atom<LatestExtension>({
    name: 'Firefox',
    icon: <IconFfLogo className="w-8 h-8" />,
    version: '3.4.430',
    url: 'chrome',
});

export const extensionMsAtom = atom<LatestExtension>({
    name: 'Edge',
    icon: <IconMsLogo className="w-8 h-8" />,
    version: '3.4.430',
    url: 'chrome',
});

const extensionAtoms = [
    extensionChAtom,
    extensionFfAtom,
    extensionMsAtom,
];

// Data files

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
            }
        };
        fetchData();
    }
);
runFetchReleaseNotesAtom.onMount = (runFetch) => runFetch();

export const releaseNotesAtom = atom((get) => get(releaseNotesStateAtom).data || '');

//#endregion Server Release Notes

//#region Server Config File

export const extInfosStateAtom = atom<LoadingDataState<IBrExtnInfos>>(loadingDataStateInit());

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
            }
        };
        fetchData();
    }
);
runFetchConfigAtom.onMount = (runFetch) => runFetch();

//#endregion Server Config File

//#region Extensions Archive on server

export const extArchiveStateAtom = atom<LoadingDataState<IFnameMeta[]>>(loadingDataStateInit());

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
            }
        };
        fetchData();
    }
);
runFetchArchiveAtom.onMount = (runFetch) => runFetch();

//#endregion Extensions Archive on server

export const section1_OpenReleaseNotesAtom = atom(false);
export const section2_OpenCurrentVersionsAtom = atom(false);
export const section3_OpenArchiveAtom = atom(false);
export const section4_OpenTestAppsAtom = atom(false);
export const section5_OpenConclusionAtom = atom(false);
