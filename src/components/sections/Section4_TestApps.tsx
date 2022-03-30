import React from 'react';
import mainImage from '../../assets/testapps/2022-03-01_19-09-50.png';

export function Section4_TestApps() {
    return (
        <div className="py-2 text-sm flex flex-col space-y-1">

            <p>Here are some links to test web applications that you can use to test various features of the Password Manager:</p>

            <ul className="ml-8 list-disc">
                <li><a className="underline hover:text-url" href="https://maxzz.github.io/test-pm-domain-logins/#" target="_blank">Two test logins and corresponding password change screens in the same domain</a></li>
                <li><a className="underline hover:text-url" href="https://maxzz.github.io/test-pm-second" target="_blank">Simple test login screen to verify login transactions</a></li>
                <li><a className="underline hover:text-url" href="https://maxzz.github.io/test-pm" target="_blank">Five customizable logins and password change screens</a></li>
            </ul>

            <div className="pt-3">
                <img className="m-auto bg-slate-300" src={mainImage} width="200px" alt="test applications preview" />
            </div>

        </div>
    );
}
