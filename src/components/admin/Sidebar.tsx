'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Image as ImageIcon,
    Users,
    Briefcase,
    FileText,
    Settings,
    Phone,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Header & Footer', href: '/admin/layout-config', icon: Settings },
    { label: 'Hero Section', href: '/admin/hero', icon: ImageIcon },
    { label: 'Services', href: '/admin/services', icon: Briefcase },
    { label: 'Portfolio', href: '/admin/portfolio', icon: FileText },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Users },
    { label: 'Contact Leads', href: '/admin/leads', icon: Phone },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    // Hide sidebar on login page
    if (pathname === '/admin/login') return null;

    return (
        <aside className={`relative bg-white/5 border-r border-white/10 backdrop-blur-md h-screen transition-all duration-300 ease-in-out flex flex-col z-50 ${collapsed ? 'w-20' : 'w-64'}`}>
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-center border-b border-white/10 overflow-hidden shrink-0">
                <h2 className={`font-serif font-bold text-white transition-all duration-300 ${collapsed ? 'text-2xl' : 'text-xl'}`}>
                    {collapsed ? 'A' : 'AURA'}<span className="text-primary-gold">.</span>
                </h2>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="absolute -right-4 top-7 bg-primary-gold text-black p-1.5 rounded-full z-50 hover:scale-110 transition-transform shadow-lg cursor-pointer"
            >
                {collapsed ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
            </button>

            {/* Navigation Links */}
            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
                {navItems.map((item) => {
                    const isActive = item.href === '/admin'
                        ? pathname === '/admin'
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={collapsed ? item.label : ''}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary-gold/15 text-primary-gold'
                                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>

                            <span className={`whitespace-nowrap font-medium transition-all duration-300 origin-left ${collapsed ? 'opacity-0 scale-x-0 hidden' : 'opacity-100 scale-x-100 block'
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}