//#region Config File

export namespace FormatCurrentCfg {

    export type MetaFromFilename = {
        version: string;    //"1.4.0.6562"
        updated: string;    //"12.08.2016"
    };

    export type SingleExtensionInfo = {
        url: string;
        version?: string;   //"1.4.0.6562"
        updated?: string;   //"12.08.2016" This is when extension QA build was created. This is updated automatically.
        published?: string; //"12.08.2016" This is when QA extension was published to the Google store. This is updated manually.
    };

    export type BrandExtensionVersions = {
        // At least one 'dp' should be defined, missing one will be defaulted to 'dp'.
        // Firefox extension has a single shared update.jsom file, so it cannot be realy branded now.
        [brand in TBrand]: SingleExtensionInfo; // key: 'dp' | 'hp' | 'de' --> value: metadata
    };

    export type QaReleaseForBrowser = {
        extensionUrl: BrandExtensionVersions;
        qaUrl: BrandExtensionVersions;
    };

    export type TBrowserFname = 'chrome' | 'firefox' | 'me' | 'ie'; // Browser name as defined into config file.

    export type ExtensionsPerBrowser = {
        [key in TBrowserFname]: QaReleaseForBrowser; // key: 'chrome' | 'firefox' | 'me' | 'ie' -> value: IConfigBrowser
    };

    export type Languages = {
        available: string[]; // [ "en", "de", "es", "fr", "it", "ja", "pt-BR" ]
    };

    export type FromFile = {
        browsers: ExtensionsPerBrowser;
        brand: TBrand; // 'dp' | 'hp' | 'de'
        languages: Languages;
    };

    /*
    original:
    {
        "browsers": {
            "chrome": {
                "extensionUrl": {
                    "dp": {
                        "url": "https://chrome.google.com/webstore/detail/digitalpersona-altus/piimgpjgnagkckjlhjcppbkbjjfjmnbh",
                        "version": "1.4.0.6562",
                        "updated": "12.08.2016"
                    },
                    "hp": {
                        "url": "https://chrome.google.com/webstore/detail/hp-client-security-manage/pkdnjfgdoolnmiacpdamadcneoblphbj",
                        "version": "1.4.0.6562",
                        "updated": "12.08.2016"
                    },
                    "de": {
                        "url": "https://chrome.google.com/webstore/detail/digitalpersona-altus/piimgpjgnagkckjlhjcppbkbjjfjmnbh",
                        "version": "1.4.0.6562",
                        "updated": "12.08.2016"
                    }
                },
                "qaUrl": {
                    "dp": {
                        "url": "https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.133_on_2018.07.11-r-chrome.zip"
                    }
                }
            },
            "firefox": {
                "extensionUrl": {
                    "dp": "https://www.crossmatch.com/AltusAddons/g01/pagedp/dppm-1.4.6562_on_2016.12.08-r-firefox-dp.xpi",
                    "hp": "https://www.crossmatch.com/AltusAddons/g01/pagedp/dppm-1.4.6562_on_2016.12.08-r-firefox-dp.xpi",
                    "de": "https://www.crossmatch.com/AltusAddons/g01/pagedp/dppm-1.4.6562_on_2016.12.08-r-firefox-dp.xpi"
                },
                "qaUrl": {
                    "dp": {
                        "url": "https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.137_on_2018.08.09-r-firefox.xpi"
                    }
                }
            },
            "ie": {
            },
            "me": {
            }
        },
        "brand": "dp",
        "languages": {
            "available": [ "en", "de", "es", "fr", "it", "ja", "pt-BR" ]
        }
    }

    current in use:
    {
        "browsers": {
            "chrome": {
                "extensionUrl": {
                    "dp": {
                        "url": "https://chrome.google.com/webstore/detail/digitalpersona-altus/piimgpjgnagkckjlhjcppbkbjjfjmnbh",
                        "version": "3.0.386",
                        "updated": "2019.02.07",
                        "published": "2019.02.24"
                    },
                    "hp": {
                        "url": "https://chrome.google.com/webstore/detail/hp-client-security-manage/pkdnjfgdoolnmiacpdamadcneoblphbj",
                        "version": "3.0.386",
                        "updated": "2019.02.07",
                        "published": "2019.02.24"
                    },
                    "de": {
                        "url": "https://chrome.google.com/webstore/detail/digitalpersona-altus/piimgpjgnagkckjlhjcppbkbjjfjmnbh",
                        "version": "1.4.0.6562",
                        "updated": "12.08.2016",
                        "published": "12.08.2016"
                    }
                },
                "qaUrl": {
                    "dp": {
                        "url": "https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.386_on_2019.02.07-r-chrome.zip"
                    }
                }
            },
            "firefox": {
                "extensionUrl": {
                    "dp": {
                        "url": "https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.386_on_2019.02.07-r-firefox.xpi"
                    }
                },
                "qaUrl": {
                    "dp": {
                        "url": "https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.386_on_2019.02.07-r-firefox.xpi"
                    }
                }
            }
        },
        "brand": "dp",
        "languages": {
            "available": [ "en", "de", "es", "fr", "it", "ja", "pt-BR" ]
        }
    }
    */
} //namespace FormatCurrentCfg

//#endregion Config File

//#region Update File

export namespace FormatUpd {

    export type IUpdateItem = {
        version: string;
        update_link: string;
    };

    export type IUpdateFile = {
        addons: {
            "pasman@crossmatch.com": {
                updates: IUpdateItem[];
            };
        };
    };

    /*
    {
        "addons": {
            "pasman@crossmatch.com": {
                "updates": [
                    {
                        "version": "2.0.7235",
                        "update_link": "https://www.crossmatch.com/AltusAddons/g01/current/dppm-2.0.7235_on_2018.03.12-r-firefox.xpi"
                    }
                ]
            }
        }
    }
    */
} //namespace FormatUpd

//#endregion Update File

//#region FtpVersions File

export namespace FormatFtp {

    export type IFtpFile = {
        type: '-' | 'd' | 'l',    // file type: 'd'- directory; '-' - file; (or 'l' for symlink on **\*NIX only**)
        name: string,             // file name
        size: number,             // file size
        modifyTime: number,       // file timestamp of modified time
        accessTime: number,       // file timestamp of access time
        rights: {
            user: string,         // "rwx"
            group: string,        // "rwx"
            other: string;        // "rwx"
        },
        owner: number,            // user ID
        group: number;            // group ID
    };

    /*
    {
        "type": "-",
        "name": "dppm-2.0.7235_on_2018.03.12-r-firefox.xpi",
        "size": 185816,
        "modifyTime": 1520851475000,
        "accessTime": 1520851557000,
        "rights": {
            "user": "rw",
            "group": "r",
            "other": "r"
        },
        "owner": 1005,
        "group": 48
    },
    */
} //namespace FormatFtp

//#endregion FtpVersions File

//#region Common

export enum TBrand {
    dp = 'dp',
    hp = 'hp',
    de = 'de'
}
export const TBrandName = (v?: TBrand) => v === TBrand.dp ? 'DP' : v === TBrand.hp ? 'HP' : v === TBrand.de ? 'Dell' : '?';

export enum TBrowserShort {
    unknown = 'u',
    chrome = 'c',
    firefox = 'f',
    edge = 'e',
    dev = 'd',
    ie = 'i',
}

export const TBrowserName = (v?: TBrowserShort) => v === TBrowserShort.chrome ? 'Chrome' : v === TBrowserShort.firefox ? 'Firefox' : v === TBrowserShort.edge ? 'Microsoft Edge' : v === TBrowserShort.dev ? 'DevTools': v === TBrowserShort.ie ? 'IE' : '?';
export const TBrowserShortFromFname = (v: FormatCurrentCfg.TBrowserFname) => v === 'chrome' ? TBrowserShort.chrome : v === 'firefox' ? TBrowserShort.firefox : v === 'me' ? TBrowserShort.edge : v === 'ie' ? TBrowserShort.ie : undefined;

//#endregion Common
