import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { listProducts, listOrders } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const [products, orders] = await Promise.all([listProducts(), listOrders()]);
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const revenue = orders
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0);

    return (
        <div>
            <h2 className="fw-bold mb-4">Dashboard Overview</h2>

            <Row className="g-4">
                <Col md={3}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <h6 className="text-muted mb-2">Total Products</h6>
                        <h2 className="fw-bold mb-0">{products.length}</h2>
                        <div className="small text-success mt-2">Live from D1</div>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <h6 className="text-muted mb-2">Total Orders</h6>
                        <h2 className="fw-bold mb-0">{orders.length}</h2>
                        <div className="small text-muted mt-2">All time</div>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <h6 className="text-muted mb-2">Pending Orders</h6>
                        <h2 className="fw-bold mb-0">{pendingOrders}</h2>
                        <div className="small text-warning mt-2">Needs action</div>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <h6 className="text-muted mb-2">Revenue (COD)</h6>
                        <h2 className="fw-bold mb-0">Rs. {revenue.toLocaleString()}</h2>
                        <div className="small text-primary mt-2">Excludes cancelled</div>
                    </Card>
                </Col>
            </Row>

            <Card className="mt-5 border-0 shadow-sm p-4 rounded-4">
                <h5 className="fw-bold mb-4">Recent Orders</h5>
                {orders.length === 0 ? (
                    <p className="text-muted mb-0">No orders yet.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Placed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 5).map((o) => (
                                    <tr key={o.id}>
                                        <td className="fw-bold">
                                            <a href={`/dashboard/orders/${o.id}`}>{o.id}</a>
                                        </td>
                                        <td>{o.customerName}</td>
                                        <td>Rs. {o.total.toLocaleString()}</td>
                                        <td className="text-capitalize">{o.status}</td>
                                        <td>{new Date(o.createdAt).toLocaleDateString()}</td>
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
