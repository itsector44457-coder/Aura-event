'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function PortfolioManager() {
    const [items, setItems] = useState<any[]>([]);
    const [formData, setFormData] = useState({ imageUrl: '', category: '', title: '', size: 'small' });

    useEffect(() => {
        fetch('/api/portfolio').then(res => res.json()).then(data => setItems(data));
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            const newItem = await res.json();
            setItems([newItem, ...items]);
            setFormData({ imageUrl: '', category: '', title: '', size: 'small' });
        }
    };

    const handleDelete = async (id: string) => {
        await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' });
        setItems(items.filter(i => i._id !== id));
    };

    return (
        <div className="max-w-5xl">
            <h1 className="text-2xl font-bold text-white mb-6">Portfolio Gallery Manager</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <form onSubmit={handleAdd} className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl space-y-4 sticky top-6">
                        <h2 className="text-lg font-semibold text-[#d4af37] mb-2">Add Image</h2>
                        <div>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={async (e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        const fd = new FormData();
                                        fd.append('file', file);
                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: fd
                                            });
                                            if (res.ok) {
                                                const { url } = await res.json();
                                                setFormData({ ...formData, imageUrl: url });
                                            }
                                        } catch (err) {
                                            console.error('Upload failed');
                                        }
                                    }
                                }} 
                                className="w-full bg-black/50 border border-white/10 rounded p-1 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-gold file:text-black hover:file:bg-primary-gold-hover cursor-pointer" 
                                required={!formData.imageUrl} 
                            />
                            {formData.imageUrl && (
                                <p className="text-xs text-green-400 mt-2">Image Selected!</p>
                            )}
                        </div>
                        <div>
                            <input type="text" placeholder="Category (e.g. WEDDING)" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <div>
                            <input type="text" placeholder="Title (e.g. The Royal Gala)" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" required />
                        </div>
                        <div>
                            <select value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white">
                                <option value="small">Small</option>
                                <option value="large">Large</option>
                                <option value="tall">Tall</option>
                                <option value="wide">Wide</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-[#d4af37] text-black font-semibold rounded p-2 flex items-center justify-center gap-2">
                            <Plus size={18} /> Add to Gallery
                        </button>
                    </form>
                </div>
                
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map(i => (
                        <div key={i._id} className="group relative rounded-xl overflow-hidden border border-white/10 aspect-video">
                            <img src={i.imageUrl} alt={i.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center p-4">
                                <span className="text-[#d4af37] text-xs font-bold tracking-widest">{i.category}</span>
                                <h3 className="text-white text-lg font-serif mt-1">{i.title}</h3>
                                <button onClick={() => handleDelete(i._id)} className="absolute top-2 right-2 text-red-400 bg-red-400/10 p-2 rounded">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
