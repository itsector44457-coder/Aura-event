export default function DashboardPage() {
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
