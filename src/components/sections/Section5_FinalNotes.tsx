import React from 'react';
import { URL_CONFLUENCE, URL_OLD_QA_WEBSITE } from '@/store/apis/constants';

export function Section5_FinalNotes() {
    return (
        <div className="py-1">
            <h2 className="mt-1 font-semibold">Check for duplicate extension installations</h2>
            <p className="text-sm">
                Only one DigitalPersona extension can run at the same time in the same browser.
                After completing (or before starting) the installation of the DigitalPersona extension,
                ensure that all previous versions of the extension are uninstalled.
            </p>

            <h2 className="mt-2 font-semibold">Browser extensions installation instructions</h2>
            <p className="text-sm">
                Additional documents are available on the <a className="underline hover:text-url" href={URL_CONFLUENCE} target="_blank"> HID Confluence website.</a>
            </p>

            <h2 className="mt-2 font-semibold">QA website history</h2>
            <p className="text-sm">
                The previous QA website is still <a className="underline hover:text-url" href={URL_OLD_QA_WEBSITE} target="_blank"> available here.</a>
            </p>
        </div>
    );
}
