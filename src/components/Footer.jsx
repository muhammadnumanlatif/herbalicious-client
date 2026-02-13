import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // In a real app, you would send this to your API
            console.log('Newsletter subscription for:', email);
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="mega-footer glass-dark py-5 mt-5 border-0">
            <Container className="py-4">
                <Row className="gy-4">
                    <Col lg={4} md={12} className="text-center text-lg-start pe-lg-5">
                        <div className="bg-white d-inline-block p-3 rounded-4 mb-4 shadow-sm">
                            <img
                                src="/Products/logo.webp"
                                alt="Herbalicious"
                                style={{ height: '60px', width: 'auto' }}
                            />
                        </div>
                        <p className="text-light opacity-75 small mb-4" style={{ lineHeight: '1.8' }}>
                            Herbalicious is dedicated to bringing you the purest, most effective natural wellness and beauty solutions. Handcrafted with love and rooted in tradition.
                        </p>
                        <div className="text-light small mt-4 d-flex flex-column gap-2 opacity-75">
                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                <span className="me-3">📧</span>
                                <span>support@herbalicious-shop.com</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                <span className="me-3">📱</span>
                                <span>+92 343 4178994</span>
                            </div>
                        </div>
                    </Col>

                    <Col lg={2} md={4} sm={6}>
                        <h4 className="h6 fw-bold mb-4 text-white">Quick Links</h4>
                        <ul className="list-unstyled">
                            <li><Link to="/about-us" className="footer-link text-light opacity-75 d-block mb-2">About Us</Link></li>
                            <li><Link to="/ingredients" className="footer-link text-light opacity-75 d-block mb-2">Ingredients Encyclopedia</Link></li>
                            <li><a href="/Products/Herbalicious Catalogue .pdf" target="_blank" className="footer-link text-light opacity-75 d-block mb-2">Download Catalogue</a></li>
                            <li><Link to="/shipping-policy" className="footer-link text-light opacity-75 d-block mb-2">Shipping Policy</Link></li>
                            <li><Link to="/directory" className="footer-link text-light opacity-75 d-block mb-2">Site Directory</Link></li>
                            <li><Link to="/privacy-policy" className="footer-link text-light opacity-75 d-block mb-2">Privacy Policy</Link></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={4} sm={6}>
                        <h4 className="h6 fw-bold mb-4 text-white">Micro-Niches</h4>
                        <ul className="list-unstyled">
                            <li><Link to="/goat-milk-skincare/pk" className="footer-link text-light opacity-75 d-block mb-2">Goat Milk Soap</Link></li>
                            <li><Link to="/hibiscus-hair-care/pk" className="footer-link text-light opacity-75 d-block mb-2">Hibiscus Shampoos</Link></li>
                            <li><Link to="/natural-magnesium-therapy/pk" className="footer-link text-light opacity-75 d-block mb-2">Magnesium Therapy</Link></li>
                            <li><Link to="/turmeric-honey-brightening/pk" className="footer-link text-light opacity-75 d-block mb-2">Brightening Soaps</Link></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={4} sm={12}>
                        <h4 className="h6 fw-bold mb-4 text-white">Join Our Newsletter</h4>
                        {subscribed ? (
                            <Alert variant="success" className="py-2 small bg-primary border-0 text-white">
                                🎉 Thanks for joining our organic community!
                            </Alert>
                        ) : (
                            <>
                                <p className="text-light opacity-75 small">Get updates on new products and wellness tips.</p>
                                <Form onSubmit={handleSubscribe}>
                                    <Form.Group className="mb-2">
                                        <Form.Control
                                            type="email"
                                            placeholder="Your email address"
                                            size="sm"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-dark border-secondary text-white py-2"
                                        />
                                    </Form.Group>
                                    <Button type="submit" variant="primary" size="sm" className="w-100 py-2 fw-bold">Subscribe</Button>
                                </Form>
                            </>
                        )}
                    </Col>
                </Row>

                <hr className="my-5 opacity-25 border-light" />

                <Row>
                    <Col className="text-center">
                        <p className="text-light opacity-75 small mb-0">
                            © {new Date().getFullYear()} Herbalicious Shop. All rights reserved. <br className="d-md-none" />
                            <span className="text-white fw-bold">Optimized for Global & Local Search.</span>
                            <br />
                            <span className="smaller">Develop by <a href="https://seoustaad.com" target="_blank" rel="noopener noreferrer" className="text-decoration-underline text-white fw-bold">seoustaad.com</a></span>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
