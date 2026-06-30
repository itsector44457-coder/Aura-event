import os

base_dir = r"c:\Users\Krishna\Desktop\event-management-next\src"
dirs = [
    "models",
    "app/api/services", "app/api/portfolio", "app/api/testimonials",
    "app/admin/services", "app/admin/portfolio", "app/admin/testimonials"
]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

files = {
    # MODELS
    r"models\Service.ts": """import mongoose from 'mongoose';
const ServiceSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });
export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
""",
    
    r"models\PortfolioItem.ts": """import mongoose from 'mongoose';
const PortfolioItemSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    size: { type: String, default: 'small', enum: ['small', 'large', 'tall', 'wide'] }
}, { timestamps: true });
export default mongoose.models.PortfolioItem || mongoose.model('PortfolioItem', PortfolioItemSchema);
""",

    r"models\Testimonial.ts": """import mongoose from 'mongoose';
const TestimonialSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    eventType: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, default: 5 }
}, { timestamps: true });
export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
""",

    # API ROUTES
    r"app\api\services\route.ts": """import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';
import jwt from 'jsonwebtoken';

const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    await connectDB();
    const services = await Service.find().sort({ createdAt: 1 });
    return NextResponse.json(services);
}

export async function POST(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        const service = await Service.create(data);
        return NextResponse.json(service);
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}

export async function DELETE(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await Service.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted' });
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}
""",

    r"app\api\portfolio\route.ts": """import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import PortfolioItem from '@/models/PortfolioItem';
import jwt from 'jsonwebtoken';

const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    await connectDB();
    const items = await PortfolioItem.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        const item = await PortfolioItem.create(data);
        return NextResponse.json(item);
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}

export async function DELETE(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await PortfolioItem.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted' });
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}
""",

    r"app\api\testimonials\route.ts": """import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import jwt from 'jsonwebtoken';

const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    await connectDB();
    const items = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        const item = await Testimonial.create(data);
        return NextResponse.json(item);
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}

export async function DELETE(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await Testimonial.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted' });
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}
""",

    # ADMIN UIs
    r"app\admin\services\page.tsx": """'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ServicesManager() {
    const [services, setServices] = useState<any[]>([]);
    const [formData, setFormData] = useState({ icon: '', title: '', description: '' });

    useEffect(() => {
        fetch('/api/services').then(res => res.json()).then(data => setServices(data));
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            const newService = await res.json();
            setServices([...services, newService]);
            setFormData({ icon: '', title: '', description: '' });
        }
    };

    const handleDelete = async (id: string) => {
        await fetch(/api/services?id=, { method: 'DELETE' });
        setServices(services.filter(s => s._id !== id));
    };

    return (
        <div className="max-w-5xl">
            <h1 className="text-2xl font-bold text-white mb-6">Services Manager</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <form onSubmit={handleAdd} className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl space-y-4 sticky top-6">
                        <h2 className="text-lg font-semibold text-[#d4af37] mb-2">Add New Service</h2>
                        <div>
                            <input type="text" placeholder="Icon Class (e.g. bx-crown)" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <div>
                            <input type="text" placeholder="Service Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <div>
                            <textarea placeholder="Description" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <button type="submit" className="w-full bg-[#d4af37] text-black font-semibold rounded p-2 flex items-center justify-center gap-2">
                            <Plus size={18} /> Add Service
                        </button>
                    </form>
                </div>
                
                <div className="lg:col-span-2 space-y-4">
                    {services.map(s => (
                        <div key={s._id} className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl flex items-start gap-4">
                            <div className="text-3xl text-[#d4af37]"><i className={x }></i></div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{s.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">{s.description}</p>
                            </div>
                            <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:bg-red-400/10 p-2 rounded transition">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {services.length === 0 && <p className="text-gray-500">No services added yet.</p>}
                </div>
            </div>
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

print("Phase 3 files generated successfully.")
