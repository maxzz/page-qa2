export {
    IS_GITHUB, 
    URLS,
    regexMarkdownPublicVersions,
    getArchiveExtensionUrl
} from './constants';

export type {
    Meta,
    OneYearExts
} from './2-file-archive/file-archive-parse';

export {
    archiveByYears,
    areTheSameBrowserBrandQa,
    selectLatest,
    getLatestArchiveVersions,
    isAVersionGreaterB,
    getArchiveVersion
} from './2-file-archive/file-archive-parse';

export type {
    CurrentExtensions,
    InAppExtnInfo
} from './1-file-current-config/file-current-config';

export {
    getCurrentConfig
} from './1-file-current-config/file-current-config';

export type {
    ArchiveExtensionMeta
} from './2-file-archive/file-archive';

export {
    getExistingOnServer,
    ReleaseType
} from './2-file-archive/file-archive';

export {
    fetchReleaseNotes
} from './3-file-release-notes/file-release-notes';

export {
    TBrand,
    TBrowserShort
} from './types/api-formats-g01';

export {
    TBrandName,
    TBrowserName
} from './types/api-formats-g01';
