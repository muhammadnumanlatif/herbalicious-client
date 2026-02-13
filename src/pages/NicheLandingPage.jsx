import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCity, FaLeaf, FaShoppingBag, FaStar } from 'react-icons/fa';
import { allNiches } from '../data/niches';
import { pkCities } from '../data/cities';
import products from '../data/products.json';
import SEO from '../components/SEO';
import CatalogueButton from '../components/CatalogueButton';

const nicheToProduct = {
    'goat-milk-skincare': 'goat-milk-soap',
    'hibiscus-hair-care': 'hibiscus-shampoo',
    'amla-reetha-traditionalism': 'amla-reetha-shampoo',
    'active-vitamin-c-organics': 'vitamin-c-serum',
    'frankincense-calendula-healing': 'body-butter',
    'turmeric-honey-brightening': 'turmeric-soap',
    'post-covid-hair-fall': 'hair-serum',
    'sulfate-free-dandruff': 'amla-reetha-shampoo',
    'natural-magnesium-therapy': 'magnesium-spray',
    'non-toxic-lip-care': 'strawberry-lip-balm',
    'handmade-antibacterial-soaps': 'eucalyptus-soap',
    'moringa-immunity-joint-pain': 'pure-moringa-powder',
    'makhana-coconut-boosts': 'makhana-powder',
    'plant-based-respiratory-support': 'pure-moringa-powder',
    'paraben-free-wedding-beauty': 'anniversary-bundle',
    'sustainable-gifts': 'anniversary-bundle',
    'chemical-free-baby-bath': 'goat-milk-soap',
    'citrus-skin-revival': 'lemon-tangerine-soap',
    'papaya-brightening-glow': 'papaya-soap',
    'himalayan-detox-remedies': 'himalayan-salt-soap'
};

const NicheLandingPage = () => {
    const { niche: nicheId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const niche = allNiches.find(n => n.id === nicheId);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    // Show error if niche doesn't exist
    if (!isLoading && !niche) {
        return (
            <Container className="py-5 mt-5 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="display-1 mb-4">🌿</div>
                    <h1 className="fw-bold mb-3">Niche Not Found</h1>
                    <p className="lead text-muted mb-4">The organic wellness niche you're looking for doesn't exist.</p>
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <Button as={Link} to="/" variant="primary" size="lg" className="rounded-pill px-5">
                            Return Home
                        </Button>
                        <Button as={Link} to="/shop" variant="outline-primary" size="lg" className="rounded-pill px-5">
                            Browse Shop
                        </Button>
                    </div>
                </motion.div>
            </Container>
        );
    }

    // Show loading state
    if (isLoading) {
        return (
            <Container className="py-5 mt-5 text-center">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading organic wellness solutions...</p>
            </Container>
        );
    }

    // Additional safety check
    if (!niche) {
        return (
            <Container className="py-5 mt-5 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="display-1 mb-4">🌿</div>
                    <h1 className="fw-bold mb-3">Page Not Found</h1>
                    <p className="lead text-muted mb-4">The page you're looking for doesn't exist.</p>
                    <Button as={Link} to="/" variant="primary" size="lg" className="rounded-pill px-5">
                        Return Home
                    </Button>
                </motion.div>
            </Container>
        );
    }

    const pageTitle = `${niche.title} | Organic ${niche.product} | Herbalicious`;
    const pageDesc = `Discover Herbalicious ${niche.title}. handcrafted ${niche.product} designed to solve ${niche.problem || niche.benefit}. 100% Organic, delivered across Pakistan.`;

    return (
        <div className="niche-page pt-5">
            <SEO
                title={pageTitle}
                description={pageDesc}
            />

            {/* Hero Header */}
            <section className="py-5 bg-dark text-white text-center position-relative overflow-hidden" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center' }}>
                <div className="position-absolute w-100 h-100" style={{ background: 'url("/Products/Hero Section.png") center/cover', opacity: 0.2, top: 0, left: 0 }}></div>
                <Container className="position-relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">Organic Excellence</Badge>
                        <h1 className="display-3 fw-bold mb-3">{niche.title}</h1>
                        <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
                            Mastering the science of {niche.ingredient || 'natural wellness'} to bring you the purest {niche.product} in Pakistan.
                        </p>
                    </motion.div>
                </Container>
            </section>

            <Container className="py-5">
                <Row className="g-5 align-items-center mb-5">
                    <Col lg={5}>
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={products.find(p => p.id === nicheToProduct[nicheId])?.image || `/Products/${niche.product.replace(/\//g, ' ')}.webp`}
                                alt={niche.title}
                                className="img-fluid rounded-4 shadow-lg border"
                                style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                                width="500"
                                height="400"
                                onError={(e) => { e.target.src = '/Products/Herbalicious Shop.webp'; }}
                            />
                        </motion.div>
                    </Col>
                    <Col lg={7}>
                        <div className="ps-lg-4">
                            <h2 className="display-5 fw-bold mb-4">Why our {niche.title}?</h2>
                            <p className="lead text-muted mb-4">
                                Most traditional products use synthetic fillers. Our <strong>{niche.title}</strong> line focuses on
                                high-concentrate <strong>{niche.ingredient || 'natural extracts'}</strong> to target {niche.problem || 'your specific concerns'} effectively.
                            </p>

                            <Row className="g-3 mb-4">
                                {[
                                    { icon: <FaLeaf className="text-success" />, text: "100% Certified Organic" },
                                    { icon: <FaCheckCircle className="text-success" />, text: "No Parabens or Sulfates" },
                                    { icon: <FaShoppingBag className="text-success" />, text: "Direct Farm-to-Bottle" }
                                ].map((item, i) => (
                                    <Col md={6} key={i}>
                                        <div className="d-flex align-items-center bg-light p-3 rounded-3">
                                            {item.icon} <span className="ms-2 fw-bold">{item.text}</span>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            <Button as={Link} to="/quote" variant="primary" size="lg" className="rounded-pill px-5">
                                Order Now via WhatsApp
                            </Button>
                            <CatalogueButton variant="outline-primary" size="lg" className="mt-3" />
                        </div>
                    </Col>
                </Row>

                <hr className="my-5" />

                {/* Related Products Section */}
                <div className="mb-5">
                    <div className="text-center mb-5">
                        <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-2">Complete Your {niche.title} Routine</Badge>
                        <h2 className="fw-bold">Recommended Products</h2>
                        <p className="text-muted">Handpicked organic solutions to complement your wellness journey.</p>
                    </div>
                    <Row className="g-4">
                        {products.slice(0, 3).map((product) => (
                            <Col md={4} key={product.id}>
                                <motion.div whileHover={{ y: -10 }} className="h-100">
                                    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                        <div style={{ height: '220px', overflow: 'hidden' }}>
                                            <Card.Img
                                                variant="top"
                                                src={product.image}
                                                style={{ height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <Card.Body className="p-4 d-flex flex-column">
                                            <div className="d-flex justify-content-between mb-2">
                                                <small className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{product.category}</small>
                                                <div className="text-warning small">
                                                    <FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} />
                                                </div>
                                            </div>
                                            <Card.Title className="h6 fw-bold mb-2">{product.name.split('(')[0]}</Card.Title>
                                            <p className="small text-muted mb-3 flex-grow-1" style={{ fontSize: '0.75rem' }}>{product.shortDescription}</p>
                                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                                <div>
                                                    <span className="fw-bold text-dark h6 mb-0">{product.price}</span>
                                                    {product.oldPrice && (
                                                        <span className="text-muted text-decoration-line-through ms-2 small">{product.oldPrice}</span>
                                                    )}
                                                </div>
                                                <Button
                                                    as={Link}
                                                    to={`/quote?productId=${product.id}`}
                                                    variant="success"
                                                    size="sm"
                                                    className="rounded-pill px-3 d-flex align-items-center"
                                                >
                                                    <FaShoppingBag className="me-1" /> Buy
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </div>

                <hr className="my-5" />

                {/* City-Specific Presence */}
                <div className="text-center mb-5">
                    <h3 className="fw-bold"><FaCity className="me-2 text-primary" /> Region-Specific Solutions</h3>
                    <p className="text-muted">Find out why residents in these cities trust our {niche.title}:</p>
                </div>

                <div className="city-links-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '15px'
                }}>
                    {pkCities.slice(0, 24).map((city, i) => (
                        <motion.div key={i} whileHover={{ y: -5 }}>
                            <Link
                                to={`/${nicheId}/pk/${city.toLowerCase().replace(/ /g, '-')}`}
                                className="d-block p-3 rounded-4 text-decoration-none text-center border bg-white shadow-sm hover-primary transition-all"
                            >
                                {niche.product} in <br /><strong className="text-dark">{city}</strong>
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div whileHover={{ y: -5 }}>
                        <Link
                            to="/directory"
                            className="d-block p-3 rounded-4 text-decoration-none text-center bg-dark text-white shadow transition-all"
                        >
                            Explore All <br /><strong>110+ Cities</strong>
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};

export default NicheLandingPage;
