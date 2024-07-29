import { FilenameMetaVersion } from "../3-filename-meta-version";

export function getFilenameMetaVersionByVersion(archive: FilenameMetaVersion[] | null, version?: string): FilenameMetaVersion | undefined {
    return (
        version
            ? archive?.find(({ item }) => item.version === version)
            : undefined
    );
}
