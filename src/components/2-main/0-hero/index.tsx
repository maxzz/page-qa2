import { useAtomValue } from 'jotai';
import { loadingStateConfigAtom, latestChExtensionAtom, latestFfExtensionAtom } from '@/store/store';
import { Browser } from '@/store/apis/9-types';
import { a, easings, useSpring } from '@react-spring/web';
import HERO_IMAGE from '@/assets/frontpage/qa-header.jpg';
import { boxShadow, CurrentVersion } from './2-current-version';

export function Section0_HeroSection() {
    return (
        <div className="mt-4 mb-3 h-60 grid grid-cols-[minmax(8rem,1fr)_minmax(12rem,28rem)] gap-4">
            <HeroImage />
            <CurrentVersions />
        </div>
    );
}

function HeroImage() {
    const styles = useSpring({
        from: { scale: 3, opacity: 0.2, y: -1000 },
        to: { scale: 1, opacity: 1, y: 0 },
        config: { duration: 3000, easing: easings.easeInOutElastic }
    });
    return (
        <div className="bg-slate-50 rounded overflow-hidden transition-all duration-200" style={{ boxShadow }}>
            <a.img
                style={styles}
                className="h-full object-cover border border-slate-300 border-b-slate-400"
                src={HERO_IMAGE}
                alt="hero"
            />
        </div>
    );
}

function CurrentVersions() {
    const { loading } = useAtomValue(loadingStateConfigAtom);
    return (
        <div className="flex flex-col justify-center space-y-2">
            <CurrentVersion browser={Browser.chrome} extInfoAtom={latestChExtensionAtom} loading={loading} />
            <CurrentVersion browser={Browser.firefox} extInfoAtom={latestFfExtensionAtom} loading={loading} />
        </div>
    );
}
