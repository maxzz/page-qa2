import { atom } from "jotai";
import React from "react";
import { IconCrLogo, IconFfLogo, IconMsLogo } from "../components/UI/UIIcons";

export type LatestExtension = {
    name: string;
    icon: React.ReactNode;
    version: string;
    url: string;
}

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

export const releaseNotesAtom = atom('');
export const releaseNotesOpenAtom = atom(false);