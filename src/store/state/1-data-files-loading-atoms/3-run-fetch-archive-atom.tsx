import { atom } from "jotai";
import { toastError } from "@/components/ui/UiToaster";
import { FilenameMeta, fetchExistingOnServer } from "@/store/apis";
import { loadingStateArchiveAtom } from "./0-all";
import { correlateAtom } from './1-run-once-atom';

export const runFetchArchiveAtom = atom(
    null,
    (_get, set) => {
        fetchDataAr();

        async function fetchDataAr() {
            set(loadingStateArchiveAtom, { loading: true, error: null, data: null });
            try {
                const existing: FilenameMeta[] = await fetchExistingOnServer();
                set(loadingStateArchiveAtom, { loading: false, error: null, data: existing });
            } catch (error) {
                set(loadingStateArchiveAtom, { loading: false, error, data: null });
                toastError((error as Error).message);
            }
            set(correlateAtom);
        }
    }
);
runFetchArchiveAtom.onMount = (runFetch) => runFetch();
