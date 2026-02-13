'use client';

import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaPaperPlane, FaClipboardList } from 'react-icons/fa';

export default function QuotePage() {
    return (
        <div className="quote-page pt-5">
            <div className="bg-light py-5 mb-5 border-bottom position-relative overflow-hidden">
                <Container className="position-relative z-1 text-center">
                    <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">
                        Custom Orders
                    </Badge>
                    <h1 className="display-4 fw-bold mb-3">Get a <span className="text-primary">Custom Quote</span></h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                        Need a bulk order for an event, wedding favors, or corporate gifting?
                        Let us craft a personalized herbal package just for you.
                    </p>
                </Container>
            </div>

            <Container className="pb-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="border-0 shadow-lg rounded-5 overflow-hidden">
                            <Card.Body className="p-4 p-md-5">
                                <div className="d-flex align-items-center mb-4 text-primary">
                                    <FaClipboardList className="display-6 me-3" />
                                    <h3 className="fw-bold mb-0">Quote Request Form</h3>
                                </div>

                                <form action="https://formspree.io/f/xeelayew" method="POST">
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <div className="form-floating">
                                                <input type="text" className="form-control rounded-4" id="name" name="name" placeholder="Your Name" required />
                                                <label htmlFor="name">Full Name</label>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-floating">
                                                <input type="email" className="form-control rounded-4" id="email" name="email" placeholder="name@example.com" required />
                                                <label htmlFor="email">Email Address</label>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-floating">
                                                <input type="tel" className="form-control rounded-4" id="phone" name="phone" placeholder="Phone Number" />
                                                <label htmlFor="phone">Phone (Optional)</label>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-floating">
                                                <select className="form-select rounded-4" id="type" name="type" required defaultValue="">
                                                    <option value="" disabled>Select Order Type</option>
                                                    <option value="Wedding Favors">Wedding Favors</option>
                                                    <option value="Corporate Gifting">Corporate Gifting</option>
                                                    <option value="Wholesale/Retail">Wholesale/Retail</option>
                                                    <option value="Custom Bundle">Custom Bundle</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <label htmlFor="type">Order Type</label>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control rounded-4"
                                                    placeholder="Describe your requirements (quantity, specific products, packaging preferences)"
                                                    id="details"
                                                    name="details"
                                                    style={{ height: '150px' }}
                                                    required
                                                ></textarea>
                                                <label htmlFor="details">Order Details & Requirements</label>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <Button type="submit" variant="primary" size="lg" className="w-100 rounded-pill fw-bold py-3 mt-3 d-flex align-items-center justify-content-center">
                                                <FaPaperPlane className="me-2" /> Submit Request
                                            </Button>
                                        </Col>
                                    </Row>
                                    <input type="hidden" name="_subject" value="New Quote Request from Herbalicious Website" />
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
