import { FilenameMeta } from "../types";

export type VersionTuple = [number, number, number];

export type FilenameMetaVersion = {
    item: FilenameMeta;
    readonly version: VersionTuple;
};

export function strToVersionTuple(version: string): VersionTuple {
    let v = version.split('.').map((v) => +v) as VersionTuple;
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
