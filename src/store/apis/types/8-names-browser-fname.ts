import { BrowserShort } from "./7-names-browser-short";

// Browser short name from filename

export type BrowserFname = 'chrome3' | 'chrome' | 'firefox' | 'me' | 'ie'; // Browser name as defined into config file. 'chrome3' exists only in the filename.

export const convBrowserFname2BrowserShort = (v: BrowserFname): BrowserShort | undefined =>
    v === 'chrome3'
        ? BrowserShort.chrome3
        : v === 'chrome'
            ? BrowserShort.chrome
            : v === 'firefox'
                ? BrowserShort.firefox
                : v === 'me'
                    ? BrowserShort.edge
                    : v === 'ie'
                        ? BrowserShort.ie
                        : undefined;
