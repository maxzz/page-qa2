import React from 'react';
import { section4_OpenTestAppsAtom } from '@/store/store';
import { Section } from './Section';
import mainImage from '../../assets/testapps/2022-03-01_19-09-50.png';

export function TestApps() {
    return (
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
    );
}

export function Section4_TestApps() {
    return (
        <Section openAtom={section4_OpenTestAppsAtom} title={"Test Applications for QA"}>
            <TestApps />
        </Section>
    );
}
