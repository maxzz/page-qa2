export {
    IS_GITHUB, URL_CONFLUENCE,
    URL_OLD_QA_WEBSITE,
    URL_HID_PMIT,
    URL_HID_PMAC,
    URL_INSTALL_DP_PAGE,
    URL_INSTALL_GOOGLE_STORE,
    regexMarkdownPublicVersions,
    getArchiveExtensionUrl
} from './constants';

export type {
    Meta,
    OneYearExts
} from './file-archive-parse';

export {
    archiveByYears,
    areTheSameBrowserBrandQa,
    selectLatest,
    getLatestArchiveVersions,
    isAVersionGreaterB,
    getArchiveVersion
} from './file-archive-parse';

export type {
    CurrentExtensions,
    InAppExtnInfo
} from './file-current-config';

export {
    getCurrentConfig
} from './file-current-config';

export type {
    ArchiveExtensionMeta
} from './file-archive';

export {
    getExistingOnServer,
    ReleaseType
} from './file-archive';

export {
    fetchReleaseNotes
} from './file-release-notes';

export {
    TBrand,
    TBrowserShort
} from './api-formats-g01';

export {
    TBrandName,
    TBrowserName
} from './api-formats-g01';
