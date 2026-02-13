'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Badge, Accordion, Card, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaChevronLeft, FaStar, FaShieldAlt, FaTruck, FaLeaf, FaUndo, FaCheckCircle, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function ProductClient({ product, relatedProducts, howToSteps, insight }: { product: any, relatedProducts: any[], howToSteps: any[], insight: any }) {
    const [isRedirecting, setIsRedirecting] = useState(false);
    const MotionDiv = motion.div as any;

    const handleOrder = () => {
        setIsRedirecting(true);
        const randomWA = ['923434178994', '923434055363', '923224757791'][Math.floor(Math.random() * 3)];
        const message = `*Order Request*%0A%0A*Product:* ${product.name}%0A*Price:* ${product.price}%0A%0AHi, I'm interested in ordering ${product.name}. Please confirm availability.`;

        setTimeout(() => {
            window.open(`https://wa.me/${randomWA}?text=${message}`, '_blank');
            setIsRedirecting(false);
        }, 1500);
    };

    return (
        <div className="product-detail-page pt-5">
            <AnimatePresence>
                {isRedirecting && (
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white"
                        style={{ zIndex: 9999 }}
                    >
                        <div className="text-center p-4">
                            <Spinner animation="grow" variant="success" className="mb-4" />
                            <h3 className="fw-bold">Securing Your Fresh Batch...</h3>
                            <p className="text-muted">Redirecting you to our secure WhatsApp line.</p>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>

            <Container className="py-5">
                <Row className="gy-5">
                    <Col lg={6}>
                        <div className="product-image-container sticky-top" style={{ top: '120px' }}>
                            <Card className="rounded-5 shadow-lg overflow-hidden border-0">
                                <Card.Img
                                    src={product.image}
                                    alt={`${product.name} - 100% Organic Skincare & Wellness in Pakistan (Lahore, Karachi, Islamabad)`}
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="ps-lg-4">
                            <Badge bg="success-subtle" text="success" className="mb-2 px-3 py-2 rounded-pill">100% Natural & Organic</Badge>
                            <h1 className="display-5 fw-bold mb-3">{product.name}</h1>

                            <div className="d-flex align-items-center mb-4 gap-2">
                                <div className="text-warning small"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                                <span className="small text-muted">(4.9/5 Based on 1,200+ Pakistani Customers)</span>
                            </div>

                            <div className="price-container mb-4 p-4 bg-primary-subtle rounded-4">
                                <span className="h1 fw-bold text-primary">{product.price}</span>
                                {product.oldPrice && <span className="ms-3 text-muted text-decoration-line-through">{product.oldPrice}</span>}
                            </div>

                            <h2 className="h4 fw-bold mb-3">Why choose our {product.name.replace('Herbalicious ', '')}?</h2>
                            <p className="lead text-muted mb-5">{product.description}</p>

                            {insight && (
                                <div className="p-3 border-start border-4 border-success bg-light rounded-2 mb-5">
                                    <h3 className="h6 fw-bold text-success mb-2">💡 Expert SEO Discovery:</h3>
                                    <p className="small mb-0 italic">{insight.insight}</p>
                                    <p className="small mt-2 mb-0"><strong>Most relevant in:</strong> Lahore, Karachi, Islamabad & Multan.</p>
                                </div>
                            )}

                            <div className="d-grid gap-3 mb-5">
                                <Button onClick={handleOrder} variant="success" size="lg" className="py-3 rounded-pill fw-bold hover-lift">
                                    <FaWhatsapp className="me-3" size={28} /> Confirm Order via WhatsApp
                                </Button>
                            </div>

                            <Accordion defaultActiveKey="0" className="product-accordions">
                                <Accordion.Item eventKey="0" className="border-0 bg-transparent mb-3">
                                    <Accordion.Header className="rounded-4">Technical Specifications (EAV Format)</Accordion.Header>
                                    <Accordion.Body className="bg-white rounded-4 mt-2 shadow-sm">
                                        <Table borderless size="sm" className="mb-0">
                                            <tbody>
                                                <tr>
                                                    <td className="fw-bold text-muted">Entity</td>
                                                    <td className="text-end text-primary fw-bold">{product.name}</td>
                                                </tr>
                                                {Object.entries(product.attributes || {}).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td className="fw-bold text-muted">Attribute: {key}</td>
                                                        <td className="text-end">{value as string}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td className="fw-bold text-muted">Value Proposition</td>
                                                    <td className="text-end">100% Organic, Chemical-Free</td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-bold text-muted">Climate Match</td>
                                                    <td className="text-end">Pakistani Tropical & Dry Zones</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" className="border-0 bg-transparent mb-3">
                                    <Accordion.Header className="rounded-4">Natural Ritual (How to Use)</Accordion.Header>
                                    <Accordion.Body className="bg-white rounded-4 mt-2 shadow-sm">
                                        {howToSteps.map((step, idx) => (
                                            <div key={idx} className="mb-3">
                                                <div className="d-flex align-items-center mb-1">
                                                    <Badge bg="primary" className="me-2 rounded-circle">0{idx + 1}</Badge>
                                                    <strong className="text-dark">{step.name}</strong>
                                                </div>
                                                <p className="small text-muted ms-4 mb-0">{step.text}</p>
                                            </div>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className="border-0 bg-transparent">
                                    <Accordion.Header className="rounded-4">Safety & Ethics</Accordion.Header>
                                    <Accordion.Body className="bg-white rounded-4 mt-2 shadow-sm">
                                        <div className="small text-muted">
                                            <p className="mb-2"><FaCheckCircle className="text-success me-2" /> <strong>Cruelty-Free:</strong> Never tested on animals.</p>
                                            <p className="mb-2"><FaCheckCircle className="text-success me-2" /> <strong>Organic Sourcing:</strong> Direct from farm partnerships in Pakistan.</p>
                                            <p className="mb-0"><FaCheckCircle className="text-success me-2" /> <strong>Sustainable Packing:</strong> Recyclable glass and paper waste.</p>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
