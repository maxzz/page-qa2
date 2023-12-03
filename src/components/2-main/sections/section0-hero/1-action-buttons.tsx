import { useRef } from 'react';
import { IconClipboard, IconDownload } from '../../../ui/icons';
import { classNames } from '@/utils/classnames';
import { toastSucceeded } from '../../../ui/UiToaster';
import { confetti } from 'dom-confetti';

const confettiConfig = { //https://daniel-lundin.github.io/react-dom-confetti
    angle: 90,
    spread: 147,
    startVelocity: 60,
    elementCount: 130,
    dragFriction: 0.21,
    duration: 2000,
    stagger: 0,
    width: "8px",
    height: "4px",
    perspective: "1000px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

export function ActionButtons({ url }: { url?: string; }) {
    const confettiRef = useRef<HTMLButtonElement>(null);
    return (
        <div className="flex items-center lg:justify-end space-x-2 text-sm">
            {/* Download button */}
            <a
                className={classNames(
                    "p-2 flex items-center whitespace-nowrap rounded hover:bg-blue-100 active:scale-[.97] space-x-0.5 select-none",
                    !url && "invisible pointer-events-none",
                )}
                href={url}
                title="Download extension"
            >
                <IconDownload className="w-6 h-6" strokeWidth={1} />
                <div>Download</div>
            </a>

            {/* Copy link */}
            <button
                className={classNames(
                    "p-2 flex items-center whitespace-nowrap rounded hover:bg-blue-100 active:scale-[.97] space-x-0.5 select-none",
                    !url && "invisible pointer-events-none",
                )}
                onClick={async () => {
                    await navigator.clipboard.writeText(url || '');
                    toastSucceeded('Link copied to clipboard');
                    confetti(confettiRef.current!, confettiConfig);
                }}
                ref={confettiRef}
                title="Copy extension URL to clipboard"
            >
                <IconClipboard className="w-6 h-6" strokeWidth={1} />
                <div>Copy link</div>
            </button>
        </div>
    );
}
