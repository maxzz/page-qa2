// Browser short name

export enum BrowserShort {
    unknown = 'u',
    chrome = 'c',
    chrome3 = '3',
    firefox = 'f',
    edge = 'e',
    dev = 'd',
    ie = 'i',
}

export const convBrowserShort2Name = (v?: BrowserShort): string =>
    v === BrowserShort.chrome3
        ? 'Chrome v3'
        : v === BrowserShort.chrome
            ? 'Chrome'
            : v === BrowserShort.firefox
                ? 'Firefox'
                : v === BrowserShort.edge
                    ? 'Microsoft Edge'
                    : v === BrowserShort.dev
                        ? 'DevTools'
                        : v === BrowserShort.ie
                            ? 'IE'
                            : '?';

