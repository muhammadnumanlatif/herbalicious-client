'use client';

import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { ingredients } from '@/src/data/ingredients';
import { FaLeaf, FaMapMarkerAlt, FaHistory } from 'react-icons/fa';

export default function IngredientsPage() {
    const MotionDiv = motion.div as any;

    return (
        <div className="ingredients-page pt-5">
            <Container className="py-5">
                <div className="text-center mb-5 pb-4">
                    <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Ingredient Encyclopedia</Badge>
                    <h1 className="display-4 fw-bold">Pure. Potent. Proven.</h1>
                    <p className="text-muted lead mx-auto" style={{ maxWidth: '750px' }}>
                        We believe in complete transparency. Every herb, oil, and mineral we use is selected for its bioactive potency and traditional subcontinental heritage.
                    </p>
                </div>

                <Row className="g-4">
                    {ingredients.map((item, index) => (
                        <Col lg={4} md={6} key={item.id}>
                            <MotionDiv
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="h-100 border-0 shadow-sm rounded-5 overflow-hidden transition-all hover-prime-border">
                                    <div className="p-4 bg-primary text-white text-center position-relative">
                                        <div className="display-5 mb-2">{item.icon}</div>
                                        <h4 className="fw-bold mb-0">{item.name}</h4>
                                        <div className="position-absolute top-0 end-0 p-3 opacity-10">
                                            <FaLeaf size={40} />
                                        </div>
                                    </div>
                                    <Card.Body className="p-4 bg-white">
                                        <div className="mb-4 pb-3 border-bottom">
                                            <div className="small fw-bold text-primary text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Primary Benefit</div>
                                            <p className="mb-0 text-dark fw-medium">{item.benefits}</p>
                                        </div>
                                        <div className="mb-4">
                                            <div className="small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Herbalicious Usage</div>
                                            <p className="mb-0 small text-muted">{item.usage}</p>
                                        </div>
                                        <div className="p-3 bg-light rounded-4">
                                            <div className="small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Ethical Sourcing</div>
                                            <p className="mb-0 small fst-italic text-muted">{item.origin}</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </MotionDiv>
                        </Col>
                    ))}
                </Row>

                <div className="mt-5 pt-5 text-center">
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="glass-effect p-5 rounded-5 border shadow-sm mx-auto"
                        style={{ maxWidth: '850px', background: 'white' }}
                    >
                        <h2 className="fw-bold mb-4">The Non-Toxic Guarantee</h2>
                        <Row className="justify-content-center g-4">
                            {['Zero Parabens', 'Zero Sulfates', 'Zero Phthalates', 'Zero Synthetic Dyes'].map(item => (
                                <Col xs={6} md={3} key={item}>
                                    <div className="p-3 border rounded-pill bg-light small fw-bold text-dark">{item}</div>
                                </Col>
                            ))}
                        </Row>
                        <p className="text-muted mt-5 mb-0 px-lg-5">
                            Our philosophy is rooted in the belief that nature provides everything we need for healthy skin and hair.
                            We simply bring those ancient secrets to your modern lifestyle.
                        </p>
                    </MotionDiv>
                </div>
            </Container>

            <style jsx>{`
                .hover-prime-border:hover {
                    box-shadow: 0 15px 35px rgba(var(--bs-primary-rgb), 0.1) !important;
                    transform: translateY(-5px);
                }
            `}</style>
        </div>
    );
}
