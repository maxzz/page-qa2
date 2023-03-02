import { useState } from "react";
import { beautify } from "./beautify";

export function JsonBeautifier() {
    const [text, setText] = useState('');
    const [formatted, setFormatted] = useState('');
    return (
        <div className="">
            <div className="">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        const t = e.target.value;
                        setText(t);
                        setFormatted(beautify(t, null, 4));
                    }} />
                <div className="">{formatted}</div>
            </div>
        </div>
    );
}
