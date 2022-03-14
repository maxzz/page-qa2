import { LoadingDataState, loadingDataStateInit } from "@/hooks/atomsX";
import { atom } from "jotai";
import { marked } from "marked";
import React from "react";
import { IconCrLogo, IconFfLogo, IconMsLogo } from "../components/UI/UIIcons";
import { getCurrentConfig, IBrExtnInfos } from "./utils/utils-current-config";
import { fetchReleaseNotes } from "./utils/utils-release-notes";

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

//#region Release Notes

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
runFetchReleaseNotesAtom.onMount = (runFetch) => {
    runFetch();
};

export const releaseNotesAtom = atom((get) => get(releaseNotesStateAtom).data || '');
export const releaseNotesOpenAtom = atom(false);

//#endregion Release Notes

//#region Config File

//export const configFile = atom<FormatCfg.IConfigFile | null>(null);

export const configFileStateAtom = atom<LoadingDataState<IBrExtnInfos>>(loadingDataStateInit());

export const runFetchConfigAtom = atom(
    (get) => get(configFileStateAtom),
    (_get, set) => {
        async function fetchData() {
            set(configFileStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                const data = await getCurrentConfig();
                set(configFileStateAtom, { loading: false, error: null, data });
            } catch (error) {
                set(configFileStateAtom, { loading: false, error, data: null });
            }
        };
        fetchData();
    }
);
runFetchConfigAtom.onMount = (runFetch) => {
    runFetch();
};

//#endregion Config File
