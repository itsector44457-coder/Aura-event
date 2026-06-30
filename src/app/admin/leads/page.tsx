'use client';
import { useState, useEffect } from 'react';

export default function LeadsManager() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/leads')
            .then(res => res.json())
            .then(data => {
                setLeads(data);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        const res = await fetch('/api/leads', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus })
        });
        
        if (res.ok) {
            setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            setLeads(leads.filter(lead => lead._id !== id));
        }
    };

    if (loading) return <div className="text-white animate-pulse">Loading leads...</div>;

    return (
        <div>
            <h1 className="text-3xl font-heading text-white mb-2">Contact Leads</h1>
            <p className="text-text-muted mb-8">Manage inquiries and consultation requests from the public website.</p>

            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1a1a1a] border-b border-white/10 text-xs uppercase tracking-widest text-primary-gold">
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Client Name</th>
                                <th className="p-4 font-semibold">Email</th>
                                <th className="p-4 font-semibold">Event Type</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-300">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500 italic">No leads found.</td>
                                </tr>
                            ) : leads.map(lead => (
                                <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 align-top whitespace-nowrap text-gray-500">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 align-top text-white font-medium">
                                        {lead.fullName}
                                    </td>
                                    <td className="p-4 align-top">
                                        <a href={`mailto:${lead.email}`} className="text-blue-400 hover:underline">{lead.email}</a>
                                    </td>
                                    <td className="p-4 align-top capitalize">
                                        <span className="px-2 py-1 bg-white/10 rounded text-xs tracking-wider">{lead.eventType}</span>
                                    </td>
                                    <td className="p-4 align-top">
                                        <select 
                                            value={lead.status} 
                                            onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                            className={`bg-transparent border rounded p-1 text-xs font-semibold focus:outline-none ${lead.status === 'New' ? 'text-green-400 border-green-400/30' : lead.status === 'Contacted' ? 'text-yellow-400 border-yellow-400/30' : 'text-gray-500 border-gray-600'}`}
                                        >
                                            <option className="bg-[#111]" value="New">New</option>
                                            <option className="bg-[#111]" value="Contacted">Contacted</option>
                                            <option className="bg-[#111]" value="Closed">Closed</option>
                                        </select>
                                    </td>
                                    <td className="p-4 align-top text-right space-y-2">
                                        <button onClick={() => handleDelete(lead._id)} className="text-xs text-red-500 hover:text-red-400 ml-3">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Vision Details View (Simple list underneath for now) */}
            <h2 className="text-xl font-heading text-white mt-12 mb-4">Lead Messages</h2>
            <div className="grid gap-4">
                {leads.map(lead => (
                    <div key={`msg-${lead._id}`} className="bg-[#111] border border-white/10 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="text-primary-gold font-semibold tracking-wider text-sm">{lead.fullName}</h4>
                                <span className="text-xs text-gray-500 uppercase">{lead.eventType}</span>
                            </div>
                            <span className="text-xs text-gray-400">{new Date(lead.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap italic">
                            "{lead.vision}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
