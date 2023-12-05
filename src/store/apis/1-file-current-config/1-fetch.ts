import { urlCurrentConfig } from '../constants';
import { CurrentExtensions, parseCurrentConfig } from './2-parse';

async function fetchCurrentConfig(): Promise<Response> {
    //console.log('Fetching: current config', getCurrentConfigUrl());

    const response = await fetch(urlCurrentConfig(), { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`No access to the HID server. Failed to get "${urlCurrentConfig()}"`);
    }
    return response;
}

export async function getCurrentConfig(): Promise<CurrentExtensions> {
    const response = await fetchCurrentConfig();
    const json = await response.json();
    return parseCurrentConfig(json);
}
