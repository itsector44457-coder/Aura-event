'use client';
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(e.target);
        const data = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            eventType: formData.get('eventType'),
            vision: formData.get('vision')
        };
        
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (res.ok) {
                setIsSent(true);
                e.target.reset();
                setTimeout(() => setIsSent(false), 5000);
            }
        } catch (error) {
            console.error('Failed to submit form', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-32 relative bg-black border-t border-white/5 overflow-hidden">
            {/* Parallax Background */}
            <div className="absolute inset-0 bg-[url('/images/hero_bg.png')] bg-fixed bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6">
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
                                <input type="text" name="fullName" placeholder="Full Name" required className="w-full bg-[rgba(25,25,25,0.6)] backdrop-blur-sm border border-white/10 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-gold transition-colors rounded-none" />
                            </div>
                            <div>
                                <input type="email" name="email" placeholder="Email Address" required className="w-full bg-[rgba(25,25,25,0.6)] backdrop-blur-sm border border-white/10 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-gold transition-colors rounded-none" />
                            </div>
                            <div>
                                <select name="eventType" required defaultValue="" className="w-full bg-[rgba(25,25,25,0.6)] backdrop-blur-sm border border-white/10 p-4 text-white focus:outline-none focus:border-primary-gold transition-colors appearance-none cursor-pointer rounded-none">
                                    <option value="" disabled className="text-gray-500">Event Type</option>
                                    <option value="corporate" className="bg-[#050505]">Corporate Event</option>
                                    <option value="wedding" className="bg-[#050505]">Luxury Wedding</option>
                                    <option value="concert" className="bg-[#050505]">Concert / Show</option>
                                    <option value="exhibition" className="bg-[#050505]">Exhibition</option>
                                    <option value="other" className="bg-[#050505]">Other</option>
                                </select>
                            </div>
                            <div>
                                <textarea name="vision" rows={5} placeholder="Tell us about your vision..." required className="w-full bg-[rgba(25,25,25,0.6)] backdrop-blur-sm border border-white/10 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-gold transition-colors rounded-none"></textarea>
                            </div>
                            <button type="submit" disabled={isSubmitting} className={`w-full p-4 tracking-widest uppercase font-medium transition-all ${isSent ? 'bg-green-600 text-white' : 'bg-primary-gold text-black hover:bg-primary-gold-hover'} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                {isSubmitting ? 'Sending...' : isSent ? 'Request Sent Successfully!' : 'Request Consultation'}
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
