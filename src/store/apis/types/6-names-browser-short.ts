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

