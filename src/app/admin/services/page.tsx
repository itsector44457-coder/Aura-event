'use client';
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
        await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
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
                            <div className="text-3xl text-[#d4af37]"><i className={s.icon}></i></div>
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
