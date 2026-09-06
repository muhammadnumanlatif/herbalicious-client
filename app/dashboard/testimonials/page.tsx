import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { listTestimonials } from '@/lib/db';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
    const testimonials = await listTestimonials();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Testimonials</h2>
                <Link href="/dashboard/testimonials/new">
                    <Button variant="success" className="rounded-pill fw-bold">+ New Testimonial</Button>
                </Link>
            </div>

            <Card className="border-0 shadow-sm rounded-4 p-4">
                {testimonials.length === 0 ? (
                    <p className="text-muted mb-0">No testimonials yet.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Testimonial</th>
                                    <th>Product</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map((t) => (
                                    <tr key={t.id}>
                                        <td className="fw-bold">{t.name}</td>
                                        <td>{t.location}</td>
                                        <td className="text-truncate" style={{ maxWidth: 300 }}>{t.content}</td>
                                        <td>{t.productId}</td>
                                        <td className="text-end">
                                            <Link href={`/dashboard/testimonials/${t.id}`} className="btn btn-outline-secondary btn-sm me-2">
                                                Edit
                                            </Link>
                                            <DeleteButton url={`/api/admin/testimonials/${t.id}`} confirmText={`Delete testimonial from "${t.name}"?`} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
