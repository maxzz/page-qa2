import { ReleaseType, TBrand, TBrowserShort } from "../types";
import { FilenameMeta } from "../0-file-name";
import { getArchiveExtensionUrl } from "../constants";
import { CurrentExtensions, InAppExtnInfo } from "../1-file-current-config";
import { LoadingDataState } from "@/hooks/atomsX";

// FTP version correction

function isAVersionGreaterB(a?: string, b?: string): boolean { // '3.4.429' vs. '3.4.430'
    const aArr = a?.split('.') || [];
    const bArr = b?.split('.') || [];
    if (aArr.length !== bArr.length) {
        return false;
    }
    const itemLess = aArr.find((ver, idx) => +ver < +bArr[idx]);
    return !itemLess;
}

function areTheSameBrowserBrandQa(a: Pick<InAppExtnInfo, 'brand' | 'browser' | 'qa'>, b: Pick<InAppExtnInfo, 'brand' | 'browser' | 'qa'>): boolean {
    const { brand: a_brand, browser: a_browser, qa: a_qa } = a;
    const { brand: b_brand, browser: b_browser, qa: b_qa } = b;
    return a_browser === b_browser && a_brand === b_brand && a_qa === b_qa;
}

function getArchiveVersion(archive: FilenameMeta[] | null, version?: string): FilenameMeta | undefined {
    return version ? archive?.find((item) => item.version === version) : undefined;
}

function getFromArchive(archive: FilenameMeta[] | null, a: Pick<FilenameMeta, 'browser' | 'release'>): FilenameMeta | undefined {
    return archive?.find((item) => item.browser === a.browser && item.release === a.release);
}

function getLatestArchiveVersions(archive?: FilenameMeta[] | null): { ch: FilenameMeta | undefined; ff: FilenameMeta | undefined; } {
    const reversed = archive ? [...archive].reverse() : [];
    const latestArchiveCh = getFromArchive(reversed, { browser: TBrowserShort.chrome, release: ReleaseType.release });
    const latestArchiveFf = getFromArchive(reversed, { browser: TBrowserShort.firefox, release: ReleaseType.release });
    return {
        ch: latestArchiveCh,
        ff: latestArchiveFf,
    };
}

function selectLatest(config: InAppExtnInfo, archive?: FilenameMeta): InAppExtnInfo {
    return archive && isAVersionGreaterB(archive.version, config.version) ? {
        ...config,
        version: archive.version,
        updated: archive.updated,
        url: getArchiveExtensionUrl(archive.fname),
    } : config;
}

export function updateCurrentVersions(
    publicVersions: string[] | undefined,
    stateArchive: LoadingDataState<FilenameMeta[]>,
    stateConfig: LoadingDataState<CurrentExtensions>
) {
    // 0. Update stale config versions with the latest version from FTP files.

    if (!stateConfig.data || !stateArchive.data) {
        return;
    }

    const latestArchive = getLatestArchiveVersions(stateArchive.data);

    const latestPublicStr = publicVersions?.[0];
    const latestPublic = getArchiveVersion(stateArchive.data, latestPublicStr);

    // 1. Update 'Current Versions'
    if (latestPublic) {
        const lookupFor = {
            brand: TBrand.dp,
            browser: TBrowserShort.chrome, // No need this for Firefox at least now.
            qa: false
        };
        stateConfig.data.summary = stateConfig.data.summary.map(
            (item) => {
                const found = areTheSameBrowserBrandQa(item, lookupFor) && isAVersionGreaterB(latestPublicStr, item.version);
                if (found) {
                    item.version = latestPublic.version;
                    item.updated = latestPublic.updated;
                }
                return item;
            }
        );
    }

    // 2. Update and apply 'QA latest'
    const latestChExtension = selectLatest(stateConfig.data.chrome, latestArchive.ch);
    const latestFfExtension = selectLatest(stateConfig.data.firefox, latestArchive.ff);

    // 3. Apply 'Current Versions'
    const summaryExtensions = stateConfig.data.summary;

    return { latestChExtension, latestFfExtension, summaryExtensions };
}
