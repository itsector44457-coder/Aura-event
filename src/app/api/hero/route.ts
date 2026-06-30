import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Hero from '@/models/Hero';
import jwt from 'jsonwebtoken';

// Protect middleware helper
const protect = async (req: Request) => {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Not authorized');
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export async function GET() {
    try {
        await connectDB();
        let hero = await Hero.findOne();
        if (!hero) {
            hero = await Hero.create({});
        }
        return NextResponse.json(hero);
    } catch (error: any) {
        console.error("Hero API Error:", error);
        return NextResponse.json({ message: 'Server Error', details: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await protect(req);
        await connectDB();
        const data = await req.json();
        
        let hero = await Hero.findOne();
        if (!hero) {
            hero = new Hero(data);
        } else {
            Object.assign(hero, data);
        }
        await hero.save();
        
        return NextResponse.json({ message: 'Hero section updated successfully', hero });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: error.message ? 401 : 500 });
    }
}
