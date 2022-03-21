import React from 'react';
import { SectionHeader } from '../Frontpage';
import mainImage from '../../assets/testapps/2022-03-01_19-09-50.png';
import { useAtom } from 'jotai';
import { sectionQATestOpenAtom } from '@/store/store';
import { UISectionPane } from '../UI/UISectionPane';
import { UIAccordion } from '../UI/UIAccordion';
import { Section } from './Section';

export function QATestApps2() {
    return (
        <>
            {/* <SectionHeader>
                Test Applications for QA
            </SectionHeader> */}


            <div className="py-2 text-sm flex flex-col space-y-2">
                <p>Here are some test web apps that you can use to test the various features of Password Manager.</p>

                <div>
                    <img className="m-auto bg-slate-300" src={mainImage} width="200px" alt="test applications preview" />
                </div>

                <ul className="ml-4 list-disc">
                    <li><a className="underline" href="https://maxzz.github.io/test-pm-domain-logins/#" target="_blank">Test login and password change screens on the same domain</a></li>
                    <li><a className="underline" href="https://maxzz.github.io/test-pm-second" target="_blank">Simple login screen to test login transactions</a></li>
                    <li><a className="underline" href="https://maxzz.github.io/test-pm" target="_blank">Customizable login and password change screens</a></li>
                </ul>
            </div>
        </>
    );
}

// export function Section4_TestApps() {
//     const [open, setOpen] = useAtom(sectionQATestOpenAtom);
//     return (<div>
//         <UISectionPane open={open} onClick={() => setOpen(v => !v)}>
//             <div className="">
//                 Test Applications for QA
//             </div>
//         </UISectionPane>
//         <UIAccordion toggle={open}>
//             <QATestApps2 />
//         </UIAccordion>
//     </div>);
// }

export function Section4_TestApps() {
    const [open, setOpen] = useAtom(sectionQATestOpenAtom);
    return (<div>
        <Section openAtom={sectionQATestOpenAtom} title="Test Applications for QA">
            <QATestApps2 />
        </Section>
    </div>);
}
