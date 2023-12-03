import { DefChrome } from "./01-chrome";
import { DefFirefox } from "./02-firefox";
import { DefMe } from "./03-edge";
import { DefDev } from "./04-dev";
import { DeIe } from "./05-ie";

export function UISymbolsDefs() {
    return (
        <svg
            id="svgfont"
            style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
        >
            <defs>
                {DefChrome()}
                {DefFirefox()}
                {DefMe()}
                {DefDev()}
                {DeIe()}
            </defs>
        </svg>
    );
}
