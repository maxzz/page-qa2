import React from 'react';
import { useAtom } from 'jotai';
import { SectionHeader } from '../Frontpage';
import { extInfosStateAtom } from '@/store/store';
import { IExtnInfo, TBrand, TBrandName, TBrowser, TBrowserName } from '@/store/utils/utils-current-config';

type Table = {
    [key in TBrowser]: {
        [key in TBrand]?: {
            qa?: IExtnInfo;
            release?: IExtnInfo;
        }
    };
};

function reduceForTable(exts: IExtnInfo[]) {
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

type FlatTableItem = {
    brand: TBrand;
    qa?: IExtnInfo;
    release?: IExtnInfo;
};

type FlatTable = {
    [key in TBrowser]: FlatTableItem[]
};

function reduceToFlat(table: Table): FlatTable {
    const res = {} as FlatTable;
    for (const [brKey, brVal] of Object.entries(table) as [TBrowser, Table[TBrowser]][]) {
        if (!res[brKey]) {
            res[brKey] = [];
        }
        for (const [bdKey, bdVal] of Object.entries(brVal) as [TBrand, { qa?: IExtnInfo; release?: IExtnInfo; }][]) {
            res[brKey].push({
                brand: bdKey,
                qa: bdVal.qa,
                release: bdVal.release,
            });
        }
    }
    return res;
}

function TableToBrowser({ browser, table = [] }: { browser: TBrowser; table: FlatTableItem[]; }) {
    return (
        <div className="mt-1">
            <div className="text-sm font-bold">{TBrowserName(browser)}</div>
            <div className="grid grid-cols-3">
                <div className="border-b text-xs">Brand</div>
                <div className="border-b text-xs">QA</div>
                <div className="border-b text-xs">Public</div>

                {table.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <div className={`text-sm ${idx ? 'opacity-25' : ''}`}>{TBrandName(item.brand)}</div>
                        <div className="flex items-baseline space-x-1">
                            <div className={`text-sm ${idx ? 'opacity-25' : ''}`}>{item.qa?.version}</div>
                            <div className={`text-[.55rem] ${idx ? 'opacity-25' : ''}`}>{item.qa?.updated}</div>
                        </div>
                        <div className={`text-sm ${idx ? 'opacity-25' : ''}`}>{item.release?.version}</div>
                    </React.Fragment>))
                }
            </div>
        </div>
    );
}

export function VersionSummary() {
    const [extInfos] = useAtom(extInfosStateAtom);
    const summary = extInfos.data?.summary || [];
    const res = reduceToFlat(reduceForTable(summary));
    return (
        <div>
            <SectionHeader>
                <div className="uppercase">Current verions summary table</div>
            </SectionHeader>

            <div className="max-w-2xl grid grid-cols-2 gap-x-2">
                <TableToBrowser browser={TBrowser.chrome} table={res[TBrowser.chrome]} />
                <TableToBrowser browser={TBrowser.firefox} table={res[TBrowser.firefox]} />
            </div>
        </div>
    );
}
