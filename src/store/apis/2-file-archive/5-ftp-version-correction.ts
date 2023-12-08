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

export function correctFtpVsConfigVersions(publicVersions: string[] | undefined, fromArchive: FilenameMeta[] | null, fromConfig: CurrentExtensions | null) {
    // 0. Update stale config versions with the latest version from FTP files.
    if (!fromConfig || !fromArchive) {
        return;
    }

    const archiveWithVersions = fromArchive.map(convToFilenameMetaVersion);
    const sortedArchive = archiveWithVersions.sort(compareFilenameMetaVersions).reverse();
    const pureArchive = sortedArchive.map((item) => item.item);
    console.log('sortedArchive', pureArchive);

    // 2. Update and apply 'QA latest'
    const archiveLatestCh = getLatestPublic(sortedArchive, Browser.chrome )?.item;
    const archiveLatestFf = getLatestPublic(sortedArchive, Browser.firefox )?.item;

    const latestChExtension = selectTheLatestFrom(fromConfig.chrome, archiveLatestCh);
    const latestFfExtension = selectTheLatestFrom(fromConfig.firefox, archiveLatestFf);
   
    // 3. Apply 'Current Versions'
    fromConfig.summary = updateSummary(publicVersions, fromArchive, fromConfig);
    const summaryExtensions = fromConfig.summary;

    return {
        latestChExtension,
        latestFfExtension,
        summaryExtensions,
    };
}
