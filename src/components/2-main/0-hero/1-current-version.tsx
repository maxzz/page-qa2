import { Atom, useAtomValue } from 'jotai';
import { a, useSpring } from '@react-spring/web';
import { convBrowser2Name, Browser } from '@/store/apis/9-types';
import { ExtnFromConfig } from '@/store/apis';
import { beautifyDate } from '@/utils/helpers';
import { IconBrowser } from '@/components/ui/icons';
import { ActionButtons } from './2-action-buttons';

export function CurrentVersion({ browser, extInfoAtom, loading }: { browser: Browser; extInfoAtom: Atom<ExtnFromConfig | undefined>; loading: boolean; }) {
    const extnFromConfig = useAtomValue(extInfoAtom);
    const broIcon: Browser = extnFromConfig?.broIcon || browser;

    const hasInfo = extnFromConfig?.fname;
    const hasIcon = extnFromConfig?.broIcon;

    const icoStyles = useSpring({ opacity: hasIcon ? 1 : 0, config: { duration: 1500 }, });
    const btnStyles = useSpring({ opacity: hasInfo ? 1 : 0, scaleY: hasInfo ? 1 : 0, config: { duration: 150 }, });
    const txtStyles = useSpring({ opacity: hasInfo ? 1 : 0, x: hasInfo ? 0 : 200, config: { duration: 150 }, });

    return (
        <div className="px-2 pt-2 pb-1 sm:px-4 sm:py-3 border rounded transition-all duration-200 grid grid-cols-[auto,1fr]" style={{ boxShadow }}>

            {/* Icon, name, version, updated date */}
            <a.div style={icoStyles} className="content-center place-self-center">
                <IconBrowser browser={broIcon} className={"w-9 h-8"} style={iconShadow} />
            </a.div>

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

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

export const boxShadow = "\
0 2px 1px -1px rgba(0,0,0,.2), \
0 1px 1px 0 rgba(0,0,0,.14), \
0 1px 3px 0 rgba(0,0,0,.12)\
";
