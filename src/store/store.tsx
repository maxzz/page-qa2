import { atom } from "jotai";
import { marked } from "marked";
import React from "react";
import { IconCrLogo, IconFfLogo, IconMsLogo } from "../components/UI/UIIcons";
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

export type LoadingDataState = { loading: boolean, error: string|unknown|null, data: string|null };

//#region Release Notes

const loadingDataStateInit = (): LoadingDataState => ({ loading: true, error: null, data: null });

export const releaseNotesStateAtom = atom<LoadingDataState>(loadingDataStateInit());

export const runFetchAtom = atom(
    (get) => get(releaseNotesStateAtom),
    (_get, set) => {
        const fetchData = async () => {
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
runFetchAtom.onMount = (runFetch) => {
    runFetch();
};

export const releaseNotesAtom = atom((get) => {
    const state = get(releaseNotesStateAtom);
    return state.data || '';
});
export const releaseNotesOpenAtom = atom(false);

//#endregion Release Notes

//#region Data loading

export const configFile = atom<FormatCfg.IConfigFile | null>(null);

//#endregion Data loading