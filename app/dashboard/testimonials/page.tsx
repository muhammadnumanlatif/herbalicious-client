import React from 'react';
import Link from 'next/link';
import { Card, Badge } from 'react-bootstrap';
import { FaPlus, FaQuoteLeft } from 'react-icons/fa';
import { listTestimonials } from '@/lib/db';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
    const testimonials = await listTestimonials();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Testimonials</h2>
                <Link href="/dashboard/testimonials/new" className="btn btn-success rounded-pill fw-bold d-inline-flex align-items-center gap-2">
                    <FaPlus size={12} /> New Testimonial
                </Link>
            </div>

            <Card className="border-0 shadow-sm rounded-4 p-4">
                {testimonials.length === 0 ? (
                    <div className="text-center text-muted py-5">
                        <FaQuoteLeft size={40} className="opacity-25 mb-3" />
                        <p className="mb-0">No testimonials yet. Add your first one to get started.</p>
                    </div>
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
                                        <td>{t.productId && <Badge bg="light" text="dark" className="border fw-normal">{t.productId}</Badge>}</td>
                                        <td className="text-end text-nowrap">
                                            <Link href={`/dashboard/testimonials/${t.id}`} className="btn btn-outline-primary btn-sm me-2">
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
