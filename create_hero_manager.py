import os

base_dir = r"c:\Users\Krishna\Desktop\event-management-next\src"
dirs = [
    "models",
    "app/api/hero",
    "app/admin/hero"
]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

files = {
    r"models\Hero.ts": """import mongoose from 'mongoose';

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
""",

    r"app\api\hero\route.ts": """import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Hero from '@/models/Hero';
import jwt from 'jsonwebtoken';

// Protect middleware helper
const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    try {
        await connectDB();
        let hero = await Hero.findOne();
        if (!hero) {
            hero = await Hero.create({});
        }
        return NextResponse.json(hero);
    } catch (error) {
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        
        let hero = await Hero.findOne();
        if (!hero) {
            hero = new Hero(data);
        } else {
            Object.assign(hero, data);
        }
        await hero.save();
        
        return NextResponse.json({ message: 'Hero section updated successfully', hero });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: error.message ? 401 : 500 });
    }
}
""",

    r"app\admin\hero\page.tsx": """'use client';
import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function HeroManager() {
    const [formData, setFormData] = useState({
        badgeText: '',
        heading: '',
        highlightText: '',
        description: '',
        bgImageUrl: '',
        primaryButtonText: '',
        primaryButtonLink: '',
        secondaryButtonText: '',
        secondaryButtonLink: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => {
                setFormData(data);
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/hero', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
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
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Hero Section Manager</h1>
                {message && <span className="text-green-400 bg-green-400/10 px-4 py-2 rounded">{message}</span>}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl space-y-4">
                    <h2 className="text-lg font-semibold text-[#d4af37] border-b border-white/10 pb-2">Main Content</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Badge Text</label>
                            <input type="text" name="badgeText" value={formData.badgeText || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Background Image URL</label>
                            <input type="text" name="bgImageUrl" value={formData.bgImageUrl || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Heading</label>
                        <input type="text" name="heading" value={formData.heading || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-xl" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Highlight Text (Gold Color)</label>
                        <input type="text" name="highlightText" value={formData.highlightText || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-[#d4af37] text-xl" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl space-y-4">
                    <h2 className="text-lg font-semibold text-[#d4af37] border-b border-white/10 pb-2">Buttons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Primary Button Text</label>
                            <input type="text" name="primaryButtonText" value={formData.primaryButtonText || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Primary Button Link</label>
                            <input type="text" name="primaryButtonLink" value={formData.primaryButtonLink || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Secondary Button Text</label>
                            <input type="text" name="secondaryButtonText" value={formData.secondaryButtonText || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Secondary Button Link</label>
                            <input type="text" name="secondaryButtonLink" value={formData.secondaryButtonLink || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" disabled={saving} className="bg-[#d4af37] text-black font-semibold rounded-lg px-6 py-2 flex items-center gap-2 hover:bg-[#b5952f] transition">
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

print("Hero Manager files generated successfully.")
