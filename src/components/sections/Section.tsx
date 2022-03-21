import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { UISectionPane } from "../UI/UISectionPane";
import { UIAccordion } from "../UI/UIAccordion";

export function Section({ title, children, openAtom }: { title: React.ReactNode; children: React.ReactNode; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    return (
        <div>
            <UISectionPane
                className="px-2 py-1 bg-slate-500 text-stone-100 uppercase flex items-center justify-between select-none cursor-pointer font-ui"
                open={open}
                onClick={() => setOpen(v => !v)}
            >
                {title}
            </UISectionPane>
            <UIAccordion toggle={open}>
                {children}
            </UIAccordion>
        </div>
    );
}
