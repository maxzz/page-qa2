import { ExtnFromConfig, Brand, BrowserShort } from '@/store/apis';

type Table = {
    [key in BrowserShort]: {
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

export type FlatTableItem = {
    brand: Brand;
    qa?: ExtnFromConfig;
    release?: ExtnFromConfig;
};

type FlatTable = {
    [key in BrowserShort]: FlatTableItem[]
};

export function reduceToFlat(table: Table): FlatTable {
    const res = {} as FlatTable;
    for (const [brKey, brVal] of Object.entries(table) as [BrowserShort, Table[BrowserShort]][]) {
        if (!res[brKey]) {
            res[brKey] = [];
        }
        for (const [bdKey, bdVal] of Object.entries(brVal) as [Brand, { qa?: ExtnFromConfig; release?: ExtnFromConfig; }][]) {
            res[brKey].push({
                brand: bdKey,
                qa: bdVal.qa,
                release: bdVal.release,
            });
        }
    }
    return res;
}
