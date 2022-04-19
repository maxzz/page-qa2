import { TBrowserShort } from '@/store/apis/api-formats-g01';
import iconClasses from './browser-icons.module.scss';

export function getExtensionIconClass(browser?: TBrowserShort | undefined) {
    const types = {
        [TBrowserShort.chrome]: 'iconCh',
        [TBrowserShort.firefox]: 'iconFf',
        [TBrowserShort.dev]: 'iconTt',
    };
    return iconClasses[types[browser as keyof typeof types || TBrowserShort.dev] || 'iconMs'];
}
