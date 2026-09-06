import React from 'react';
import { notFound } from 'next/navigation';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { getOrderWithItems } from '@/lib/db';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getOrderWithItems(id);
    if (!result) notFound();
    const { order, items } = result;

    return (
        <div>
            <h2 className="fw-bold mb-4">Order {order.id}</h2>

            <Row className="g-4">
                <Col lg={7}>
                    <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
                        <h5 className="fw-bold mb-3">Items</h5>
                        <Table borderless size="sm">
                            <thead>
                                <tr className="text-muted small">
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th className="text-end">Unit Price</th>
                                    <th className="text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td className="text-end">Rs. {item.unitPrice.toLocaleString()}</td>
                                        <td className="text-end fw-bold">Rs. {(item.unitPrice * item.quantity).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-between pt-3 border-top">
                            <span className="text-muted">Subtotal</span>
                            <span>Rs. {order.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className="text-muted">Shipping ({order.city || 'n/a'})</span>
                            <span>Rs. {order.shippingCharge.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between border-top pt-2">
                            <span className="fw-bold">Total</span>
                            <span className="fw-bold">Rs. {order.total.toLocaleString()}</span>
                        </div>
                    </Card>
                </Col>
                <Col lg={5}>
                    <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
                        <h5 className="fw-bold mb-3">Status</h5>
                        <OrderStatusSelect orderId={order.id} status={order.status} />
                    </Card>
                    <Card className="border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-3">Customer</h5>
                        <p className="mb-1 fw-bold">{order.customerName}</p>
                        <p className="mb-1 text-muted">{order.customerPhone}</p>
                        {order.customerEmail && <p className="mb-1 text-muted">{order.customerEmail}</p>}
                        <p className="mb-1 text-muted">{order.shippingAddress}{order.city ? `, ${order.city}` : ''}</p>
                        {order.notes && (
                            <>
                                <hr />
                                <p className="mb-0 small text-muted"><strong>Notes:</strong> {order.notes}</p>
                            </>
                        )}
                        <hr />
                        <p className="mb-0 small text-muted">Payment: {order.paymentMethod.toUpperCase()}</p>
                        <p className="mb-0 small text-muted">Placed: {new Date(order.createdAt).toLocaleString()}</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
