import React from 'react';
import { SectionHeader } from '../Frontpage';

export function Conclusion() {
    return (
        <div>
            <SectionHeader>
                Conclusion
            </SectionHeader>

            <div className="mt-3">
                <p className="font-semibold">Browser extensions installation instructions</p>
                <p>Additional documents are available on the <a className="underline" 
                    href="https://crossmatch.atlassian.net/wiki/spaces/ALTUS/pages/103023073/Browser+extensions+installation">
                        HID Confluence website.
                    </a>
                </p>

                <div className="mt-4 font-semibold">Check for duplicate extensions</div>
                <p>
                    Only one DigitalPersona extension can run at the same time in the same browser.
                    After completing (or before starting) the installation of the DigitalPersona extension,
                    ensure that all previous versions of the extension are uninstalled.
                </p>
            </div>
        </div>
    );
}
