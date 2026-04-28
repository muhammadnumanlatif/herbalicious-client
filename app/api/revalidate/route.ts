import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');

    // Make sure to add this secret to your .env
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { model, post_name } = body;

        if (model === 'product') {
            revalidateTag('products', 'max');
            revalidateTag(`product-${post_name}`, 'max');
        } else if (model === 'page') {
            revalidateTag('pages', 'max');
            revalidateTag(`page-${post_name}`, 'max');
        } else if (model === 'post') {
            revalidateTag('posts', 'max');
            revalidateTag(`post-${post_name}`, 'max');
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: 'Error parsing body' }, { status: 400 });
    }
}
