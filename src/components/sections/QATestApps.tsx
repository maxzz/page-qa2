import React from 'react';
import { SectionHeader } from '../Frontpage';
import mainImage from '../../assets/testapps/2022-03-01_19-09-50.jpg';

export function QATestApps() {
    return (
        <div className="">
            <SectionHeader>
                Test Applications for QA
            </SectionHeader>

            <div className="mt-3">
                <img src={mainImage} width="200px" alt="test applications preview" />
                Links
            </div>
        </div>
    );
}
