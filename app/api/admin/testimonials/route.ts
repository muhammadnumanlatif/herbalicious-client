import { NextResponse } from 'next/server';
import { listTestimonials, createTestimonial, type TestimonialWriteInput } from '@/lib/db';

export async function GET() {
    const testimonials = await listTestimonials();
    return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as TestimonialWriteInput;
        if (!body.name || !body.content) {
            return NextResponse.json({ error: 'name and content are required' }, { status: 400 });
        }
        await createTestimonial(body);
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Failed to create testimonial:', error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
