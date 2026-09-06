import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/db';

interface CheckoutItem {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
}

function generateOrderId(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 6; i++) {
        suffix += chars[Math.floor(Math.random() * chars.length)];
    }
    return `HL-${suffix}`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerEmail, customerPhone, shippingAddress, notes, items, subtotal } = body as {
            customerName?: string;
            customerEmail?: string;
            customerPhone?: string;
            shippingAddress?: string;
            notes?: string;
            items?: CheckoutItem[];
            subtotal?: number;
        };

        if (!customerName || !customerPhone || !shippingAddress) {
            return NextResponse.json({ error: 'Missing required customer details' }, { status: 400 });
        }
        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        const orderId = generateOrderId();
        await createOrder({
            id: orderId,
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            notes,
            subtotal: typeof subtotal === 'number' ? subtotal : items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
            items,
        });

        return NextResponse.json({ success: true, orderId });
    } catch (error) {
        console.error('Checkout order creation failed:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
