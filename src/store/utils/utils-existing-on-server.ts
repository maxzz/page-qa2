import { getFtpExtensionsUrl, Regex_FNAME_VerDateRelBrouser } from "./constants";

export interface ArchiveExtensionMeta { // Extension info from filename
    fname: string;
    version: string;
    updated: string;
    release: boolean;
    browser: string;
}

function getFnameMeta(fname: string): ArchiveExtensionMeta {
    // Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
    const match = fname.match(Regex_FNAME_VerDateRelBrouser);
    let meta: ArchiveExtensionMeta = {} as any;
    meta.fname = fname;
    meta.version = match ? match[1] : '';
    meta.updated = match ? match[2] : '';
    meta.release = match ? match[3] === 'r' : false;
    meta.browser = match ? match[4] : '';
    return meta;
}

namespace FtpFiles {
    export interface FileRights {
        user: string;
        group: string;
        other: string;
    }

    export interface FileRecord {
        type: string;
        name: string;
        size: number;
        modifyTime: number;
        accessTime: number;
        rights: FileRights;
        owner: number;
        group: number;
    }
}

export async function getExistingOnServer(): Promise<ArchiveExtensionMeta[]> {
    //console.log('Fetching: extensions on server', getFtpExtensionsUrl());

    const response = await fetch(getFtpExtensionsUrl(), { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error('No access to the HID server');
    }
    let existingRaw: FtpFiles.FileRecord[] = await response.json();

    let existing: ArchiveExtensionMeta[] =
        existingRaw
            .map((file: FtpFiles.FileRecord) => getFnameMeta(file.name))
            .filter((meta) => meta.version); // skip empty non extension names wo/ version.

    // added one more path to traytools.zip
    existing.push({
        fname: '../../maxz/traytools.zip.txt',
        version: '2.0.7234',
        updated: '2019.10.20',
        release: false,
        browser: 'maxz',

    });

    existing.sort((a, b) => a.version < b.version ? -1 : a.version > b.version ? 1 : 0);

    return existing;
}
