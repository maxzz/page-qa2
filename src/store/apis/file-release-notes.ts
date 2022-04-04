import { getMarkdownUrl } from "./constants";

export async function fetchReleaseNotes(): Promise<string> {
    //console.log('Fetching: release notes:', getMarkdownUrl());

    const response = await fetch(getMarkdownUrl(), { cache: 'no-cache' });
    let text = await response.text();
    if (!text) { // this check will not work because the index.html is returned if file not found. Later.
        throw new Error(`No access to the HID server. Failed to get "${getMarkdownUrl()}"`);
    }
    return text;
}
