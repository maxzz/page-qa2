import { Getter } from "jotai";
import { debounce } from "@/utils/debounce";
import { AppStorage } from "./1-types";

export namespace StorageIO {
    export function load() {
        const s = localStorage.getItem(AppStorage.KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as AppStorage.Store;
                AppStorage.initialData = { ...AppStorage.initialData, ...obj };
            } catch (error) {
            }
        }
    }

    export const save = debounce(function _save(get: Getter) {
        localStorage.setItem(AppStorage.KEY, JSON.stringify(AppStorage.createAppState?.(get)));
    }, 1000);
}
