import os

base_dir = r"c:\Users\Krishna\Desktop\event-management-next\src"
dirs = [
    "models",
    "app/api/layout-config",
    "app/admin/layout-config"
]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

files = {
    r"models\LayoutConfig.ts": """import mongoose from 'mongoose';

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
""",

    r"app\api\layout-config\route.ts": """import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import LayoutConfig from '@/models/LayoutConfig';
import jwt from 'jsonwebtoken';

const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    try {
        await connectDB();
        let config = await LayoutConfig.findOne();
        if (!config) {
            config = await LayoutConfig.create({
                navLinks: [
                    { label: 'HOME', href: '#home' },
                    { label: 'SERVICES', href: '#services' },
                    { label: 'PORTFOLIO', href: '#portfolio' },
                    { label: 'PROCESS', href: '#process' }
                ]
            });
        }
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        
        let config = await LayoutConfig.findOne();
        if (!config) {
            config = new LayoutConfig(data);
        } else {
            Object.assign(config, data);
        }
        await config.save();
        
        return NextResponse.json({ message: 'Layout updated successfully', config });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: error.message ? 401 : 500 });
    }
}
""",

    r"app\admin\layout-config\page.tsx": """'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function LayoutManager() {
    const [formData, setFormData] = useState({
        brandNameLine1: '',
        brandNameLine2: '',
        contactPhone: '',
        contactEmail: '',
        footerDescription: '',
        newsletterHeading: '',
        newsletterText: '',
        socialLinks: { instagram: '', twitter: '', linkedin: '' },
        navLinks: [] as { label: string, href: string }[]
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/layout-config')
            .then(res => res.json())
            .then(data => {
                setFormData(data);
                setLoading(false);
            });
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e: any) => {
        setFormData({ ...formData, socialLinks: { ...formData.socialLinks, [e.target.name]: e.target.value } });
    };

    const handleNavChange = (index: number, field: string, value: string) => {
        const newNavLinks = [...formData.navLinks];
        newNavLinks[index] = { ...newNavLinks[index], [field]: value };
        setFormData({ ...formData, navLinks: newNavLinks });
    };

    const addNavLink = () => {
        setFormData({ ...formData, navLinks: [...formData.navLinks, { label: '', href: '' }] });
    };

    const removeNavLink = (index: number) => {
        const newNavLinks = [...formData.navLinks];
        newNavLinks.splice(index, 1);
        setFormData({ ...formData, navLinks: newNavLinks });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/layout-config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setMessage('Saved successfully!');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    };

    if (loading) return <div className="text-white p-6">Loading...</div>;

    return (
        <div className="max-w-4xl pb-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Header & Footer Manager</h1>
                {message && <span className="text-green-400 bg-green-400/10 px-4 py-2 rounded">{message}</span>}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Navbar Settings */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl space-y-4">
                    <h2 className="text-lg font-semibold text-[#d4af37] border-b border-white/10 pb-2">Navbar Branding</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Brand Line 1 (White Italic)</label>
                            <input type="text" name="brandNameLine1" value={formData.brandNameLine1 || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Brand Line 2 (Gold Serif)</label>
                            <input type="text" name="brandNameLine2" value={formData.brandNameLine2 || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Contact Phone</label>
                            <input type="text" name="contactPhone" value={formData.contactPhone || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Contact Email</label>
                            <input type="text" name="contactEmail" value={formData.contactEmail || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-semibold text-white">Navigation Links</h3>
                            <button type="button" onClick={addNavLink} className="text-xs bg-white/10 hover:bg-white/20 p-1.5 rounded flex items-center gap-1 text-white">
                                <Plus size={14} /> Add Link
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.navLinks.map((link, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <input type="text" placeholder="Label (e.g. HOME)" value={link.label} onChange={(e) => handleNavChange(index, 'label', e.target.value)} className="w-1/2 bg-black/50 border border-white/10 rounded p-2 text-white" />
                                    <input type="text" placeholder="Link (e.g. #home)" value={link.href} onChange={(e) => handleNavChange(index, 'href', e.target.value)} className="w-1/2 bg-black/50 border border-white/10 rounded p-2 text-white" />
                                    <button type="button" onClick={() => removeNavLink(index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Settings */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl space-y-4">
                    <h2 className="text-lg font-semibold text-[#d4af37] border-b border-white/10 pb-2">Footer Settings</h2>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Footer Description</label>
                        <textarea name="footerDescription" value={formData.footerDescription || ''} onChange={handleChange} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                    </div>
                    
                    <h3 className="text-sm font-semibold text-white pt-2">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Instagram URL</label>
                            <input type="text" name="instagram" value={formData.socialLinks?.instagram || ''} onChange={handleSocialChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Twitter URL</label>
                            <input type="text" name="twitter" value={formData.socialLinks?.twitter || ''} onChange={handleSocialChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">LinkedIn URL</label>
                            <input type="text" name="linkedin" value={formData.socialLinks?.linkedin || ''} onChange={handleSocialChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                    </div>

                    <h3 className="text-sm font-semibold text-white pt-2">Newsletter Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Heading</label>
                            <input type="text" name="newsletterHeading" value={formData.newsletterHeading || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Text content</label>
                            <textarea name="newsletterText" value={formData.newsletterText || ''} onChange={handleChange} rows={2} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end sticky bottom-6">
                    <button type="submit" disabled={saving} className="bg-[#d4af37] text-black font-semibold rounded-lg px-6 py-2 flex items-center gap-2 hover:bg-[#b5952f] transition shadow-lg">
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Header and Footer Manager files generated successfully.")
