import { useState } from "react";
import { beautify } from "./beautify";

export function JsonBeautifier() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [formatted, setFormatted] = useState('');
    return (
        <div className="" onClick={() => setOpen((v) => !v)}>
            <button className="">JSON beautifier...</button>
            {open &&
                <div className="">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                            const t = e.target.value;
                            setText(t);
                            setFormatted(beautify(t, null, 4));
                        }} />
                    <div className="">
                        {formatted}
                    </div>
                </div>
            }
        </div >
    );
}
