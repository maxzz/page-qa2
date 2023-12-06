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

const runLocation: CurrentLocation = (() => {
    const reG01 = /([\s\S]*)\/(g0\d)\/([\s\S]*)/; // 1:'https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons' 2:'/g0(1|2)/' 3:'pageqa/index.html'

    const m = (window.location.href || '').match(reG01); //https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa/index.html
    const host = m ? m[1] : 'https://crossmatch.hid.gl'; //https://www3.hidglobal.com/sites/default/files/crossmatch/AltusAddons
    const gen = m ? m[2] : 'g02';

    return {
        host,
        gen,
        root: `${host}/${gen}`,
    };
})();

console.log('Run from location', runLocation);

const ROOT_WEB_URL = IS_GITHUB ? './' : `${runLocation.root}/current/`;
const ROOT_TEST_URL = './';
const API_URL = import.meta.env.PROD ? ROOT_WEB_URL : ROOT_TEST_URL;

// API generated locations

export function urlCurrentConfig() {
    return `${API_URL}config.json`;
}

export function urlMarkdown() {
    return `${API_URL}history.md`;
}

export function urlFtpExtensions() {
    return `${API_URL}existing.json`;
}

export function urlArchiveExtension(name: string) {
    const ROOT_EXT_ARCHIVE = `${runLocation.root}/current/`;
    return `${ROOT_EXT_ARCHIVE}${name}`;
}

// Special links

export const URLS = {
    HID_PMIT: `${runLocation.root}/pmit/index.html`,
    HID_PMAC: `${runLocation.root}/maxz/pmac.zip.txt`,
    QA_WEBSITE_OLD: `${runLocation.root}/pageqa1/index.html`,
    CONFLUENCE_HINTS: 'https://wiki.hidglobal.com/display/ALTUS/Browser+extensions+installation', //and https://wiki.hidglobal.com/pages/viewpage.action?spaceKey=ALTUS&title=Browser+extensions+installation
    LOCAL_HINTS: `${runLocation.root}/pages/wiki/installation`, // local copy of CONFLUENCE_HINTS
    LOCAL_APP_FISERV: `${runLocation.root}/pages/tests/fiserv`,
    LOCAL_APP_BANK_UTICA: `${runLocation.root}/pages/tests/91370-bank-utica`,
    LOCAL_APP_BANK_WASHINGTON: `${runLocation.root}/pages/tests/91506-bank-washington`,

    INSTALL_DP_PAGE: 'https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pagedp/index.html', // it will(/should) be redirected to www3
    INSTALL_GOOGLE_STORE: 'https://chrome.google.com/webstore/detail/digitalpersona/piimgpjgnagkckjlhjcppbkbjjfjmnbh',
};

// Regexes

// New name for manifest v3: dppm-3.4.430_on_2022.03.04-r-chrome3.zip

export const regexFnameVerDateRelBrowser = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)-(r|m)-(chrome3?|firefox|edge)/i; // version and date release browser
export const regexMarkdownPublicVersions = /#### version ([.\d]+) <span class="date">[.\d]+<\/span>.?public/gi; // to build ['3.4.419', '3.0.386', '3.0.378']
