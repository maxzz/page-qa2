import { Getter } from "jotai";
import { atomWithCallback } from "@/hooks/atomsX";
import { AppStorage } from "./1-types";

export const section1_OpenAtom = atomWithCallback<boolean>(AppStorage.initialData.open1, ({ get }) => AppStorage.save?.(get));
export const section2_OpenAtom = atomWithCallback<boolean>(AppStorage.initialData.open2, ({ get }) => AppStorage.save?.(get));
export const section3_OpenAtom = atomWithCallback<boolean>(AppStorage.initialData.open3, ({ get }) => AppStorage.save?.(get));
export const section4_OpenAtom = atomWithCallback<boolean>(AppStorage.initialData.open4, ({ get }) => AppStorage.save?.(get));
export const section5_OpenAtom = atomWithCallback<boolean>(AppStorage.initialData.open5, ({ get }) => AppStorage.save?.(get));

export function createAppState(get: Getter): AppStorage.Store {
    let rv: AppStorage.Store = {
        open1: get(section1_OpenAtom),
        open2: get(section2_OpenAtom),
        open3: get(section3_OpenAtom),
        open4: get(section4_OpenAtom),
        open5: get(section5_OpenAtom),
    };
    return rv;
}
