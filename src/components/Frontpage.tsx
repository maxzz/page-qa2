import React from 'react';

function Header() {
    return (
        <div className="p-4 flex items-center justify-between bg-orange-300 shadow-sm">
            <div className="text-2xl tracking-tighter font-light text-orange-500 uppercase scale-y-125" style={{textShadow: '1px 1px 2px #ffffffa0'}}>QA Extensions</div>
            <img src="./src/assets/traytools.png" alt="logo" />
        </div>
    );
}

function HeroImage() {
    return (
        <div className="">
            <img className="w-auto max-h-24 m-auto object-cover" src="./src/assets/frontpage/qa-header.png" alt="hero" />
        </div>
    );
}

function Frontpage() {
    return (
        <div>
            <Header />
            <HeroImage />
        </div>
    );
}

export default Frontpage;
