import { TBrowserShort } from "./api-formats-g01";
import { getArchiveExtensionUrl } from "./constants";
import { ArchiveExtensionMeta, ReleaseType } from "./file-archive";
import { InAppExtnInfo } from "./file-current-config";

export type Meta = {
    date: string;
    year: number;
    published?: boolean;        // published information from release notes
} & ArchiveExtensionMeta;

const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

function transformToMeta(item: ArchiveExtensionMeta): Meta {
    const dt = new Date(item.updated.replace(/\./g, '-') + 'T00:00:00');
    const year = dt.getFullYear();
    return {
        ...item,
        date: dt.toLocaleDateString('en-US', dateOptions),
        year,
    } as Meta;
}

function splitToByYearsMap(archive: Meta[]): Record<string, Meta[]> {
    const res: Record<string, Meta[]> = {};
    archive.forEach((item) => {
        if (!res[item.year]) {
            res[item.year] = [];
        }
        res[item.year].push(item);
    });
    return res;
}

function itemSortIndex(item: Meta): number {
    const types = {
        [TBrowserShort.chrome]: item.release === ReleaseType.release ? 1 : 3,
        [TBrowserShort.firefox]: item.release === ReleaseType.release ? 2 : 4,
    };
    return types[item.browser as keyof typeof types] || 5;
}

type VersionsMap = Record<string, Meta[]>; // extension version -> browser extensions

export type OneYearExts = {
    year: string;
    items: VersionsMap;
};

function splitToVersionsMap(items: Meta[]): VersionsMap {
    let rv: VersionsMap = {};
    items.forEach((item) => {
        if (!rv[item.version]) {
            rv[item.version] = [];
        }
        rv[item.version].push(item);
    });
    Object.values(rv).forEach((version) => version.sort((a, b) => itemSortIndex(a) - itemSortIndex(b))); // sort items inside each version

    const entries = Object.entries(rv); // preserve insertion order.
    entries.sort((a, b) => a[0].localeCompare(b[0]));
    rv = Object.fromEntries(entries);

    return rv;
}

export function archiveByYears(archiveExtensions: ArchiveExtensionMeta[] | null, publicVersions?: string[]): OneYearExts[] {
    const withMeta: Meta[] = (archiveExtensions || []).map(transformToMeta);

    if (publicVersions?.length) {
        const versionsMap = splitToVersionsMap(withMeta);
        publicVersions.forEach((version) => {
            versionsMap[version]?.forEach((existingExt) => existingExt.published = true);
        });
    }

    const byYearsMap = splitToByYearsMap(withMeta);
    const byYearsArr = Object.entries(byYearsMap).map(([year, items]) => ({ year, items })); // can now sort by year if needed
    const grouped = byYearsArr.map<OneYearExts>(({ year, items: yearItems }) => ({ year, items: splitToVersionsMap(yearItems) }));
    return grouped;
}

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

// TODO: add index.ts
