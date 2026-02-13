'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { FaEnvelope, FaPhone, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log('Newsletter subscription for:', email);
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="footer-v2 bg-dark text-white pt-5 pb-4 mt-auto">
            <Container>
                <Row className="gy-5">
                    <Col lg={4} md={12} className="text-center text-lg-start">
                        <div className="bg-white d-inline-block p-3 rounded-4 mb-4 shadow-sm">
                            <img
                                src="/Products/logo.webp"
                                alt="Herbalicious"
                                style={{ height: '60px', width: 'auto' }}
                            />
                        </div>
                        <p className="text-light opacity-75 small mb-4 pe-lg-5" style={{ lineHeight: '1.8' }}>
                            Herbalicious is dedicated to bringing you the purest, most effective natural wellness and beauty solutions.
                            Handcrafted with love and rooted in tradition.
                        </p>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                                <div className="p-2 bg-primary rounded-circle"><FaEnvelope size={14} /></div>
                                <span className="small opacity-75">support@herbalicious-shop.com</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                                <div className="p-2 bg-primary rounded-circle"><FaPhone size={14} /></div>
                                <span className="small opacity-75">+92 343 4178994</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                                <div className="p-2 bg-primary rounded-circle"><FaMapMarkerAlt size={14} /></div>
                                <span className="small opacity-75">Lahore, Pakistan</span>
                            </div>
                        </div>
                    </Col>

                    <Col lg={2} md={4} sm={6}>
                        <h5 className="fw-bold mb-4 dropdown-toggle-no-caret">Company</h5>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            <li><Link href="/about-us" className="text-light text-decoration-none opacity-50 hover-opacity-100 transition-all small">About Us</Link></li>
                            <li><Link href="/ingredients" className="text-light text-decoration-none opacity-50 hover-opacity-100 transition-all small">Ingredients</Link></li>
                            <li><Link href="/blogs" className="text-light text-decoration-none opacity-50 hover-opacity-100 transition-all small">Latest News</Link></li>
                            <li><Link href="/contact" className="text-light text-decoration-none opacity-50 hover-opacity-100 transition-all small">Contact</Link></li>
                        </ul>
                    </Col>

                    <Col lg={2} md={4} sm={6}>
                        <h5 className="fw-bold mb-4">Support</h5>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            <li><Link href="/shipping-policy" className="text-light text-decoration-none opacity-50 hover-opacity-100 transition-all small">Shipping Policy</Link></li>
                            <li><Link href="/privacy-policy" className="text-light text-decoration-none opacity-50 hover-opacity-100 transition-all small">Privacy Policy</Link></li>
                            <li><Link href="/directory" className="text-light text-decoration-none opacity-50 hover-opacity-100 transition-all small">Directory</Link></li>
                            <li><a href="/Products/Herbalicious Catalogue .pdf" target="_blank" className="text-light text-decoration-none opacity-50 hover-opacity-100 transition-all small">PDF Catalogue</a></li>
                        </ul>
                    </Col>

                    <Col lg={4} md={4} sm={12}>
                        <h5 className="fw-bold mb-4">Wellness Insider</h5>
                        {subscribed ? (
                            <Alert variant="success" className="py-2 small bg-primary border-0 text-white rounded-pill px-4">
                                🎉 Welcome to the community!
                            </Alert>
                        ) : (
                            <>
                                <p className="text-light opacity-75 small mb-4">Join 5,000+ others receiving weekly organic wellness tips and exclusive offers.</p>
                                <Form onSubmit={handleSubscribe} className="d-flex gap-2">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-transparent border-secondary text-white rounded-pill px-3 shadow-none focus-primary"
                                    />
                                    <Button type="submit" variant="primary" className="rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '42px', minWidth: '45px' }}>
                                        <FaArrowRight size={14} />
                                    </Button>
                                </Form>
                            </>
                        )}
                    </Col>
                </Row>

                <div className="mt-5 pt-4 border-top border-secondary text-center">
                    <p className="text-light opacity-50 small mb-0">
                        © {new Date().getFullYear()} Herbalicious Shop. Rooted in Nature. <br className="d-md-none" />
                        Proudly Handcrafted in Pakistan.
                    </p>
                    <div className="mt-2">
                        <span className="smaller opacity-40">Maintained by </span>
                        <a href="https://seoustaad.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none fw-bold small opacity-75 hover-opacity-100">seoustaad.com</a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
