import { Browser } from "./7-names-browser-short";

// Browser short name from filename

export type BrowserFname = 'chrome3' | 'chrome' | 'firefox' | 'me' | 'ie'; // Browser name as defined into config file. 'chrome3' exists only in the filename.

export const convBrowserFname2Browser = (v: BrowserFname): Browser | undefined =>
    v === 'chrome3'
        ? Browser.chrome3
        : v === 'chrome'
            ? Browser.chrome
            : v === 'firefox'
                ? Browser.firefox
                : v === 'me'
                    ? Browser.edge
                    : v === 'ie'
                        ? Browser.ie
                        : undefined;
