import mongoose from 'mongoose';

const LayoutConfigSchema = new mongoose.Schema({
    // Navbar
    brandNameLine1: { type: String, default: 'AURA' },
    brandNameLine2: { type: String, default: 'Events' },
    navLinks: [{
        label: { type: String },
        href: { type: String }
    }],
    contactPhone: { type: String, default: '+1 (800) 123-4567' },
    contactEmail: { type: String, default: 'hello@auraevents.com' },
    
    // Footer
    footerDescription: { type: String, default: 'Aura Events crafts unparalleled luxury experiences, seamlessly blending modern elegance with timeless sophistication.' },
    socialLinks: {
        instagram: { type: String, default: '#' },
        twitter: { type: String, default: '#' },
        linkedin: { type: String, default: '#' }
    },
    newsletterHeading: { type: String, default: 'INSIDER ACCESS' },
    newsletterText: { type: String, default: 'Join our exclusive list for early access to premium event concepts and luxury design inspiration.' }
}, { timestamps: true });

export default mongoose.models.LayoutConfig || mongoose.model('LayoutConfig', LayoutConfigSchema);
