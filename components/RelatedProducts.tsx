import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/wordpress';

async function fetchRelatedProducts(category: string, currentId: string) {
    const products = await getProducts();
    return products
        .filter((p) => p.category === category && p.id !== currentId)
        .slice(0, 4);
}

export default async function RelatedProducts({ category, currentId }: { category: string, currentId: string }) {
    const products = await fetchRelatedProducts(category, currentId);

    if (products.length === 0) return null;

    return (
        <div className="related-products mt-5 pt-5 border-top">
            <h3 className="h3 fw-bold mb-4">You May Also Like</h3>
            <div className="row g-4">
                {products.map((p: any) => (
                    <div key={p.id} className="col-6 col-md-3">
                        <div className="product-card h-100">
                            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover">
                                <Link href={`/product/${p.id}`}>
                                    <div className="position-relative aspect-ratio-1x1 bg-light">
                                        <img
                                            src={p.image}
                                            className="card-img-top w-100 h-100 object-fit-cover"
                                            alt={p.name}
                                        />
                                    </div>
                                </Link>
                                <div className="card-body p-3 text-center">
                                    <Link href={`/product/${p.id}`} className="text-decoration-none text-dark stretched-link">
                                        <h3 className="h6 fw-bold mb-1 text-truncate">{p.name}</h3>
                                    </Link>
                                    <div className="text-success fw-bold small">{p.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
