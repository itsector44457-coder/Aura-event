import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import jwt from 'jsonwebtoken';

const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    await connectDB();
    const items = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        const item = await Testimonial.create(data);
        return NextResponse.json(item);
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}

export async function DELETE(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await Testimonial.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted' });
    } catch (e: any) { return NextResponse.json({ message: e.message }, { status: 500 }); }
}
