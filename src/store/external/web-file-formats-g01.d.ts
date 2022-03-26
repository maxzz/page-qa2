//#region File Definitions

declare namespace FormatCfg {
    export interface IFilenameMeta {
        version: string; //"1.4.0.6562"
        updated: string; //"12.08.2016"
    }

    export interface IVersionMeta {
        url: string;
        version?: string; //"1.4.0.6562"
        updated?: string; //"12.08.2016" This is when extension QA build was created. This is updated automatically.
        published?: string; //"12.08.2016" This is when QA extension was published to the Google store. This is updated manually.
    }

    export type IExtensionUrl = {
        // At least one 'dp' should be defined, missing one will be defaulted to 'dp'.
        // Firefox extension has a single shared update.jsom file, so it cannot be realy branded now.
        [brand: string] : IVersionMeta; // key: 'dp' | 'hp' | 'de' --> metadata
    };

    export interface IConfigBrowser {
        extensionUrl: IExtensionUrl;
        qaUrl: IExtensionUrl;
    }

    export interface IConfigBrowsers {
        [key: string]: IConfigBrowser; // 'chrome' | 'firefox' | 'me' | 'ie' -> IConfigBrowser
    }

    export interface IConfigLanguages {
        available: string[];
    }

    export interface IConfigFile {
        browsers: IConfigBrowsers;
        brand: 'dp' | 'hp' | 'de';
        languages: IConfigLanguages;
    }
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
} //namespace FormatCfg

declare namespace FormatUpd {
    export interface IUpdateItem {
        version: string;
        update_link: string;
    }

    export interface IUpdateFile {
        addons: {
            "pasman@crossmatch.com": {
                updates: IUpdateItem[];
            }
        }
    }
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

declare namespace FormatFtp {
    export interface IFtpFile {
        type: '-' | 'd' | 'l',    // file type: 'd'- directory; '-' - file; (or 'l' for symlink on **\*NIX only**)
        name: string,             // file name
        size: number,             // file size
        modifyTime: number,       // file timestamp of modified time
        accessTime: number,       // file timestamp of access time
        rights: {
            user: string,         // "rwx"
            group: string,        // "rwx"
            other: string         // "rwx"
        },
        owner: number,            // user ID
        group: number             // group ID
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
    } //interface IFtpFile

    export type IFtpList = IFtpFile[];

    export interface IFilesAccess {
        [name: string]: IFtpFile;
    }
    // let listAccess: FormatFtp.IFilesAccess = list.reduce((acc: FormatFtp.IFilesAccess, _: FormatFtp.IFtpFile) => (acc[_.name] = _, acc), {});

} //namespace FormatFtp

//#endregion File Definitions