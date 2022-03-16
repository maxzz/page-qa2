import React from 'react';
import { SectionHeader } from '../Frontpage';

export function Conclusion() {
    return (
        <div>
            <SectionHeader>
                Conclusion
            </SectionHeader>

            <div className="">
                <p className="font-semibold">Browser extensions installation instructions</p>
                <p>The additional documents are on <a className="underline" 
                    href="https://crossmatch.atlassian.net/wiki/spaces/ALTUS/pages/103023073/Browser+extensions+installation">
                        the HID Confluence web site.
                    </a>
                </p>

                <div className="mt-4 font-semibold">Check for duplicates</div>
                <p>
                    Only one the DigitalPersona extension can run at the same time in the same browser.
                    After finishing (or before starting) installation of the DigitalPersona extension,
                    make sure that any previous versions of extension are uninstalled.
                </p>
            </div>
        </div>
    );
}
