'use client';

import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope, FaClock, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const waNumbers = [
        { name: 'Primary Assistance', number: '923434178994' },
        { name: 'Secondary Support', number: '923434055363' },
        { name: 'B2B/Bulk Queries', number: '923224757791' }
    ];

    const MotionDiv = motion.div as any;

    return (
        <div className="contact-page pt-5">
            <Container className="py-5">
                <div className="text-center mb-5 pb-4">
                    <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Reach Out to Us</Badge>
                    <h1 className="display-4 fw-bold">Always Here to <span className="text-primary">Help</span></h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                        Whether you have a product query, need wellness advice, or want to track an order, our team is just a message away.
                    </p>
                </div>

                <Row className="g-4 mb-5">
                    <Col lg={4}>
                        <MotionDiv whileHover={{ y: -5 }} className="h-100">
                            <Card className="h-100 border-0 shadow-sm rounded-5 p-4 text-center bg-white">
                                <div className="icon-wrapper mb-4 text-success display-4">
                                    <FaWhatsapp />
                                </div>
                                <h4 className="fw-bold mb-3">WhatsApp Hub</h4>
                                <p className="text-muted small mb-4">The fastest way to get a response. We're active almost 24/7 for our customers.</p>
                                <div className="d-grid gap-2">
                                    {waNumbers.map((wa, i) => (
                                        <Button
                                            key={i}
                                            variant="outline-success"
                                            className="rounded-pill py-2 fw-bold"
                                            href={`https://wa.me/${wa.number}`}
                                            target="_blank"
                                        >
                                            Chat for {wa.name}
                                        </Button>
                                    ))}
                                </div>
                            </Card>
                        </MotionDiv>
                    </Col>

                    <Col lg={4}>
                        <MotionDiv whileHover={{ y: -5 }} className="h-100">
                            <Card className="h-100 border-0 shadow-sm rounded-5 p-4 text-center bg-white">
                                <div className="icon-wrapper mb-4 text-primary display-4">
                                    <FaEnvelope />
                                </div>
                                <h4 className="fw-bold mb-3">Email Support</h4>
                                <p className="text-muted small mb-4">For detailed partnership proposals, feedback, or corporate inquiries.</p>
                                <div className="p-3 bg-light rounded-4 border">
                                    <a href="mailto:support@herbalicious-shop.com" className="h6 text-primary text-decoration-none fw-bold mb-0">
                                        support@herbalicious-shop.com
                                    </a>
                                </div>
                            </Card>
                        </MotionDiv>
                    </Col>

                    <Col lg={4}>
                        <MotionDiv whileHover={{ y: -5 }} className="h-100">
                            <Card className="h-100 border-0 shadow-sm rounded-5 p-4 text-center bg-white">
                                <div className="icon-wrapper mb-4 text-warning display-4">
                                    <FaClock />
                                </div>
                                <h4 className="fw-bold mb-3">Availability</h4>
                                <p className="text-muted small mb-4">Our official handling hours for order processing and general admin.</p>
                                <div className="py-3 px-4 bg-primary-subtle rounded-pill d-inline-block">
                                    <span className="fw-bold text-primary">Mon - Sat: 10AM - 8PM</span>
                                </div>
                                <p className="mt-3 small text-muted">Online support varies on weekends.</p>
                            </Card>
                        </MotionDiv>
                    </Col>
                </Row>

                <Row className="justify-content-center mb-5">
                    <Col lg={8}>
                        <Card className="border-0 shadow-lg rounded-5 overflow-hidden">
                            <Card.Body className="p-5">
                                <h3 className="fw-bold text-center mb-4">Send us a Message</h3>
                                <form action="https://formspree.io/f/xeelayew" method="POST">
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <div className="form-floating">
                                                <input type="text" className="form-control rounded-4" id="name" name="name" placeholder="Your Name" required />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-floating">
                                                <input type="email" className="form-control rounded-4" id="email" name="email" placeholder="Your Email" required />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="form-floating">
                                                <input type="text" className="form-control rounded-4" id="subject" name="subject" placeholder="Subject" required />
                                                <label htmlFor="subject">Subject</label>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="form-floating">
                                                <textarea className="form-control rounded-4" placeholder="Leave a message here" id="message" name="message" style={{ height: '150px' }} required></textarea>
                                                <label htmlFor="message">Your Message</label>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <Button type="submit" size="lg" className="w-100 rounded-pill fw-bold py-3 mt-2">
                                                Send Message
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <MotionDiv
                    className="p-5 bg-dark text-white rounded-5 text-center shadow-lg position-relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ background: 'url("/Products/Hero Section.webp") center/cover' }}></div>
                    <div className="position-relative z-1">
                        <FaHeart className="text-primary mb-4 display-4" />
                        <h2 className="fw-bold mb-4">Our Crafting Commitment</h2>
                        <p className="lead px-lg-5 mx-auto mb-0" style={{ maxWidth: '900px' }}>
                            Every Herbalicious potion is handcrafted in small batches in Lahore to ensure the highest bioactive potency.
                            We are committed to the purity of our ingredients and the satisfaction of our growing community.
                            Your feedback helps our natural garden grow.
                        </p>
                    </div>
                </MotionDiv>
            </Container>
        </div>
    );
}
