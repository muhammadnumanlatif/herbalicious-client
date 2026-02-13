'use client';

import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaLeaf, FaArrowRight, FaCity } from 'react-icons/fa';
import { categories } from '@/src/data/niches';
import { pkCities } from '@/src/data/cities';

export default function DirectoryPage() {
    const MotionDiv = motion.div as any;

    return (
        <div className="directory-page pt-5 pb-5">
            <Container className="py-5">
                <div className="text-center mb-5">
                    <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Site Directory</Badge>
                    <h1 className="display-4 fw-bold">Explore Our <span className="text-primary">Organic World</span></h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                        Browse through our specialized micro-niches and find localized wellness solutions in over 110 cities across Pakistan.
                    </p>
                </div>

                <Row className="g-5">
                    {/* Niches Section */}
                    <Col lg={7}>
                        <h2 className="fw-bold mb-4 d-flex align-items-center">
                            <FaLeaf className="text-primary me-3" /> Specialized Micro-Niches
                        </h2>

                        {categories.map((category, idx) => (
                            <MotionDiv
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="mb-4"
                            >
                                <Card className="border-0 shadow-sm rounded-4 overflow-hidden glass-effect">
                                    <Card.Header className="bg-primary text-white py-3 border-0">
                                        <h5 className="mb-0 fw-bold">{category.name}</h5>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <div className="list-group list-group-flush">
                                            {category.niches.map((niche) => (
                                                <Link
                                                    key={niche.id}
                                                    href={`/${niche.id}`}
                                                    className="list-group-item list-group-item-action p-4 border-0 d-flex justify-content-between align-items-center hover-bg-light transition-all"
                                                >
                                                    <div>
                                                        <div className="fw-bold text-dark">{niche.title}</div>
                                                        <small className="text-muted">Targeting: {(niche as any).problem || (niche as any).benefit}</small>
                                                    </div>
                                                    <FaArrowRight className="text-primary opacity-50" />
                                                </Link>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </MotionDiv>
                        ))}
                    </Col>

                    {/* Cities Section */}
                    <Col lg={5}>
                        <h2 className="fw-bold mb-4 d-flex align-items-center">
                            <FaCity className="text-primary me-3" /> Localized Hubs
                        </h2>

                        <Card className="border-0 shadow-sm rounded-4 sticky-top glass-effect" style={{ top: '100px' }}>
                            <Card.Body className="p-4">
                                <h5 className="fw-bold mb-3 d-flex align-items-center">
                                    <FaMapMarkerAlt className="text-danger me-2" /> All Pakistan Cities
                                </h5>
                                <p className="small text-muted mb-4">
                                    Select a city to see all organic wellness solutions available for delivery in your area.
                                </p>

                                <div className="city-list-scroll pe-2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                    <Row className="g-2">
                                        {pkCities.map((city, idx) => (
                                            <Col xs={6} key={idx}>
                                                <Link
                                                    href={`/goat-milk-skincare/pk/${city.toLowerCase().replace(/ /g, '-')}`}
                                                    className="d-block p-2 rounded-3 bg-light text-decoration-none text-dark small transition-all hover-prime-lite text-center"
                                                >
                                                    {city}
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Card.Body>
                            <Card.Footer className="bg-light border-0 py-3 text-center">
                                <small className="text-muted">Currently serving 110+ cities</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .hover-prime-lite:hover {
                    background-color: var(--bs-primary) !important;
                    color: white !important;
                }
                .city-list-scroll::-webkit-scrollbar {
                    width: 4px;
                }
                .city-list-scroll::-webkit-scrollbar-thumb {
                    background: #eee;
                    border-radius: 10px;
                }
                .city-list-scroll::-webkit-scrollbar-thumb:hover {
                    background: #ccc;
                }
            `}</style>
        </div>
    );
}
