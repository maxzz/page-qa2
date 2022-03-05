import * as CONST from './constants';

namespace ExistingExtensions {

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

} //namespace ExistingExtensions

export interface IFnameMeta { // Extension info from filename
    fname: string;
    version: string;
    updated: string;
    release: boolean;
    browser: string;
}

function getFnameMeta(fname: string): IFnameMeta {
    // Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
    const match = fname.match(CONST.Regex_FNAME_VerDateRelBrouser);
    let meta: IFnameMeta = {} as any;
    meta.fname = fname;
    meta.version = match ? match[1] : '';
    meta.updated = match ? match[2] : '';
    meta.release = match ? match[3] === 'r' : false;
    meta.browser = match ? match[4] : '';
    return meta;
}

export async function getExistingOnServer(): Promise<IFnameMeta[]> {
    console.log('Fetching: extensions on server');

    const response = await fetch(`${CONST.API_URL}existing.json`, { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error('No access to the HID server');
    }
    let existingRaw: ExistingExtensions.FileRecord[] = await response.json();

    let existing: IFnameMeta[] = existingRaw
        .map((_: ExistingExtensions.FileRecord) => getFnameMeta(_.name))
        .filter((_) => _.version); // skip empty non extension names wo/ version.

    // added one more path to traytools.zip
    existing.push({
        fname: '../../maxz/traytools.zip.txt',
        version: '2.0.7234',
        updated: '2019.10.20',
        release: false,
        browser: 'maxz',

    });
    existing.sort((a, b) => {
        if (a.version < b.version) {
            return -1;
        } else if (a.version > b.version) {
            return 1;
        } else {
            return 0;
        }
    });
    return existing;
}
