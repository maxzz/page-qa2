import React from 'react';
import { IconHIDLogo } from './UI/UIIcons';

export const textShadow = { textShadow: '1px 1px 2px #ffffffa0' };

export function AppHeader() {
    return (<>
        <div className="p-4 flex items-center justify-between bg-[#003f82] shadow-sm">
            <div className="flex items-center space-x-2">
                {/* <img src="./src/assets/traytools.png" alt="logo" /> */}
                <div className="w-28 px-3 py-2 flex items-center justify-center bg-white rounded-md">
                    <IconHIDLogo className="leading-6" fill="#002f87" />
                </div>
                <div className="pb-1 text-2xl tracking-tighter font-light text-slate-100 uppercase scale-y-150 whitespace-nowrap" style={textShadow}>
                    QA Extensions
                </div>
            </div>
            <div className="text-lg tracking-tighter font-light text-slate-100 uppercase scale-y-90 flex items-center" style={textShadow}>
                <ul className="flex items-center space-x-2">
                    <li>Current</li>
                    <li>Summary</li>
                    <li>History</li>
                    <li>Notes</li>
                </ul>
            </div>
        </div>
        <div className="h-1 bg-[#002f87]"></div>
    </>);
}
