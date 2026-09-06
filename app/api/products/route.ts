import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/wordpress';

// Public, unauthenticated read endpoint -- lets client components (which
// can't touch D1 directly) fetch the same dashboard-managed product data
// that the server-rendered shop/product pages use.
export async function GET() {
    const products = await getProducts();
    return NextResponse.json({ products });
}
