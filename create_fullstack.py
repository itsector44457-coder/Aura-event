import os

base_dir = r"c:\Users\Krishna\Desktop\event-management-next\src"
dirs = [
    "lib", "models", "store", 
    "app/api/auth/login", "app/api/auth/logout", "app/api/auth/me",
    "app/admin/login", "app/admin/(dashboard)", "components/admin"
]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

files = {
    r"lib\db.ts": """import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aura_events_next';

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};
""",

    r"models\Admin.ts": """import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Admin' }
}, { timestamps: true });

AdminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

AdminSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
""",

    r"app\api\auth\login\route.ts": """import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();
        
        // Setup initial admin if db is empty
        const count = await Admin.countDocuments();
        if (count === 0) {
            await Admin.create({ email: 'admin@aura.com', password: 'password', name: 'Super Admin' });
        }

        const admin = await Admin.findOne({ email });
        if (admin && (await admin.matchPassword(password))) {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
            
            const response = NextResponse.json({ _id: admin._id, name: admin.name, email: admin.email });
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60
            });
            return response;
        } else {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
""",

    r"app\api\auth\logout\route.ts": """import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out' });
    response.cookies.set('token', '', { expires: new Date(0) });
    return response;
}
""",

    r"store\authStore.ts": """import { create } from 'zustand';

interface AuthState {
    admin: any | null;
    setAdmin: (admin: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    admin: null,
    setAdmin: (admin) => set({ admin }),
    logout: () => set({ admin: null })
}));
""",

    r"app\admin\login\page.tsx": """'use client';
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
""",

    r"app\admin\layout.tsx": """import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#050505] text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6 relative z-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
""",

    r"app\admin\page.tsx": """export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-white">Website Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Total Leads</p>
                    <h3 className="text-3xl font-bold text-[#d4af37]">124</h3>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Portfolio Projects</p>
                    <h3 className="text-3xl font-bold text-[#d4af37]">48</h3>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Services</p>
                    <h3 className="text-3xl font-bold text-[#d4af37]">6</h3>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Gallery Images</p>
                    <h3 className="text-3xl font-bold text-[#d4af37]">312</h3>
                </div>
            </div>
        </div>
    );
}
""",

    r"components\admin\Sidebar.tsx": """'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Image as ImageIcon, Users, Briefcase, FileText, Settings, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Hero Section', href: '/admin/hero', icon: ImageIcon },
    { label: 'Services', href: '/admin/services', icon: Briefcase },
    { label: 'Portfolio', href: '/admin/portfolio', icon: FileText },
    { label: 'Leads', href: '/admin/leads', icon: Phone },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    // Hide sidebar on login page
    if (pathname === '/admin/login') return null;

    return (
        <aside className={g-white/5 border-r border-white/10 backdrop-blur-md h-screen transition-all duration-300 flex flex-col }>
            <div className="p-6 flex items-center justify-between border-b border-white/10">
                {!collapsed && <h2 className="text-xl font-serif font-bold text-white">AURA<span className="text-[#d4af37]">.</span></h2>}
                {collapsed && <h2 className="text-xl font-serif font-bold mx-auto text-white">A<span className="text-[#d4af37]">.</span></h2>}
            </div>
            
            <button onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-7 bg-[#d4af37] text-black p-1 rounded-full z-10">
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}
                            className={lex items-center gap-3 p-3 rounded-lg transition-colors }>
                            <item.icon size={20} />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
""",

    r"components\admin\Topbar.tsx": """'use client';
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
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fullstack APIs and Admin Panel generated successfully.")
