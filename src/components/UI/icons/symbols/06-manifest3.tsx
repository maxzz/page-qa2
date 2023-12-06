import { classNames } from "@/utils/classnames";
import { HTMLAttributes, SVGProps } from "react";

export function DefMan3() {
    return (
        <symbol id="icon-man3" viewBox="0 0 24 24">
            <path d="M17.35 8.2c-1.04.82-1.01 2.14-1.21 3.75s-.55 4.51-1.07 5.31c-.3.52-.71.9-1.25 1.01" />
            <path d="M15.07 17.18 11.99 5.73" />
            <path d="M18.81 8.2h-2.9" />
            <path d="M6.65 8.2c1.04.82 1.01 2.14 1.21 3.75s.55 4.51 1.07 5.31c.3.52.71.9 1.25 1.01" />
            <path d="m8.93 17.18 3.08-11.45" />
            <path d="M5.19 8.2h2.9" />
            <circle cx="12" cy="12" r="10.2" />
        </symbol>
    );
}

export function IconLogoMan3(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, className, ...rest } = props;
    return (
        <svg className={classNames("fill-none stroke-[1.5] stroke-sky-700", className)} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-man3" />
        </svg>
    );
}
