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

const LAHORE_SHIPPING = 300;
const OTHER_CITY_SHIPPING = 350;

function shippingChargeFor(city: string): number {
    return city.trim().toLowerCase() === 'lahore' ? LAHORE_SHIPPING : OTHER_CITY_SHIPPING;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerEmail, customerPhone, shippingAddress, city, notes, items, subtotal } = body as {
            customerName?: string;
            customerEmail?: string;
            customerPhone?: string;
            shippingAddress?: string;
            city?: string;
            notes?: string;
            items?: CheckoutItem[];
            subtotal?: number;
        };

        if (!customerName || !customerPhone || !shippingAddress || !city) {
            return NextResponse.json({ error: 'Missing required customer details' }, { status: 400 });
        }
        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        const orderId = generateOrderId();
        const resolvedSubtotal =
            typeof subtotal === 'number' ? subtotal : items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
        const shippingCharge = shippingChargeFor(city);
        const total = resolvedSubtotal + shippingCharge;

        await createOrder({
            id: orderId,
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            city,
            notes,
            subtotal: resolvedSubtotal,
            shippingCharge,
            total,
            items,
        });

        return NextResponse.json({ success: true, orderId, shippingCharge, total });
    } catch (error) {
        console.error('Checkout order creation failed:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
