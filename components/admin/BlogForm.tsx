'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import type { DbBlogPost } from '@/lib/db';

interface Props {
    mode: 'create' | 'edit';
    initial?: DbBlogPost;
}

export default function BlogForm({ mode, initial }: Props) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        id: initial?.id ?? '',
        title: initial?.title ?? '',
        date: initial?.date ?? new Date().toISOString().slice(0, 10),
        author: initial?.author ?? '',
        image: initial?.image ?? '',
        excerpt: initial?.excerpt ?? '',
        content: initial?.content ?? '',
        relatedProductId: initial?.relatedProductId ?? '',
    });

    const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        const payload = {
            id: form.id.trim(),
            title: form.title.trim(),
            date: form.date,
            author: form.author.trim() || null,
            image: form.image.trim() || null,
            excerpt: form.excerpt.trim() || null,
            content: form.content.trim() || null,
            relatedProductId: form.relatedProductId.trim() || null,
        };

        try {
            const url = mode === 'create' ? '/api/admin/blogs' : `/api/admin/blogs/${initial!.id}`;
            const method = mode === 'create' ? 'POST' : 'PATCH';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const data = (await response.json()) as { error?: string };
                throw new Error(data.error || 'Failed to save blog post');
            }
            router.push('/dashboard/blogs');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save blog post');
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
                        <Form.Label className="small fw-bold text-muted">POST ID (slug)</Form.Label>
                        <Form.Control
                            value={form.id}
                            onChange={update('id')}
                            disabled={mode === 'edit'}
                            placeholder="e.g. goat-milk-skincare-tips"
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label className="small fw-bold text-muted">TITLE</Form.Label>
                        <Form.Control value={form.title} onChange={update('title')} required />
                    </Col>
                    <Col md={4}>
                        <Form.Label className="small fw-bold text-muted">DATE</Form.Label>
                        <Form.Control type="date" value={form.date} onChange={update('date')} required />
                    </Col>
                    <Col md={4}>
                        <Form.Label className="small fw-bold text-muted">AUTHOR</Form.Label>
                        <Form.Control value={form.author} onChange={update('author')} />
                    </Col>
                    <Col md={4}>
                        <Form.Label className="small fw-bold text-muted">RELATED PRODUCT ID (optional)</Form.Label>
                        <Form.Control value={form.relatedProductId} onChange={update('relatedProductId')} placeholder="e.g. goat-milk-soap" />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">IMAGE PATH</Form.Label>
                        <Form.Control value={form.image} onChange={update('image')} placeholder="/Products/example.webp" />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">EXCERPT</Form.Label>
                        <Form.Control as="textarea" rows={2} value={form.excerpt} onChange={update('excerpt')} />
                    </Col>
                    <Col md={12}>
                        <Form.Label className="small fw-bold text-muted">CONTENT (HTML)</Form.Label>
                        <Form.Control as="textarea" rows={10} value={form.content} onChange={update('content')} />
                    </Col>
                    <Col md={12} className="mt-4">
                        <Button type="submit" variant="success" disabled={isSaving} className="rounded-pill px-5 fw-bold">
                            {isSaving ? 'Saving…' : mode === 'create' ? 'Publish Post' : 'Save Changes'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}
