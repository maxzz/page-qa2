import { Fragment } from 'react';
import { getArchiveExtensionUrl, Meta, ReleaseType, TBrowserName } from '@/store/apis';
import { IconBrowser } from '@/components/ui/icons';
import { OrderedGroup } from './1-group-icons';

function PopupVersionItem({ meta }: { meta?: Meta; }) {
    if (!meta) {
        return null;
    }
    const name = `${TBrowserName(meta.browser)} version ${meta.version}${meta.release === ReleaseType.debug ? ' with debug information' : ''}`;
    return (
        <a className="h-5 flex items-center space-x-1" href={getArchiveExtensionUrl(meta.fname)}>
            <IconBrowser browser={meta?.browser} className="w-4 h-4 m-px rounded-full" />
            <div className="text-xs text-url hover:underline cursor-pointer">
                {name}
            </div>
        </a>
    );
}

export function PopupBody({ orderedGroup, item }: { orderedGroup: OrderedGroup; item: Meta; }) {
    return (
        <div className="min-w-[20rem] text-sm cursor-default">

            <div className="pl-1 pb-1 font-bold border-b border-slate-400">
                Versions released on {item.date}
                {item.published && <span className="ml-0.5 text-xs font-normal text-slate-500">public</span>}
            </div>

            <div className="mt-2 mb-1">
                {Object.entries(orderedGroup).map(
                    ([key, item], idx) => (
                        <Fragment key={idx}>
                            <PopupVersionItem meta={item.main} />
                            <PopupVersionItem meta={item.debug} />
                        </Fragment>
                    )
                )}
            </div>
        </div>
    );
}
