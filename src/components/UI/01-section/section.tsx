import { ReactNode } from "react";
import { useSnapshot } from "valtio";
import { UISectionPane } from "./UISectionPane";
import { UIAccordion } from "./UIAccordion";
import { textShadow } from "../shared-styles";

export function Section({ title, children, name, state }: { title: ReactNode; children: ReactNode; name: string; state: Record<string, boolean>; }) {
    const open = useSnapshot(state)[name];
    return (
        <div>
            <UISectionPane
                className="pl-4 px-2 py-2 bg-[#003f82] text-stone-100 uppercase rounded flex items-center justify-between select-none cursor-pointer font-ui"
                style={textShadow}
                open={open}
                onClick={() => state[name] = !open}
            >
                {title}
            </UISectionPane>
            <UIAccordion toggle={open}>
                {children}
            </UIAccordion>
        </div>
    );
}
