import { HTMLAttributes, SVGProps } from "react";

export function IconHIDLogo(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg fill="currentColor" viewBox="0 0 125 33.4" {...rest}>
            {title && <title>{title}</title>}
            <path d="M79.96 33.16V.25c10.24 0 20.24-.68 30.09.2a16.09 16.09 0 0 1 15 16.47c0 8.41-5.76 15.23-15.27 16.05-9.75.84-19.58.19-29.82.19ZM96.22 3.21v27.07c6.61 1.08 9.56-.46 10.37-6.29a51.35 51.35 0 0 0 .06-13.9c-.87-6.28-3.5-7.74-10.43-6.88ZM0 32.8V.29h15.89v13.92h12V.34h16.05V32.7H28.03V19.31H16.11V32.8ZM54.24 32.86V.39h15.65v32.47Z"/>
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

import ICO_CH from '../../assets/icons/browsers/chrome.svg';
import ICO_FF from '../../assets/icons/browsers/firefox.svg';
import ICO_MS from '../../assets/icons/browsers/edge.svg';

export function IconCrLogo(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img src={ICO_CH} alt="Chrome logo" {...props}/>
    );
}

export function IconFfLogo(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img src={ICO_FF} alt="Firefox logo" {...props}/>
    );
}

export function IconMsLogo(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img src={ICO_MS} alt="Firefox logo" {...props}/>
    );
}