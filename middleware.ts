import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/auth';

const PUBLIC_PATHS = ['/dashboard/login', '/api/admin/login'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/api/admin');
    const isPublic = PUBLIC_PATHS.some((p) => pathname === p);

    if (isProtected && !isPublic) {
        const secret = process.env.SESSION_SECRET;
        if (!secret) {
            return new NextResponse('Admin access is not yet configured.', { status: 503 });
        }

        const token = request.cookies.get('admin_session')?.value;
        const valid = await verifySessionToken(token, secret);

        if (!valid) {
            if (pathname.startsWith('/api/admin')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            const loginUrl = new URL('/dashboard/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/admin/:path*'],
};
