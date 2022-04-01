// Legacy

//export const ROOT_FTP_URL = '/AltusAddons/g01/current';
//export const ROOT_WEB_URL = 'https://www.crossmatch.com/AltusAddons/g01/current/';
//https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/config.json

const IS_HID = /hidglobal/.test(window?.location.host || '');

export const URL_CONFLUENCE = 'https://crossmatch.atlassian.net/wiki/spaces/ALTUS/pages/103023073/Browser+extensions+installation';
export const URL_OLD_QA_WEBSITE = 'https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa1/index.html';

const ROOT_EXT_ARCHIVE = 'https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/';

const ROOT_HID_URL = 'https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/';
const ROOT_GITHUB_URL = './';

const ROOT_WEB_URL = IS_HID ? ROOT_HID_URL : ROOT_GITHUB_URL;
const ROOT_TEST_URL = './';

const API_URL = import.meta.env.PROD ? ROOT_WEB_URL : ROOT_TEST_URL;

console.log('host', window.location.host);
console.log('root', API_URL);
console.log('loc3 hidglobal', /hidglobal/.test(window?.location.host || ''));
console.log('loc4 localhost', /localhost/.test(window?.location.host || ''));

export const Regex_FNAME_VerDate           = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)/i; // version and date
export const Regex_FNAME_VerDateRelBrouser = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)-(r)-(chrome|firefox|edge)/i; // version and date release browser

export function getCurrentConfigUrl() {
    return `${API_URL}config.json`;
}

export function getMarkdownUrl() {
    return `${API_URL}history.md`;
}

export function getFtpExtensionsUrl() {
    return `${API_URL}existing.json`;
}

export function getArchiveExtensionUrl(name: string) {
    return `${ROOT_EXT_ARCHIVE}${name}`;
}
