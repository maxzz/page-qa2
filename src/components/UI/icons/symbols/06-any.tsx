import { HTMLAttributes } from "react";
import { TBrowserShort } from "@/store/apis";
import { IconLogoCr } from "./01-chrome";
import { IconLogoFf } from "./02-firefox";
import { IconLogoMe } from "./03-edge";
import { IconLogoDt } from "./04-dev";

export function IconBrowser({ browser, ...rest }: { browser?: TBrowserShort; } & HTMLAttributes<SVGSVGElement>) {
    switch (browser) {
        case TBrowserShort.chrome: return <IconLogoCr {...rest} />;
        case TBrowserShort.firefox: return <IconLogoFf {...rest} />;
        case TBrowserShort.dev: return <IconLogoDt {...rest} />;
        case TBrowserShort.edge: return <IconLogoMe {...rest} />;
    }
    return null;
}
