import React from 'react';
import { CONFLUENCE_URL } from '@/store/utils/constants';

export function Section5_FinalNotes() {
    return (
        <div className="py-1">
            <h2 className="mt-1 font-semibold">Browser extensions installation instructions</h2>
            <p>
                Additional documents are available on the <a className="underline" href={CONFLUENCE_URL}> HID Confluence website.</a>
            </p>

            <h2 className="mt-3 font-semibold">Check for duplicate extensions</h2>
            <p>
                Only one DigitalPersona extension can run at the same time in the same browser.
                After completing (or before starting) the installation of the DigitalPersona extension,
                ensure that all previous versions of the extension are uninstalled.
            </p>
        </div>
    );
}
