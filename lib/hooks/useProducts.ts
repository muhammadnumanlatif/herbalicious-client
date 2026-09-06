'use client';

import { useEffect, useState } from 'react';

export interface ApiProduct {
    id: string;
    name: string;
    slug: string;
    image: string;
    price: string;
    category: string;
    shortDescription: string;
}

export function useProducts() {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/products')
            .then((res) => res.json())
            .then((data: { products: ApiProduct[] }) => {
                if (!cancelled) setProducts(data.products || []);
            })
            .catch(() => {
                if (!cancelled) setProducts([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { products, loading };
}
