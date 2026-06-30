'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function TestimonialsManager() {
    const [items, setItems] = useState<any[]>([]);
    const [formData, setFormData] = useState({ clientName: '', eventType: '', reviewText: '', rating: 5 });

    useEffect(() => {
        fetch('/api/testimonials').then(res => res.json()).then(data => setItems(data));
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            const newItem = await res.json();
            setItems([newItem, ...items]);
            setFormData({ clientName: '', eventType: '', reviewText: '', rating: 5 });
        }
    };

    const handleDelete = async (id: string) => {
        await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
        setItems(items.filter(i => i._id !== id));
    };

    return (
        <div className="max-w-5xl">
            <h1 className="text-2xl font-bold text-white mb-6">Testimonials Manager</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <form onSubmit={handleAdd} className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl space-y-4 sticky top-6">
                        <h2 className="text-lg font-semibold text-[#d4af37] mb-2">Add Review</h2>
                        <div>
                            <input type="text" placeholder="Client Name" value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <div>
                            <input type="text" placeholder="Event Type (e.g. Wedding)" value={formData.eventType} onChange={(e) => setFormData({...formData, eventType: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <div>
                            <textarea placeholder="Review Text" rows={4} value={formData.reviewText} onChange={(e) => setFormData({...formData, reviewText: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Rating</label>
                            <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <button type="submit" className="w-full bg-[#d4af37] text-black font-semibold rounded p-2 flex items-center justify-center gap-2">
                            <Plus size={18} /> Add Review
                        </button>
                    </form>
                </div>
                
                <div className="lg:col-span-2 space-y-4">
                    {items.map(i => (
                        <div key={i._id} className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl relative">
                            <div className="text-[#d4af37] mb-2">{'?'.repeat(i.rating)}{'?'.repeat(5-i.rating)}</div>
                            <p className="text-gray-300 italic mb-4">"{i.reviewText}"</p>
                            <div>
                                <h4 className="text-white font-semibold">{i.clientName}</h4>
                                <span className="text-xs text-[#d4af37] tracking-wider uppercase">{i.eventType}</span>
                            </div>
                            <button onClick={() => handleDelete(i._id)} className="absolute top-4 right-4 text-red-400 hover:bg-red-400/10 p-2 rounded transition">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
