import { TBrowserShort } from "../types";
import { getArchiveExtensionUrl } from "../constants";
import { ArchiveExtensionMeta, ReleaseType } from "./1-fetch";
import { InAppExtnInfo } from "../1-file-current-config";

// FTP version correction

export function isAVersionGreaterB(a?: string, b?: string): boolean { // '3.4.429' vs. '3.4.430'
    const aArr = a?.split('.') || [];
    const bArr = b?.split('.') || [];
    if (aArr.length !== bArr.length) {
        return false;
    }
    const itemLess = aArr.find((ver, idx) => +ver < +bArr[idx]);
    return !itemLess;
}

export function areTheSameBrowserBrandQa(a: Pick<InAppExtnInfo, 'brand' | 'browser' | 'qa'>, b: Pick<InAppExtnInfo, 'brand' | 'browser' | 'qa'>): boolean {
    const { brand: a_brand, browser: a_browser, qa: a_qa } = a;
    const { brand: b_brand, browser: b_browser, qa: b_qa } = b;
    return a_browser === b_browser && a_brand === b_brand && a_qa === b_qa;
}

export function getArchiveVersion(archive: ArchiveExtensionMeta[] | null, version?: string): ArchiveExtensionMeta | undefined {
    return version ? archive?.find((item) => item.version === version) : undefined;
}

export function getFromArchive(archive: ArchiveExtensionMeta[] | null, a: Pick<ArchiveExtensionMeta, 'browser' | 'release'>): ArchiveExtensionMeta | undefined {
    return archive?.find((item) => item.browser === a.browser && item.release === a.release);
}

export function getLatestArchiveVersions(archive?: ArchiveExtensionMeta[] | null): { ch: ArchiveExtensionMeta | undefined; ff: ArchiveExtensionMeta | undefined; } {
    const reversed = archive ? [...archive].reverse() : [];
    const latestArchiveCh = getFromArchive(reversed, { browser: TBrowserShort.chrome, release: ReleaseType.release });
    const latestArchiveFf = getFromArchive(reversed, { browser: TBrowserShort.firefox, release: ReleaseType.release });
    return {
        ch: latestArchiveCh,
        ff: latestArchiveFf,
    };
}

export function selectLatest(config: InAppExtnInfo, archive?: ArchiveExtensionMeta): InAppExtnInfo {
    return archive && isAVersionGreaterB(archive.version, config.version) ? {
        ...config,
        version: archive.version,
        updated: archive.updated,
        url: getArchiveExtensionUrl(archive.fname),
    } : config;
}
