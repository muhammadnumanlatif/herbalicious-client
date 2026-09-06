import { NextResponse } from 'next/server';
import { getTestimonialById, updateTestimonial, deleteTestimonial, type TestimonialWriteInput } from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
    const { id } = await params;
    const testimonial = await getTestimonialById(Number(id));
    if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ testimonial });
}

export async function PATCH(request: Request, { params }: Params) {
    const { id } = await params;
    try {
        const body = (await request.json()) as TestimonialWriteInput;
        if (!body.name || !body.content) {
            return NextResponse.json({ error: 'name and content are required' }, { status: 400 });
        }
        await updateTestimonial(Number(id), body);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update testimonial:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: Params) {
    const { id } = await params;
    await deleteTestimonial(Number(id));
    return NextResponse.json({ success: true });
}
