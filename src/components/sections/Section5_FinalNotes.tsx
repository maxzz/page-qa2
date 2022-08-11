import React from 'react';
import { IS_HID, URL_CONFLUENCE, URL_OLD_QA_WEBSITE } from '@/store/apis';

export function Section5_FinalNotes() {
    return (
        <div className="py-1 text-sm">
            <h2 className="mt-1 text-base font-semibold">Check for duplicate extension installations</h2>
            <p>
                Only one DigitalPersona extension can run at the same time in the same browser.
                After completing (or before starting) the installation of the DigitalPersona extension,
                ensure that all previous versions of the extension are uninstalled.
            </p>

            <h2 className="mt-2 text-base font-semibold">Browser extensions installation instructions</h2>
            <p>
                Additional documents are available on the <a className="hoverurl" href={URL_CONFLUENCE} target="_blank"> HID Confluence website</a> (HID internal site).
            </p>

            <h2 className="mt-2 text-base font-semibold">Chrome web store links</h2>
            <ul className="ml-4 list-disc">
                <li>
                    Chrome web store extension <a className="hoverurl" href="https://chrome.google.com/webstore/detail/digitalpersona/piimgpjgnagkckjlhjcppbkbjjfjmnbh" target="_blank">installation page.</a>
                </li>
                <li>
                    DP extension <a className="hoverurl" href="https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pagedp/index.html" target="_blank">installation page.</a>
                </li>
            </ul>

            <h2 className="mt-2 text-base font-semibold">QA website history</h2>
            <ul className="ml-4 list-disc">
                <li>
                    The previous QA website is still <a className="hoverurl" href={URL_OLD_QA_WEBSITE} target="_blank"> available here.</a>
                </li>
                {!IS_HID && <li>
                    The source code for this website on <a className="hoverurl" href="https://github.com/maxzz/page-qa2" target="_blank">GitHub is here.</a>
                </li>}
                <li>
                    This __BUILD_VER__ version of the QA website is built on __BUILD_DATE__<span>.</span>
                </li>
            </ul>
        </div>
    );
}
