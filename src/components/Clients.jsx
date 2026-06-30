import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Clients() {
    const fadeRef1 = useIntersectionObserver();
    const fadeRef2 = useIntersectionObserver();

    return (
        <section id="clients" className="py-24 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p ref={fadeRef1} className="text-sm tracking-[0.2em] text-text-muted uppercase mb-12 invisible-before-scroll">
                    Trusted by Industry Leaders
                </p>
                <div ref={fadeRef2} className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 invisible-before-scroll" style={{ animationDelay: '0.2s' }}>
                    {['VOGUE', 'TESLA', 'LVMH', 'ROLEX', 'FORBES'].map((client, i) => (
                        <div key={i} className="text-xl md:text-2xl font-heading tracking-widest text-white hover:text-primary-gold hover:scale-110 transition-all duration-300 cursor-default">
                            {client}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
