'use client';

import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaArrowRight, FaShoppingBag, FaStar, FaShieldAlt } from 'react-icons/fa';
import { lahoreAreas } from '@/src/data/lahoreAreas';
import { allNiches } from '@/src/data/niches';

export default function LahoreDirectoryPage() {
    const topNiches = allNiches.slice(0, 6);
    const MotionDiv = motion.div as any;

    return (
        <div className="lahore-directory pt-5 pb-5">
            <Container className="py-5">
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item linkAs={Link} href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} href="/directory">Directory</Breadcrumb.Item>
                    <Breadcrumb.Item active>Lahore Areas</Breadcrumb.Item>
                </Breadcrumb>

                <div className="text-center mb-5">
                    <Badge bg="primary" className="px-3 py-2 rounded-pill mb-3">Lahore Local Specials</Badge>
                    <h1 className="display-4 fw-bold">Hyper-Local <span className="text-primary">Lahore Delivery</span></h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
                        We've mapped our organic solutions to every corner of the City of Gardens. Select your area for specialized delivery insights.
                    </p>
                </div>

                <div className="bg-dark text-white p-4 rounded-5 mb-5 text-center shadow-lg border-primary border">
                    <Row className="align-items-center g-4">
                        <Col md={4} className="border-end border-secondary border-opacity-50">
                            <FaShieldAlt className="text-primary mb-2 h2" />
                            <div className="fw-bold">Same-Day Delivery</div>
                            <small className="opacity-75">Available for central Lahore</small>
                        </Col>
                        <Col md={4} className="border-end border-secondary border-opacity-50">
                            <FaMapMarkerAlt className="text-primary mb-2 h2" />
                            <div className="fw-bold">Local Warehousing</div>
                            <small className="opacity-75">Faster than national shipping</small>
                        </Col>
                        <Col md={4}>
                            <FaStar className="text-warning mb-2 h2" />
                            <div className="fw-bold">10k+ Lahore Customers</div>
                            <small className="opacity-75">Trust the Original Herbalicious</small>
                        </Col>
                    </Row>
                </div>

                <Row className="gy-4">
                    {lahoreAreas.map((area, idx) => (
                        <Col lg={4} md={6} key={area.id}>
                            <MotionDiv
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Card className="border-0 shadow-sm rounded-5 h-100 transition-all overflow-hidden bg-white hover-shadow-primary glass-effect">
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h4 className="fw-bold mb-1">{area.name}</h4>
                                                <Badge bg="primary-subtle" text="primary" className="fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>{area.targetAudience}</Badge>
                                            </div>
                                            <div className="bg-light p-2 rounded-circle text-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                <FaMapMarkerAlt />
                                            </div>
                                        </div>

                                        <p className="small text-muted mb-4">
                                            Serving near <strong>{area.landmark}</strong>. Experience the best in organic care with 24h delivery.
                                        </p>

                                        <div className="mb-4">
                                            <div className="small fw-bold mb-2">Recommended for {area.name}:</div>
                                            <div className="d-flex flex-wrap gap-2">
                                                {topNiches.slice(0, 3).map(n => (
                                                    <Badge key={n.id} bg="light" text="dark" className="border px-2 py-1 fw-normal rounded-pill">
                                                        {n.product}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="d-grid">
                                            <Link
                                                href={`/goat-milk-skincare/pk/lahore`}
                                                className="btn btn-outline-primary rounded-pill d-flex align-items-center justify-content-center py-2 fw-bold"
                                            >
                                                Explore Local Offers <FaArrowRight className="ms-2" />
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </MotionDiv>
                        </Col>
                    ))}
                </Row>

                <div className="mt-5 pt-5 text-center">
                    <Card className="border-0 shadow-lg bg-primary text-white p-5 rounded-5 overflow-hidden position-relative">
                        <div className="position-relative z-1 py-4">
                            <h2 className="display-5 fw-bold mb-3">Don't see your area?</h2>
                            <p className="lead mb-4">We deliver to EVERY corner of Lahore. From Shahdara to Gajju Matah.</p>
                            <Link href="/quote" className="btn btn-light btn-lg rounded-pill px-5 fw-bold text-primary shadow-sm">
                                Request Immediate Delivery <FaShoppingBag className="ms-2" />
                            </Link>
                        </div>
                    </Card>
                </div>
            </Container>

            <style jsx>{`
                .hover-shadow-primary:hover {
                    box-shadow: 0 10px 30px rgba(var(--bs-primary-rgb), 0.1) !important;
                    border: 1px solid rgba(var(--bs-primary-rgb), 0.2) !important;
                }
            `}</style>
        </div>
    );
}
