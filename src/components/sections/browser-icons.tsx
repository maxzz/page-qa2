import { HTMLAttributes } from 'react';
import { TBrowserShort } from '@/store/apis/api-formats-g01';
import iconClasses from './browser-icons.module.scss';
import { IconLogoCr, IconLogoFf, IconLogoMe } from '../UI/UIIcons';

export function getExtensionIconClass(browser?: TBrowserShort | undefined) {
    const types = {
        [TBrowserShort.chrome]: 'iconCh',
        [TBrowserShort.firefox]: 'iconFf',
        [TBrowserShort.dev]: 'iconTt',
    };
    return iconClasses[types[browser as keyof typeof types || TBrowserShort.dev] || 'iconMs'];
}

export function BrowserIcon({ browser, ...rest }: { browser: TBrowserShort; } & HTMLAttributes<SVGSVGElement>) {
    switch (browser) {
        case TBrowserShort.chrome: return <IconLogoCr { ...rest } />
        case TBrowserShort.firefox: return <IconLogoFf { ...rest } />
        case TBrowserShort.edge: return <IconLogoMe { ...rest } />
    }
    return null;
}
