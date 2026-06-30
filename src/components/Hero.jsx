'use client';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [heroData, setHeroData] = useState({
        bgImageUrl: '/images/hero-bg.jpg',
        badgeText: 'THE EPITOME OF ELEGANCE',
        heading: 'Curating the',
        highlightText: 'Extraordinary',
        description: "A private studio of designers, producers, and storytellers - quietly responsible for some of the world's most discreet celebrations.",
        primaryButtonText: 'Explore Services',
        primaryButtonLink: '#services',
        secondaryButtonText: 'View Portfolio',
        secondaryButtonLink: '#portfolio'
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
                <img src={heroData.bgImageUrl || '/images/hero-bg.jpg'} alt="Luxury Event" className="w-full h-full object-cover animate-[scale-up_20s_ease-out_infinite]" />
            </div>
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
                <span className="inline-block px-4 py-1 mb-6 border border-primary-gold/30 rounded-full text-primary-gold text-xs tracking-[0.3em] uppercase bg-primary-gold/10 backdrop-blur-md">
                    {heroData.badgeText}
                </span>
                <h1 className="text-5xl md:text-7xl font-heading mb-6 leading-tight">
                    {heroData.heading} <br/> <span className="italic text-primary-gold font-serif">{heroData.highlightText}</span>
                </h1>
                <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    {heroData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                    <a href={heroData.primaryButtonLink} className="px-8 py-3 bg-primary-gold text-black font-medium tracking-wider uppercase hover:bg-primary-gold-hover transition-colors">
                        {heroData.primaryButtonText}
                    </a>
                    <a href={heroData.secondaryButtonLink} className="px-8 py-3 border border-white/30 text-white font-medium tracking-wider uppercase hover:bg-white hover:text-black transition-colors">
                        {heroData.secondaryButtonText}
                    </a>
                </div>
            </div>
        </section>
    );
}
