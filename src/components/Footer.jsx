'use client';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [layout, setLayout] = useState({
        brandNameLine1: 'Aura',
        brandNameLine2: 'Events',
        footerDescription: "A private studio of designers, producers, and storytellers - quietly responsible for some of the world's most discreet celebrations.",
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
        <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                <div className="lg:col-span-1">
                    <h2 className="text-3xl font-heading mb-4 leading-tight">
                        <span className="italic font-light text-white">{layout.brandNameLine1}</span><br />
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
                        <li><a href={`mailto:${layout.contactEmail}`} className="hover:text-primary-gold transition-colors">{layout.contactEmail}</a></li>
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
                        <input type="email" placeholder="you@maison.co" required className="w-full bg-[#111] border border-[#222] p-4 pr-32 text-white text-sm focus:outline-none focus:border-[#444] transition-colors rounded-none" />
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
