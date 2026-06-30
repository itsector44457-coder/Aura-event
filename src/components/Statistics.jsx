import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Counter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);
                let current = 0;
                const speed = 200;
                const inc = target / speed;
                
                const updateCount = () => {
                    if (current < target) {
                        current += inc;
                        setCount(Math.ceil(current));
                        setTimeout(updateCount, 10);
                    } else {
                        setCount(target);
                    }
                };
                updateCount();
            }
        }, { threshold: 0.5 });
        
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, hasAnimated]);

    return <h3 className="text-4xl md:text-5xl font-heading text-primary-gold mb-2" ref={ref}>{count}{suffix}</h3>;
};

export default function Statistics() {
    const item1 = useIntersectionObserver();
    const item2 = useIntersectionObserver();
    const item3 = useIntersectionObserver();
    const item4 = useIntersectionObserver();

    return (
        <section id="statistics" className="py-24 relative bg-black overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/hero_bg.png')] bg-fixed bg-cover bg-center opacity-30"></div>
            <div className="absolute inset-0 bg-black/60"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div ref={item1} className="p-8 text-center bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl hover:border-primary-gold/30 transition-colors invisible-before-scroll">
                    <Counter target={1500} suffix="+" />
                    <p className="text-sm tracking-widest text-text-muted uppercase">Events Executed</p>
                </div>
                <div ref={item2} className="p-8 text-center bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl hover:border-primary-gold/30 transition-colors invisible-before-scroll" style={{ animationDelay: '0.1s' }}>
                    <Counter target={45} />
                    <p className="text-sm tracking-widest text-text-muted uppercase">Countries</p>
                </div>
                <div ref={item3} className="p-8 text-center bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl hover:border-primary-gold/30 transition-colors invisible-before-scroll" style={{ animationDelay: '0.2s' }}>
                    <Counter target={98} suffix="%" />
                    <p className="text-sm tracking-widest text-text-muted uppercase">% Satisfaction</p>
                </div>
                <div ref={item4} className="p-8 text-center bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl hover:border-primary-gold/30 transition-colors invisible-before-scroll" style={{ animationDelay: '0.3s' }}>
                    <Counter target={12} />
                    <p className="text-sm tracking-widest text-text-muted uppercase">Awards Won</p>
                </div>
            </div>
        </section>
    );
}
