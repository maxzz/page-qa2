import { atom } from "jotai";
import { toastError } from "@/components/ui/UiToaster";
import { fetchCurrentConfig } from "@/store/apis";
import { loadingStateConfigAtom } from "./0-atoms";
import { correlateAtom } from './1-correlate-atom';

export const runFetchConfigAtom = atom(
    null,
    (_get, set) => {
        fetchDataCo();

        async function fetchDataCo() {
            set(loadingStateConfigAtom, { loading: true, error: null, data: null });
            try {
                const data = await fetchCurrentConfig();
                set(loadingStateConfigAtom, { loading: false, error: null, data });
            } catch (error) {
                set(loadingStateConfigAtom, { loading: false, error, data: null });
                toastError((error as Error).message);
            }
            set(correlateAtom);
        }
    }
);

runFetchConfigAtom.onMount = (runFetch) => runFetch();
