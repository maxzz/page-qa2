import { HTMLAttributes, SVGProps } from "react";

export function IconHIDLogo(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg fill="currentColor" viewBox="0 0 125 33.4" {...rest}>
            {title && <title>{title}</title>}
            <path d="M79.96 33.16V.25c10.24 0 20.24-.68 30.09.2a16.09 16.09 0 0 1 15 16.47c0 8.41-5.76 15.23-15.27 16.05-9.75.84-19.58.19-29.82.19ZM96.22 3.21v27.07c6.61 1.08 9.56-.46 10.37-6.29a51.35 51.35 0 0 0 .06-13.9c-.87-6.28-3.5-7.74-10.43-6.88ZM0 32.8V.29h15.89v13.92h12V.34h16.05V32.7H28.03V19.31H16.11V32.8ZM54.24 32.86V.39h15.65v32.47Z" />
        </svg>
    );
}

// export function IconImagePlus(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
//     const { title, ...rest } = props;
//     return (
//         <svg fill="currentColor" viewBox="0 0 24 24" {...rest}>
//             {title && <title>{title}</title>}
//             <path d="M19 10a1 1 0 0 0-1 1v3.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.71l-2.48-2.49a2.79 2.79 0 0 0-3.93 0L4 12.61V7a1 1 0 0 1 1-1h8a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12.22A2.79 2.79 0 0 0 4.78 22h12.44a2.88 2.88 0 0 0 .8-.12a2.74 2.74 0 0 0 2-2.65V11A1 1 0 0 0 19 10zM5 20a1 1 0 0 1-1-1v-3.57l2.89-2.89a.78.78 0 0 1 1.1 0L15.46 20zm13-1a1 1 0 0 1-.18.54L13.3 15l.71-.7a.77.77 0 0 1 1.1 0L18 17.21zm3-15h-1V3a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V6h1a1 1 0 0 0 0-2z" />
//         </svg>
//     );
// }

export function IconDownload(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

export function IconClipboard(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
    );
}

import ICO_CH from '../../assets/icons/browsers/chrome.svg';
import ICO_FF from '../../assets/icons/browsers/firefox.svg';
import ICO_MS from '../../assets/icons/browsers/edge.svg';

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)' };

export function IconCrLogo2(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img src={ICO_CH} style={iconShadow} alt="Chrome logo" {...props} />
    );
}

export function IconFfLogo(props: HTMLAttributes<HTMLImageElement>) {
    return (
        // <img src={ICO_FF} style={{filter: 'hue-rotate(270deg) drop-shadow(1px 1px 1px #0002)'}} alt="Firefox logo" {...props}/>
        <img src={ICO_FF} style={iconShadow} alt="Firefox logo" {...props} />
    );
}

export function IconIeLogo(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img src={ICO_MS} style={iconShadow} alt="Microsoft Edge logo" {...props} />
    );
}

export function IconMsLogo(props: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" style={iconShadow} {...props}>
            <defs>
                <radialGradient id="b" cx="-306.26" cy="377.46" r="8.27" gradientTransform="matrix(1 0 0 .95 320.79 -342.22)" gradientUnits="userSpaceOnUse">
                    <stop offset=".72" stopOpacity="0" />
                    <stop offset=".95" stopOpacity=".53" />
                    <stop offset="1" />
                </radialGradient>
                <radialGradient id="d" cx="-120.2" cy="293.6" r="12.42" gradientTransform="matrix(.15 -.99 .8 .12 -209.83 -136.08)" gradientUnits="userSpaceOnUse">
                    <stop offset=".76" stopOpacity="0" />
                    <stop offset=".95" stopOpacity=".5" />
                    <stop offset="1" />
                </radialGradient>
                <radialGradient id="e" cx="-171.65" cy="355.56" r="17.55" gradientTransform="matrix(-.04 1 -2.13 -.08 753.63 205.11)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#35c1f1" />
                    <stop offset=".11" stopColor="#34c1ed" />
                    <stop offset=".23" stopColor="#2fc2df" />
                    <stop offset=".31" stopColor="#2bc3d2" />
                    <stop offset=".67" stopColor="#36c752" />
                </radialGradient>
                <radialGradient id="f" cx="-67.02" cy="691.29" r="8.44" gradientTransform="matrix(.28 .96 -.78 .23 579.69 -87.05)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#66eb6e" />
                    <stop offset="1" stopColor="#66eb6e" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="a" x1="-314.8" y1="381.16" x2="-299.34" y2="381.16" gradientTransform="translate(320.79 -364.91)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#0c59a4" />
                    <stop offset="1" stopColor="#114a8b" />
                </linearGradient>
                <linearGradient id="c" x1="-306.64" y1="374.46" x2="-316.3" y2="384.97" gradientTransform="translate(320.79 -364.91)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#1b9de2" />
                    <stop offset=".16" stopColor="#1595df" />
                    <stop offset=".67" stopColor="#0680d7" />
                    <stop offset="1" stopColor="#0078d4" />
                </linearGradient>
            </defs>
            <path d="M20.93 17.42a9.34 9.34 0 0 1-.91.41 9 9 0 0 1-3.11.56c-4.1 0-7.68-2.82-7.68-6.45a2.73 2.73 0 0 1 1.43-2.36C7 9.73 6 13.6 6 15.86c0 6.41 5.91 7.06 7.18 7.06a9.1 9.1 0 0 0 2.34-.4h.11a11.07 11.07 0 0 0 5.77-4.57.34.34 0 0 0-.1-.48.36.36 0 0 0-.36 0Z" 
            fill="url(#a)" />
            <path d="M20.93 17.42a9.34 9.34 0 0 1-.91.41 9 9 0 0 1-3.11.56c-4.1 0-7.68-2.82-7.68-6.45a2.73 2.73 0 0 1 1.43-2.36C7 9.73 6 13.6 6 15.86c0 6.41 5.91 7.06 7.18 7.06a9.1 9.1 0 0 0 2.34-.4h.11a11.07 11.07 0 0 0 5.77-4.57.34.34 0 0 0-.1-.48.36.36 0 0 0-.36 0Z" 
            opacity=".35" fill="url(#b)" />
            <path d="M10.07 21.83a7 7 0 0 1-.45-11.63 8.39 8.39 0 0 1 1-.62A2.86 2.86 0 0 1 12 9.23 2.8 2.8 0 0 1 14.78 12s2.12-6.9-6.93-6.9a7.28 7.28 0 0 0-6.94 6.75 11.46 11.46 0 0 0 1 4.86 11.12 11.12 0 0 0 13.56 5.82 6.55 6.55 0 0 1-5.44-.7Z" 
            fill="url(#c)" />
            <path d="M10.07 21.83a7 7 0 0 1-.45-11.63 8.39 8.39 0 0 1 1-.62A2.86 2.86 0 0 1 12 9.23 2.8 2.8 0 0 1 14.78 12s2.12-6.9-6.93-6.9a7.28 7.28 0 0 0-6.94 6.75 11.46 11.46 0 0 0 1 4.86 11.12 11.12 0 0 0 13.56 5.82 6.55 6.55 0 0 1-5.44-.7Z" 
            opacity=".41" fill="url(#d)" />
            <path d="M14.11 13.81c-.07.09-.29.21-.29.49a.81.81 0 0 0 .41.62 7.12 7.12 0 0 0 3.6.76 5.32 5.32 0 0 0 5.26-5.31 7.61 7.61 0 0 0-1-3.81A11.12 11.12 0 0 0 12 .9 11.09 11.09 0 0 0 .91 11.84C1 8.67 4.09 6.12 7.84 6.12a8.43 8.43 0 0 1 3.64.88 6.2 6.2 0 0 1 2.67 2.53 5.52 5.52 0 0 1 .63 2.56 3.11 3.11 0 0 1-.67 1.72Z" 
            fill="url(#e)" />
            <path d="M14.11 13.81c-.07.09-.29.21-.29.49a.81.81 0 0 0 .41.62 7.12 7.12 0 0 0 3.6.76 5.32 5.32 0 0 0 5.26-5.31 7.61 7.61 0 0 0-1-3.81A11.12 11.12 0 0 0 12 .9 11.09 11.09 0 0 0 .91 11.84C1 8.67 4.09 6.12 7.84 6.12a8.43 8.43 0 0 1 3.64.88 6.2 6.2 0 0 1 2.67 2.53 5.52 5.52 0 0 1 .63 2.56 3.11 3.11 0 0 1-.67 1.72Z" 
            fill="url(#f)" />
        </svg>
    );
}

export function IconCrLogo(props: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" style={iconShadow} {...props}>
            <defs>
                <clipPath id="a">
                    <circle cx="12" cy="11.99" r="11.2" fill="none" />
                </clipPath>
            </defs>
            <path d="M7.59 14.54 12 6.9h10a11.21 11.21 0 0 0-19.41-1v8.6Z" fill="#db4437" />
            <path d="M16.41 14.54H7.59l-5-8.6a11.22 11.22 0 0 0 8.9 17.25l4.94-4.94Z" fill="#0f9d58" />
            <path d="m12 6.9 4.41 7.64-4.94 8.65H12A11.21 11.21 0 0 0 22 6.9Z" fill="#ffcd40" />
            <g clipPath="url(#a)">
                <circle cx="12" cy="11.99" r="5.09" fill="#f1f1f1" />
                <circle cx="12" cy="11.99" r="4.07" fill="#4285f4" />
            </g>
        </svg>
    );
}
