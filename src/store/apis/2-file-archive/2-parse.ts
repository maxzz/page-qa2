import { stringToDate } from "@/utils/helpers";
import { Browser, BuildType, FilenameMeta } from "../9-types";

export type FilenameMetaEx = Prettify<
    & FilenameMeta
    & {
        year: number;           // year when extension was created
        createDate: string;     // when extension was created
        published: boolean;     // published information from release notes
    }
>;

type VersionsMap = Record<string, FilenameMetaEx[]>; // extension version ("3.4.709") -> browser extensions []

export type YearExts = {
    yearStr: string;            // TODO: check why it is string
    items: VersionsMap;
};

const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

function convToFilenameMetaEx(item: FilenameMeta): FilenameMetaEx {
    const date = stringToDate(item.updated);
    const year = date.getFullYear();
    return {
        ...item,
        year,
        createDate: date.toLocaleDateString('en-US', dateOptions),
        published: false,
    };
}

function convToByYearsMap(archive: FilenameMetaEx[]): Record<string, FilenameMetaEx[]> {
    const res: Record<string, FilenameMetaEx[]> = {};
    archive.forEach((item) => {
        if (!res[item.year]) {
            res[item.year] = [];
        }
        res[item.year].push(item);
    });
    return res;
}

/**
 * @returns
 *```
    {
        "3.4.700": [
            {
                "fname": "dppm-3.4.700_on_2022.12.04-r-chrome3.zip",
                "version": "3.4.700",
                "updated": "2022.12.04",
                "build": "r",
                "browser": "c",
                "broIcon": "3",
                "isV3": true,
                "createDate": "December 4, 2022",
                "year": 2022,
                "published": false
            }
        ],
        "3.4.711": [
            {
                "fname": "dppm-3.4.711_on_2023.03.25-r-chrome3.zip",
                "version": "3.4.711",
                "updated": "2023.03.25",
                "build": "r",
                "browser": "c",
                "broIcon": "3",
                "isV3": true,
                "createDate": "March 25, 2023",
                "year": 2023,
                "published": false
            }
        ],
        "3.4.709": [
            {
                "fname": "dppm-3.4.709_on_2023.03.05-r-chrome.zip",
                "version": "3.4.709",
                "updated": "2023.03.05",
                "build": "r",
                "browser": "c",
                "broIcon": "c",
                "isV3": false,
                "createDate": "March 5, 2023",
                "year": 2023,
                "published": false
            }
        ],
        "3.4.72": [
            {
                "fname": "dppm-3.4.72_on_2020.06.05-r-chrome.zip",
                "version": "3.4.72",
                "updated": "2020.06.05",
                "build": "r",
                "browser": "c",
                "broIcon": "c",
                "isV3": false,
                "createDate": "June 5, 2020",
                "year": 2020,
                "published": false
            }
        ],
        "2.0.7234": [
            {
                "fname": "../../maxz/traytools.zip.txt",
                "version": "2.0.7234",
                "updated": "2017.10.20",
                "build": "m",
                "browser": "d",
                "broIcon": "d",
                "isV3": false,
                "createDate": "October 20, 2017",
                "year": 2017,
                "published": false
            }
        ]
    }
    ```
 */
function convToVersionsMap(items: FilenameMetaEx[]): VersionsMap {
    const rv: VersionsMap = {};
    items.forEach((item) => {
        if (!rv[item.version]) {
            rv[item.version] = [];
        }
        rv[item.version].push(item);
    });
    Object.values(rv).forEach((version) => version.sort((a, b) => itemSortIndex(a) - itemSortIndex(b))); // sort items inside each version

    return preserveStringKeysOrder(rv);

    function preserveStringKeysOrder<T>(items: { [k: string]: T; }): { [k: string]: T; } {
        const entries = Object.entries(items); // preserve insertion order.
        entries.sort((a, b) => a[0].localeCompare(b[0]));
        return Object.fromEntries(entries);
    }

    function itemSortIndex(item: FilenameMetaEx): number {
        const types = {
            [Browser.chrome]: item.build === BuildType.release ? 1 : 3,
            [Browser.firefox]: item.build === BuildType.release ? 2 : 4,
        };
        return types[item.browser as keyof typeof types] || 5;
    }
}

export function archiveByYears(archiveExtensions: FilenameMeta[] | null, publicVersions?: string[]): YearExts[] {
    const withMeta: FilenameMetaEx[] = (archiveExtensions || []).map(convToFilenameMetaEx);

    // 1. update published info
    if (publicVersions?.length) {
        const versionsMap = convToVersionsMap(withMeta);
        publicVersions.forEach((version) => {
            versionsMap[version]?.forEach((existingExt) => existingExt.published = true);
        });
    }

    // 2. group by years
    const byYearsMap = convToByYearsMap(withMeta);
    const byYearsArr = Object.entries(byYearsMap).map(([year, items]) => ({ year, items })); // can now sort by year if needed
    const grouped = byYearsArr.map<YearExts>(({ year, items: yearItems }) => ({
        yearStr: year,
        items: convToVersionsMap(yearItems),
    }));

    return grouped;
}
