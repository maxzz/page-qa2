export type { OneYearExts } from './file-archive-parse';

export {
    archiveByYears,
    areTheSameBrowserBrandQa,
    selectLatest,
    getLatestArchiveVersions,
    isAVersionGreaterB,
    getArchiveVersion
} from './file-archive-parse';

export type { CurrentExtensions, InAppExtnInfo } from './file-current-config';
export { getCurrentConfig } from './file-current-config';

export type { ArchiveExtensionMeta } from './file-archive';
export { getExistingOnServer } from './file-archive';

export { fetchReleaseNotes } from './file-release-notes';
