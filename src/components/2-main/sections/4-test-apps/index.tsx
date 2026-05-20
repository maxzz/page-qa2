import { ReactNode } from 'react';
import { URLS } from '@/store/apis';
import { JsonBeautifier } from '../../../ui/json-beautifier';
import sampleAppsImg from '@/assets/testapps/2022-03-01_19-09-50.png';
import sampleApps22Img from '@/assets/testapps/2022-05-26_19-16-14gray2.jpg';
import samplePmitImg from '@/assets/testapps/2022-07-23_18-05-43,pmit,gray.jpg';

interface TestAppLinkProps {
    href: string;
    label: ReactNode;
}

function TestAppLink({ href, label }: TestAppLinkProps) {
    return (
        <li>
            <a className="hoverurl" href={href} target="_blank">
                {label}
            </a>
        </li>
    );
}

export function Section4_TestApps() {
    return (
        <div className="py-2 text-sm flex flex-col space-y-1">

            <p>Here are some links to test web applications that you can use to test various features of the Password Manager:</p>

            {/*  */}
            <ul className="ml-8 list-disc">
                <TestAppLink href="https://maxzz.github.io/test-pm-domain-logins/#" label="Two test logins and corresponding password change screens in the same domain" />
                <TestAppLink href="https://maxzz.github.io/test-pm-second" label="Simple test login screen to verify login transactions" />
            </ul>

            {/*  */}
            <br />
            <ul className="ml-8 list-disc">
                <TestAppLink href="https://maxzz.github.io/test-pm" label="Five customizable logins and password change screens" />
            </ul>
            <img className="pt-3 m-auto bg-slate-300" width="200px" src={sampleAppsImg} alt="test applications preview" />

            {/* Page reload test */}
            <br />
            <ul className="ml-8 list-disc">
                <TestAppLink href="https://maxzz.github.io/test-pm-domain-logins22" label="Page reload test with login and corresponding password change screens on the same domain" />
            </ul>
            <img className="pt-3 m-auto" width="200px" src={sampleApps22Img} alt="test applications preview" />

            {/* PMIT */}
            <br />
            <ul className="ml-8 list-disc">
                <TestAppLink href={URLS.HID_PMIT} label="Password Manager Investigation Tool (version under HID domain)" />
                <TestAppLink href="https://maxzz.github.io/dropzone" label="Password Manager Investigation Tool (the latest version)" />
            </ul>
            <img className="pt-3 m-auto" width="200px" src={samplePmitImg} alt="test applications preview" />

            {/*  */}
            <br />
            <div className="">Local test pages</div>
            <ul className="ml-8 list-disc">
                <TestAppLink href={URLS.LOCAL_APP_FISERV} label={<> Bug &#8470; 90673 (fiserv:Heritage Bank), Bug &#8470; 91149 (fiserv:BAC Bank)</>} />
                <TestAppLink href={URLS.LOCAL_APP_BANK_UTICA} label={<>Bug &#8470; 91370 (Bank of Utica)</>} />
                <TestAppLink href={URLS.LOCAL_APP_BANK_WASHINGTON} label={<>Bug &#8470; 91506 (Bank of Washington)</>} />
            </ul>

            {/*  */}
            <br />
            <ul className="ml-8 list-disc">
                <TestAppLink href="https://maxzz.github.io" label="All other projects catalog" />
            </ul>

            <ul className="ml-8 list-disc">
                <li><JsonBeautifier /></li>
            </ul>
        </div>
    );
}
