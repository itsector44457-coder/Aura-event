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

function ServiceCard({ service, index }) {
    const ref = useIntersectionObserver();
    return (
        <div ref={ref} className={`group relative bg-[rgba(25,25,25,0.6)] border border-white/5 rounded-xl overflow-hidden hover:bg-[rgba(40,40,40,0.8)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 invisible-before-scroll`} style={{ animationDelay: `${index * 0.1}s` }}>
            {service.icon.includes('/') || service.icon.includes('http') ? (
                <div className="h-48 overflow-hidden">
                    <img src={service.icon} alt={service.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </div>
            ) : (
                <div className="p-8 text-center bg-black/30">
                    <i className={`bx ${service.icon} text-6xl text-primary-gold group-hover:scale-110 transition-transform duration-500`}></i>
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
        <section id="services" className="py-32 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 invisible-before-scroll">
                    <h2 className="text-4xl md:text-5xl font-heading mb-6">Our <span className="text-primary-gold italic">Expertise</span></h2>
                    <p className="text-text-muted text-lg">Masterfully crafted events tailored to your unique vision.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <ServiceCard key={service._id} service={service} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
