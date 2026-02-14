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
            {!show && (
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
            )}

            {/* Cart Offcanvas */}
            <Offcanvas show={show} onHide={handleClose} placement="end" className="glass-effect border-0" style={{ zIndex: 1055 }}>
                <Offcanvas.Header closeButton className="border-bottom bg-white">
                    <Offcanvas.Title className="fw-bold">Your Healing Basket</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column bg-light">
                    {cart.length === 0 ? (
                        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center opacity-50">
                            <FaShoppingCart size={64} className="mb-3 text-muted" />
                            <p className="lead">Your basket is empty.</p>
                            <Button variant="outline-primary" onClick={handleClose} className="rounded-pill px-4 mt-2">Start Shopping</Button>
                        </div>
                    ) : (
                        <>
                            <ListGroup variant="flush" className="flex-grow-1 overflow-auto px-2 pt-2">
                                <AnimatePresence mode="popLayout">
                                    {cart.map((item) => (
                                        <MotionDiv
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="mb-3"
                                        >
                                            <div className="bg-white p-3 rounded-4 shadow-sm position-relative">
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="position-absolute top-0 end-0 link-danger p-2 text-decoration-none opacity-50 hover-opacity-100"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <FaTrash size={12} />
                                                </Button>
                                                <div className="d-flex gap-3">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="rounded-3 shadow-sm object-fit-cover"
                                                        width={70}
                                                        height={70}
                                                        onError={(e) => { e.currentTarget.src = '/Products/Herbalicious Shop.webp'; }}
                                                    />
                                                    <div className="flex-grow-1 pe-4">
                                                        <h6 className="fw-bold mb-1 small text-truncate">{item.name}</h6>
                                                        <p className="text-primary fw-bold smaller mb-2">{item.price}</p>
                                                        <div className="d-flex align-items-center bg-light rounded-pill border w-auto d-inline-flex">
                                                            <Button variant="link" size="sm" className="p-1 px-2 link-dark text-decoration-none" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                                <FaMinus size={8} />
                                                            </Button>
                                                            <span className="px-2 smaller fw-bold">{item.quantity}</span>
                                                            <Button variant="link" size="sm" className="p-1 px-2 link-dark text-decoration-none" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                                <FaPlus size={8} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </MotionDiv>
                                    ))}
                                </AnimatePresence>

                                {/* Smart Upsell Section */}
                                <div className="p-3 bg-success-subtle rounded-4 mt-3 mb-2 border border-success-subtle">
                                    <div className="small fw-bold text-success mb-2 d-flex align-items-center">
                                        <FaPlus className="me-2" /> Complete Your Ritual
                                    </div>
                                    <div className="d-flex align-items-center bg-white p-2 rounded-3 shadow-sm">
                                        <Image
                                            src="/Products/Herbalicious Vitamin C Serum.webp"
                                            alt="Upsell"
                                            width={40}
                                            height={40}
                                            className="rounded-2 me-3"
                                            onError={(e) => { e.currentTarget.src = '/Products/Herbalicious Shop.webp'; }}
                                        />
                                        <div className="flex-grow-1">
                                            <div className="smaller fw-bold mb-0">Organic Glow Serum</div>
                                            <div className="smaller text-success fw-bold">Rs. 1,450</div>
                                        </div>
                                        <Button variant="outline-success" size="sm" className="rounded-pill smaller py-1 px-3 fw-bold">Add</Button>
                                    </div>
                                </div>
                            </ListGroup>

                            <div className="p-3 bg-white border-top shadow-lg" style={{ zIndex: 1060 }}>
                                {/* Free Shipping Bar */}
                                {subtotal < 2500 && (
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between smaller mb-1 text-muted">
                                            <span>Add <strong>Rs. {(2500 - subtotal).toLocaleString()}</strong> for Free Shipping</span>
                                            <span>{Math.min(100, Math.round((subtotal / 2500) * 100))}%</span>
                                        </div>
                                        <div className="progress" style={{ height: '6px' }}>
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                style={{ width: `${Math.min(100, (subtotal / 2500) * 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                                {subtotal >= 2500 && (
                                    <div className="mb-3 text-center text-success smaller fw-bold bg-success-subtle p-2 rounded-3">
                                        🎉 You've unlocked Free Shipping!
                                    </div>
                                )}

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-bold h5 mb-0">Rs. {subtotal.toLocaleString()}</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center"
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
