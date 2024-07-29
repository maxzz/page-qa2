import { urlCurrentConfig } from '../constants';
import { CurrentExtensions } from '../9-types';
import { parseCurrentConfig } from './2-parse';

async function _fetchCurrentConfig(): Promise<Response> {
    const response = await fetch(urlCurrentConfig(), { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`No access to the HID server. Failed to get "${urlCurrentConfig()}"`);
    }
    return response;
}

export async function fetchCurrentConfig(): Promise<CurrentExtensions> {
    const response = await _fetchCurrentConfig();
    const json = await response.json();
    return parseCurrentConfig(json);
}
