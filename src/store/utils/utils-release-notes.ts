import * as CONST from './constants';

export async function fetchReleaseNotes(): Promise<string> {
    console.log('Fetching: release notes:', `${CONST.API_URL}history.md`);
    const response = await fetch(`${CONST.API_URL}history.md`, { cache: 'no-cache' });
    let text = await response.text();
    if (!text) { // this check will not work because the index.html is returned if file not found. Later.
        throw new Error('The result should not be empty');
    }
    return text;
}
