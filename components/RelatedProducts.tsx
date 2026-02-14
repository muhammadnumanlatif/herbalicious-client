import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Link from 'next/link';

// Mock function to simulate delay - replace with real fetch
async function fetchRelatedProducts(category: string, currentId: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would fetch from WP/API
    // const products = await getProducts({ category });

    // For now we import static products to filter, but pretend it's async
    const { default: staticProducts } = await import('@/src/data/products.json');

    return staticProducts
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, 4);
}

export default async function RelatedProducts({ category, currentId }: { category: string, currentId: string }) {
    const products = await fetchRelatedProducts(category, currentId);

    if (products.length === 0) return null;

    return (
        <div className="related-products mt-5 pt-5 border-top">
            <h3 className="h3 fw-bold mb-4">You May Also Like</h3>
            <div className="row g-4">
                {products.map((p) => (
                    <Col key={p.id} xs={6} md={3}>
                        <div className="product-card h-100">
                            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover">
                                <Link href={`/product/${p.id}`}>
                                    <div className="position-relative aspect-ratio-1x1 bg-light">
                                        <Card.Img
                                            variant="top"
                                            src={p.image}
                                            className="w-100 h-100 object-fit-cover"
                                            alt={p.name}
                                        />
                                    </div>
                                </Link>
                                <Card.Body className="p-3 text-center">
                                    <Link href={`/product/${p.id}`} className="text-decoration-none text-dark stretched-link">
                                        <h3 className="h6 fw-bold mb-1 text-truncate">{p.name}</h3>
                                    </Link>
                                    <div className="text-success fw-bold small">{p.price}</div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                ))}
            </div>
        </div>
    );
}
