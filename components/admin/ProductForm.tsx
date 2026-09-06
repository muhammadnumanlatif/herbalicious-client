'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import type { DbProduct } from '@/lib/db';

interface Props {
    mode: 'create' | 'edit';
    initial?: DbProduct;
}

export default function ProductForm({ mode, initial }: Props) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        id: initial?.id ?? '',
        name: initial?.name ?? '',
        price: initial?.price ?? '',
        oldPrice: initial?.oldPrice ?? '',
        category: initial?.category ?? '',
        image: initial?.image ?? '',
        shortDescription: initial?.shortDescription ?? '',
        description: initial?.description ?? '',
        suitableFor: initial?.suitableFor ?? '',
        safetyProfile: initial?.safetyProfile ?? '',
        proTip: initial?.proTip ?? '',
        attributes: initial ? Object.entries(initial.attributes).map(([k, v]) => `${k}: ${v}`).join('\n') : '',
        keyActives: initial?.keyActives.join('\n') ?? '',
    });

    const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        const attributes: Record<string, string> = {};
        form.attributes.split('\n').forEach((line) => {
            const [key, ...rest] = line.split(':');
            if (key && rest.length) attributes[key.trim()] = rest.join(':').trim();
        });

        const payload = {
            id: form.id.trim(),
            name: form.name.trim(),
            price: form.price.trim(),
            oldPrice: form.oldPrice.trim() || null,
            category: form.category.trim() || null,
            image: form.image.trim() || null,
            shortDescription: form.shortDescription.trim() || null,
            description: form.description.trim() || null,
            suitableFor: form.suitableFor.trim() || null,
            safetyProfile: form.safetyProfile.trim() || null,
            proTip: form.proTip.trim() || null,
            attributes,
            keyActives: form.keyActives.split('\n').map((s) => s.trim()).filter(Boolean),
        };

        try {
            const url = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${initial!.id}`;
            const method = mode === 'create' ? 'POST' : 'PATCH';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const data = (await response.json()) as { error?: string };
                throw new Error(data.error || 'Failed to save product');
            }
            router.push('/dashboard/products');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save product');
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
                        <Form.Label className="small fw-bold text-muted">PRODUCT ID (slug)</Form.Label>
                        <Form.Control
                            value={form.id}
                            onChange={update('id')}
                            disabled={mode === 'edit'}
                            placeholder="e.g. amla-reetha-shampoo"
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label className="small fw-bold text-muted">NAME</Form.Label>
                        <Form.Control value={form.name} onChange={update('name')} required />
                    </Col>
                    <Col md={4}>
                        <Form.Label className="small fw-bold text-muted">PRICE (display)</Form.Label>
                        <Form.Control value={form.price} onChange={update('price')} placeholder="₨ 1,000" required />
                    </Col>
                    <Col md={4}>
                        <Form.Label className="small fw-bold text-muted">OLD PRICE (optional)</Form.Label>
                        <Form.Control value={form.oldPrice} onChange={update('oldPrice')} placeholder="₨ 1,500" />
                    </Col>
                    <Col md={4}>
                        <Form.Label className="small fw-bold text-muted">CATEGORY</Form.Label>
                        <Form.Control value={form.category} onChange={update('category')} />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">IMAGE PATH</Form.Label>
                        <Form.Control value={form.image} onChange={update('image')} placeholder="/Products/example.webp" />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">SHORT DESCRIPTION</Form.Label>
                        <Form.Control value={form.shortDescription} onChange={update('shortDescription')} />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">FULL DESCRIPTION</Form.Label>
                        <Form.Control as="textarea" rows={3} value={form.description} onChange={update('description')} />
                    </Col>
                    <Col md={6}>
                        <Form.Label className="small fw-bold text-muted">SUITABLE FOR</Form.Label>
                        <Form.Control value={form.suitableFor} onChange={update('suitableFor')} />
                    </Col>
                    <Col md={6}>
                        <Form.Label className="small fw-bold text-muted">SAFETY PROFILE</Form.Label>
                        <Form.Control value={form.safetyProfile} onChange={update('safetyProfile')} />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">PRO TIP</Form.Label>
                        <Form.Control as="textarea" rows={2} value={form.proTip} onChange={update('proTip')} />
                    </Col>
                    <Col md={6}>
                        <Form.Label className="small fw-bold text-muted">ATTRIBUTES (one per line: Key: Value)</Form.Label>
                        <Form.Control as="textarea" rows={4} value={form.attributes} onChange={update('attributes')} placeholder={'Weight: 100ml\npH Balanced: Yes'} />
                    </Col>
                    <Col md={6}>
                        <Form.Label className="small fw-bold text-muted">KEY ACTIVES (one per line)</Form.Label>
                        <Form.Control as="textarea" rows={4} value={form.keyActives} onChange={update('keyActives')} placeholder={'Organic Amla Extract\nAloe Vera Juice'} />
                    </Col>
                    <Col md={12} className="mt-4">
                        <Button type="submit" variant="success" disabled={isSaving} className="rounded-pill px-5 fw-bold">
                            {isSaving ? 'Saving…' : mode === 'create' ? 'Create Product' : 'Save Changes'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}
