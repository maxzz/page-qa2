import { useAtomValue } from 'jotai';
import { loadingStateConfigAtom, latestChExtensionAtom, latestFfExtensionAtom } from '@/store/store';
import { BrowserShort } from '@/store/apis/types';
import { HeroImage } from './0-hero-image';
import { CurrentVersion } from './2-current-version';

function CurrentVersions() {
    const { loading } = useAtomValue(loadingStateConfigAtom);
    return (
        <div className="flex flex-col justify-center space-y-2">
            <CurrentVersion browser={BrowserShort.chrome} extInfoAtom={latestChExtensionAtom} loading={loading} />
            <CurrentVersion browser={BrowserShort.firefox} extInfoAtom={latestFfExtensionAtom} loading={loading} />
        </div>
    );
}

export function Section0_HeroSection() {
    return (
        <div className="mt-4 mb-3 h-60 grid grid-cols-[minmax(8rem,1fr),minmax(12rem,28rem)] gap-4">
            <HeroImage />
            <CurrentVersions />
        </div>
    );
}
