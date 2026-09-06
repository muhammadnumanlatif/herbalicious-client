import { NextResponse } from 'next/server';
import { getOrderWithItems, updateOrderStatus } from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

const VALID_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export async function GET(_request: Request, { params }: Params) {
    const { id } = await params;
    const result = await getOrderWithItems(id);
    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(result);
}

export async function PATCH(request: Request, { params }: Params) {
    const { id } = await params;
    const { status } = (await request.json()) as { status?: string };
    if (!status || !VALID_STATUSES.includes(status)) {
        return NextResponse.json({ error: `status must be one of ${VALID_STATUSES.join(', ')}` }, { status: 400 });
    }
    await updateOrderStatus(id, status);
    return NextResponse.json({ success: true });
}
