import { regexFnameVerDateRelBrowser } from "../constants";
import { TBrowserShort } from "./6-names-browser-short";
import { convFname2TBrowserShort, TBrowserFname } from "./7-names-browser-fname";
import { ReleaseType } from "./8-names-release";

export type FilenameMeta = { // Extension info from archive (or full url) filename
    fname: string;          // short filename or url "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/dppm-3.4.430_on_2022.03.04-r-chrome.zip"
    version: string;        // "3.4.430"
    updated: string;        // "2022.03.04"
    browser: TBrowserShort; // "c"
    
    release: ReleaseType;
    isV3: boolean;
};

/**
 * Gets version and release date from: dppm-3.0.137_on_2018.08.09-r-firefox.xpi
 *  ```
 *  // From: https://crossmatch.hid.gl/g02/current/dppm-3.4.710_on_2023.03.14-r-chrome3.zip
 *  Match 1: 'dppm-3.4.710_on_2023.03.14-r-chrome3'
 *  Group 1: '3.4.710'
 *  Group 2: '2023.03.14'
 *  Group 3: 'r'
 *  Group 4: 'chrome3'
 *  ```
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
