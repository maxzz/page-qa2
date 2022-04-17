import * as React from 'react';
import ReactDOM from 'react-dom';
import { Config, usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

type UITooltipOptions = {
    arrow?: boolean;
    runInPortal?: boolean;
    popperConfig?: Config;
};

type UITooltipProps = UITooltipOptions & {
    trigger: React.ReactNode;
    children?: React.ReactNode;
};

export function UITooltip({ trigger, children, arrow = false, runInPortal = true, popperConfig }: UITooltipProps) {
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
            {...getTooltipProps({ className: 'tooltip-container' })} // add -mx-4 to add right/left margin from viewport edge, but it will shift arrow
        >
            {children}
            {arrow && <div {...getArrowProps({ className: 'tooltip-arrow' })} />}
        </div>
    );
    const popper = visible && (
        runInPortal ? ReactDOM.createPortal((poperBody), document.getElementById('portal')!) : { poperBody }
    );
    return (
        <>
            <div ref={setTriggerRef}> {trigger} </div>
            {popper}
        </>
    );
}

export function uitooltipSmall(): UITooltipOptions {
    return {
        arrow: true,
        popperConfig: { delayShow: 750, placement: 'auto' }
    };
}
