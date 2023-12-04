import { TBrowserShort } from "@/store/apis/types";

function getDpBrandFromLocation() {
    const brand = window.location.href.match(/page(dp|hp|de|qa)/i);
    return !!brand ? brand[1] : '';
}

function getBrowserType(): TBrowserShort | undefined {
    const ua = navigator.userAgent.toLowerCase();
    
    const isIE = ua.indexOf('msie ') !== -1 || ua.indexOf('trident/') > -1;
    const isChrome = ua.indexOf('chrome') !== -1 && typeof (<any>window).chrome !== 'undefined' && typeof (window as any).chrome.runtime !== 'undefined';
    const isFirefox = ua.indexOf('firefox') !== -1;
    const isEdge = ua.indexOf('edge/') !== -1 && !isChrome;

    return isChrome ? TBrowserShort.chrome : isFirefox ? TBrowserShort.firefox : isIE ? TBrowserShort.ie : isEdge ? TBrowserShort.edge : undefined;
}

export function copyToClipboard(el: any): boolean | undefined {
    // 0. el - HTMLElement
    const range: Range = document.createRange();
    range?.selectNode(el);
    window.getSelection()?.addRange(range);

    // 1. Now that we've selected the anchor text, execute the copy command
    let done;
    try {
        done = document.execCommand('copy');
    } catch (err) {
    }

    // 2. Remove the selections - NOTE: Should use removeRange(range) when it is supported
    window.getSelection()?.removeAllRanges();

    return done;
}

export function parseDate(date: string): Date | undefined {
    // 0. Parse '2022.03.04' format to Date | string.
    const dt = new Date(date.replace(/\./g, '-') + 'T00:00:00');
    return dt.toString() !== 'Invalid Date' ? dt : undefined;
}

export function beautifyDate(dateStr?: string): string {
    // 0. Parse '2022.03.04' format to string.
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateStr && parseDate(dateStr)?.toLocaleDateString('en-US', options) || dateStr || '';
}
