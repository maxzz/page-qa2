import { FormatCurrentCfg } from "./1-ftp-file-config";

export const TBrandName = (v?: FormatCurrentCfg.TBrand) =>
    v === FormatCurrentCfg.TBrand.dp
        ? 'DP'
        : v === FormatCurrentCfg.TBrand.hp
            ? 'HP'
            : v === FormatCurrentCfg.TBrand.de
                ? 'Dell'
                : '?';

export enum TBrowserShort {
    unknown = 'u',
    chrome = 'c',
    firefox = 'f',
    edge = 'e',
    dev = 'd',
    ie = 'i',
}

export const TBrowserName = (v?: TBrowserShort) =>
    v === TBrowserShort.chrome
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

export const TBrowserShortFromFname = (v: FormatCurrentCfg.TBrowserFname) =>
    v === 'chrome'
        ? TBrowserShort.chrome
        : v === 'firefox'
            ? TBrowserShort.firefox
            : v === 'me'
                ? TBrowserShort.edge
                : v === 'ie'
                    ? TBrowserShort.ie
                    : undefined;