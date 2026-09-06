const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toHex(buffer: ArrayBuffer | Uint8Array): string {
    return Array.from(buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

function fromHex(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    return bytes;
}

function base64url(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let str = '';
    for (const b of bytes) str += String.fromCharCode(b);
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(str: string): Uint8Array {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
}

function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return result === 0;
}

async function pbkdf2(password: string, salt: Uint8Array): Promise<ArrayBuffer> {
    const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
    return crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: salt as BufferSource, iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        256
    );
}

// Stored format: "<saltHex>:<hashHex>"
export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await pbkdf2(password, salt);
    return `${toHex(salt)}:${toHex(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
    const [saltHex, hashHex] = stored.split(':');
    if (!saltHex || !hashHex) return false;
    const hash = toHex(await pbkdf2(password, fromHex(saltHex)));
    return timingSafeEqual(hash, hashHex);
}

const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

async function hmac(secret: string, data: string): Promise<string> {
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    return base64url(sig);
}

export async function createSessionToken(secret: string): Promise<string> {
    const payload = JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS });
    const payloadB64 = base64url(encoder.encode(payload));
    const sig = await hmac(secret, payloadB64);
    return `${payloadB64}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null, secret: string): Promise<boolean> {
    if (!token) return false;
    const [payloadB64, sig] = token.split('.');
    if (!payloadB64 || !sig) return false;
    const expectedSig = await hmac(secret, payloadB64);
    if (!timingSafeEqual(sig, expectedSig)) return false;
    try {
        const payload = JSON.parse(decoder.decode(base64urlDecode(payloadB64))) as { exp?: number };
        return typeof payload.exp === 'number' && payload.exp > Math.floor(Date.now() / 1000);
    } catch {
        return false;
    }
}
