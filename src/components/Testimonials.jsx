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

function TestimonialCard({ item, index }) {
    const ref = useIntersectionObserver();
    return (
        <div ref={ref} className={`bg-[rgba(25,25,25,0.6)] border border-white/5 p-10 relative invisible-before-scroll flex flex-col`} style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="text-6xl text-primary-gold/20 font-serif absolute top-4 left-6 leading-none">"</div>
            <div className="text-primary-gold mb-6 text-sm tracking-widest relative z-10">
                {'★'.repeat(item.rating || 5)}{'☆'.repeat(5 - (item.rating || 5))}
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
        <section id="testimonials" className="py-32 bg-[#050505]">
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
