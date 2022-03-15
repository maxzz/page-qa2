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

function TableToBrowser({ browser, table }: { browser: TBrowser; table: FlatTableItem[]; }) {
    return (
        <div className="">
            <div className="">{TBrowserName(browser)}</div>
            <div className="grid grid-cols-3">
                <div className="font-bold">Brand</div>
                <div className="font-bold">QA</div>
                <div className="font-bold">Public</div>

                {table.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <div className="">{TBrandName(item.brand)}</div>
                        <div className="">{item.qa?.version}</div>
                        <div className="">{item.release?.version}</div>
                    </React.Fragment>))
                }
            </div>
        </div>
    );
}

// const s = (a: TBrowser, b: TBrowser) => a === TBrowser.chrome ? -1 : a === TBrowser.firefox ? -1 : -1;
// Object.keys(res).sort<TBrowser[]>(s);

export function VersionSummary() {
    const [extInfos] = useAtom(extInfosStateAtom);
    const summary = extInfos.data?.summary || [];
    const chrome = summary.filter((ext) => ext.browser === TBrowser.chrome);

    const tbl = reduceForTable(summary);
    console.log('table', tbl);

    const res = reduceToFlat(tbl);
    console.log('flat', res);

    return (<>
        <SectionHeader>
            <div className="uppercase">Current verions summary table</div>
        </SectionHeader>

        {/* {Object.keys(res).map((key) => <TableToBrowser browser={key as TBrowser} table={res[TBrowser.chrome]} key={key} />)} */}

        <TableToBrowser browser={TBrowser.chrome} table={res[TBrowser.chrome]} />
        <TableToBrowser browser={TBrowser.firefox} table={res[TBrowser.firefox]} />
    </>);
}
