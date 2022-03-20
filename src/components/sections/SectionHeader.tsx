import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { UISectionPane } from "../UI/UISectionPane";
import { UIAccordion } from "../UI/UIAccordion";

export function SectionHeader({ children, openAtom }: { children: React.ReactNode; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);

    return (<div>
        <UISectionPane open={open} onClick={() => setOpen(v => !v)}>
            <div className="">
                Test Applications for QA
            </div>
        </UISectionPane>
        <UIAccordion toggle={open}>
            {children}
        </UIAccordion>
    </div>);
}
