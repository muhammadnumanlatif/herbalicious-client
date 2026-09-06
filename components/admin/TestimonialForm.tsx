'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import type { DbTestimonial } from '@/lib/db';

interface Props {
    mode: 'create' | 'edit';
    initial?: DbTestimonial;
}

export default function TestimonialForm({ mode, initial }: Props) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: initial?.name ?? '',
        location: initial?.location ?? '',
        content: initial?.content ?? '',
        productId: initial?.productId ?? '',
    });

    const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        const payload = {
            name: form.name.trim(),
            location: form.location.trim() || null,
            content: form.content.trim(),
            productId: form.productId.trim() || null,
        };

        try {
            const url = mode === 'create' ? '/api/admin/testimonials' : `/api/admin/testimonials/${initial!.id}`;
            const method = mode === 'create' ? 'POST' : 'PATCH';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const data = (await response.json()) as { error?: string };
                throw new Error(data.error || 'Failed to save testimonial');
            }
            router.push('/dashboard/testimonials');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save testimonial');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card className="border-0 shadow-sm rounded-4 p-4">
            <Form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger rounded-4">{error}</div>}
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Label className="small fw-bold text-muted">CUSTOMER NAME</Form.Label>
                        <Form.Control value={form.name} onChange={update('name')} required />
                    </Col>
                    <Col md={6}>
                        <Form.Label className="small fw-bold text-muted">LOCATION</Form.Label>
                        <Form.Control value={form.location} onChange={update('location')} placeholder="e.g. Lahore" />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">RELATED PRODUCT ID (optional)</Form.Label>
                        <Form.Control value={form.productId} onChange={update('productId')} placeholder="e.g. hibiscus-shampoo" />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">TESTIMONIAL</Form.Label>
                        <Form.Control as="textarea" rows={4} value={form.content} onChange={update('content')} required />
                    </Col>
                    <Col md={12} className="mt-4">
                        <Button type="submit" variant="success" disabled={isSaving} className="rounded-pill px-5 fw-bold">
                            {isSaving ? 'Saving…' : mode === 'create' ? 'Add Testimonial' : 'Save Changes'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}
