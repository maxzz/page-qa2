// Browser short name

export enum Browser {
    unknown = 'u',
    chrome = 'c',
    chrome3 = '3',
    firefox = 'f',
    edge = 'e',
    dev = 'd',
    ie = 'i',
}

export const convBrowser2Name = (v?: Browser): string =>
    v === Browser.chrome3
        ? 'Chrome v3'
        : v === Browser.chrome
            ? 'Chrome'
            : v === Browser.firefox
                ? 'Firefox'
                : v === Browser.edge
                    ? 'Microsoft Edge'
                    : v === Browser.dev
                        ? 'DevTools'
                        : v === Browser.ie
                            ? 'IE'
                            : '?';

