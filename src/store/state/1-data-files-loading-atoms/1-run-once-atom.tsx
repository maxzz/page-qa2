import { atom } from "jotai";
import { archiveByYears, correctArchiveVsConfigVersions } from "@/store/apis";
import { loadingStateReleaseNotesAtom, loadingStateArchiveAtom, loadingStateConfigAtom, loadFailedAtom, publicVersionsAtom, byYearsAtom, latestChExtensionAtom, latestFfExtensionAtom, summaryExtensionsAtom } from "./0-all";

const runOnceAtom = atom(false);

export const correlateAtom = atom(
    null,
    (get, set) => {
        const stateNotes = get(loadingStateReleaseNotesAtom);
        const stateArchive = get(loadingStateArchiveAtom);
        const stateConfig = get(loadingStateConfigAtom);

        if (stateNotes.loading || stateArchive.loading || stateConfig.loading) {
            return;
        }

        const failed = !!stateNotes.error || !!stateArchive.error || !!stateConfig.error;
        set(loadFailedAtom, failed);
        if (failed) {
            return;
        }

        if (get(runOnceAtom)) {
            return;
        }
        set(runOnceAtom, true);

        // 1. Combine extensions list with published information.
        const publicVersions = get(publicVersionsAtom);

        const byYears = archiveByYears(stateArchive.data, publicVersions);
        set(byYearsAtom, byYears);

        // 2. Update stale config versions with the latest from FTP.
        const res = correctArchiveVsConfigVersions({ fromArchive: stateArchive.data, fromConfig: stateConfig.data, publicVersions });
        if (res) {
            set(latestChExtensionAtom, res.latestChExtension);
            set(latestFfExtensionAtom, res.latestFfExtension);
            set(summaryExtensionsAtom, res.summaryExtensions);
        }
    }
);
