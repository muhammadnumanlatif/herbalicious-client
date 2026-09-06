import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { listProducts } from '@/lib/db';
import DeleteProductButton from '@/components/admin/DeleteProductButton';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await listProducts();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Manage Products</h2>
                <Link href="/dashboard/products/new">
                    <Button variant="success" className="rounded-pill fw-bold">+ New Product</Button>
                </Link>
            </div>

            <Card className="border-0 shadow-sm rounded-4 p-4">
                {products.length === 0 ? (
                    <p className="text-muted mb-0">No products yet.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            {p.image && (
                                                <img src={p.image} alt={p.name} width={44} height={44} className="rounded object-fit-cover" />
                                            )}
                                        </td>
                                        <td className="fw-bold">{p.name}</td>
                                        <td>{p.category}</td>
                                        <td>{p.price}</td>
                                        <td className="text-end">
                                            <Link href={`/dashboard/products/${p.id}`} className="btn btn-outline-secondary btn-sm me-2">
                                                Edit
                                            </Link>
                                            <DeleteProductButton id={p.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
