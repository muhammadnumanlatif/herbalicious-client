import React from 'react';
import Link from 'next/link';
import { Card, Badge } from 'react-bootstrap';
import { listOrders } from '@/lib/db';

export const dynamic = 'force-dynamic';

const statusVariant: Record<string, string> = {
    pending: 'warning',
    confirmed: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'danger',
};

export default async function OrdersPage() {
    const orders = await listOrders();

    return (
        <div>
            <h2 className="fw-bold mb-4">Orders</h2>

            <Card className="border-0 shadow-sm rounded-4 p-4">
                {orders.length === 0 ? (
                    <p className="text-muted mb-0">No orders yet.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Phone</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Placed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id}>
                                        <td className="fw-bold">
                                            <Link href={`/dashboard/orders/${o.id}`}>{o.id}</Link>
                                        </td>
                                        <td>{o.customerName}</td>
                                        <td>{o.customerPhone}</td>
                                        <td>Rs. {o.subtotal.toLocaleString()}</td>
                                        <td>
                                            <Badge bg={statusVariant[o.status] ?? 'secondary'} className="text-capitalize">
                                                {o.status}
                                            </Badge>
                                        </td>
                                        <td>{new Date(o.createdAt).toLocaleString()}</td>
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
