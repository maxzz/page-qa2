import { HTMLAttributes } from "react";
import { Browser } from "@/store/apis";
import { IconLogoCr } from "./01-chrome";
import { IconLogoFf } from "./02-firefox";
import { IconLogoMe } from "./03-edge";
import { IconLogoDev } from "./04-dev";
import { IconLogoMan3 } from "./06-manifest3";

export function IconBrowser({ browser, ...rest }: { browser?: Browser; } & HTMLAttributes<SVGSVGElement>) {
    switch (browser) {
        case Browser.chrome: return <IconLogoCr {...rest} />;
        case Browser.chrome3: return <IconLogoMan3 {...rest} />;
        case Browser.firefox: return <IconLogoFf {...rest} />;
        case Browser.dev: return <IconLogoDev {...rest} />;
        case Browser.edge: return <IconLogoMe {...rest} />;
        case Browser.unknown: return <div {...rest as HTMLAttributes<HTMLDivElement>} />;
    }
    return null;
}
