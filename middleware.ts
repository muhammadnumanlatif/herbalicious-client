import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, createRemoteJWKSet } from 'jose';

// Cloudflare Access protects /dashboard and /api/admin at the edge (its own
// login page, before the request ever reaches this Worker). This middleware
// is defense-in-depth: it verifies the Access JWT itself, so the routes stay
// protected even if the Access application were ever misconfigured or removed.
let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

async function verifyAccessJwt(request: NextRequest): Promise<string | null> {
    const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
    const aud = process.env.CF_ACCESS_AUD;
    if (!teamDomain || !aud) return null;

    const token =
        request.headers.get('cf-access-jwt-assertion') ||
        request.cookies.get('CF_Authorization')?.value;
    if (!token) return null;

    try {
        if (!jwks) {
            jwks = createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`));
        }
        const { payload } = await jwtVerify(token, jwks, {
            issuer: teamDomain,
            audience: aud,
        });
        return typeof payload.email === 'string' ? payload.email : 'authenticated';
    } catch {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/admin')) {
        const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
        const aud = process.env.CF_ACCESS_AUD;

        // Fail closed: until Cloudflare Access is wired up (team domain + AUD
        // set), these routes are not exposed rather than left unauthenticated.
        if (!teamDomain || !aud) {
            return new NextResponse('Admin access is not yet configured.', { status: 503 });
        }

        const email = await verifyAccessJwt(request);
        if (!email) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        const response = NextResponse.next();
        response.headers.set('x-admin-email', email);
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/admin/:path*'],
};
