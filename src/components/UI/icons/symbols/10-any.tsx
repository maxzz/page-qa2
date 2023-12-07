import { HTMLAttributes } from "react";
import { BrowserShort } from "@/store/apis";
import { IconLogoCr } from "./01-chrome";
import { IconLogoFf } from "./02-firefox";
import { IconLogoMe } from "./03-edge";
import { IconLogoDev } from "./04-dev";
import { IconLogoMan3 } from "./06-manifest3";

export function IconBrowser({ browser, ...rest }: { browser?: BrowserShort; } & HTMLAttributes<SVGSVGElement>) {
    switch (browser) {
        case BrowserShort.chrome: return <IconLogoCr {...rest} />;
        case BrowserShort.chrome3: return <IconLogoMan3 {...rest} />;
        case BrowserShort.firefox: return <IconLogoFf {...rest} />;
        case BrowserShort.dev: return <IconLogoDev {...rest} />;
        case BrowserShort.edge: return <IconLogoMe {...rest} />;
    }
    return null;
}
