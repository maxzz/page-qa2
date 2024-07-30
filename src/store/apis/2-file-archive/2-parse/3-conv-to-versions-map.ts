import { Browser, BuildType } from "../../9-types";
import { FilenameMetaEx, VersionsMap } from "./9-types";

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
export function convToVersionsMap(items: FilenameMetaEx[]): VersionsMap {
    const rv: VersionsMap = {};

    items.forEach(
        (item) => {
            if (!rv[item.version]) {
                rv[item.version] = [];
            }
            rv[item.version].push(item);
        }
    );

    Object.values(rv)
        .forEach(
            (version) => version.sort((a, b) => buildNmbToSortIndex(a) - buildNmbToSortIndex(b)) // sort items inside each version
        );

    const final = preserveStringKeysOrder(rv);
    return final;
}

function buildNmbToSortIndex(item: FilenameMetaEx): number {
    const types = {
        [Browser.chrome]: item.build === BuildType.release ? 1 : 3,
        [Browser.firefox]: item.build === BuildType.release ? 2 : 4,
    };

    return types[item.browser as keyof typeof types] || 5;
}

function comapereVersion(a: string, b: string): number {
    const aParts = a.split('.').map((x) => parseInt(x));
    const bParts = b.split('.').map((x) => parseInt(x));

    for (let i = 0; i < 3; i++) {
        const aPart = aParts[i];
        const bPart = bParts[i];

        if (aPart < bPart) {
            return -1;
        } else if (aPart > bPart) {
            return 1;
        }
    }

    return 0;
}

function preserveStringKeysOrder<T>(items: { [k: string]: T; }): { [k: string]: T; } {
    const entries = Object.entries(items); // preserve insertion order.

    entries.sort((a, b) => comapereVersion(a[0], b[0]));

    return Object.fromEntries(entries);
}
