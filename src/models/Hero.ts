import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
    badgeText: { type: String, default: 'The New Standard' },
    heading: { type: String, default: 'Crafting Unforgettable' },
    highlightText: { type: String, default: 'Experiences' },
    description: { type: String, default: 'We are a premier event management company...' },
    bgImageUrl: { type: String, default: '/images/hero_bg.png' },
    bgVideoUrl: { type: String, default: '' },
    primaryButtonText: { type: String, default: 'Book an Event' },
    primaryButtonLink: { type: String, default: '#contact' },
    secondaryButtonText: { type: String, default: 'View Portfolio' },
    secondaryButtonLink: { type: String, default: '#portfolio' },
    statsTitle: { type: String, default: '10+ Years' },
    statsSubtitle: { type: String, default: 'of Excellence' }
}, { timestamps: true });

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
