'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function DeleteProductButton({ id }: { id: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Delete product "${id}"? This cannot be undone.`)) return;
        setIsDeleting(true);
        await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
        router.refresh();
    };

    return (
        <Button variant="outline-danger" size="sm" disabled={isDeleting} onClick={handleDelete}>
            {isDeleting ? 'Deleting…' : 'Delete'}
        </Button>
    );
}
