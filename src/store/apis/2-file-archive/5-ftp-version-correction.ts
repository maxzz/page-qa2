import { Browser, BuildType, CurrentExtensions, ExtnFromConfig, FilenameMeta } from "../types";
import { urlArchiveExtension } from "../constants";
import { isVersionAGreaterB, updateSummary } from "./3-update-summary";

// FTP version correction

function getLatestArchiveVersions(archive?: FilenameMeta[] | null): { ch: FilenameMeta | undefined; ff: FilenameMeta | undefined; } {
    const reversed = archive ? [...archive].reverse() : [];

    return {
        ch: getFromArchive(reversed, { browser: Browser.chrome, build: BuildType.release }), // latest archive chrome
        ff: getFromArchive(reversed, { browser: Browser.firefox, build: BuildType.release }), // latest archive firefox
    };

    function getFromArchive(archive: FilenameMeta[] | null, lookupFor: Pick<FilenameMeta, 'browser' | 'build'>): FilenameMeta | undefined {
        return archive?.find((item) => item.browser === lookupFor.browser && item.build === lookupFor.build);
    }
}

function selectTheLatestFrom(extnConfig: ExtnFromConfig, extnArchive?: FilenameMeta): ExtnFromConfig {
    return (
        extnArchive && isVersionAGreaterB(extnArchive.version, extnConfig.version)
            ? {
                ...extnConfig,
                version: extnArchive.version,
                updated: extnArchive.updated,
                fname: urlArchiveExtension(extnArchive.fname),
            }
            : extnConfig
    );
}

export function updateCurrentVersions(publicVersions: string[] | undefined, fromArchive: FilenameMeta[] | null, fromConfig: CurrentExtensions | null,) {
    // 0. Update stale config versions with the latest version from FTP files.
    if (!fromConfig || !fromArchive) {
        return;
    }

    const latestArchive = getLatestArchiveVersions(fromArchive);

    fromConfig.summary = updateSummary(publicVersions, fromArchive, fromConfig);

    // 2. Update and apply 'QA latest'
    const latestChExtension = selectTheLatestFrom(fromConfig.chrome, latestArchive.ch);
    const latestFfExtension = selectTheLatestFrom(fromConfig.firefox, latestArchive.ff);

    // 3. Apply 'Current Versions'
    const summaryExtensions = fromConfig.summary;

    return {
        latestChExtension,
        latestFfExtension,
        summaryExtensions,
    };
}