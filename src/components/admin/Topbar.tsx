'use client';
import { Bell, UserCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';

export default function Topbar() {
    const admin = useAuthStore(state => state.admin);
    const logoutStore = useAuthStore(state => state.logout);
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === '/admin/login') return null;

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        logoutStore();
        router.push('/admin/login');
    };

    return (
        <header className="bg-white/5 border-b border-white/10 backdrop-blur-md h-16 flex items-center justify-between px-6 sticky top-0 z-10 text-white">
            <div className="text-gray-400 text-sm">
                Admin Panel / <span className="text-white">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white transition"><Bell size={20} /></button>
                <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                    <UserCircle size={24} className="text-[#d4af37]" />
                    <span className="text-sm font-medium">{admin?.name || 'Admin'}</span>
                    <button onClick={handleLogout} className="text-xs text-red-400 ml-2 hover:underline">Logout</button>
                </div>
            </div>
        </header>
    );
}
