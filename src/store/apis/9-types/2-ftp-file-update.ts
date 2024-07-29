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
