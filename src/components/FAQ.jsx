import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useIntersectionObserver();

    return (
        <div ref={ref} className="border-b border-white/10 invisible-before-scroll overflow-hidden">
            <button 
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`text-lg md:text-xl font-heading transition-colors duration-300 ${isOpen ? 'text-primary-gold' : 'text-white group-hover:text-primary-gold'}`}>
                    {question}
                </span>
                <span className={`text-2xl font-light text-primary-gold transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                </span>
            </button>
            <div 
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
            >
                <p className="pb-6 text-text-muted leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default function FAQ() {
    const headerRef = useIntersectionObserver();

    return (
        <section id="faq" className="py-32 bg-[#050505]">
            <div className="max-w-4xl mx-auto px-6">
                <div ref={headerRef} className="text-center mb-16 invisible-before-scroll">
                    <h2 className="text-4xl md:text-5xl font-heading mb-6">Frequent <span className="text-primary-gold italic">Inquiries</span></h2>
                </div>
                
                <div className="border-t border-white/10">
                    <AccordionItem 
                        question="Do you handle international destination events?"
                        answer="Yes, we have a global network and regularly execute high-end events across Europe, Asia, and the Americas."
                    />
                    <AccordionItem 
                        question="How far in advance should we book?"
                        answer="For large scale corporate events and luxury weddings, we recommend booking 9 to 12 months in advance to secure premium venues and vendors."
                    />
                    <AccordionItem 
                        question="What is included in the bespoke package?"
                        answer="The bespoke package is entirely custom. It includes anything and everything required to execute a vision with zero limitations, including full-time dedicated staff."
                    />
                </div>
            </div>
        </section>
    );
}
