'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLeaf, FaShoppingBag, FaStar } from 'react-icons/fa';
import Link from 'next/link';

const nicheToProduct: Record<string, string> = {
    'goat-milk-skincare': 'goat-milk-soap',
    'hibiscus-hair-care': 'hibiscus-shampoo',
    'amla-reetha-traditionalism': 'amla-reetha-shampoo',
    'active-vitamin-c-organics': 'vitamin-c-serum',
    'frankincense-calendula-healing': 'body-butter',
    'turmeric-honey-brightening': 'turmeric-soap',
    'post-covid-hair-fall': 'hair-serum',
    'sulfate-free-dandruff': 'amla-reetha-shampoo',
    'natural-magnesium-therapy': 'magnesium-spray',
    'non-toxic-lip-care': 'strawberry-lip-balm',
    'handmade-antibacterial-soaps': 'eucalyptus-soap',
    'moringa-immunity-joint-pain': 'pure-moringa-powder',
    'makhana-coconut-boosts': 'makhana-powder',
    'plant-based-respiratory-support': 'pure-moringa-powder',
    'paraben-free-wedding-beauty': 'anniversary-bundle',
    'sustainable-gifts': 'anniversary-bundle',
    'chemical-free-baby-bath': 'goat-milk-soap',
    'citrus-skin-revival': 'lemon-tangerine-soap',
    'papaya-brightening-glow': 'papaya-soap',
    'himalayan-detox-remedies': 'himalayan-salt-soap'
};

export default function NicheClient({ niche, products }: { niche: any, products: any[] }) {
    const [isLoading, setIsLoading] = useState(true);
    const MotionDiv = motion.div as any;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    const recommendedProducts = products.slice(0, 3);

    return (
        <div className="niche-page">
            <section className="py-5 bg-dark text-white text-center position-relative overflow-hidden" style={{ minHeight: '45vh', display: 'flex', alignItems: 'center' }}>
                <div className="position-absolute w-100 h-100" style={{ background: 'url("/Products/Hero Section.webp") center/cover', opacity: 0.2, top: 0, left: 0 }}></div>
                <Container className="position-relative">
                    <MotionDiv initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">Organic Excellence</Badge>
                        <h1 className="display-3 fw-bold mb-3">{niche.title}</h1>
                        <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
                            Mastering the science of {niche.ingredient || 'natural wellness'} to bring you the purest {niche.product} in Pakistan.
                        </p>
                    </MotionDiv>
                </Container>
            </section>

            <Container className="py-5">
                <Row className="g-5 align-items-center mb-5">
                    <Col lg={5}>
                        <MotionDiv initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
                            <Card className="rounded-5 overflow-hidden border-0 shadow-lg">
                                <Card.Img
                                    src={products.find(p => p.id === nicheToProduct[niche.id])?.image || `/Products/Herbalicious Shop.webp`}
                                    onError={(e) => { e.currentTarget.src = '/Products/Herbalicious Shop.webp'; }}
                                    alt={`${niche.title} - Organic Skincare in Lahore, Karachi, Islamabad, Pakistan`}
                                    style={{ height: '450px', objectFit: 'cover' }}
                                />
                            </Card>
                        </MotionDiv>
                    </Col>
                    <Col lg={7}>
                        <div className="ps-lg-4">
                            <h2 className="display-5 fw-bold mb-4">{niche.seoH2 || `Why our ${niche.title}?`}</h2>
                            <p className="lead text-muted mb-4">
                                Most traditional products use synthetic fillers. Our <strong>{niche.title}</strong> line focuses on
                                high-concentrate <strong>{niche.ingredient || 'natural extracts'}</strong> to target {niche.problem || niche.benefit || 'your concerns'} effectively.
                                {niche.geoInsight && <span className="d-block mt-3 text-primary fw-bold italic small">💡 {niche.geoInsight}</span>}
                            </p>

                            <Row className="g-3 mb-4">
                                {[
                                    { icon: <FaLeaf className="text-success" />, text: "100% Certified Organic" },
                                    { icon: <FaCheckCircle className="text-success" />, text: "No Parabens or Sulfates" },
                                    { icon: <FaShoppingBag className="text-success" />, text: "Direct Farm-to-Bottle" }
                                ].map((item, i) => (
                                    <Col md={6} key={i}>
                                        <div className="d-flex align-items-center bg-light p-3 rounded-4">
                                            {item.icon} <span className="ms-3 fw-bold small">{item.text}</span>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            <div className="d-flex flex-wrap gap-3">
                                <Link href="/quote" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm hover-scale transition-all">
                                    Order via WhatsApp
                                </Link>
                                <Button variant="outline-primary" className="rounded-pill px-5 py-3 fw-bold">
                                    View Catalogue
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <hr className="my-5 opacity-10" />

                <div className="mb-5 py-4">
                    <div className="text-center mb-5">
                        <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-2">Complete Your Ritual</Badge>
                        <h2 className="fw-bold display-6">Recommended Organic Solutions</h2>
                        <p className="text-muted lead">Handpicked products to complement your {niche.title} routine.</p>
                    </div>
                    <Row className="g-4">
                        {recommendedProducts.map((product) => (
                            <Col md={4} key={product.id}>
                                <MotionDiv whileHover={{ y: -10 }} className="h-100">
                                    <Card className="h-100 border-0 shadow-sm rounded-5 overflow-hidden bg-white">
                                        <div style={{ height: '240px', overflow: 'hidden' }}>
                                            <Card.Img
                                                variant="top"
                                                src={product.image}
                                                style={{ height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <Card.Body className="p-4 d-flex flex-column">
                                            <div className="d-flex justify-content-between mb-2">
                                                <small className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>{product.category}</small>
                                                <div className="text-warning small"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                                            </div>
                                            <Card.Title className="h6 fw-bold mb-3 text-truncate">{product.name}</Card.Title>
                                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                                <span className="fw-bold text-dark h5 mb-0">{product.price}</span>
                                                <Link href={`/quote?productId=${product.id}`} className="btn btn-success btn-sm rounded-pill px-3">
                                                    <FaShoppingBag className="me-1" /> Buy Now
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </MotionDiv>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

            <style jsx>{`
                .hover-scale:hover { transform: translateY(-3px) scale(1.02); }
            `}</style>
        </div>
    );
}
