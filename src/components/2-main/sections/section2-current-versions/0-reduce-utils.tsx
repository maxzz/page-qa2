import { ExtnFromConfig, TBrand, TBrowserShort } from '@/store/apis';

type Table = {
    [key in TBrowserShort]: {
        [key in TBrand]?: {
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
    brand: TBrand;
    qa?: ExtnFromConfig;
    release?: ExtnFromConfig;
};

type FlatTable = {
    [key in TBrowserShort]: FlatTableItem[]
};

export function reduceToFlat(table: Table): FlatTable {
    const res = {} as FlatTable;
    for (const [brKey, brVal] of Object.entries(table) as [TBrowserShort, Table[TBrowserShort]][]) {
        if (!res[brKey]) {
            res[brKey] = [];
        }
        for (const [bdKey, bdVal] of Object.entries(brVal) as [TBrand, { qa?: ExtnFromConfig; release?: ExtnFromConfig; }][]) {
            res[brKey].push({
                brand: bdKey,
                qa: bdVal.qa,
                release: bdVal.release,
            });
        }
    }
    return res;
}
