import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaTruck, FaShieldAlt, FaLeaf, FaClock, FaCheckCircle, FaStar, FaShoppingBag, FaArrowRight, FaUsers } from 'react-icons/fa';
import { allNiches } from '../data/niches';
import { getCityData } from '../data/cities';
import products from '../data/products.json';
import SEO from '../components/SEO';
import CatalogueButton from '../components/CatalogueButton';
import { productSEOInsights } from '../data/seoInsights';
import Testimonials from '../components/Testimonials';

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

const CityLandingPage = () => {
    const { niche: nicheId, country, city: cityName } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    // Validate niche exists
    const niche = allNiches.find(n => n.id === nicheId);

    // Validate city name format and get data
    const formattedCityName = cityName ? cityName.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
    const city = getCityData(formattedCityName);

    const [activeTab, setActiveTab] = useState('best-for');
    const [viewCount] = useState(Math.floor(Math.random() * (120 - 45 + 1)) + 45);
    const [orderCount] = useState(Math.floor(Math.random() * (15 - 3 + 1)) + 3);

    // Simulate loading and validate
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
                    <p className="lead text-muted mb-4">The organic wellness niche you're looking for doesn't exist in our collection.</p>
                    <div className="d-flex gap-3 justify-content-center">
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

    const pageTitle = `${niche.product} in ${city.name} | Handmade Organic Solutions | Herbalicious`;
    const pageDesc = `Looking for the best ${niche.product} in ${city.name}? Herbalicious provides 100% natural, handcrafted remedies for ${niche.problem || niche.benefit}. Fast delivery to all areas of ${city.name}.`;

    const productId = nicheToProduct[nicheId];
    const product = products.find(p => p.id === productId);
    const seoInsight = productSEOInsights.find(si => si.productId === productId);

    const handleWhatsAppOrder = (type = 'standard') => {
        const randomWA = ['923434178994', '923434055363', '923224757791'][Math.floor(Math.random() * 3)];
        let message = '';

        if (type === 'bundle') {
            message = `*Herbalicious Local Bundle Request*%0A%0A*City:* ${city.name}%0A*Niche:* ${niche.title}%0A%0AHi, I'm from ${city.name} and I want to claim the exclusive ${niche.title.split(' ')[0]} Shield Kit bundle offer!`;
        } else {
            message = `*Herbalicious Local Order*%0A%0A*City:* ${city.name}%0A*Product:* ${niche.product}%0A%0AHi, I'm interested in ordering ${niche.product} in ${city.name}. Please guide me.`;
        }

        window.open(`https://wa.me/${randomWA}?text=${message}`, '_blank');
    };

    const schemaData = [
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Herbalicious ${city.name} Hub`,
            "description": `Premium delivery of ${niche.product} in ${city.name}. Handmade organic skincare and hair care.`,
            "url": window.location.href,
            "telephone": "+923434178994",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": city.name,
                "addressCountry": "PK"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": `Is ${niche.product} good for ${city.name} weather?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `Yes, our ${niche.product} is specifically formulated for ${city.weather.toLowerCase()} environments like ${city.name}. ${seoInsight ? seoInsight.insight : ''}`
                    }
                },
                {
                    "@type": "Question",
                    "name": `How long does delivery take in ${city.name}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `We offer express delivery across ${city.name} within 24-48 hours. Cash on delivery is available for all residential areas.`
                    }
                }
            ]
        }
    ];

    return (
        <div className="city-landing-page pt-5">
            <SEO
                title={pageTitle}
                description={pageDesc}
                schema={schemaData}
            />

            {/* Local Context Header */}
            <div className="bg-light py-5 mb-5 border-bottom">
                <Container>
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="breadcrumb small">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to={`/${nicheId}`}>{niche.title}</Link></li>
                            <li className="breadcrumb-item active">{city.name}</li>
                        </ol>
                    </nav>

                    <Row className="align-items-center">
                        <Col lg={8}>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <h1 className="display-4 fw-bold mb-3">
                                    Pure <span className="text-primary">{niche.product}</span> for <br />{city.name} Residents
                                </h1>
                                <p className="lead text-muted mb-4">
                                    Crafted for {city.name}'s {city.weather.toLowerCase()} environment.
                                    Protect your skin and hair against urban pollutants with Herbalicious.
                                </p>
                                <div className="d-flex flex-wrap gap-3">
                                    <div className="d-flex align-items-center small text-muted"><FaTruck className="text-primary me-2" /> 24-48h Delivery in {city.name}</div>
                                    <div className="d-flex align-items-center small text-muted"><FaShieldAlt className="text-primary me-2" /> Cash on Delivery Available</div>
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg={4} className="text-center mt-5 mt-lg-0">
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="p-4 bg-white rounded-4 shadow-sm border text-center">
                                    <div className="h1 text-primary mb-2">🌿</div>
                                    <h5 className="fw-bold">100% Organic</h5>
                                    <p className="small text-muted mb-0">Handmade in small batches for residents of {city.name}.</p>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                {/* AEO Optimized Section: The Problem & Solution */}
                <Row className="mb-5 g-5">
                    <Col lg={6}>
                        <h2 className="fw-bold mb-4">The {city.name} Skin & Hair Challenge</h2>
                        <p>
                            Living in {city.name} means exposure to {city.transit.toLowerCase()}.
                            Whether you're commuting or enjoying the {city.lifestyle.toLowerCase()} lifestyle, your skin faces unique stressors.
                        </p>
                        <p className="mb-4">
                            Our <strong>{niche.title}</strong> line is specifically designed with concentrated <strong>{niche.ingredient || 'organic botanical extracts'}</strong>
                            to help you maintain a healthy glow despite the {city.weather.toLowerCase()} conditions.
                        </p>

                        <Accordion defaultActiveKey="0" className="mb-4">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Why use {niche.title} in {city.name}?</Accordion.Header>
                                <Accordion.Body>
                                    Our formula creates a natural protective layer that locks in moisture, essential for {city.name}'s specific climate.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>How fast is delivery to my area in {city.name}?</Accordion.Header>
                                <Accordion.Body>
                                    We offer trackable shipping via reputable couriers, reaching most areas of {city.name} within 2 business days.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    <Col lg={6}>
                        <div className="position-relative">
                            <img
                                src={products.find(p => p.id === nicheToProduct[nicheId])?.image || `/Products/${niche.product.replace(/\//g, ' ')}.png`}
                                alt={`${niche.product} in ${city.name}`}
                                className="img-fluid rounded-4 shadow-lg w-100"
                                style={{ height: '450px', objectFit: 'cover' }}
                                onError={(e) => { e.target.src = '/Products/Herbalicious Shop.png'; }}
                            />
                            <div className="position-absolute bottom-0 end-0 m-3 p-3 bg-white rounded-3 shadow-sm border">
                                <FaCheckCircle className="text-success me-2" />
                                <span className="small fw-bold">Verified for {city.name} Climate</span>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Regional Trust Elements */}
                <div className="bg-dark text-white p-5 rounded-5 mb-5 text-center">
                    <Row className="g-4">
                        <Col md={3}>
                            <h3 className="fw-bold text-primary mb-1">5k+</h3>
                            <div className="small opacity-75">Happy Users in {city.name}</div>
                        </Col>
                        <Col md={3}>
                            <h3 className="fw-bold text-primary mb-1">100%</h3>
                            <div className="small opacity-75">Chemical Free</div>
                        </Col>
                        <Col md={3}>
                            <h3 className="fw-bold text-primary mb-1">Fast</h3>
                            <div className="small opacity-75">{city.name} Local Shipping</div>
                        </Col>
                        <Col md={3}>
                            <h3 className="fw-bold text-primary mb-1">Handmade</h3>
                            <div className="small opacity-75">Small Batch Potency</div>
                        </Col>
                    </Row>
                </div>

                {/* Community Trends Live Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-5 p-3 rounded-4 bg-primary-subtle border border-primary-subtle d-flex align-items-center justify-content-between flex-wrap gap-3"
                >
                    <div className="d-flex align-items-center">
                        <div className="bg-primary text-white p-2 rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                            <FaUsers />
                        </div>
                        <div>
                            <div className="fw-bold text-primary">Live {city.name} Activity</div>
                            <div className="small text-muted">{viewCount} people are currently browsing {niche.title} in your area.</div>
                        </div>
                    </div>
                    <div className="d-flex gap-4">
                        <div className="text-center">
                            <div className="h5 fw-bold mb-0 text-primary">{viewCount}</div>
                            <div className="small text-muted uppercase" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Active Views</div>
                        </div>
                        <div className="text-center border-start ps-4">
                            <div className="h5 fw-bold mb-0 text-success">{orderCount}</div>
                            <div className="small text-muted uppercase" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Local Orders Today</div>
                        </div>
                    </div>
                </motion.div>

                {/* Recommended Products Section */}
                <div className="mb-5 pt-5 border-top">
                    <div className="text-center mb-5">
                        <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-2">Complete Your Routine</Badge>
                        <h2 className="fw-bold">Recommended for You in {city.name}</h2>
                        <p className="text-muted">Top-rated organic solutions trending in your area.</p>
                    </div>
                    {/* City-Specific Bundle Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-5 p-5 rounded-5 glass-effect border overflow-hidden position-relative"
                        style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}
                    >
                        <Row className="align-items-center">
                            <Col lg={7}>
                                <div className="d-flex gap-2 mb-3">
                                    <Badge bg="primary" className="px-3 py-2 rounded-pill">Exclusive for {city.name}</Badge>
                                    <Badge bg="danger" className="px-3 py-2 rounded-pill d-flex align-items-center"><span className="me-1">🔥</span> #1 Trending Hub</Badge>
                                </div>
                                <h2 className="fw-bold mb-3">The {city.name} "{niche.title.split(' ')[0]}" Shield Kit</h2>
                                <p className="lead text-muted mb-4">
                                    Humidity, pollution, and transit in {city.name} require a multi-step routine.
                                    We've bundled our 3 best-selling {niche.title} products + a FREE travel pouch for local residents.
                                </p>
                                <div className="d-flex gap-3">
                                    <Button onClick={() => handleWhatsAppOrder('bundle')} variant="primary" className="rounded-pill px-4 py-2 fw-bold shadow-sm">
                                        Claim Bundle Offer
                                    </Button>
                                    <CatalogueButton variant="link" className="text-primary text-decoration-none fw-bold" />
                                </div>
                            </Col>
                            <Col lg={5} className="text-center mt-4 mt-lg-0">
                                <div className="display-1" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>🎁</div>
                            </Col>
                        </Row>
                    </motion.div>

                    {/* Localized Testimonials */}
                    <div className="mb-5 py-5">
                        <div className="text-center mb-5">
                            <Badge bg="info-subtle" text="info" className="px-3 py-2 rounded-pill mb-2">Social Proof</Badge>
                            <h2 className="fw-bold">Real Results in {city.name}</h2>
                            <p className="text-muted">Thousands of {city.name} residents trust Herbalicious for their organic routine.</p>
                        </div>
                        <Testimonials locationFilter={city.name} />
                    </div>

                    {/* Automated Local FAQ Section */}
                    <div className="mb-5 py-5 border-top">
                        <Row className="justify-content-center">
                            <Col lg={8}>
                                <div className="text-center mb-5">
                                    <h2 className="fw-bold">Frequently Asked Questions for {city.name}</h2>
                                    <p className="text-muted">Everything you need to know about ordering in your city.</p>
                                </div>
                                <Accordion className="shadow-sm rounded-4 overflow-hidden">
                                    <Accordion.Item eventKey="0" className="border-0 border-bottom">
                                        <Accordion.Header className="py-3 fw-bold">Is {niche.product} effective in {city.name}'s climate?</Accordion.Header>
                                        <Accordion.Body className="p-4">
                                            Absolutely! Our products are handcrafted in small batches to maintain botanical potency.
                                            {seoInsight && <div className="mt-2 text-primary fw-bold">Expert Note: {seoInsight.insight}</div>}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" className="border-0 border-bottom">
                                        <Accordion.Header className="py-3 fw-bold">Can I get same-day delivery in {city.name}?</Accordion.Header>
                                        <Accordion.Body className="p-4">
                                            While we standardly deliver in 24-48 hours, certain areas of {city.name} may qualify for priority shipping.
                                            Contact our WhatsApp support with your specific area for an exact timeline.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2" className="border-0">
                                        <Accordion.Header className="py-3 fw-bold">How do I order {niche.product} in bulk for {city.name} events?</Accordion.Header>
                                        <Accordion.Body className="p-4">
                                            We specialize in organic hampers and bulk orders for weddings and corporate gifts in {city.name}.
                                            Our the "Customize My Wellness Plan" button above or reach out via WhatsApp for wholesale pricing.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        </Row>
                    </div>

                    {/* Final Call to Action */}
                    <Card className="border-0 shadow-lg rounded-5 overflow-hidden mb-5">
                        <Row className="g-0">
                            <Col md={6} className="bg-primary p-5 text-white d-flex align-items-center">
                                <div>
                                    <h1 className="fw-bold mb-3">Order Your {niche.product} Today</h1>
                                    <p className="lead mb-4">Experience the difference of 100% organic care tailored for the {city.name} lifestyle.</p>
                                    <div className="d-flex flex-wrap gap-3">
                                        <Button onClick={() => handleWhatsAppOrder('standard')} variant="light" size="lg" className="rounded-pill px-5 fw-bold text-primary shadow-sm">
                                            Order via WhatsApp
                                        </Button>
                                        <CatalogueButton variant="outline-light" size="lg" />
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} className="p-5 d-flex align-items-center bg-white">
                                <div>
                                    <h4 className="fw-bold mb-3"><FaClock className="text-primary me-2" /> Limited Stock Available</h4>
                                    <p className="text-muted">Because we make our products in small batches to ensure freshness, stock is often limited. Secure yours now!</p>
                                    <Link to="/shop" className="text-primary fw-bold text-decoration-none">Explore other wellness products →</Link>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default CityLandingPage;
