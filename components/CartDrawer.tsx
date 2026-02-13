'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Offcanvas, Button, ListGroup, Image } from 'react-bootstrap';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
    const [show, setShow] = useState(false);
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const MotionDiv = motion.div as any;

    return (
        <>
            {/* Floating Cart Button */}
            <MotionDiv
                className="fixed-bottom-right p-4"
                style={{ zIndex: 1050, position: 'fixed', bottom: '20px', right: '20px' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Button
                    variant="primary"
                    className="rounded-circle shadow-lg p-3 d-flex align-items-center justify-content-center position-relative"
                    onClick={handleShow}
                    style={{ width: '60px', height: '60px' }}
                >
                    <FaShoppingCart size={24} />
                    {totalItems > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </MotionDiv>

            {/* Cart Offcanvas */}
            <Offcanvas show={show} onHide={handleClose} placement="end" className="glass-effect border-0">
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="fw-bold">Your Healing Basket</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column">
                    {cart.length === 0 ? (
                        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center opacity-50">
                            <FaShoppingCart size={64} className="mb-3 text-muted" />
                            <p className="lead">Your basket is empty.</p>
                            <Button variant="outline-primary" onClick={handleClose} className="rounded-pill px-4 mt-2">Start Shopping</Button>
                        </div>
                    ) : (
                        <>
                            <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
                                <AnimatePresence mode="popLayout">
                                    {cart.map((item) => (
                                        <MotionDiv
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <ListGroup.Item className="border-0 bg-transparent py-3">
                                                <div className="d-flex gap-3">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="rounded-3 shadow-sm object-fit-cover"
                                                        width={60}
                                                        height={60}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="fw-bold mb-1 small">{item.name}</h6>
                                                        <p className="text-primary fw-bold smaller mb-2">{item.price}</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center bg-light rounded-pill px-2 border">
                                                                <Button variant="link" size="sm" className="p-1 link-dark" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                                    <FaMinus size={8} />
                                                                </Button>
                                                                <span className="px-2 smaller fw-bold">{item.quantity}</span>
                                                                <Button variant="link" size="sm" className="p-1 link-dark" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                                    <FaPlus size={8} />
                                                                </Button>
                                                            </div>
                                                            <Button variant="link" size="sm" className="link-danger p-0 ms-2" onClick={() => removeFromCart(item.id)}>
                                                                <FaTrash size={12} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        </MotionDiv>
                                    ))}
                                </AnimatePresence>

                                {/* Smart Upsell Section */}
                                <div className="p-3 bg-primary-subtle rounded-4 mt-3 mb-2 mx-2">
                                    <div className="small fw-bold text-primary mb-2 mb-2 d-flex align-items-center">
                                        <FaPlus className="me-2" /> Complete Your Ritual
                                    </div>
                                    <div className="upsell-item d-flex align-items-center bg-white p-2 rounded-3 shadow-sm">
                                        <Image
                                            src="/Products/Glow Serum.png"
                                            alt="Upsell"
                                            width={40}
                                            height={40}
                                            className="rounded-2 me-3"
                                        />
                                        <div className="flex-grow-1">
                                            <div className="smaller fw-bold mb-0">Organic Glow Serum</div>
                                            <div className="smaller text-primary fw-bold">Rs. 1,450</div>
                                        </div>
                                        <Button variant="primary" size="sm" className="rounded-pill smaller py-1 px-3">Add</Button>
                                    </div>
                                </div>
                            </ListGroup>

                            <div className="pt-3 border-top mt-auto">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted small">Subtotal</span>
                                    <span className="fw-bold h6">Rs. {subtotal.toLocaleString()}</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center"
                                    onClick={handleClose}
                                >
                                    Proceed to Checkout <FaArrowRight className="ms-2" />
                                </Link>
                            </div>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
