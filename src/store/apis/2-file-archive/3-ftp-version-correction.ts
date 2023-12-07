import { Brand, Browser, BuildType, CurrentExtensions, ExtnFromConfig, FilenameMeta} from "../types";
import { urlArchiveExtension } from "../constants";

// FTP version correction

type ItemWithVersion = {
    item: FilenameMeta;
    readonly version: [number, number, number];
};

function filenameMeta2ItemWithVersion(item: FilenameMeta): ItemWithVersion {
    let version = item.version.split('.').map((v) => +v) as [number, number, number];
    if (version.length !== 3) {
        version = [0, 0, 0];
    }
    return {
        item,
        version: version,
    };
}

function getLatestArchiveVersions(archive?: FilenameMeta[] | null): { ch: FilenameMeta | undefined; ff: FilenameMeta | undefined; } {
    const reversed = archive ? [...archive].reverse() : [];
    const latestArchiveCh = getFromArchive(reversed, { browser: Browser.chrome, build: BuildType.release });
    const latestArchiveFf = getFromArchive(reversed, { browser: Browser.firefox, build: BuildType.release });
    return {
        ch: latestArchiveCh,
        ff: latestArchiveFf,
    };

    function getFromArchive(archive: FilenameMeta[] | null, lookupFor: Pick<FilenameMeta, 'browser' | 'build'>): FilenameMeta | undefined {
        return archive?.find((item) => item.browser === lookupFor.browser && item.build === lookupFor.build);
    }
}

function getArchiveVersion(archive: FilenameMeta[] | null, version?: string): FilenameMeta | undefined {
    return version ? archive?.find((item) => item.version === version) : undefined;
}

function areTheSameBrowserBrandQa(a: Pick<ExtnFromConfig, 'brand' | 'browser' | 'qa'>, b: Pick<ExtnFromConfig, 'brand' | 'browser' | 'qa'>): boolean {
    const { brand: a_brand, browser: a_browser, qa: a_qa } = a;
    const { brand: b_brand, browser: b_browser, qa: b_qa } = b;
    return a_browser === b_browser && a_brand === b_brand && a_qa === b_qa;
}

function isVersionAGreaterB(a?: string, b?: string): boolean { // '3.4.429' vs. '3.4.430'
    const aArr = a?.split('.') || [];
    const bArr = b?.split('.') || [];
    if (aArr.length !== bArr.length) {
        return false;
    }
    const itemLess = aArr.find((ver, idx) => +ver < +bArr[idx]);
    return !itemLess;
}

function selectLatest(extnConfig: ExtnFromConfig, extnArchive?: FilenameMeta): ExtnFromConfig {
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

export function updateCurrentVersions(
    publicVersions: string[] | undefined,
    fromArchive: FilenameMeta[] | null,
    fromConfig: CurrentExtensions | null,
) {
    // 0. Update stale config versions with the latest version from FTP files.
    if (!fromConfig || !fromArchive) {
        return;
    }

    const latestArchive = getLatestArchiveVersions(fromArchive);

    const latestPublicStr = publicVersions?.[0]; // ['3.4.585', '3.4.442', '3.4.432', ... ] from history.md file are sorted in descending order.
    const latestPublic = getArchiveVersion(fromArchive, latestPublicStr);

    // 1. Update 'Current Versions'
    if (latestPublic) {
        const lookupFor = {
            brand: Brand.dp,
            browser: Browser.chrome, // No need this for Firefox at least now.
            qa: false
        };
        fromConfig.summary = fromConfig.summary.map(
            (item) => {
                const found = areTheSameBrowserBrandQa(item, lookupFor) && isVersionAGreaterB(latestPublicStr, item.version);
                if (found) {
                    item.version = latestPublic.version;
                    item.updated = latestPublic.updated;
                }
                return item;
            }
        );
    }

    // 2. Update and apply 'QA latest'
    const latestChExtension = selectLatest(fromConfig.chrome, latestArchive.ch);
    const latestFfExtension = selectLatest(fromConfig.firefox, latestArchive.ff);

    // 3. Apply 'Current Versions'
    const summaryExtensions = fromConfig.summary;

    return { latestChExtension, latestFfExtension, summaryExtensions };
}
