// Locations

export const IS_HID = /hidglobal/.test(window?.location.host || '');

const currentHost = (() => {
    const reG01 = /([\s\S]*)\/g01\/([\s\S]*)/;

    const m = (window.location.href || '').match(reG01);
    // const m = ('https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa1/index.html').match(reG01);
    return m ? m[1] : 'https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons';
})();

//console.log('currentHostName', currentHost);

export const URL_CONFLUENCE = 'https://wiki.hidglobal.com/display/ALTUS/Browser+extensions+installation';
export const URL_OLD_QA_WEBSITE = `${currentHost}/g01/pageqa1/index.html`;

const ROOT_EXT_ARCHIVE = `${currentHost}/g01/current/`;

const ROOT_HID_URL = `${currentHost}/g01/current/`;
const ROOT_GITHUB_URL = './';

const ROOT_WEB_URL = IS_HID ? ROOT_HID_URL : ROOT_GITHUB_URL;
const ROOT_TEST_URL = './';

const API_URL = import.meta.env.PROD ? ROOT_WEB_URL : ROOT_TEST_URL;

export const regexMarkdownPublicVersions = /#### version ([.\d]+) <span class="date">[.\d]+<\/span>.?public/gi; // to build ['3.4.419', '3.0.386', '3.0.378']
export const regexFnameVerDate           = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)/i; // version and date
export const regexFnameVerDateRelBrouser = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)-(r|m)-(chrome|firefox|edge)/i; // version and date release browser

// API generated locations

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
