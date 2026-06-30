'use client';
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
        <div ref={ref} className={`group relative overflow-hidden bg-black invisible-before-scroll aspect-[3/4]`} style={{ animationDelay: `${index * 0.15}s` }}>
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
