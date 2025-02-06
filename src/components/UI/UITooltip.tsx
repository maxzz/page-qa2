import { type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '@/utils/classnames';
import { Config, usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

type UITooltipOptions = {
    arrow?: boolean;
    runInPortal?: boolean;
    popperConfig?: Config;
    classNamesContainer?: string;
    classNamesArrow?: string;
    arrowStyle?: CSSProperties;
};

type UITooltipProps = UITooltipOptions & {
    trigger: ReactNode;
    children?: ReactNode;
};

export const smallTooltipOptions: UITooltipOptions = {
    arrow: true,
    popperConfig: { delayShow: 750, placement: 'auto' }
};

// To customize borders with Tailwind:
//      classNamesContainer={`p-0 bg-[#555] border border-[red]`}
//      arrowStyle={{ '--tooltipBorder': 'red', '--tooltipBackground': '#555' } as CSSProperties}

export function UITooltip({ trigger, children, arrow = false, runInPortal = true, popperConfig, classNamesContainer, classNamesArrow, arrowStyle }: UITooltipProps) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ ...popperConfig, }); //{ defaultVisible: true }

    const poperBody = visible && (
        <div
            ref={setTooltipRef}
            {...getTooltipProps({
                className: classNames('tooltip-container', classNamesContainer), // add -mx-4 to add right/left margin from viewport edge, but it will shift arrow
            })}
        >
            {children}

            {arrow && (
                <div
                    {...getArrowProps({
                        className: classNames('tooltip-arrow', classNamesArrow),
                        style: arrowStyle,
                    })}
                />
            )}
        </div>
    );

    const Popper = visible && (
        runInPortal
            ? createPortal((poperBody), document.getElementById('portal')!)
            : poperBody
    );

    return (<>
        <div ref={setTriggerRef}>
            {trigger}
        </div>

        {Popper}
    </>);
}
