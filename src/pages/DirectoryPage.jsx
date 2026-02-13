import React from 'react';
import { Container, Row, Col, Card, Badge, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaLeaf, FaArrowRight, FaCity } from 'react-icons/fa';
import { categories, allNiches } from '../data/niches';
import { pkCities } from '../data/cities';
import SEO from '../components/SEO';

const DirectoryPage = () => {
    return (
        <div className="directory-page pt-5 pb-5 map-bg">
            <SEO
                title="Sitemap & Directory | Herbalicious Organic Wellness"
                description="Explore our complete directory of organic skin and hair care solutions across all cities in Pakistan. Find the perfect niche product for your location."
            />

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
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="mb-4"
                            >
                                <Card className="border-0 shadow-sm rounded-4 overflow-hidden glass-card">
                                    <Card.Header className="bg-primary text-white py-3 border-0">
                                        <h5 className="mb-0 fw-bold">{category.name}</h5>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <div className="list-group list-group-flush">
                                            {category.niches.map((niche) => (
                                                <Link
                                                    key={niche.id}
                                                    to={`/${niche.id}`}
                                                    className="list-group-item list-group-item-action p-4 border-0 d-flex justify-content-between align-items-center hover-bg-light"
                                                >
                                                    <div>
                                                        <div className="fw-bold text-dark">{niche.title}</div>
                                                        <small className="text-muted">Targeting: {niche.problem || niche.benefit}</small>
                                                    </div>
                                                    <FaArrowRight className="text-primary opacity-50" />
                                                </Link>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        ))}
                    </Col>

                    {/* Cities Section */}
                    <Col lg={5}>
                        <h2 className="fw-bold mb-4 d-flex align-items-center">
                            <FaCity className="text-primary me-3" /> Localized Hubs
                        </h2>

                        <Card className="border-0 shadow-sm rounded-4 sticky-top glass-card" style={{ top: '100px' }}>
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
                                                    to={`/goat-milk-skincare/pk/${city.toLowerCase().replace(/ /g, '-')}`}
                                                    className="d-block p-2 rounded-3 bg-light text-decoration-none text-dark small hover-primary text-center"
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

                {/* Popular Destinations */}
                <div className="mt-5 pt-5">
                    <h2 className="fw-bold mb-4 text-center">Trending Regional Solutions</h2>
                    <Row className="g-4">
                        {[
                            { name: 'Islamabad', tag: 'Luxury Skincare' },
                            { name: 'Karachi', tag: 'Anti-Pollution' },
                            { name: 'Lahore', tag: 'Hair Rescue' },
                            { name: 'Quetta', tag: 'Winter Shield' }
                        ].map((city, idx) => {
                            if (city.name === 'Lahore') {
                                return (
                                    <Col md={3} key={idx}>
                                        <motion.div whileHover={{ y: -10 }}>
                                            <Card className="border-0 shadow-sm rounded-4 text-center p-4 bg-white border-primary-subtle border">
                                                <div className="h2 text-primary mb-2"><FaMapMarkerAlt /></div>
                                                <h5 className="fw-bold">{city.name}</h5>
                                                <Badge bg="primary" text="white" className="mb-3">Lahore Micro-Targeting</Badge>
                                                <Link
                                                    to="/directory/lahore"
                                                    className="btn btn-primary btn-sm rounded-pill w-100"
                                                >
                                                    View All 15+ Areas
                                                </Link>
                                            </Card>
                                        </motion.div>
                                    </Col>
                                );
                            }
                            return (
                                <Col md={3} key={idx}>
                                    <motion.div whileHover={{ y: -10 }}>
                                        <Card className="border-0 shadow-sm rounded-4 text-center p-4 bg-white">
                                            <div className="h2 text-primary mb-2"><FaMapMarkerAlt /></div>
                                            <h5 className="fw-bold">{city.name}</h5>
                                            <Badge bg="success-subtle" text="success" className="mb-3">{city.tag}</Badge>
                                            <Link
                                                to={`/goat-milk-skincare/pk/${city.name.toLowerCase()}`}
                                                className="btn btn-outline-primary btn-sm rounded-pill w-100"
                                            >
                                                View Specials
                                            </Link>
                                        </Card>
                                    </motion.div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default DirectoryPage;
