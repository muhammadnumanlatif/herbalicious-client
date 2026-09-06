import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct, type ProductWriteInput } from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ product });
}

export async function PATCH(request: Request, { params }: Params) {
    const { id } = await params;
    try {
        const body = (await request.json()) as ProductWriteInput;
        if (!body.name || !body.price) {
            return NextResponse.json({ error: 'name and price are required' }, { status: 400 });
        }
        await updateProduct(id, body);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: Params) {
    const { id } = await params;
    await deleteProduct(id);
    return NextResponse.json({ success: true });
}
