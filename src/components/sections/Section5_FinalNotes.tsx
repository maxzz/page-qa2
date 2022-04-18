import React from 'react';
import { IS_HID, URL_CONFLUENCE, URL_OLD_QA_WEBSITE } from '@/store/apis/constants';

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
                Additional documents are available on the <a className="border-b hover:border-b-2 border-url hover:text-url" href={URL_CONFLUENCE} target="_blank"> HID Confluence website.</a>
            </p>

            <h2 className="mt-2 text-base font-semibold">QA website history</h2>
            <ul className="ml-4 list-disc">
                <li>
                    The previous QA website is still <a className="border-b hover:border-b-2 border-url hover:text-url" href={URL_OLD_QA_WEBSITE} target="_blank"> available here.</a>
                </li>
                {!IS_HID && <li>
                    The source code for this website on <a className="border-b hover:border-b-2 border-url hover:text-url" href="https://github.com/maxzz/page-qa2" target="_blank">GitHub is here.</a>
                </li>}
                <li>
                    This __BUILD_VER__ version of the QA website is built on __BUILD_DATE__<span>.</span>
                </li>
            </ul>
        </div>
    );
}
