import { InAppExtnInfo } from '@/store/apis/1-file-current-config/file-current-config';
import { FormatCurrentCfg, TBrowserShort } from '@/store/apis';

type Table = {
    [key in TBrowserShort]: {
        [key in FormatCurrentCfg.TBrand]?: {
            qa?: InAppExtnInfo;
            release?: InAppExtnInfo;
        }
    };
};

export function reduceForTable(exts: InAppExtnInfo[]): Table {
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
    brand: FormatCurrentCfg.TBrand;
    qa?: InAppExtnInfo;
    release?: InAppExtnInfo;
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
        for (const [bdKey, bdVal] of Object.entries(brVal) as [FormatCurrentCfg.TBrand, { qa?: InAppExtnInfo; release?: InAppExtnInfo; }][]) {
            res[brKey].push({
                brand: bdKey,
                qa: bdVal.qa,
                release: bdVal.release,
            });
        }
    }
    return res;
}
