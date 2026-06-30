import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function verifyAuth(req?: Request) {
    // In Next.js 15 App Router API, cookies() is asynchronous
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return false;
    
    try {
        jwt.verify(token, process.env.JWT_SECRET || 'secret');
        return true;
    } catch (err) {
        return false;
    }
}
