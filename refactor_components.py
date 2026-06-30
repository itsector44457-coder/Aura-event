import os

base_dir = r"c:\Users\Krishna\Desktop\event-management-next\src\components"

files = {
    "Navbar.jsx": """'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [layout, setLayout] = useState({
        brandNameLine1: 'AURA',
        brandNameLine2: '',
        navLinks: [
            { label: 'Home', href: '#home' },
            { label: 'Services', href: '#services' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Process', href: '#process' },
            { label: 'Pricing', href: '#pricing' }
        ]
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        fetch('/api/layout-config')
            .then(res => res.json())
            .then(data => {
                if (data && data._id) {
                    setLayout(data);
                }
            })
            .catch(err => console.error(err));
            
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={ixed top-0 w-full z-50 transition-all duration-400 ease-in-out }>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <a href="#" className="text-2xl font-heading text-white tracking-widest uppercase">
                    {layout.brandNameLine1}<span className="text-primary-gold">{layout.brandNameLine2 ?   : '.'}</span>
                </a>
                <ul className="hidden md:flex gap-8">
                    {layout.navLinks.map((link, idx) => (
                        <li key={idx}>
                            <a href={link.href} className="text-sm font-medium text-text-main hover:text-primary-gold tracking-widest uppercase transition-colors">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="hidden md:block">
                    <a href="#contact" className="px-6 py-2 border border-white/20 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300">
                        Get Quote
                    </a>
                </div>
                <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                </div>
            </div>
        </nav>
    );
}
""",
    "Hero.jsx": """'use client';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [heroData, setHeroData] = useState({
        bgImage: '/images/hero-bg.jpg',
        badgeText: 'THE EPITOME OF ELEGANCE',
        headingLine1: 'Curating the',
        headingLine2: 'Extraordinary',
        description: 'A private studio of designers, producers, and storytellers — quietly responsible for some of the world\\'s most discreet celebrations.',
        btnPrimaryText: 'Explore Services',
        btnPrimaryLink: '#services',
        btnSecondaryText: 'View Portfolio',
        btnSecondaryLink: '#portfolio'
    });

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => {
                if (data && data._id) {
                    setHeroData(data);
                }
            });
    }, []);

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10"></div>
                <img src={heroData.bgImage} alt="Luxury Event" className="w-full h-full object-cover animate-[scale-up_20s_ease-out_infinite]" />
            </div>
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
                <span className="inline-block px-4 py-1 mb-6 border border-primary-gold/30 rounded-full text-primary-gold text-xs tracking-[0.3em] uppercase bg-primary-gold/10 backdrop-blur-md">
                    {heroData.badgeText}
                </span>
                <h1 className="text-5xl md:text-7xl font-heading mb-6 leading-tight">
                    {heroData.headingLine1} <br/> <span className="italic text-primary-gold font-serif">{heroData.headingLine2}</span>
                </h1>
                <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    {heroData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                    <a href={heroData.btnPrimaryLink} className="px-8 py-3 bg-primary-gold text-black font-medium tracking-wider uppercase hover:bg-primary-gold-hover transition-colors">
                        {heroData.btnPrimaryText}
                    </a>
                    <a href={heroData.btnSecondaryLink} className="px-8 py-3 border border-white/30 text-white font-medium tracking-wider uppercase hover:bg-white hover:text-black transition-colors">
                        {heroData.btnSecondaryText}
                    </a>
                </div>
            </div>
        </section>
    );
}
""",
    "Services.jsx": """'use client';
import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('invisible-before-scroll');
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function ServiceCard({ service, index }) {
    const ref = useIntersectionObserver();
    return (
        <div ref={ref} className={group relative bg-surface border border-white/5 rounded-xl overflow-hidden hover:bg-surface-hover hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 invisible-before-scroll} style={{ animationDelay: ${index * 0.1}s }}>
            {service.icon.includes('/') || service.icon.includes('http') ? (
                <div className="h-48 overflow-hidden">
                    <img src={service.icon} alt={service.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </div>
            ) : (
                <div className="p-8 text-center bg-black/30">
                    <i className={x  text-6xl text-primary-gold group-hover:scale-110 transition-transform duration-500}></i>
                </div>
            )}
            <div className="p-8">
                <h3 className="text-2xl font-heading mb-3 group-hover:text-primary-gold transition-colors">{service.title}</h3>
                <p className="text-text-muted mb-6 leading-relaxed">{service.description}</p>
                <a href="#" className="text-sm font-semibold tracking-widest uppercase text-primary-gold hover:text-white transition-colors">Learn More &rarr;</a>
            </div>
        </div>
    );
}

export default function Services() {
    const headerRef = useIntersectionObserver();
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setServices([
                        { _id: '1', icon: '/images/wedding.png', title: 'Luxury Weddings', description: 'Bespoke celebrations designed with unparalleled elegance.' },
                        { _id: '2', icon: '/images/corporate.png', title: 'Corporate Events', description: 'High-end conferences, galas, and product launches.' }
                    ]);
                } else {
                    setServices(data);
                }
            });
    }, []);

    return (
        <section id="services" className="py-32 bg-bg-dark">
            <div className="max-w-7xl mx-auto px-6">
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 invisible-before-scroll">
                    <h2 className="text-4xl md:text-5xl font-heading mb-6">Our <span className="text-primary-gold italic">Expertise</span></h2>
                    <p className="text-text-muted text-lg">Masterfully crafted events tailored to your unique vision.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, idx) => (
                        <ServiceCard key={service._id} service={service} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
""",
    "Portfolio.jsx": """'use client';
import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('invisible-before-scroll');
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function PortfolioItem({ item, index }) {
    const ref = useIntersectionObserver();
    return (
        <div ref={ref} className={group relative overflow-hidden bg-black invisible-before-scroll aspect-[3/4]} style={{ animationDelay: ${index * 0.15}s }}>
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-primary-gold text-xs tracking-[0.2em] uppercase mb-2">{item.category}</h4>
                <p className="text-2xl font-heading text-white m-0">{item.title}</p>
            </div>
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 m-4 transition-all duration-500 pointer-events-none"></div>
        </div>
    );
}

export default function Portfolio() {
    const headerRef = useIntersectionObserver();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/api/portfolio')
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setItems([
                        { _id: '1', imageUrl: '/images/wedding.png', category: 'Wedding', title: 'The Royal Gala' },
                        { _id: '2', imageUrl: '/images/concert.png', category: 'Concert', title: 'Neon Symphony' },
                        { _id: '3', imageUrl: '/images/corporate.png', category: 'Corporate', title: 'Tech Summit' },
                        { _id: '4', imageUrl: '/images/exhibition.png', category: 'Exhibition', title: 'Art Gala' }
                    ]);
                } else {
                    setItems(data);
                }
            });
    }, []);

    return (
        <section id="portfolio" className="py-32 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 invisible-before-scroll">
                    <h2 className="text-4xl md:text-5xl font-heading mb-6">Featured <span className="text-primary-gold italic">Work</span></h2>
                    <p className="text-text-muted text-lg">A glimpse into the extraordinary moments we've created.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                    {items.map((item, idx) => (
                        <PortfolioItem key={item._id} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
""",
    "Testimonials.jsx": """'use client';
import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('invisible-before-scroll');
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function TestimonialCard({ item, index }) {
    const ref = useIntersectionObserver();
    return (
        <div ref={ref} className={g-surface border border-white/5 p-10 relative invisible-before-scroll} style={{ animationDelay: ${index * 0.2}s }}>
            <div className="text-6xl text-primary-gold/20 font-serif absolute top-4 left-6 leading-none">"</div>
            <div className="text-primary-gold mb-6 text-sm tracking-widest relative z-10">
                {'?'.repeat(item.rating)}{'?'.repeat(5 - (item.rating || 5))}
            </div>
            <p className="text-lg text-gray-300 italic mb-8 relative z-10 leading-relaxed">"{item.reviewText}"</p>
            <div className="flex flex-col border-t border-white/10 pt-6 mt-auto">
                <h4 className="text-white font-heading text-xl">{item.clientName}</h4>
                <p className="text-sm text-text-muted uppercase tracking-widest mt-1">{item.eventType}</p>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const headerRef = useIntersectionObserver();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setItems([
                        { _id: '1', rating: 5, reviewText: 'AURA delivered an experience beyond our wildest dreams.', clientName: 'Sarah Jenkins', eventType: 'CEO, TechCorp' },
                        { _id: '2', rating: 5, reviewText: 'Our wedding was absolute perfection. Every element was curated with such luxury.', clientName: 'James & Emily', eventType: 'Private Clients' }
                    ]);
                } else {
                    setItems(data);
                }
            });
    }, []);

    return (
        <section id="testimonials" className="py-32 bg-bg-dark">
            <div className="max-w-7xl mx-auto px-6">
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 invisible-before-scroll">
                    <h2 className="text-4xl md:text-5xl font-heading mb-6">Client <span className="text-primary-gold italic">Stories</span></h2>
                    <p className="text-text-muted text-lg">What our esteemed clients say about us.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {items.map((item, idx) => (
                        <TestimonialCard key={item._id} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
""",
    "Contact.jsx": """'use client';
import { useState, useRef, useEffect } from 'react';

function useIntersectionObserver() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('invisible-before-scroll');
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return ref;
}

export default function Contact() {
    const infoRef = useIntersectionObserver();
    const formRef = useIntersectionObserver();
    const mapRef = useIntersectionObserver();
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
        e.target.reset();
    };

    return (
        <section id="contact" className="py-32 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div ref={infoRef} className="invisible-before-scroll">
                        <h2 className="text-4xl md:text-5xl font-heading mb-6">Start a <span className="text-primary-gold italic">Conversation</span></h2>
                        <p className="text-text-muted text-lg mb-12">Contact our team to begin planning your exceptional event.</p>
                        
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-primary-gold mb-2">Address</h4>
                                <p className="text-white text-lg">125 Luxury Avenue, Suite 400<br/>New York, NY 10022</p>
                            </div>
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-primary-gold mb-2">Email</h4>
                                <p className="text-white text-lg">concierge@auraevents.com</p>
                            </div>
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-primary-gold mb-2">Phone</h4>
                                <p className="text-white text-lg">+1 (800) 123-4567</p>
                            </div>
                        </div>
                    </div>
                    
                    <div ref={formRef} className="invisible-before-scroll" style={{ animationDelay: '0.2s' }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input type="text" placeholder="Full Name" required className="w-full bg-surface border border-white/10 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-gold transition-colors" />
                            </div>
                            <div>
                                <input type="email" placeholder="Email Address" required className="w-full bg-surface border border-white/10 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-gold transition-colors" />
                            </div>
                            <div>
                                <select required defaultValue="" className="w-full bg-surface border border-white/10 p-4 text-white focus:outline-none focus:border-primary-gold transition-colors appearance-none cursor-pointer">
                                    <option value="" disabled className="text-gray-500">Event Type</option>
                                    <option value="corporate" className="bg-bg-dark">Corporate Event</option>
                                    <option value="wedding" className="bg-bg-dark">Luxury Wedding</option>
                                    <option value="concert" className="bg-bg-dark">Concert / Show</option>
                                    <option value="exhibition" className="bg-bg-dark">Exhibition</option>
                                    <option value="other" className="bg-bg-dark">Other</option>
                                </select>
                            </div>
                            <div>
                                <textarea rows="5" placeholder="Tell us about your vision..." required className="w-full bg-surface border border-white/10 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-gold transition-colors"></textarea>
                            </div>
                            <button type="submit" className={w-full p-4 tracking-widest uppercase font-medium transition-all }>
                                {isSent ? 'Request Sent Successfully!' : 'Request Consultation'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div ref={mapRef} className="w-full h-96 mt-32 invisible-before-scroll" style={{ animationDelay: '0.4s' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1659100000000!5m2!1sen!2s" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(100%)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
    );
}
""",
    "Footer.jsx": """'use client';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [layout, setLayout] = useState({
        brandNameLine1: 'Aura',
        brandNameLine2: 'Events',
        footerDescription: 'A private studio of designers, producers, and storytellers — quietly responsible for some of the world\\'s most discreet celebrations.',
        contactEmail: 'studio@auraevents.com',
        newsletterHeading: 'FIELD NOTES',
        newsletterText: 'Quiet monthly dispatch from the studio. No promotions. Ever.',
        navLinks: [
            { label: 'Services', href: '#services' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Process', href: '#process' },
            { label: 'Pricing', href: '#pricing' }
        ],
        socialLinks: { instagram: '#', twitter: '#', linkedin: '#' }
    });

    useEffect(() => {
        fetch('/api/layout-config')
            .then(res => res.json())
            .then(data => {
                if (data && data._id) {
                    setLayout(data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <footer className="bg-bg-dark border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                <div className="lg:col-span-1">
                    <h2 className="text-3xl font-heading mb-4">
                        <span className="italic font-light">{layout.brandNameLine1}</span><br />
                        <span className="text-primary-gold font-serif">{layout.brandNameLine2}</span>
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                        {layout.footerDescription}
                    </p>
                </div>
                
                <div>
                    <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Studio</h4>
                    <ul className="space-y-3 text-text-muted text-sm">
                        {layout.navLinks.map((link, idx) => (
                            <li key={idx}><a href={link.href} className="hover:text-primary-gold transition-colors">{link.label}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">Contact</h4>
                    <ul className="space-y-3 text-text-muted text-sm">
                        <li><a href={mailto:} className="hover:text-primary-gold transition-colors">{layout.contactEmail}</a></li>
                        <li><a href="#contact" className="hover:text-primary-gold transition-colors">Begin a project</a></li>
                        <li><a href="#faq" className="hover:text-primary-gold transition-colors">FAQ</a></li>
                        <li className="pt-4 flex gap-6">
                            {layout.socialLinks?.instagram && <a href={layout.socialLinks.instagram} className="text-primary-gold hover:text-white transition-colors">IG</a>}
                            {layout.socialLinks?.twitter && <a href={layout.socialLinks.twitter} className="text-primary-gold hover:text-white transition-colors">TW</a>}
                            {layout.socialLinks?.linkedin && <a href={layout.socialLinks.linkedin} className="text-primary-gold hover:text-white transition-colors">LI</a>}
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">{layout.newsletterHeading}</h4>
                    <p className="text-text-muted text-sm mb-6">{layout.newsletterText}</p>
                    <form className="relative" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="you@maison.co" required className="w-full bg-[#111] border border-[#222] p-4 pr-32 text-white text-sm focus:outline-none focus:border-[#444] transition-colors" />
                        <button type="submit" className="absolute right-2 top-2 bottom-2 bg-transparent text-primary-gold text-xs font-semibold tracking-widest uppercase hover:text-white transition-colors px-4">Subscribe</button>
                    </form>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted">
                <p>&copy; {new Date().getFullYear()} {layout.brandNameLine1} {layout.brandNameLine2}. All Rights Reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
"""
}

for filename, content in files.items():
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)
