import { FormatCurrentCfg, TBrowserShort, TBrowserShortFromFname } from "../types/api-formats-g01";
import { getFtpExtensionsUrl, regexFnameVerDateRelBrouser } from "../constants";

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
};

function metaFromFilename(fname: string): ArchiveExtensionMeta {
    // 0. Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
    const match = fname.match(regexFnameVerDateRelBrouser);
    const browser = match ? TBrowserShortFromFname(match[4] as FormatCurrentCfg.TBrowserFname) : undefined;
    const meta: ArchiveExtensionMeta = {
        fname,
        version: match ? match[1] : '',
        updated: match ? match[2] : '',
        release: match ? match[3] === 'r' ? ReleaseType.release : ReleaseType.debug : ReleaseType.debug,
        browser: browser || TBrowserShort.chrome,
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

export async function getExistingOnServer(): Promise<ArchiveExtensionMeta[]> {
    //console.log('Fetching: extensions on server', getFtpExtensionsUrl());

    const response = await fetch(getFtpExtensionsUrl(), { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`No access to the HID server. Failed to get "${getFtpExtensionsUrl()}"`);
    }
    let existingRaw: FtpFiles.FileRecord[] = await response.json();

    let existing: ArchiveExtensionMeta[] =
        existingRaw
            .map((file: FtpFiles.FileRecord) => metaFromFilename(file.name))
            .filter((meta: ArchiveExtensionMeta) => meta.version); // skip empty non extension names not matched by regex pattern.

    // added one more path to traytools.zip
    existing.push({
        fname: '../../maxz/traytools.zip.txt',
        version: '2.0.7234',
        updated: '2017.10.20', // It was 2019.10.20 but moved in time to have it as a separate group.
        release: ReleaseType.debug,
        browser: TBrowserShort.dev,
    });

    return existing;
}
