import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Process() {
    const headerRef = useIntersectionObserver();
    const t1 = useIntersectionObserver();
    const t2 = useIntersectionObserver();
    const t3 = useIntersectionObserver();
    const t4 = useIntersectionObserver();

    const steps = [
        { ref: t1, num: '1', title: 'Discovery', desc: 'We begin by understanding your vision, objectives, and the unique essence of your brand or celebration.', delay: '0.1s' },
        { ref: t2, num: '2', title: 'Design', desc: 'Our creative team develops a comprehensive aesthetic and experiential concept tailored just for you.', delay: '0.2s' },
        { ref: t3, num: '3', title: 'Planning', desc: 'Meticulous logistics, vendor sourcing, and detailed scheduling to ensure everything runs perfectly.', delay: '0.3s' },
        { ref: t4, num: '4', title: 'Execution', desc: 'Our on-site management team brings the vision to life, allowing you to simply experience the magic.', delay: '0.4s' }
    ];

    return (
        <section id="process" className="py-32 bg-black">
            <div className="max-w-5xl mx-auto px-6">
                <div ref={headerRef} className="text-center mb-20 invisible-before-scroll">
                    <h2 className="text-4xl md:text-5xl font-heading mb-6">Our <span className="text-primary-gold italic">Process</span></h2>
                    <p className="text-text-muted text-lg">From conception to flawless execution.</p>
                </div>
                
                <div className="relative border-l border-white/10 ml-4 md:mx-auto md:ml-auto">
                    {steps.map((step, idx) => (
                        <div key={idx} ref={step.ref} className="relative pl-12 md:pl-0 mb-16 last:mb-0 invisible-before-scroll md:flex md:items-center" style={{ animationDelay: step.delay }}>
                            
                            {/* Dot */}
                            <div className="absolute left-[-20px] md:left-1/2 md:-ml-[20px] top-0 md:top-auto w-10 h-10 bg-black border border-primary-gold text-primary-gold rounded-full flex items-center justify-center font-heading text-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] z-10">
                                {step.num}
                            </div>
                            
                            {/* Content */}
                            <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:ml-auto'}`}>
                                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-xl hover:bg-white/10 transition-colors">
                                    <h3 className="text-2xl font-heading text-white mb-3">{step.title}</h3>
                                    <p className="text-text-muted leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
