import Sidebar from '@/components/admin/Sidebar';
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
