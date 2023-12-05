import { FilenameMeta, FtpFiles, ReleaseType, TBrowserShort, filename2Meta } from "../types";
import { urlFtpExtensions } from "../constants";

const traytools: FilenameMeta = {
    fname: '../../maxz/traytools.zip.txt',
    version: '2.0.7234',
    updated: '2017.10.20', // It was 2019.10.20 but moved in time to have it as a separate group.
    release: ReleaseType.debug,
    browser: TBrowserShort.dev,
    isV3: false,
};

export async function getExistingOnServer(): Promise<FilenameMeta[]> {
    //console.log('Fetching: extensions on server', getFtpExtensionsUrl());

    const response = await fetch(urlFtpExtensions(), { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`No access to the HID server. Failed to get "${urlFtpExtensions()}"`);
    }
    let existing: FtpFiles.FileRecord[] = await response.json();

    let rv: FilenameMeta[] = existing
        .map((file: FtpFiles.FileRecord) => filename2Meta(file.name))
        .filter((meta: FilenameMeta) => meta.version); // skip empty non extension names not matched by regex pattern.

    rv.push(traytools);

    return rv;
}
