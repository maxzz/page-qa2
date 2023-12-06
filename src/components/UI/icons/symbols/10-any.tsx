import { HTMLAttributes } from "react";
import { TBrowserShort } from "@/store/apis";
import { IconLogoCr } from "./01-chrome";
import { IconLogoFf } from "./02-firefox";
import { IconLogoMe } from "./03-edge";
import { IconLogoDev } from "./04-dev";
import { IconLogoMan3 } from "./06-manifest3";

export function IconBrowser({ browser, ...rest }: { browser?: TBrowserShort; } & HTMLAttributes<SVGSVGElement>) {
    switch (browser) {
        case TBrowserShort.chrome: return <IconLogoCr {...rest} />;
        case TBrowserShort.chrome3: return <IconLogoMan3 {...rest} />;
        case TBrowserShort.firefox: return <IconLogoFf {...rest} />;
        case TBrowserShort.dev: return <IconLogoDev {...rest} />;
        case TBrowserShort.edge: return <IconLogoMe {...rest} />;
    }
    return null;
}
