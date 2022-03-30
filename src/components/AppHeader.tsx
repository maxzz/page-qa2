import React from 'react';
import { IconHIDLogo } from './UI/UIIcons';

export const textShadow = { textShadow: '1px 1px 2px #000' };
export const elevation4Shadow = { boxShadow: '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)' };

export function AppHeader() {
    return (<>
        {/* <div className="px-6 py-5 flex items-center justify-between bg-[#003f82] shadow-sm cursor-default"> */}
        <div className="px-6 py-5 flex items-center justify-between bg-[#003165] shadow-sm cursor-default">
            <div className="flex items-center space-x-2">
                {/* <img src="./src/assets/traytools.png" alt="logo" /> */}

                {/* <div className="w-28 px-3 py-2 flex items-center justify-center bg-white rounded-md">
                    <IconHIDLogo className="leading-6" fill="#002f87" />
                </div>
                <div className="pb-1 text-2xl tracking-tighter font-light text-slate-100 uppercase scale-y-150 whitespace-nowrap" style={textShadow}>
                    QA Extensions
                </div> */}

                <div className="w-20 py-2 flex items-center justify-center bg-white rounded-md">
                    <IconHIDLogo className="px-2" fill="#002f87" />
                </div>
                <div className="pb-1 text-3xl tracking-tighter font-light text-slate-100 uppercase whitespace-nowrap" style={textShadow}>
                    QA Extensions
                </div>
            </div>
            {/* <div className="text-lg tracking-tighter font-light text-slate-100 uppercase scale-y-90 flex items-center" style={textShadow}>
                <ul className="flex items-center space-x-2">
                    <li>Current</li>
                    <li>Summary</li>
                    <li>Archive</li>
                    <li>Tests</li>
                    <li>Notes</li>
                </ul>
            </div> */}
        </div>
        <div className="h-1 bg-[#002f87]" style={elevation4Shadow}></div>
    </>);
}
