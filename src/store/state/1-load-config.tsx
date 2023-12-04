import { atom } from 'jotai';
import { LoadingDataState, loadingDataStateInit } from '@/hooks/atomsX';
import { marked } from 'marked';
import { archiveByYears, areTheSameBrowserBrandQa, selectLatest, getLatestArchiveVersions, isAVersionGreaterB, OneYearExts, getArchiveVersion, CurrentExtensions, getCurrentConfig, InAppExtnInfo, TBrowserShort, ArchiveExtensionMeta, getExistingOnServer, fetchReleaseNotes, regexMarkdownPublicVersions, FormatCurrentCfg } from '../apis';
import { toastError } from '@/components/ui/UiToaster';
