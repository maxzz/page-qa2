import { TBrand } from "./5-names-brand";
import { FilenameMeta } from "./9-names-file-name";

export type ExtnFromConfig = Prettify<  // Extension info from config file
    & FilenameMeta
    & {
        qa?: boolean;                   // true
        brand?: TBrand;                 // "dp"
    }
>;

export interface CurrentExtensions { // Extensions on Ftp server
    chrome: ExtnFromConfig;
    firefox: ExtnFromConfig;
    summary: ExtnFromConfig[];
}
