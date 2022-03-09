//export const ROOT_FTP_URL = '/AltusAddons/g01/current';
//export const ROOT_WEB_URL = 'https://www.crossmatch.com/AltusAddons/g01/current/';
//https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/config.json

const ROOT_WEB_URL = 'https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/current/';
const ROOT_TEST_URL = './test/';
export const API_URL = import.meta.env.PROD ? ROOT_WEB_URL : ROOT_TEST_URL;

export const CONFLUENCE = 'https://crossmatch.atlassian.net/wiki/spaces/ALTUS/pages/103023073/Browser+extensions+installation';

export const Regex_FNAME_VerDate           = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)/i; // version and date
export const Regex_FNAME_VerDateRelBrouser = /dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)-(r)-(chrome|firefox|edge)/i; // version and date release browser
