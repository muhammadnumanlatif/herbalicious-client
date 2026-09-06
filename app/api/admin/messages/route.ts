import { NextResponse } from 'next/server';
import { listContactMessages } from '@/lib/db';

export async function GET() {
    const messages = await listContactMessages();
    return NextResponse.json({ messages });
}
