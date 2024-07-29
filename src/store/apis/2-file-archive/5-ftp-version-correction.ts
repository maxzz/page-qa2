import { Browser, BuildType, CurrentExtensions, ExtnFromConfig, FilenameMeta } from "../9-types";
import { urlArchiveExtension } from "../constants";
import { updateSummary } from "./4-update-summary";
import { FilenameMetaVersion, compareFilenameMetaVersions, convToFilenameMetaVersion, isVersionAGreaterB } from "./3-filename-meta-version";

// FTP version correction

function getLatestReleaseBuild(archive: FilenameMetaVersion[] | null, lookupForBrowser: Browser): FilenameMetaVersion | undefined {
    return archive?.find(({ item: { browser, build } }) => browser === lookupForBrowser && build === BuildType.release);
}

function selectTheLatestFrom(extnConfig: ExtnFromConfig, extnArchive?: FilenameMeta): ExtnFromConfig {
    return (
        extnArchive && isVersionAGreaterB(extnArchive.version, extnConfig.version)
            ? {
                ...extnConfig,
                fname: urlArchiveExtension(extnArchive.fname),
                version: extnArchive.version,
                updated: extnArchive.updated,
                broIcon: extnArchive.broIcon,
                isV3: extnArchive.isV3,
        }
            : extnConfig
    );
}

type correctArchiveVsConfigVersionsProps = {
    fromArchive: FilenameMeta[] | null;
    fromConfig: CurrentExtensions | null;
    publicVersions: string[] | undefined;
};

/**
 * Update possibly outdated configuration versions with the latest version from the FTP archive files.
 */
export function correctArchiveVsConfigVersions({ fromArchive, fromConfig, publicVersions }: correctArchiveVsConfigVersionsProps) {
    if (!fromConfig || !fromArchive) {
        return;
    }

    const archiveWithVersions = fromArchive.map(convToFilenameMetaVersion);
    const sortedArchive = archiveWithVersions.sort(compareFilenameMetaVersions).reverse();

    const latestChFromArchive = getLatestReleaseBuild(sortedArchive, Browser.chrome )?.item;
    const latestFfFromArchive = getLatestReleaseBuild(sortedArchive, Browser.firefox )?.item;

    // 2. Update and apply 'QA latest'
    const latestChExtension = selectTheLatestFrom(fromConfig.chrome, latestChFromArchive);
    const latestFfExtension = selectTheLatestFrom(fromConfig.firefox, latestFfFromArchive);
   
    // 3. Apply 'Current Versions'
    fromConfig.summary = updateSummary({ fromArchive: sortedArchive, fromConfig, publicVersions });
    const summaryExtensions = fromConfig.summary;

    // const pureArchive = sortedArchive.map((item) => item.item);
    // console.log('sortedArchive', pureArchive);

    return {
        latestChExtension,
        latestFfExtension,
        summaryExtensions,
    };
}
