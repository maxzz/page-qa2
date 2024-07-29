import { Brand } from "./5-names-brand";
import { FilenameMeta } from "./9-names-file-name";

/**
 * Extension info from config.json
 */
export type ExtnFromConfig = Prettify<
    & FilenameMeta
    & {
        qa?: boolean;                   // true
        brand?: Brand;                 // "dp"
    }
>;

/**
 * Summary on extensions from FTP files list and config.json
 */
export type CurrentExtensions = {
    chrome: ExtnFromConfig;
    firefox: ExtnFromConfig;
    summary: ExtnFromConfig[];
};
