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
