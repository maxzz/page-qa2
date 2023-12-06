import { Atom, useAtomValue } from 'jotai';
import { a, useSpring } from '@react-spring/web';
import { convTBrowserShort2Name, TBrowserShort } from '@/store/apis/types';
import { ExtnFromConfig } from '@/store/apis';
import { beautifyDate } from '@/utils/helpers';
import { IconBrowser } from '@/components/ui/icons';
import { boxShadow } from './0-hero-image';
import { ActionButtons } from './1-action-buttons';

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

export function CurrentVersion({ browser, extInfoAtom, loading }: { browser: TBrowserShort; extInfoAtom: Atom<ExtnFromConfig | undefined>; loading: boolean; }) {
    const extnFromConfig = useAtomValue(extInfoAtom);
    const vis = extnFromConfig?.fname;
    const browser2: TBrowserShort = extnFromConfig?.isV3 ? TBrowserShort.chrome3 : (extnFromConfig?.browser || TBrowserShort.unknown);

    const btnStyles = useSpring({ opacity: vis ? 1 : 0, scaleY: vis ? 1 : 0, config: { duration: 150 }, });
    const txtStyles = useSpring({ opacity: vis ? 1 : 0, x: vis ? 0 : 200, config: { duration: 150 }, });
    
    return (
        <div className="px-2 pt-2 pb-1 sm:px-4 sm:py-3 border grid grid-cols-[auto,1fr]" style={{ ...boxShadow, transition: "all .2s" }}>

            {/* Icon, name, version, updated date */}
            <div className="content-center place-self-center">
                <IconBrowser browser={browser} className={"w-9 h-8"} style={iconShadow} />
            </div>

            <div className="ml-3 text-xs overflow-hidden">
                <div className="text-base font-bold scale-y-125 whitespace-nowrap">{convTBrowserShort2Name(browser)}
                    {' '}QA extension
                </div>

                <a.div style={txtStyles}>
                    <div className="h-4">
                        {extnFromConfig?.updated ? `Updated on ${beautifyDate(extnFromConfig.updated)}` : loading ? '' : 'update date not available'}
                    </div>
                    <div className="h-4">
                        {extnFromConfig?.version || (loading ? '' : 'version not available')}
                    </div>
                </a.div>
            </div>

            {/* Action buttons */}
            <a.div className="col-start-2 mt-2 sm:mt-0" style={btnStyles}>
                <ActionButtons url={extnFromConfig?.fname} />
            </a.div>
        </div>
    );
}
