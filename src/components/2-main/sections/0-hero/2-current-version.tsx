import { Atom, useAtomValue } from 'jotai';
import { a, useSpring } from '@react-spring/web';
import { convBrowser2Name, Browser } from '@/store/apis/types';
import { ExtnFromConfig } from '@/store/apis';
import { beautifyDate } from '@/utils/helpers';
import { IconBrowser } from '@/components/ui/icons';
import { boxShadow } from './0-hero-image';
import { ActionButtons } from './1-action-buttons';

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

export function CurrentVersion({ browser, extInfoAtom, loading }: { browser: Browser; extInfoAtom: Atom<ExtnFromConfig | undefined>; loading: boolean; }) {
    const extnFromConfig = useAtomValue(extInfoAtom);
    const broIcon: Browser = extnFromConfig?.broIcon || browser;
    
    const hasInfo = extnFromConfig?.fname;

    const btnStyles = useSpring({
        opacity: hasInfo ? 1 : 0,
        scaleY: hasInfo ? 1 : 0,
        config: { duration: 150 },
    });

    const txtStyles = useSpring({
        opacity: hasInfo ? 1 : 0,
        x: hasInfo ? 0 : 200,
        config: { duration: 150 },
    });

    return (
        <div className="px-2 pt-2 pb-1 sm:px-4 sm:py-3 border grid grid-cols-[auto,1fr]" style={{ boxShadow, transition: "all .2s" }}>

            {/* Icon, name, version, updated date */}
            <div className="content-center place-self-center">
                <IconBrowser browser={broIcon} className={"w-9 h-8"} style={iconShadow} />
            </div>

            <div className="ml-3 text-xs overflow-hidden">
                <div className="text-base font-bold scale-y-125 whitespace-nowrap">{convBrowser2Name(browser)}
                    {' '}QA extension
                </div>

                <a.div style={txtStyles}>
                    <div className="h-4">
                        {extnFromConfig?.updated ? `Created ${beautifyDate(extnFromConfig.updated)}` : loading ? '' : 'date not available'}
                    </div>
                    <div className="h-4">
                        Version {extnFromConfig?.version || (loading ? '' : ' not available')}
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
