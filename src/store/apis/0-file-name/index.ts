import { regexFnameVerDateRelBrowser } from "../constants";
import { TBrowserShort, convFname2TBrowserShort, TBrowserFname, ReleaseType } from "../types/4-names";

export type FilenameMeta = { // Extension info from archive (or any) filename
    fname: string;
    version: string;
    updated: string;
    release: ReleaseType;
    browser: TBrowserShort;
    isV3: boolean;
};

/**
 * Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
 *  ```
    on: https://crossmatch.hid.gl/g02/current/dppm-3.4.710_on_2023.03.14-r-chrome3.zip
    Match 1:	dppm-3.4.710_on_2023.03.14-r-chrome3
    Group 1:	3.4.710
    Group 2:	2023.03.14
    Group 3:	r
    Group 4:	chrome3
    ```
*/
export function filename2Meta(fname: string): FilenameMeta {
    const match = fname.match(regexFnameVerDateRelBrowser);
    const browser = (match ? convFname2TBrowserShort(match[4] as TBrowserFname) : undefined) || TBrowserShort.chrome;
    const isV3 = browser === TBrowserShort.chrome3;
    const meta: FilenameMeta = {
        fname,
        version: match && match[1] || '',
        updated: match && match[2] || '',
        release: match && match[3] === 'r' ? ReleaseType.release : ReleaseType.debug,
        browser: isV3 ? TBrowserShort.chrome : browser,
        isV3,
    };
    return meta;
}
