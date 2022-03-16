import React from 'react';
import { useAtom } from 'jotai';
import { extArchiveStateAtom } from '@/store/store';
import * as CONST from '@/store/utils/constants';
import { IFnameMeta } from '@/store/utils/utils-existing-on-server';
import { SectionHeader } from '../Frontpage';

function getUrl(name: string) {
    return `${CONST.API_URL}${name}`;
}

function getClass(mdfile: IFnameMeta) {
    if (mdfile.browser === 'chrome') {
        return 'br-chrome';
    }
    if (mdfile.browser === 'firefox') {
        return 'br-firefox';
    }
    if (mdfile.browser === 'maxz') {
        return 'br-maxz';
    }
    return 'br-edge';
}

type Meta = IFnameMeta & {
    date: string;
}

export function PreviousVersions() {
    const [extArchiveState] = useAtom(extArchiveStateAtom);
    const archive = extArchiveState.data || [];
    return (
        <div className="">
            <SectionHeader>
                <div className="" title="Previously released extensions">Archive</div>
            </SectionHeader>
            <div className="mt-1 text-sm">List of previously released extensions available on the HID server.</div>
            <div className="mt-1 text-xs columns-5">
                {archive.map((item, idx) => (
                    <div className="" key={idx}>{item.version}</div>
                ))}
            </div>
        </div>
    );
}
