'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function OrderStatusSelect({ orderId, status }: { orderId: string; status: string }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsSaving(true);
        await fetch(`/api/admin/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: e.target.value }),
        });
        router.refresh();
        setIsSaving(false);
    };

    return (
        <Form.Select value={status} onChange={handleChange} disabled={isSaving} style={{ maxWidth: 200 }}>
            {STATUSES.map((s) => (
                <option key={s} value={s} className="text-capitalize">
                    {s}
                </option>
            ))}
        </Form.Select>
    );
}
