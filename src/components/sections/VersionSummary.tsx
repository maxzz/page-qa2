import React from 'react';
import { useAtom } from 'jotai';
import { SectionHeader } from '../Frontpage';
import { extInfosStateAtom } from '@/store/store';
import { IExtnInfo, TBrand, TBrandName, TBrowser } from '@/store/utils/utils-current-config';

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

type FlatTable = {
    [key in TBrowser]: {
        brand: string;
        qa?: IExtnInfo;
        release?: IExtnInfo;
    }[]
};

function reduceToFlat(table: Table): FlatTable {
    const res = {} as FlatTable;
    for (const [brKey, brVal] of Object.entries(table) as [TBrowser, Table[TBrowser]][]) {
        if (!res[brKey]) {
            res[brKey] = [];
        }
        for (const [bdKey, bdVal] of Object.entries(brVal) as [TBrand, { qa?: IExtnInfo; release?: IExtnInfo; }][]) {
            res[brKey].push({
                brand: TBrandName(bdKey),
                qa: bdVal.qa,
                release: bdVal.release,
            });
        }
    }
    return res;
}

export function VersionSummary() {
    const [extInfos] = useAtom(extInfosStateAtom);
    const summary = extInfos.data?.summary || [];
    const chrome = summary.filter((ext) => ext.browser === TBrowser.chrome);

    const res = reduceForTable(summary);
    console.log('table', res);

    return (<>
        <SectionHeader>
            <div className="uppercase">Current verions summary table</div>
        </SectionHeader>

        <div className="grid grid-cols-3">
            <div className="font-bold">Brand</div>
            <div className="font-bold">QA</div>
            <div className="font-bold">Public</div>

            {chrome.map((ext, idx) => (
                <React.Fragment key={idx}>
                    <div className="">{TBrandName(ext.brand)}</div>
                    <div className="">{ext.version}</div>
                    <div className="">{`${ext.qa}`}</div>
                </React.Fragment>))
            }
        </div>

        <div className="grid grid-cols-3">
            <div className="font-bold">Brand</div>
            <div className="font-bold">QA</div>
            <div className="font-bold">Public</div>

            {chrome.map((ext, idx) => (
                <React.Fragment key={idx}>
                    <div className="">{TBrandName(ext.brand)}</div>
                    <div className="">{ext.version}</div>
                    <div className="">{`${ext.qa}`}</div>
                </React.Fragment>))
            }
        </div>
    </>);
}
