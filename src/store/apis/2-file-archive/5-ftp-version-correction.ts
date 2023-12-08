import { Browser, BuildType, CurrentExtensions, ExtnFromConfig, FilenameMeta } from "../types";
import { urlArchiveExtension } from "../constants";
import { updateSummary } from "./4-update-summary";
import { FilenameMetaVersion, compareFilenameMetaVersions, convToFilenameMetaVersion, isVersionAGreaterB } from "./3-filename-meta-version";

// FTP version correction

function getLatestPublic(archive: FilenameMetaVersion[] | null, lookupForBrowser: Browser): FilenameMetaVersion | undefined {
    return archive?.find(({ item: { browser, build } }) => browser === lookupForBrowser && build === BuildType.release);
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

export function correctArchiveVsConfigVersions(fromArchive: FilenameMeta[] | null, fromConfig: CurrentExtensions | null, publicVersions: string[] | undefined) {
    // 0. Update possibly stale config versions with the latest version from the FTP archive files.
    if (!fromConfig || !fromArchive) {
        return;
    }

    const archiveWithVersions = fromArchive.map(convToFilenameMetaVersion);
    const sortedArchive = archiveWithVersions.sort(compareFilenameMetaVersions).reverse();

    // 2. Update and apply 'QA latest'
    const latestChExtension = selectTheLatestFrom(fromConfig.chrome, getLatestPublic(sortedArchive, Browser.chrome )?.item);
    const latestFfExtension = selectTheLatestFrom(fromConfig.firefox, getLatestPublic(sortedArchive, Browser.firefox )?.item);
   
    // 3. Apply 'Current Versions'
    fromConfig.summary = updateSummary(fromArchive, fromConfig, publicVersions);
    const summaryExtensions = fromConfig.summary;

    const pureArchive = sortedArchive.map((item) => item.item);
    console.log('sortedArchive', pureArchive);

    return {
        latestChExtension,
        latestFfExtension,
        summaryExtensions,
    };
}
