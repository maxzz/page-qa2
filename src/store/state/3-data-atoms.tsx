import { atom } from 'jotai';
import { LoadingDataState, loadingDataStateInit } from '@/hooks/atomsX';
import { OneYearExts, CurrentExtensions, InAppExtnInfo, ArchiveExtensionMeta } from '../apis';

// Internal loading state atoms

export const configStateAtom = atom<LoadingDataState<CurrentExtensions>>(loadingDataStateInit());
export const archiveStateAtom = atom<LoadingDataState<ArchiveExtensionMeta[]>>(loadingDataStateInit());
export const releaseNotesStateAtom = atom<LoadingDataState<string>>(loadingDataStateInit());

// UI state

export const byYearsAtom = atom<OneYearExts[]>([]);
export const releaseNotesAtom = atom<string>((get) => get(releaseNotesStateAtom).data || '');

// Derivative data

export const publicVersionsAtom = atom<string[] | undefined>(undefined); // ['3.4.419', '3.0.386', '3.0.378']

export const latestChExtensionAtom = atom<InAppExtnInfo | undefined>(undefined);
export const latestFfExtensionAtom = atom<InAppExtnInfo | undefined>(undefined);
export const summaryExtensionsAtom = atom<InAppExtnInfo[]>([]);
