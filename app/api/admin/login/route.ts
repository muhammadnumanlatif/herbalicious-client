import { NextResponse } from 'next/server';
import { verifyPassword, createSessionToken } from '@/lib/auth';

export async function POST(request: Request) {
    const { username, password } = (await request.json()) as { username?: string; password?: string };

    const expectedUsername = process.env.ADMIN_USERNAME;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    const sessionSecret = process.env.SESSION_SECRET;

    if (!expectedUsername || !passwordHash || !sessionSecret) {
        return NextResponse.json({ error: 'Admin login is not configured' }, { status: 503 });
    }
    if (!username || !password || username !== expectedUsername || !(await verifyPassword(password, passwordHash))) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = await createSessionToken(sessionSecret);
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 12,
    });
    return response;
}
