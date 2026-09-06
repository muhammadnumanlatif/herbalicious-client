import { NextResponse } from 'next/server';
import { listProducts, createProduct, type ProductWriteInput } from '@/lib/db';

export async function GET() {
    const products = await listProducts();
    return NextResponse.json({ products });
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ProductWriteInput;
        if (!body.id || !body.name || !body.price) {
            return NextResponse.json({ error: 'id, name, and price are required' }, { status: 400 });
        }
        await createProduct(body);
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Failed to create product:', error);
        return NextResponse.json({ error: 'Failed to create product (id may already exist)' }, { status: 500 });
    }
}
