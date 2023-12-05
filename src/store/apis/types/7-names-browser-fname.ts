import { TBrowserShort } from "./6-names-browser-short";

// Browser short name from filename

export type TBrowserFname = 'chrome3' | 'chrome' | 'firefox' | 'me' | 'ie'; // Browser name as defined into config file. 'chrome3' exists only in the filename.

export const convFname2TBrowserShort = (v: TBrowserFname): TBrowserShort | undefined =>
    v === 'chrome3'
        ? TBrowserShort.chrome3
        : v === 'chrome'
            ? TBrowserShort.chrome
            : v === 'firefox'
                ? TBrowserShort.firefox
                : v === 'me'
                    ? TBrowserShort.edge
                    : v === 'ie'
                        ? TBrowserShort.ie
                        : undefined;
