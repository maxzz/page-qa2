import { FilenameMeta } from "../../9-types";

export type FilenameMetaEx = Prettify<
    & FilenameMeta
    & {
        year: number;           // year when extension was created
        createDate: string;     // when extension was created
        published: boolean;     // published information from release notes
    }
>;

export type VersionsMap = Record<string, FilenameMetaEx[]>; // extension version ("3.4.709") -> browser extensions []

export type YearExts = {
    yearStr: string;            // TODO: check why it is string
    items: VersionsMap;
};
