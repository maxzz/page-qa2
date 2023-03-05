// Locations

//Old FTP: // https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa/index.html
//Old FTP: // https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa1/index.html
//New FTP: // https://crossmatch.hid.gl/g02/pageqa/

export const IS_GITHUB: boolean = !/\/g0\d\//.test(window?.location.href || ''); // /hidglobal/.test(window?.location.host || '');

type CurrentLocation = {
    host: string;   // part before generation
    gen: string;    // generation
    root: string;   // `${currentLocation.host}/${currentLocation.gen}'
};

const currentLocation: CurrentLocation = (() => {
    const reG01 = /([\s\S]*)\/(g0\d)\/([\s\S]*)/; // 1:'https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons' 2:'/g0(1|2)/' 3:'pageqa/index.html'

    const m = (window.location.href || '').match(reG01); //https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa/index.html

    const host = m ? m[1] : 'https://crossmatch.hid.gl'; //https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons
    const gen = m ? m[2] : 'g02';

    return { host, gen, root: `${host}/${gen}` };
})();

console.log('currentLocation', currentLocation);

const ROOT_WEB_URL = IS_GITHUB ? './' : `${currentLocation.root}/current/`;
const ROOT_TEST_URL = './';
const API_URL = import.meta.env.PROD ? ROOT_WEB_URL : ROOT_TEST_URL;

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
    const ROOT_EXT_ARCHIVE = `${currentLocation.root}/current/`;
    return `${ROOT_EXT_ARCHIVE}${name}`;
}

// Special links

export const URLS = {
    HID_PMIT: `${currentLocation.root}/pmit/index.html`,
    HID_PMAC: `${currentLocation.root}/maxz/pmac.zip.txt`,
    QA_WEBSITE_OLD: `${currentLocation.root}/pageqa1/index.html`,
    CONFLUENCE_HINTS: 'https://wiki.hidglobal.com/display/ALTUS/Browser+extensions+installation', //TODO: make a local copy on this website
    LOCAL_HINTS: `${currentLocation.root}/pages/wiki/installation`,
    LOCAL_APP_FISERV: `${currentLocation.root}/pages/tests/fiserv`,

    INSTALL_DP_PAGE: 'https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pagedp/index.html', // it will(/should) be redirected to www3
    INSTALL_GOOGLE_STORE: 'https://chrome.google.com/webstore/detail/digitalpersona/piimgpjgnagkckjlhjcppbkbjjfjmnbh',
};

// Regexes

export const regexFnameVerDate = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)/i; // version and date
export const regexFnameVerDateRelBrouser = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)-(r|m)-(chrome|firefox|edge)/i; // version and date release browser
export const regexMarkdownPublicVersions = /#### version ([.\d]+) <span class="date">[.\d]+<\/span>.?public/gi; // to build ['3.4.419', '3.0.386', '3.0.378']
