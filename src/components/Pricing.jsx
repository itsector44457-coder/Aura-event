import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Pricing() {
    const headerRef = useIntersectionObserver();
    const p1 = useIntersectionObserver();
    const p2 = useIntersectionObserver();
    const p3 = useIntersectionObserver();

    return (
        <section id="pricing" className="py-32 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 invisible-before-scroll">
                    <h2 className="text-4xl md:text-5xl font-heading mb-6">Curated <span className="text-primary-gold italic">Packages</span></h2>
                    <p className="text-text-muted text-lg">Investment levels tailored for extraordinary experiences.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Essential Package */}
                    <div ref={p1} className="bg-white/5 border border-white/10 backdrop-blur-md p-10 rounded-xl flex flex-col invisible-before-scroll hover:bg-white/10 hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-2xl font-heading text-white mb-2">Essential</h3>
                        <div className="text-xl text-primary-gold font-semibold mb-8">From $25k</div>
                        <ul className="flex-1 space-y-4 mb-10 text-text-muted">
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Venue Sourcing</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Basic Aesthetic Design</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Vendor Coordination</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Day-of Management</li>
                        </ul>
                        <a href="#contact" className="block text-center border border-white/20 text-white font-semibold uppercase tracking-widest py-4 rounded hover:bg-white hover:text-black transition-colors">Inquire Now</a>
                    </div>

                    {/* Signature Package */}
                    <div ref={p2} className="relative bg-black/80 border border-primary-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-md p-10 rounded-xl flex flex-col transform md:-translate-y-4 invisible-before-scroll hover:-translate-y-6 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-gold text-black text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">Most Popular</div>
                        <h3 className="text-2xl font-heading text-white mb-2">Signature</h3>
                        <div className="text-xl text-primary-gold font-semibold mb-8">From $75k</div>
                        <ul className="flex-1 space-y-4 mb-10 text-text-muted">
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Premium Venue Sourcing</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Custom Spatial Design</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Full Vendor Management</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Entertainment Booking</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Multi-day Coordination</li>
                        </ul>
                        <a href="#contact" className="block text-center bg-primary-gold text-black font-semibold uppercase tracking-widest py-4 rounded hover:bg-white hover:text-black transition-colors">Inquire Now</a>
                    </div>

                    {/* Bespoke Package */}
                    <div ref={p3} className="bg-white/5 border border-white/10 backdrop-blur-md p-10 rounded-xl flex flex-col invisible-before-scroll hover:bg-white/10 hover:-translate-y-2 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-2xl font-heading text-white mb-2">Bespoke</h3>
                        <div className="text-xl text-primary-gold font-semibold mb-8">Custom</div>
                        <ul className="flex-1 space-y-4 mb-10 text-text-muted">
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Global Destination Management</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Unrestricted Design Budget</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Celebrity Entertainment</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Concierge Guest Services</li>
                            <li className="flex items-center"><span className="text-primary-gold mr-3">✓</span> Complete Exclusivity</li>
                        </ul>
                        <a href="#contact" className="block text-center border border-white/20 text-white font-semibold uppercase tracking-widest py-4 rounded hover:bg-white hover:text-black transition-colors">Inquire Now</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
