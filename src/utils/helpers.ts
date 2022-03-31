function getDpBrandFromLocation() {
    const brand = window.location.href.match(/page(dp|hp|de|qa)/i);
    return !!brand ? brand[1] : '';
}

type IBrowserName = 'chrome' | 'firefox' | 'ie' | 'me' | 'unknown';

export function getBrowserType(): IBrowserName {
    const ua = navigator.userAgent.toLowerCase();
    const isIE = ua.indexOf('msie ') !== -1 || ua.indexOf('trident/') > -1;
    const isChrome = ua.indexOf('chrome') !== -1 && typeof (<any>window).chrome !== 'undefined' && typeof (window as any).chrome.runtime !== 'undefined';
    const isFirefox = ua.indexOf('firefox') !== -1;
    const isEdge = ua.indexOf('edge/') !== -1 && !isChrome;

    return isChrome ? 'chrome' : isFirefox ? 'firefox' : isIE ? 'ie' : isEdge ? 'me' : 'unknown';
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
