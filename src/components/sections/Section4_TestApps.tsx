import React from 'react';
import sampleAppsImg from '../../assets/testapps/2022-03-01_19-09-50.png';
import sampleApps22Img from '../../assets/testapps/2022-05-26_19-16-14gray2.jpg';
import samplePmitImg from '../../assets/testapps/2022-07-23_18-05-43,pmit,gray.jpg';
import { URLS } from '@/store/apis';

export function Section4_TestApps() {
    return (
        <div className="py-2 text-sm flex flex-col space-y-1">

            <p>Here are some links to test web applications that you can use to test various features of the Password Manager:</p>

            <ul className="ml-8 list-disc">
                <li><a className="hoverurl" href="https://maxzz.github.io/test-pm-domain-logins/#" target="_blank">Two test logins and corresponding password change screens in the same domain</a></li>
                <li><a className="hoverurl" href="https://maxzz.github.io/test-pm-second" target="_blank">Simple test login screen to verify login transactions</a></li>
                <li><a className="hoverurl" href="https://maxzz.github.io/test-pm" target="_blank">Five customizable logins and password change screens</a></li>
            </ul>

            <div className="pt-3">
                <img className="m-auto bg-slate-300" width="200px" src={sampleAppsImg} alt="test applications preview" />
            </div>

            <ul className="ml-8 list-disc">
                <li><a className="hoverurl" href="https://maxzz.github.io/test-pm-domain-logins22" target="_blank">Page reload test with login and corresponding password change screens on the same domain</a></li>
            </ul>

            <div className="pt-3">
                <img className="m-auto" width="200px" src={sampleApps22Img} alt="test applications preview" />
            </div>

            <ul className="ml-8 list-disc">
                <li><a className="hoverurl" href={URLS.HID_PMIT} target="_blank">Password Manager Investigation Tool (version under HID domain)</a></li>
                <li><a className="hoverurl" href="https://maxzz.github.io/dropzone" target="_blank">Password Manager Investigation Tool (the latest version)</a></li>
            </ul>

            <div className="pt-3">
                <img className="m-auto" width="200px" src={samplePmitImg} alt="test applications preview" />
            </div>

            <ul className="ml-8 list-disc">
                <li><a className="hoverurl" href="https://maxzz.github.io" target="_blank">All other project catalog</a></li>
            </ul>
        </div>
    );
}
