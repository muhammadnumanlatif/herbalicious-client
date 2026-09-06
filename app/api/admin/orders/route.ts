import { NextResponse } from 'next/server';
import { listOrders } from '@/lib/db';

export async function GET() {
    const orders = await listOrders();
    return NextResponse.json({ orders });
}
