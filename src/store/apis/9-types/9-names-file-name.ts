import { regexFnameVerDateRelBrowser } from "../constants";
import { Browser } from "./7-names-browser-short";
import { convBrowserFname2Browser, BrowserFname } from "./8-names-browser-fname";
import { BuildType } from "./6-names-build";

export type FilenameMeta = {    // Extension info from archive (or full url) filename
    fname: string;              // short filename or url "https://crossmatch.hid.gl/g02/dppm-3.4.430_on_2022.03.04-r-chrome.zip"
    version: string;            // "3.4.430"
    updated: string;            // "2022.03.04"
    browser: Browser;           // "c"
    broIcon: Browser;           // browser icon
    build: BuildType;           // "r" or "m"
    isV3: boolean;              // is service-worker extension witm manifest v3
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
    const browser = (match ? convBrowserFname2Browser(match[4] as BrowserFname) : undefined) || Browser.chrome;
    const isV3 = browser === Browser.chrome3;

    const rv: FilenameMeta = {
        fname,
        version: match && match[1] || '',
        updated: match && match[2] || '',
        build: match && match[3] === 'r' ? BuildType.release : BuildType.debug,
        browser: isV3 ? Browser.chrome : browser,
        broIcon: isV3 ? Browser.chrome3 : browser,
        isV3,
    };

    return rv;
}
