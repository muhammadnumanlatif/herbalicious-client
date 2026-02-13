'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Accordion, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaTruck, FaShieldAlt, FaCheckCircle, FaUsers, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Testimonials from '@/components/Testimonials';
import DeliveryCountdown from '@/components/DeliveryCountdown';

const MotionDiv = motion.div as any;

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

export default function CityLandingClient({ niche, city, products }: { niche: any, city: any, products: any[] }) {
    const [isLoading, setIsLoading] = useState(true);
    const [viewCount] = useState(Math.floor(Math.random() * (120 - 45 + 1)) + 45);
    const [orderCount] = useState(Math.floor(Math.random() * (15 - 3 + 1)) + 3);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <Spinner animation="grow" variant="primary" />
            </div>
        );
    }

    const handleWhatsAppOrder = (type = 'standard') => {
        const randomWA = ['923434178994', '923434055363', '923224757791'][Math.floor(Math.random() * 3)];
        let message = '';

        if (type === 'bundle') {
            message = `*Herbalicious Local Bundle Request*%0A%0A*City:* ${city.name}%0A*Niche:* ${niche.title}%0A%0AHi, I'm from ${city.name} and I want to claim the exclusive ${niche.title.split(' ')[0]} Shield Kit bundle offer!`;
        } else {
            message = `*Herbalicious Local Order*%0A%0A*City:* ${city.name}%0A*Product:* ${niche.product}%0A%0AHi, I'm interested in ordering ${niche.product} in ${city.name}. Please guide me.`;
        }

        window.open(`https://wa.me/${randomWA}?text=${message}`, '_blank');
    };

    return (
        <div className="city-landing-page">
            <div className="bg-light py-5 mb-5 border-bottom">
                <Container>
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="breadcrumb small">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link href={`/${niche.id}`}>{niche.title}</Link></li>
                            <li className="breadcrumb-item active">{city.name}</li>
                        </ol>
                    </nav>

                    <Row className="align-items-center">
                        <Col lg={8}>
                            <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <Badge bg="success-subtle" text="success" className="px-3 py-2 rounded-pill mb-3">Hyper-Local Discovery</Badge>
                                <h1 className="display-4 fw-bold mb-3">
                                    Pure <span className="text-primary">{niche.product}</span> for <br />{city.name} Residents
                                </h1>
                                <p className="lead text-muted mb-4">
                                    Hand-blended for {city.name}'s {city.weather.toLowerCase()} climate.
                                    Protect your natural beauty with localized organic solutions.
                                </p>
                                <div className="d-flex flex-wrap gap-4">
                                    <div className="d-flex align-items-center small text-muted fw-bold"><FaTruck className="text-primary me-2" /> 24-48h Delivery in {city.name}</div>
                                    <div className="d-flex align-items-center small text-muted fw-bold"><FaShieldAlt className="text-primary me-2" /> Cash on Delivery Available</div>
                                </div>
                            </MotionDiv>
                        </Col>
                        <Col lg={4} className="mt-5 mt-lg-0">
                            <MotionDiv initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="p-4 bg-white rounded-5 shadow-sm border text-center">
                                    <div className="h1 text-primary mb-2">🍃</div>
                                    <h5 className="fw-bold">Small-Batch Purity</h5>
                                    <p className="small text-muted mb-0">Crafted specifically for the organic wellness community in {city.name}.</p>
                                </div>
                            </MotionDiv>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="mb-5 g-5">
                    <Col lg={6}>
                        <h2 className="fw-bold mb-4">Nature's Answer to {city.name} Urban Living</h2>
                        <p className="lead text-muted mb-4">
                            Exposure to {city.transit.toLowerCase()} and {city.lifestyle.toLowerCase()} routines can stress your skin and hair.
                            Our <strong>{niche.title}</strong> routine helps you stay vibrant naturally.
                        </p>

                        <Accordion defaultActiveKey="0" className="shadow-none border-0 mb-4">
                            <Accordion.Item eventKey="0" className="border-0 bg-transparent">
                                <Accordion.Header className="fw-bold py-3">Is this good for {city.name} weather?</Accordion.Header>
                                <Accordion.Body className="px-0">
                                    Yes! We use stable organic lipids and herbal extracts that perform optimally in {city.weather.toLowerCase()} conditions.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className="border-0 bg-transparent">
                                <Accordion.Header className="fw-bold py-3">Where do you deliver in {city.name}?</Accordion.Header>
                                <Accordion.Body className="px-0">
                                    We deliver to all residential and commercial areas across {city.name} via our express courier partners.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <DeliveryCountdown />

                        <Button onClick={() => handleWhatsAppOrder()} variant="primary" size="lg" className="rounded-pill px-5 shadow-sm">
                            Order {niche.product} <FaArrowRight className="ms-2" />
                        </Button>
                    </Col>

                    <Col lg={6}>
                        <MotionDiv className="position-relative">
                            <Card className="rounded-5 overflow-hidden border-0 shadow-lg">
                                <Card.Img
                                    src={products.find(p => p.id === nicheToProduct[niche.id])?.image || `/Products/Herbalicious Shop.webp`}
                                    onError={(e) => { e.currentTarget.src = '/Products/Herbalicious Shop.webp'; }}
                                    alt={`${niche.product} in ${city.name}`}
                                    style={{ height: '500px', objectFit: 'cover' }}
                                />
                            </Card>
                            <div className="position-absolute bottom-0 end-0 m-4 p-3 bg-white rounded-4 shadow-sm border d-flex align-items-center gap-2">
                                <FaCheckCircle className="text-success" />
                                <span className="small fw-bold">Verified for {city.name}</span>
                            </div>
                        </MotionDiv>
                    </Col>
                </Row>

                <div className="bg-dark text-white p-5 rounded-5 mb-5 text-center shadow-lg transform-hover transition-all">
                    <Row className="g-4">
                        {[
                            { val: "5k+", label: `Customers in ${city.name}` },
                            { val: "100%", label: "Organic Ingredients" },
                            { val: "Fast", label: "Local Shipping" },
                            { val: "Fresh", label: "Handmade Potency" }
                        ].map((stat, i) => (
                            <Col md={3} key={i}>
                                <h3 className="fw-bold text-primary mb-1">{stat.val}</h3>
                                <div className="small opacity-75">{stat.label}</div>
                            </Col>
                        ))}
                    </Row>
                </div>

                <MotionDiv className="mb-5 p-4 rounded-5 bg-primary-subtle border d-flex align-items-center justify-content-between flex-wrap gap-4 shadow-sm">
                    <div className="d-flex align-items-center">
                        <div className="bg-primary text-white p-3 rounded-circle me-3"><FaUsers size={24} /></div>
                        <div>
                            <div className="fw-bold text-primary h5 mb-1">Live in {city.name}</div>
                            <div className="text-muted small">{viewCount} people are currently browsing our {niche.title} in your area.</div>
                        </div>
                    </div>
                </MotionDiv>

                <div className="mb-5 pt-5 text-center">
                    <Badge bg="info-subtle" text="info" className="px-3 py-2 rounded-pill mb-3">Community Love</Badge>
                    <h2 className="fw-bold display-6 mb-2">Real Feedback from {city.name}</h2>
                    <p className="text-muted lead mb-5">Join thousands of local organic wellness enthusiasts.</p>
                    <Testimonials locationFilter={city.name} />
                </div>
            </Container>
        </div>
    );
}
