import { FormatCurrentCfg, TBrowserShort, TBrowserShortFromFname } from "../types";
import { getFtpExtensionsUrl, regexFnameVerDateRelBrowser } from "../constants";

export enum ReleaseType {
    release = 'r',  // pucked version ready for release
    debug = 'm',    // unpucked password protected version not for release
}

export type ArchiveExtensionMeta = { // Extension info from filename
    fname: string;
    version: string;
    updated: string;
    release: ReleaseType;
    browser: TBrowserShort;
    isV3: boolean;
};

function metaFromFilename(fname: string): ArchiveExtensionMeta {
    // 0. Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
    const match = fname.match(regexFnameVerDateRelBrowser);
    const browser = (match ? TBrowserShortFromFname(match[4] as FormatCurrentCfg.TBrowserFname) : undefined) || TBrowserShort.chrome;
    const meta: ArchiveExtensionMeta = {
        fname,
        version: match ? match[1] : '',
        updated: match ? match[2] : '',
        release: match ? match[3] === 'r' ? ReleaseType.release : ReleaseType.debug : ReleaseType.debug,
        browser: browser === TBrowserShort.chrome3 ? TBrowserShort.chrome : browser,
        isV3: browser === TBrowserShort.chrome3,
    };
    return meta;
}

namespace FtpFiles {
    export type FileRecord = {
        type: string;
        name: string;
        size: number;
        modifyTime: number;
        accessTime: number;
        rights: FileRights;
        owner: number;
        group: number;
    };

    export type FileRights = {
        user: string;
        group: string;
        other: string;
    };
}

const traytools: ArchiveExtensionMeta = {
    fname: '../../maxz/traytools.zip.txt',
    version: '2.0.7234',
    updated: '2017.10.20', // It was 2019.10.20 but moved in time to have it as a separate group.
    release: ReleaseType.debug,
    browser: TBrowserShort.dev,
    isV3: false,
};

export async function getExistingOnServer(): Promise<ArchiveExtensionMeta[]> {
    //console.log('Fetching: extensions on server', getFtpExtensionsUrl());

    const response = await fetch(getFtpExtensionsUrl(), { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`No access to the HID server. Failed to get "${getFtpExtensionsUrl()}"`);
    }
    let existing: FtpFiles.FileRecord[] = await response.json();

    let rv: ArchiveExtensionMeta[] = existing
        .map((file: FtpFiles.FileRecord) => metaFromFilename(file.name))
        .filter((meta: ArchiveExtensionMeta) => meta.version); // skip empty non extension names not matched by regex pattern.

    rv.push(traytools); // add one more path to traytools.zip

    return rv;
}
