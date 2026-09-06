'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const STATUSES = ['unread', 'read', 'replied'];

export default function MessageStatusSelect({ messageId, status }: { messageId: number; status: string }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsSaving(true);
        await fetch(`/api/admin/messages/${messageId}`, {
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
