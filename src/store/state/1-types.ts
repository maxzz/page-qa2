import { proxy, subscribe } from 'valtio';

const STORE_KEY = 'react-page-qa2-23';

export type AppSettings = {
    open1: boolean;
    open2: boolean;
    open3: boolean;
    open4: boolean;
    open5: boolean;
};

let defaultSettings: AppSettings = {
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
};

function initSettings(): AppSettings {
    const savedSettings = localStorage.getItem(STORE_KEY);
    if (savedSettings) {
        try {
            let obj = JSON.parse(savedSettings) as AppSettings;
            return { ...defaultSettings, ...obj };
        } catch (error) {
        }
    }
    return defaultSettings;
}

export const appSettings = proxy<AppSettings>(initSettings());

subscribe(appSettings, () => {
    localStorage.setItem(STORE_KEY, JSON.stringify(appSettings));
});
