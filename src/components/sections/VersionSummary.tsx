import React from 'react';
import { useAtom } from 'jotai';
import { SectionHeader } from '../Frontpage';
import { extInfosStateAtom } from '@/store/store';
import { TBrandName, TBrowser } from '@/store/utils/utils-current-config';

export function VersionSummary() {
    const [extInfos] = useAtom(extInfosStateAtom);
    const summary = extInfos.data?.summary || [];
    const chrome = summary.filter((ext) => ext.browser === TBrowser.chrome);
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
