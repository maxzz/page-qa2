import { Getter } from "jotai";

export namespace AppStorage {
    export const KEY = 'react-page-qa2-01';

    export type Store = {
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

    export let save: ((get: Getter) => void) | undefined;
    export let createAppState: ((get: Getter) => Store) | undefined;
}
