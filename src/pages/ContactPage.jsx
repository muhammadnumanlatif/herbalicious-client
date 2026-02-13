import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const ContactPage = () => {
    const waNumbers = [
        { name: 'Customer Support 1', number: '923434178994' },
        { name: 'Customer Support 2', number: '923434055363' },
        { name: 'Business Inquiries', number: '923224757791' }
    ];

    return (
        <div className="contact-page pt-5 mt-5">
            <SEO title="Contact Us | Herbalicious" description="Get in touch with Herbalicious for any inquiries, orders, or wellness advice." />

            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">Get In Touch</h1>
                    <p className="lead text-muted">We're here to help you on your wellness journey.</p>
                </div>

                <Row className="g-4">
                    <Col lg={4}>
                        <Card className="h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                            <div className="icon-wrapper mb-3 text-primary h1">
                                <FaWhatsapp />
                            </div>
                            <h4 className="fw-bold">WhatsApp</h4>
                            <p className="text-muted">Quickest way to order or ask questions.</p>
                            <div className="d-grid gap-2">
                                {waNumbers.map((wa, i) => (
                                    <Button
                                        key={i}
                                        variant="outline-success"
                                        className="rounded-pill"
                                        href={`https://wa.me/${wa.number}`}
                                        target="_blank"
                                    >
                                        Chat with {wa.name}
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                            <div className="icon-wrapper mb-3 text-secondary h1">
                                <FaEnvelope />
                            </div>
                            <h4 className="fw-bold">Email</h4>
                            <p className="text-muted">For detailed inquiries and collaborations.</p>
                            <a href="mailto:support@herbalicious-shop.com" className="h5 text-primary text-decoration-none">support@herbalicious-shop.com</a>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                            <div className="icon-wrapper mb-3 text-info h1">
                                <FaClock />
                            </div>
                            <h4 className="fw-bold">Working Hours</h4>
                            <p className="text-muted">Monday - Saturday</p>
                            <p className="h5 text-dark">10:00 AM - 08:00 PM</p>
                        </Card>
                    </Col>
                </Row>

                <motion.div
                    className="mt-5 p-5 glass-effect rounded-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h2 className="fw-bold mb-4">Our Commitment</h2>
                    <p className="lead px-lg-5">
                        Our products are handcrafted in small batches to ensure the highest quality and potency.
                        We believe in transparency and the power of nature. If you have any feedback or suggestions,
                        please don't hesitate to reach out.
                    </p>
                </motion.div>
            </Container>
        </div>
    );
};

export default ContactPage;
