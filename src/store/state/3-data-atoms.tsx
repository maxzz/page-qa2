import { atom } from 'jotai';
import { LoadingDataState, loadingDataStateInit } from '@/hooks/atomsX';
import { OneYearExts, CurrentExtensions, InAppExtnInfo, ArchiveExtensionMeta } from '../apis';

// Internal loading state atoms

export const loadingStateConfigAtom = atom<LoadingDataState<CurrentExtensions>>(loadingDataStateInit());
export const loadingStateArchiveAtom = atom<LoadingDataState<ArchiveExtensionMeta[]>>(loadingDataStateInit());
export const loadingStateReleaseNotesAtom = atom<LoadingDataState<string>>(loadingDataStateInit());
export const loadFailedAtom = atom<boolean>(false); // true if any of the above failed

// UI state

export const byYearsAtom = atom<OneYearExts[]>([]);
export const releaseNotesAtom = atom<string>((get) => get(loadingStateReleaseNotesAtom).data || '');

// Derivative data

export const publicVersionsAtom = atom<string[] | undefined>(undefined); // ['3.4.419', '3.0.386', '3.0.378']

export const latestChExtensionAtom = atom<InAppExtnInfo | undefined>(undefined);
export const latestFfExtensionAtom = atom<InAppExtnInfo | undefined>(undefined);
export const summaryExtensionsAtom = atom<InAppExtnInfo[]>([]);
