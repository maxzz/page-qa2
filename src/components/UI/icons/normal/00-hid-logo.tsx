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
