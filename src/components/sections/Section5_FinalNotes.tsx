import React from 'react';
import { section5_OpenFinalNotestom } from '@/store/store';
import { SectionHeader } from '../Frontpage';
import { Section } from './Section';

export function Body() {
    return (
        <div className="py-2">
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
    );
}

export function Section5_FinalNotes() {
    return (
        <Section openAtom={section5_OpenFinalNotestom} title={"Final notes"}>
            <Body />
        </Section>
    );
}

// export function Section5_FinalNotes() {
//     return (
//         <div>
//             <SectionHeader>
//                 Final notes
//             </SectionHeader>

//             <div className="mt-3">
//                 <p className="font-semibold">Browser extensions installation instructions</p>
//                 <p>Additional documents are available on the <a className="underline"
//                     href="https://crossmatch.atlassian.net/wiki/spaces/ALTUS/pages/103023073/Browser+extensions+installation">
//                         HID Confluence website.
//                     </a>
//                 </p>

//                 <div className="mt-4 font-semibold">Check for duplicate extensions</div>
//                 <p>
//                     Only one DigitalPersona extension can run at the same time in the same browser.
//                     After completing (or before starting) the installation of the DigitalPersona extension,
//                     ensure that all previous versions of the extension are uninstalled.
//                 </p>
//             </div>
//         </div>
//     );
// }

