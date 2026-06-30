'use client';
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
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg' : 'py-6 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <a href="#" className="text-2xl font-heading text-white tracking-widest uppercase">
                    {layout.brandNameLine1}<span className="text-primary-gold">{layout.brandNameLine2 ? ` ${layout.brandNameLine2}` : '.'}</span>
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
                    <span className="w-6 h-0.5 bg-white block"></span>
                    <span className="w-6 h-0.5 bg-white block"></span>
                    <span className="w-6 h-0.5 bg-white block"></span>
                </div>
            </div>
        </nav>
    );
}
