import { NextResponse } from 'next/server';
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
        if (admin && (await (admin as any).matchPassword(password))) {
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
    } catch (error: any) {
        console.error("Login Error Details:", error);
        return NextResponse.json({ message: 'Server error', error: error.message, stack: error.stack }, { status: 500 });
    }
}
