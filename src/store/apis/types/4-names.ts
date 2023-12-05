export type TBrowserFname = 'chrome3' | 'chrome' | 'firefox' | 'me' | 'ie'; // Browser name as defined into config file. 'chrome3' exists only in the filename.

export enum TBrand {
    dp = 'dp',
    hp = 'hp',
    de = 'de'
}

export const convTBrand2Name = (v?: TBrand) =>
    v === TBrand.dp
        ? 'DP'
        : v === TBrand.hp
            ? 'HP'
            : v === TBrand.de
                ? 'Dell'
                : '?';

export enum TBrowserShort {
    unknown = 'u',
    chrome = 'c',
    chrome3 = '3',
    firefox = 'f',
    edge = 'e',
    dev = 'd',
    ie = 'i',
}

export const convTBrowserShort2Name = (v?: TBrowserShort) =>
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

export const convFname2TBrowserShort = (v: TBrowserFname) =>
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
