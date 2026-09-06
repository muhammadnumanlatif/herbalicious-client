'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Card, Form, Button } from 'react-bootstrap';

export default function DashboardLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                const data = (await response.json()) as { error?: string };
                throw new Error(data.error || 'Login failed');
            }
            router.push('/dashboard');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="min-vh-100 d-flex align-items-center justify-content-center">
            <Card className="border-0 shadow-sm rounded-4 p-4" style={{ maxWidth: 400, width: '100%' }}>
                <h4 className="fw-bold mb-4 text-center">Herbalicious Hub</h4>
                <Form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger rounded-4">{error}</div>}
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">USERNAME</Form.Label>
                        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-muted">PASSWORD</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button type="submit" variant="success" disabled={isSubmitting} className="w-100 rounded-pill py-2 fw-bold">
                        {isSubmitting ? 'Signing in…' : 'Sign In'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
