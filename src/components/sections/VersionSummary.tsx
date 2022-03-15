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

function reduceForTable(infos: IExtnInfo[]) {
    return infos.reduce<Table>((acc, cur) => {
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

export function VersionSummary() {
    const [extInfos] = useAtom(extInfosStateAtom);
    const summary = extInfos.data?.summary || [];
    const chrome = summary.filter((ext) => ext.browser === TBrowser.chrome);

    const res = reduceForTable(summary);
    console.log('table', res);

    return (
        <>
            <SectionHeader>
                <div className="uppercase">Current verions summary table</div>
            </SectionHeader>
            <div className="grid grid-cols-3">
                <div className="">Brand</div>
                <div className="">QA</div>
                <div className="">Public</div>

                {chrome.map((ext) => (
                    <>
                        <div className="">{TBrandName(ext.brand)}</div>
                        <div className="">{ext.version}</div>
                        <div className="">{`${ext.qa}`}</div>
                    </>
                ))}
            </div>
        </>
    );
}
