import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import LayoutConfig from '@/models/LayoutConfig';
import jwt from 'jsonwebtoken';

const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    try {
        await connectDB();
        let config = await LayoutConfig.findOne();
        if (!config) {
            config = await LayoutConfig.create({
                navLinks: [
                    { label: 'HOME', href: '#home' },
                    { label: 'SERVICES', href: '#services' },
                    { label: 'PORTFOLIO', href: '#portfolio' },
                    { label: 'PROCESS', href: '#process' }
                ]
            });
        }
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        
        let config = await LayoutConfig.findOne();
        if (!config) {
            config = new LayoutConfig(data);
        } else {
            Object.assign(config, data);
        }
        await config.save();
        
        return NextResponse.json({ message: 'Layout updated successfully', config });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: error.message ? 401 : 500 });
    }
}
