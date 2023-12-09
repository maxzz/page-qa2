import { FilenameMeta } from "../types";

export type VersionTuple = [number, number, number];

export type FilenameMetaVersion = {
    item: FilenameMeta;
    readonly version: VersionTuple;
};

export function strToVersionTuple(version: string | undefined): VersionTuple {
    let v = (version || '').split('.').map((v) => +v) as VersionTuple;
    if (v.length !== 3) {
        v = [0, 0, 0];
    }
    return v;
}

export function convToFilenameMetaVersion(item: FilenameMeta): FilenameMetaVersion {
    return {
        item,
        version: strToVersionTuple(item.version),
    };
}

export function compareFilenameMetaVersions(a: FilenameMetaVersion, b: FilenameMetaVersion): number {
    const [a1, a2, a3] = a.version;
    const [b1, b2, b3] = b.version;
    return a1 - b1 || a2 - b2 || a3 - b3;
}

export function isVersionAGreaterB(a?: string, b?: string): boolean { // '3.4.429' vs. '3.4.430'
    const [a1, a2, a3] = strToVersionTuple(a);
    const [b1, b2, b3] = strToVersionTuple(b);
    const res = a1 - b1 || a2 - b2 || a3 - b3;
    return res > 0;
}
