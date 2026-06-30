import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';
import jwt from 'jsonwebtoken';

const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    await connectDB();
    const services = await Service.find().sort({ createdAt: 1 });
    return NextResponse.json(services);
}

export async function POST(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        const service = await Service.create(data);
        return NextResponse.json(service);
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}

export async function DELETE(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await Service.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted' });
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}
