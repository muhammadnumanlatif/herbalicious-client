'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function DeleteButton({ url, confirmText }: { url: string; confirmText: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(confirmText)) return;
        setIsDeleting(true);
        await fetch(url, { method: 'DELETE' });
        router.refresh();
    };

    return (
        <Button variant="outline-danger" size="sm" disabled={isDeleting} onClick={handleDelete}>
            {isDeleting ? 'Deleting…' : 'Delete'}
        </Button>
    );
}
