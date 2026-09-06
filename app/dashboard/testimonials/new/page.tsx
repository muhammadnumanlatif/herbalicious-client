import React from 'react';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default function NewTestimonialPage() {
    return (
        <div>
            <h2 className="fw-bold mb-4">New Testimonial</h2>
            <TestimonialForm mode="create" />
        </div>
    );
}
