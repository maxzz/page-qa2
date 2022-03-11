import React from "react";
import { a, useTransition } from "@react-spring/web";

export const animationScaleY = {
    from: { opacity: 0, scaleY: 0, y: -1000, transformOrigin: 'center top', overflow: 'hidden' },
    enter: { opacity: 1, scaleY: 1, y: 0, transformOrigin: 'center top', overflow: 'hidden' },
    leave: { opacity: 0, scaleY: 0, y: -1000, transformOrigin: 'center top', overflow: 'hidden' },
};

export const animationConfig = {
    //config: { mass: 0.2, tension: 692, clamp: true },
    config: { duration: 200 },
};

export function UIListTransition({ open, children }: { open: boolean; children: React.ReactNode; }) {
    const transition = useTransition(open, { ...animationScaleY, ...animationConfig });
    return transition((styles, item) => (
        item && <a.div style={styles}>
            {children}
        </a.div>
    ));
}
