import { Fragment } from 'react';
import { urlArchiveExtension, FilenameMetaEx, BuildType, convBrowser2Name } from '@/store/apis';
import { IconBrowser } from '@/components/ui/icons';
import { OrderedGroup } from './1-grid-released-item-icons';

function PopupRow({ meta }: { meta?: FilenameMetaEx; }) {
    if (!meta) {
        return null;
    }
    const name = `${convBrowser2Name(meta.browser)} version ${meta.version}${meta.build === BuildType.debug ? ' with debug information' : ''}`;
    return (
        <a className="h-5 flex items-center space-x-1" href={urlArchiveExtension(meta.fname)}>
            <IconBrowser browser={meta?.browser} className="w-4 h-4 m-px rounded-full" />
            <div className="text-xs text-url hover:underline cursor-pointer">
                {name}
            </div>
        </a>
    );
}

export function PopupBody({ orderedGroup, item }: { orderedGroup: OrderedGroup; item: FilenameMetaEx; }) {
    return (
        <div className="min-w-[20rem] text-sm cursor-default">

            <div className="pl-1 pb-1 font-bold border-b border-slate-400">
                Versions released on {item.createDate}
                {item.published && <span className="ml-0.5 text-xs font-normal text-slate-500">public</span>}
            </div>

            <div className="mt-2 mb-1">
                {Object.entries(orderedGroup).map(
                    ([key, item], idx) => (
                        <Fragment key={idx}>
                            <PopupRow meta={item.main} />
                            <PopupRow meta={item.debug} />
                        </Fragment>
                    )
                )}
            </div>
        </div>
    );
}
