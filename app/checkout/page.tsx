'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { useCart } from '@/context/CartContext';
import { FaTruck, FaMapMarkerAlt, FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
    const { cart, subtotal, clearCart } = useCart();
    const [orderStep, setOrderStep] = useState(1); // 1: Shipping, 2: Confirmation
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        notes: ''
    });

    const shippingCharge = 250;
    const total = subtotal + shippingCharge;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally send the order to your WordPress custom endpoint or Firebase
        console.log("Order Placed:", { items: cart, customer: formData, total });

        // Simulating order processed
        setTimeout(() => {
            setOrderStep(2);
            // clearCart(); // We'll clear when they click 'Back to Home' or similar
        }, 1000);
    };

    const MotionDiv = motion.div as any;

    if (cart.length === 0 && orderStep === 1) {
        return (
            <Container className="py-5 text-center min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <FaShoppingBag size={80} className="text-muted mb-4 opacity-25" />
                <h2 className="fw-bold mb-3">Your basket is empty</h2>
                <p className="text-muted mb-4">Add some healing products before checking out.</p>
                <Link href="/shop" className="btn btn-primary rounded-pill px-5 py-3 fw-bold">Return to Shop</Link>
            </Container>
        );
    }

    return (
        <Container className="py-5 mt-5">
            <AnimatePresence mode="wait">
                {orderStep === 1 ? (
                    <MotionDiv
                        key="shipping"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h2 className="fw-bold mb-5 flex-grow-1">
                            <Badge bg="primary-subtle" text="primary" className="me-3 px-3 py-2 rounded-circle">1</Badge>
                            Shipping Details
                        </h2>

                        <Row className="gy-4">
                            <Col lg={7}>
                                <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5">
                                    <Form onSubmit={handleSubmit}>
                                        <Row className="gy-4">
                                            <Col md={12}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">FULL NAME</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="fullName"
                                                        placeholder="e.g. Ali Ahmed"
                                                        required
                                                        className="bg-light border-0 py-3 px-4 shadow-none"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">EMAIL ADDRESS</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        placeholder="ali@example.com"
                                                        required
                                                        className="bg-light border-0 py-3 px-4 shadow-none"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">PHONE NUMBER</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        name="phone"
                                                        placeholder="0300 1234567"
                                                        required
                                                        className="bg-light border-0 py-3 px-4 shadow-none"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">SHIPPING ADDRESS</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name="address"
                                                        placeholder="House No, Street Name, Area..."
                                                        required
                                                        className="bg-light border-0 py-3 px-4 shadow-none"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-muted">ORDER NOTES (OPTIONAL)</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        name="notes"
                                                        placeholder="Any specific delivery instructions?"
                                                        className="bg-light border-0 py-3 px-4 shadow-none"
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} className="mt-5">
                                                <div className="p-3 bg-light rounded-4 d-flex align-items-center mb-4">
                                                    <FaTruck className="text-primary me-3" size={24} />
                                                    <div>
                                                        <h6 className="mb-0 fw-bold">Cash on Delivery (COD)</h6>
                                                        <span className="small text-muted">Pay securely when the rider arrives.</span>
                                                    </div>
                                                </div>
                                                <Button type="submit" variant="success" className="w-100 rounded-pill py-3 fw-bold shadow-sm h5 mb-0">
                                                    Place Order (Rs. {total.toLocaleString()})
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card>
                            </Col>

                            <Col lg={5}>
                                <div className="sticky-top" style={{ top: '100px' }}>
                                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                                        <Card.Header className="bg-white py-4 border-0">
                                            <h5 className="fw-bold mb-0">Order Summary</h5>
                                        </Card.Header>
                                        <ListGroup variant="flush">
                                            {cart.map(item => (
                                                <ListGroup.Item key={item.id} className="py-3 border-light">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="position-relative me-3">
                                                                <img src={item.image} alt={item.name} width={50} height={50} className="rounded object-fit-cover" />
                                                                <Badge bg="dark" className="position-absolute top-0 start-100 translate-middle rounded-pill">{item.quantity}</Badge>
                                                            </div>
                                                            <span className="small fw-medium">{item.name}</span>
                                                        </div>
                                                        <span className="small fw-bold">Rs. {(item.numericPrice * item.quantity).toLocaleString()}</span>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <Card.Footer className="bg-light border-0 p-4">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">Subtotal</span>
                                                <span className="fw-bold">Rs. {subtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-4">
                                                <span className="text-muted">Shipping</span>
                                                <span className="fw-bold">Rs. {shippingCharge}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-0 border-top pt-3">
                                                <h5 className="fw-bold mb-0">Total</h5>
                                                <h5 className="fw-bold text-primary mb-0">Rs. {total.toLocaleString()}</h5>
                                            </div>
                                        </Card.Footer>
                                    </Card>

                                    <div className="text-center">
                                        <p className="small text-muted mb-0">
                                            <FaMapMarkerAlt className="me-2" /> Handcrafted in Lahore, Pakistan
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </MotionDiv>
                ) : (
                    <MotionDiv
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-5"
                    >
                        <div className="mb-4">
                            <FaCheckCircle size={100} className="text-success mb-4" />
                            <h1 className="display-4 fw-bold mb-3">Order Received!</h1>
                            <p className="lead text-muted mb-5">
                                Thank you for choosing nature, <strong>{formData.fullName}</strong>. <br />
                                Your order has been placed successfully and will be delivered within 3-5 working days.
                            </p>
                        </div>

                        <Card className="border-0 shadow-sm rounded-4 p-5 max-width-600 mx-auto bg-light mb-5 text-start">
                            <h5 className="fw-bold mb-4">Delivery To:</h5>
                            <p className="mb-1 fw-bold">{formData.fullName}</p>
                            <p className="mb-1 text-muted">{formData.phone}</p>
                            <p className="mb-4 text-muted">{formData.address}</p>

                            <div className="d-flex justify-content-between border-top pt-4">
                                <span className="fw-bold">Payment Method</span>
                                <span className="text-success fw-bold">Cash on Delivery</span>
                            </div>
                        </Card>

                        <Link
                            href="/"
                            onClick={() => clearCart()}
                            className="btn btn-primary rounded-pill px-5 py-3 fw-bold"
                        >
                            Back to Home
                        </Link>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </Container>
    );
}
