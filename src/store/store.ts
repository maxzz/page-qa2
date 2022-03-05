import { atom } from "jotai";

export type LatestExtension = {
    name: string;
    icon: string;
    url: string;
}

export const extensionChAtom = atom<LatestExtension>({
    name: 'Chrome',
    icon: 'chrome',
    url: 'chrome',
});

export const extensionFfAtom = atom<LatestExtension>({
    name: 'Firefox',
    icon: 'chrome',
    url: 'chrome',
});

export const extensionMsAtom = atom<LatestExtension>({
    name: 'Edge',
    icon: 'chrome',
    url: 'chrome',
});

const extensionAtoms = [
    extensionChAtom,
    extensionFfAtom,
    extensionMsAtom,
];
