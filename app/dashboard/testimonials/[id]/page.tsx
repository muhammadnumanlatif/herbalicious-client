import React from 'react';
import { notFound } from 'next/navigation';
import { getTestimonialById } from '@/lib/db';
import TestimonialForm from '@/components/admin/TestimonialForm';

export const dynamic = 'force-dynamic';

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const testimonial = await getTestimonialById(Number(id));
    if (!testimonial) notFound();

    return (
        <div>
            <h2 className="fw-bold mb-4">Edit Testimonial</h2>
            <TestimonialForm mode="edit" initial={testimonial} />
        </div>
    );
}
