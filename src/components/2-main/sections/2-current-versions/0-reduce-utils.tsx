import { ExtnFromConfig, Brand, Browser } from '@/store/apis';

type Table = {
    [key in Browser]: {
        [key in Brand]?: {
            qa?: ExtnFromConfig;
            release?: ExtnFromConfig;
        }
    };
};

export function reduceForTable(exts: ExtnFromConfig[]): Table {
    return exts.reduce<Table>((acc, cur) => {
        if (cur.browser && cur.brand) {
            if (!acc[cur.browser]) {
                acc[cur.browser] = {};
            }
            if (!acc[cur.browser][cur.brand]) {
                acc[cur.browser][cur.brand] = {};
            }
            acc[cur.browser][cur.brand]![cur.qa ? 'qa' : 'release'] = cur;
        }
        return acc;
    }, {} as Table);
}

export type FlatTableRow = {
    brand: Brand;
    qa?: ExtnFromConfig;
    release?: ExtnFromConfig;
};

type FlatTableRows = {
    [key in Browser]: FlatTableRow[];
};

/**
 * 
 * @param table 
 * @returns ```
 {
    "f": [
        {
            "brand": "dp",
            "qa": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.375_on_2021.08.31-r-firefox.xpi",
                "version": "3.4.375",
                "updated": "2021.08.31",
                "browser": "f",
                "broIcon": "f",
                "build": "r",
                "isV3": false,
                "brand": "dp",
                "qa": true
            },
            "release": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.350_on_2021.05.24-r-firefox.xpi",
                "version": "3.4.350",
                "updated": "2021.05.24",
                "browser": "f",
                "broIcon": "f",
                "build": "r",
                "isV3": false,
                "brand": "dp",
                "qa": false
            }
        },
        {
            "brand": "hp",
            "qa": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.375_on_2021.08.31-r-firefox.xpi",
                "version": "3.4.375",
                "updated": "2021.08.31",
                "browser": "f",
                "broIcon": "f",
                "build": "r",
                "isV3": false,
                "brand": "hp",
                "qa": true
            },
            "release": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.350_on_2021.05.24-r-firefox.xpi",
                "version": "3.4.350",
                "updated": "2021.05.24",
                "browser": "f",
                "broIcon": "f",
                "build": "r",
                "isV3": false,
                "brand": "hp",
                "qa": false
            }
        },
        {
            "brand": "de",
            "qa": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.375_on_2021.08.31-r-firefox.xpi",
                "version": "3.4.375",
                "updated": "2021.08.31",
                "browser": "f",
                "broIcon": "f",
                "build": "r",
                "isV3": false,
                "brand": "de",
                "qa": true
            },
            "release": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.350_on_2021.05.24-r-firefox.xpi",
                "version": "3.4.350",
                "updated": "2021.05.24",
                "browser": "f",
                "broIcon": "f",
                "build": "r",
                "isV3": false,
                "brand": "de",
                "qa": false
            }
        }
    ],
    "c": [
        {
            "brand": "dp",
            "qa": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.710_on_2023.03.14-r-chrome3.zip",
                "version": "3.4.710",
                "updated": "2023.03.14",
                "browser": "c",
                "broIcon": "3",
                "build": "r",
                "isV3": true,
                "brand": "dp",
                "qa": true
            },
            "release": {
                "fname": "https://chrome.google.com/webstore/detail/digitalpersona-altus/piimgpjgnagkckjlhjcppbkbjjfjmnbh",
                "version": "3.4.700",
                "updated": "2022.12.04",
                "browser": "c",
                "broIcon": "3",
                "build": "m",
                "isV3": true,
                "brand": "dp",
                "qa": false
            }
        },
        {
            "brand": "hp",
            "qa": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.710_on_2023.03.14-r-chrome3.zip",
                "version": "3.4.710",
                "updated": "2023.03.14",
                "browser": "c",
                "broIcon": "3",
                "build": "r",
                "isV3": true,
                "brand": "hp",
                "qa": true
            },
            "release": {
                "fname": "https://chrome.google.com/webstore/detail/hp-client-security-manage/pkdnjfgdoolnmiacpdamadcneoblphbj",
                "version": "3.0.905",
                "updated": "2022.06.03",
                "browser": "c",
                "broIcon": "c",
                "build": "m",
                "isV3": false,
                "brand": "hp",
                "qa": false
            }
        },
        {
            "brand": "de",
            "qa": {
                "fname": "https://crossmatch.hid.gl/g02/current/dppm-3.4.710_on_2023.03.14-r-chrome3.zip",
                "version": "3.4.710",
                "updated": "2023.03.14",
                "browser": "c",
                "broIcon": "3",
                "build": "r",
                "isV3": true,
                "brand": "de",
                "qa": true
            },
            "release": {
                "fname": "https://chrome.google.com/webstore/detail/digitalpersona-altus/piimgpjgnagkckjlhjcppbkbjjfjmnbh",
                "version": "1.4.0.6562",
                "updated": "2016.12.08",
                "browser": "c",
                "broIcon": "c",
                "build": "m",
                "isV3": false,
                "brand": "de",
                "qa": false
            }
        }
    ]
} 
```
 */
export function convToFlatTableRows(table: Table): FlatTableRows {
    const rv = {} as FlatTableRows;

    for (const [brKey, brVal] of Object.entries(table) as [Browser, Table[Browser]][]) {
        if (!rv[brKey]) {
            rv[brKey] = [];
        }
        for (const [bdKey, bdVal] of Object.entries(brVal) as [Brand, { qa?: ExtnFromConfig; release?: ExtnFromConfig; }][]) {
            rv[brKey].push({
                brand: bdKey,
                qa: bdVal.qa,
                release: bdVal.release,
            });
        }
    }
    
    // console.log('rows', rv);
    return rv;
}
