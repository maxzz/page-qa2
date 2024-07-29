import type { FilenameMeta } from "../../9-types";
import { FilenameMetaEx } from "./9-types";
import { stringToDate } from "@/utils/helpers";

const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export function convToFilenameMetaEx(item: FilenameMeta): FilenameMetaEx {
    const date = stringToDate(item.updated);
    const year = date.getFullYear();
    
    return {
        ...item,
        year,
        createDate: date.toLocaleDateString('en-US', dateOptions),
        published: false,
    };
}
