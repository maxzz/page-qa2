import { a, easings, useSpring } from '@react-spring/web';
import HERO_IMAGE from '@/assets/frontpage/qa-header.jpg';

export const boxShadow = "\
0 2px 1px -1px rgba(0,0,0,.2), \
0 1px 1px 0 rgba(0,0,0,.14), \
0 1px 3px 0 rgba(0,0,0,.12)\
";

export function HeroImage() {
    const styles = useSpring({
        from: { scale: 2, opacity: 0, y: -1000 },
        to: { scale: 1, opacity: 1, y: 0 },
        config: { duration: 1600, easing: easings.easeInOutElastic }
    });
    return (
        <div className="overflow-hidden">
            <a.div style={styles} className="bg-slate-50 rounded overflow-hidden transition-all duration-200">
                <img
            
                    className="h-full object-cover border border-slate-300 border-b-slate-400"
                    src={HERO_IMAGE}
                    alt="hero"
                />
            </a.div>
        </div>
    );
}
