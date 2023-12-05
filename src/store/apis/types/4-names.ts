// Brand

export enum TBrand {
    dp = 'dp',
    hp = 'hp',
    de = 'de',
}

export const convTBrand2Name = (v?: TBrand): string =>
    v === TBrand.dp
        ? 'DP'
        : v === TBrand.hp
            ? 'HP'
            : v === TBrand.de
                ? 'Dell'
                : '?';

// Browser short name

export enum TBrowserShort {
    unknown = 'u',
    chrome = 'c',
    chrome3 = '3',
    firefox = 'f',
    edge = 'e',
    dev = 'd',
    ie = 'i',
}

export const convTBrowserShort2Name = (v?: TBrowserShort): string =>
    v === TBrowserShort.chrome3
        ? 'Chrome v3'
        : v === TBrowserShort.chrome
            ? 'Chrome'
            : v === TBrowserShort.firefox
                ? 'Firefox'
                : v === TBrowserShort.edge
                    ? 'Microsoft Edge'
                    : v === TBrowserShort.dev
                        ? 'DevTools'
                        : v === TBrowserShort.ie
                            ? 'IE'
                            : '?';

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

// Build type

export enum ReleaseType {
    release = 'r',          // packed version ready for release
    debug = 'm',            // unpacked but password protected version; not for release
}
