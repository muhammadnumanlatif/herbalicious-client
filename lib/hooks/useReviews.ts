'use client';

import { useEffect, useState } from 'react';

export interface ApiReview {
    name: string;
    location: string;
    content: string;
    productId: string;
}

export function useReviews() {
    const [reviews, setReviews] = useState<ApiReview[]>([]);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/testimonials')
            .then((res) => res.json())
            .then((data: { reviews: ApiReview[] }) => {
                if (!cancelled) setReviews(data.reviews || []);
            })
            .catch(() => {
                if (!cancelled) setReviews([]);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { reviews };
}
