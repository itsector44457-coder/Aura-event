import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ContactLead from '@/models/ContactLead';

export async function POST(req: Request) {
    try {
        await connectDB();
        
        const body = await req.json();
        const { fullName, email, eventType, vision } = body;
        
        if (!fullName || !email || !eventType || !vision) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        
        const newLead = await ContactLead.create({
            fullName,
            email,
            eventType,
            vision,
            status: 'New'
        });
        
        return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
