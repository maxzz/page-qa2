import React from 'react';
import { useAtom } from 'jotai';
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
        <div className="cursor-default">
            <div className="mb-1 text-sm font-bold">{`${TBrowserName(browser)} extensions`}</div>
            <div className="grid grid-cols-3">
                <div className="border-b text-xs">Brand</div>
                <div className="border-b text-xs">QA</div>
                <div className="border-b text-xs">Public</div>

                {table.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <div className={`text-xs ${idx ? 'opacity-25' : ''}`}>{TBrandName(item.brand)}</div>
                        <div className={`text-xs ${idx ? 'opacity-25' : ''}`} title={`${item.qa?.updated ? `Updated on ${item.qa?.updated}` : ''}`}>{item.qa?.version}</div>
                        <div className={`text-xs ${idx ? 'opacity-25' : ''}`} title={`${item.release?.updated ? `Updated on ${item.release?.updated}` : ''}`}>{item.release?.version}</div>
                    </React.Fragment>))
                }
            </div>
        </div>
    );
}

export function Section2_CurrentVersions() {
    const [extInfos] = useAtom(extInfosStateAtom);
    const summary = extInfos.data?.summary || [];
    const res = reduceToFlat(reduceForTable(summary));
    return (
        <div className="py-2 text-sm flex flex-col space-y-2">
            <p>Summary table of current extension versions.</p>
            <div className="max-w-2xl grid grid-cols-2 gap-x-2">
                <TableToBrowser browser={TBrowser.firefox} table={res[TBrowser.firefox]} />
                <TableToBrowser browser={TBrowser.chrome} table={res[TBrowser.chrome]} />
            </div>
            <div className="text-xs">
                <p className="mb-1">Brand legend:</p>
                <ul className="ml-4 list-disc">
                    <li>DP - extension for DigitalPersoane product</li>
                    <li>HP - extension for HP client secury product</li>
                    <li>DELL - extension for DELL privacy manager product</li>
                </ul>
            </div>
            <div className="text-xs">
                <p className="">* HP and Dell extensions are still available for historical reasons. You don't need to test them.</p>
                <p className="">** The Mozilla Firefox extension is not currently updated due to issues on Moz://a's side.</p>
            </div>
        </div>
    );
}
