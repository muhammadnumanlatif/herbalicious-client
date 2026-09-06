import React from 'react';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
    return (
        <div>
            <h2 className="fw-bold mb-4">New Product</h2>
            <ProductForm mode="create" />
        </div>
    );
}
