import { getCurrentConfigUrl } from '../constants';
import { CurrentExtensions, InAppExtnInfo, parseCurrentConfig } from './2-parse';

export async function fetchCurrentConfig(): Promise<Response> {
    //console.log('Fetching: current config', getCurrentConfigUrl());

    const response = await fetch(getCurrentConfigUrl(), { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`No access to the HID server. Failed to get "${getCurrentConfigUrl()}"`);
    }
    return response;
}

export async function getCurrentConfig(): Promise<CurrentExtensions> {
    const response = await fetchCurrentConfig();
    const json = await response.json();
    return parseCurrentConfig(json);
}

export function extInfoNotAvailable(): InAppExtnInfo {
    return {
        url: 'Not avialable',
        version: '',
        updated: ''
    };
}
