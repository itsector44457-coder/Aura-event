'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
    const [email, setEmail] = useState('admin@aura.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const router = useRouter();
    const setAdmin = useAuthStore((state) => state.setAdmin);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                setAdmin(data);
                router.push('/admin');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505]">
            <div className="glass-panel p-8 rounded-2xl w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif mb-2 text-white">AURA<span className="text-[#d4af37]">.</span> Admin</h1>
                    <p className="text-gray-400 text-sm">Use admin@aura.com / password</p>
                </div>
                {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input type="email" placeholder="Email"
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37]"
                            value={email} onChange={(e)=>setEmail(e.target.value)} required 
                        />
                    </div>
                    <div>
                        <input type="password" placeholder="Password"
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37]"
                            value={password} onChange={(e)=>setPassword(e.target.value)} required 
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#d4af37] text-black font-semibold rounded-lg p-3 mt-4 hover:bg-[#b5952f] transition">
                        Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
