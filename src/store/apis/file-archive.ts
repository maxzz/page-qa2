import { FormatCurrentCfg, TBrowserShort, TBrowserShortFromFname } from "./api-formats-g01";
import { getFtpExtensionsUrl, regexFnameVerDateRelBrouser } from "./constants";

export type ArchiveExtensionMeta = { // Extension info from filename
    fname: string;
    version: string;
    updated: string;
    release: boolean;
    browser: TBrowserShort | undefined;
};

function metaFromFilename(fname: string): ArchiveExtensionMeta {
    // 0. Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
    const match = fname.match(regexFnameVerDateRelBrouser);
    const meta: ArchiveExtensionMeta = {
        fname,
        version: match ? match[1] : '',
        updated: match ? match[2] : '',
        release: match ? match[3] === 'r' : false,
        browser: match ? TBrowserShortFromFname(match[4] as FormatCurrentCfg.TBrowserFname) : undefined,
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

type ExistingOnServer = {
    existing: ArchiveExtensionMeta[];
    latestCh: ArchiveExtensionMeta | undefined;
    latestFf: ArchiveExtensionMeta | undefined;
};

export async function getExistingOnServer(): Promise<ExistingOnServer> {
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
        release: false,
        browser: TBrowserShort.dev,
    });

    const reverse = [...existing].reverse();
    const latestCh = reverse.find((item) => item.browser === TBrowserShort.chrome);
    const latestFf = reverse.find((item) => item.browser === TBrowserShort.firefox);

    return {
        existing,
        latestCh,
        latestFf,
    };
}
