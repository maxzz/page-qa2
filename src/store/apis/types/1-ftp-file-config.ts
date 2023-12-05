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

    export type TBrowserFname = 'chrome3' | 'chrome' | 'firefox' | 'me' | 'ie'; // Browser name as defined into config file. 'chrome3' exists only in the filename.

    export enum TBrand {
        dp = 'dp',
        hp = 'hp',
        de = 'de'
    }

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
}
