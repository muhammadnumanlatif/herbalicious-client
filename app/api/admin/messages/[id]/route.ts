import { NextResponse } from 'next/server';
import { getContactMessageById, updateContactMessageStatus, deleteContactMessage } from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

const VALID_STATUSES = ['unread', 'read', 'replied'];

export async function GET(_request: Request, { params }: Params) {
    const { id } = await params;
    const message = await getContactMessageById(Number(id));
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message });
}

export async function PATCH(request: Request, { params }: Params) {
    const { id } = await params;
    const { status } = (await request.json()) as { status?: string };
    if (!status || !VALID_STATUSES.includes(status)) {
        return NextResponse.json({ error: `status must be one of ${VALID_STATUSES.join(', ')}` }, { status: 400 });
    }
    await updateContactMessageStatus(Number(id), status);
    return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: Params) {
    const { id } = await params;
    await deleteContactMessage(Number(id));
    return NextResponse.json({ success: true });
}
