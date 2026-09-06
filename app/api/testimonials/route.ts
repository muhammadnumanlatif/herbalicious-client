import { NextResponse } from 'next/server';
import { listTestimonials } from '@/lib/db';
import reviewsData from '@/src/data/reviews.json';

export async function GET() {
    try {
        const testimonials = await listTestimonials();
        if (testimonials.length === 0) throw new Error('empty');
        return NextResponse.json({
            reviews: testimonials.map((t) => ({
                name: t.name,
                location: t.location || '',
                content: t.content,
                productId: t.productId || '',
            })),
        });
    } catch {
        return NextResponse.json({ reviews: reviewsData });
    }
}
