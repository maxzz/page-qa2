import React from 'react';
import { SectionHeader } from '../Frontpage';
import mainImage from '../../assets/testapps/2022-03-01_19-09-50.png';

export function QATestApps() {
    return (
        <div className="">
            <SectionHeader>
                Test Applications for QA
            </SectionHeader>


            <div className="mt-2 text-sm flex flex-col space-y-2">
                <p>Here are some test web apps that you can use to test the various features of Password Manager.</p>

                <div>
                    <img className="m-auto bg-slate-300" src={mainImage} width="200px" alt="test applications preview" />
                </div>

                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
        </div>
    );
}
