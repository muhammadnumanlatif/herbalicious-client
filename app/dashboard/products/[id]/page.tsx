import React from 'react';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/db';
import ProductForm from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) notFound();

    return (
        <div>
            <h2 className="fw-bold mb-4">Edit Product</h2>
            <ProductForm mode="edit" initial={product} />
        </div>
    );
}
