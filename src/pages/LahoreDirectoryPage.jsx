import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaArrowRight, FaShoppingBag, FaStar, FaShieldAlt } from 'react-icons/fa';
import { lahoreAreas, areaTemplate } from '../data/lahoreAreas';
import { allNiches } from '../data/niches';
import SEO from '../components/SEO';

const LahoreDirectoryPage = () => {
    // Pick a few top niches for the areas
    const topNiches = allNiches.slice(0, 6);

    return (
        <div className="lahore-directory pt-5 pb-5 map-bg">
            <SEO
                title="Organic Products Delivery in Lahore Areas | DHA, Gulberg, Johar Town"
                description="Get 100% organic skincare and hair care delivered to your doorstep in all major areas of Lahore. We serve DHA, Gulberg, Bahria Town, Johar Town and more."
            />

            <Container className="py-5">
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/directory" }}>Directory</Breadcrumb.Item>
                    <Breadcrumb.Item active>Lahore Areas</Breadcrumb.Item>
                </Breadcrumb>

                <div className="text-center mb-5">
                    <Badge bg="primary" className="px-3 py-2 rounded-pill mb-3">Lahore Local Specials</Badge>
                    <h1 className="display-4 fw-bold">Hyper-Local <span className="text-primary">Lahore Delivery</span></h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
                        We've mapped our organic solutions to every corner of the City of Gardens. Select your area for specialized delivery insights.
                    </p>
                </div>

                {/* Trust Banner for Lahore */}
                <div className="bg-dark text-white p-4 rounded-4 mb-5 text-center shadow-lg">
                    <Row className="align-items-center">
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
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Card className="border-0 shadow-sm rounded-4 h-100 hover-shadow-lg transition-all overflow-hidden border-top-primary glass-card">
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h4 className="fw-bold mb-1">{area.name}</h4>
                                                <small className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>{area.targetAudience}</small>
                                            </div>
                                            <div className="bg-light p-2 rounded-3 text-primary">
                                                <FaMapMarkerAlt />
                                            </div>
                                        </div>

                                        <p className="small text-muted mb-4">
                                            Near <strong>{area.landmark}</strong>. Experience the best in organic care with 24h delivery.
                                        </p>

                                        <div className="mb-4">
                                            <div className="small fw-bold mb-2">Recommended for {area.name}:</div>
                                            <div className="d-flex flex-wrap gap-2">
                                                {topNiches.slice(0, 3).map(n => (
                                                    <Badge key={n.id} bg="light" text="dark" className="border px-2 py-1 fw-normal">
                                                        {n.product}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="d-grid">
                                            <Button
                                                as={Link}
                                                to={`/goat-milk-skincare/pk/lahore`}
                                                variant="outline-primary"
                                                className="rounded-pill d-flex align-items-center justify-content-center"
                                            >
                                                Explore Local Offers <FaArrowRight className="ms-2" />
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Lahore Context Map / Visual Placeholder */}
                <div className="mt-5 pt-5 text-center">
                    <Card className="border-0 shadow-lg bg-primary text-white p-5 rounded-5 overflow-hidden position-relative">
                        <div className="position-relative z-1">
                            <h2 className="display-5 fw-bold mb-3">Don't see your area?</h2>
                            <p className="lead mb-4">We deliver to EVERY corner of Lahore. From Shahdara to Gajju Matah.</p>
                            <Button as={Link} to="/quote" variant="light" size="lg" className="rounded-pill px-5 fw-bold text-primary">
                                Request Immediate Delivery <FaShoppingBag className="ms-2" />
                            </Button>
                        </div>
                        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10" style={{ background: 'url("/Products/Logo.webp") center/contain no-repeat' }}></div>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default LahoreDirectoryPage;
