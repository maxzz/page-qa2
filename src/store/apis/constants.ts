// Locations

//Old FTP: // https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa/index.html
//New FTP: // https://crossmatch.hid.gl/g02/pageqa/

export const IS_REMOTE = /\/g0\d\//.test(window?.location.host || ''); // /hidglobal/.test(window?.location.host || '');

type CurrentLocation = {
    host: string;   // part before generation
    gen: string;    // generation
};

const currentLocation: CurrentLocation = (() => {
    const reG01 = /([\s\S]*)\/(g0\d)\/([\s\S]*)/; // 1:'https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons' 2:'/g0(1|2)/' 3:'pageqa/index.html'

    const m = (window.location.href || '').match(reG01);            //https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa/index.html
    return {
        host: m ? m[1] : 'https://crossmatch.hid.gl/g02/pageqa',    //https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons,,
        gen: m ? m[2] : '',
    };
})();

export const URL_CONFLUENCE = 'https://wiki.hidglobal.com/display/ALTUS/Browser+extensions+installation'; //TODO: make a local copy on this website
export const URL_OLD_QA_WEBSITE = `${currentLocation.host}/${currentLocation.gen}/pageqa1/index.html`;

const ROOT_EXT_ARCHIVE = `${currentLocation.host}/${currentLocation.gen}/current/`;

const ROOT_HID_URL = `${currentLocation.host}/${currentLocation.gen}/current/`;
const ROOT_GITHUB_URL = './';

const ROOT_WEB_URL = IS_REMOTE ? ROOT_HID_URL : ROOT_GITHUB_URL;
const ROOT_TEST_URL = './';

const API_URL = import.meta.env.PROD ? ROOT_WEB_URL : ROOT_TEST_URL;

export const regexMarkdownPublicVersions = /#### version ([.\d]+) <span class="date">[.\d]+<\/span>.?public/gi; // to build ['3.4.419', '3.0.386', '3.0.378']
export const regexFnameVerDate = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)/i; // version and date
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
