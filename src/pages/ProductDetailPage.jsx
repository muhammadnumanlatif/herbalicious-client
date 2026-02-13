import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Badge, Accordion, Card, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaChevronLeft, FaStar, FaShieldAlt, FaTruck, FaLeaf, FaUndo, FaCheckCircle, FaGoogle } from 'react-icons/fa';
import SEO from '../components/SEO';
import products from '../data/products.json';
import CatalogueButton from '../components/CatalogueButton';
import { productSEOInsights } from '../data/seoInsights';

const howToMap = {
    'amla-reetha-shampoo': [
        { name: 'Wet Hair', text: 'Thoroughly wet your hair with lukewarm water.' },
        { name: 'Apply Shampoo', text: 'Take a small amount of Amla Reetha Shampoo and massage it into your scalp.' },
        { name: 'Rinse', text: 'Rinse thoroughly until water runs clear.' }
    ],
    'goat-milk-soap': [
        { name: 'Lather', text: 'Rub the soap between your hands or on a washcloth to create a creamy lather.' },
        { name: 'Cleanse', text: 'Gently massage the lather onto your skin in circular motions.' },
        { name: 'Rinse & Pat Dry', text: 'Rinse with water and pat your skin dry with a soft towel.' }
    ],
    'vitamin-c-serum': [
        { name: 'Cleanse Face', text: 'Start with a freshly cleansed and dry face.' },
        { name: 'Apply Drops', text: 'Apply 2-3 drops of Vitamin C Serum to your face and neck.' },
        { name: 'Seal it', text: 'Gently pat into the skin and follow with a moisturizer.' }
    ],
    'miracle-hair-oil': [
        { name: 'Warm Oil', text: 'Take a small amount of oil and warm it slightly between your palms.' },
        { name: 'Massage Scalp', text: 'Gently massage the oil into your scalp and through the ends of your hair.' },
        { name: 'Wait & Wash', text: 'Leave it on for at least 2 hours or overnight before washing.' }
    ]
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const product = products.find(p => p.id === id);

    if (!product) {
        return <Container className="py-5 mt-5"><h2>Product not found</h2></Container>;
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
    const howToSteps = howToMap[id] || [
        { name: 'Apply', text: 'Apply a small amount of the product to the desired area.' },
        { name: 'Massage', text: 'Gently massage in circular motions for 2-3 minutes.' },
        { name: 'Daily Use', text: 'Incorporate into your daily routine for optimal results.' }
    ];

    const handleOrder = () => {
        setIsRedirecting(true);
        const randomWA = ['923434178994', '923434055363', '923224757791'][Math.floor(Math.random() * 3)];
        const message = `*Order Request*%0A%0A*Product:* ${product.name}%0A*Price:* ${product.price}%0A%0AHi, I'm interested in ordering ${product.name}. Please confirm availability.`;

        // Simulate "Processing" (202 Accepted logic)
        setTimeout(() => {
            window.open(`https://wa.me/${randomWA}?text=${message}`, '_blank');
            setIsRedirecting(false);
        }, 1500);
    };

    const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": [product.image],
        "description": product.description,
        "sku": product.id,
        "mpn": product.id,
        "brand": {
            "@type": "Brand",
            "name": "Herbalicious"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "PKR",
            "price": product.price.replace(/[^0-9]/g, ''),
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
        }
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to use ${product.name}`,
        "step": howToSteps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "itemListElement": [{
                "@type": "HowToDirection",
                "text": step.text
            }]
        }))
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Is Herbalicious ${(product && product.name) || 'this product'} suitable for sensitive skin?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, our ${(product && product.name) || 'product'} is specifically formulated with 100% organic ingredients like ${(product && product.keyActives) ? product.keyActives.join(', ') : 'botanicals'} to be gentle and effective for all skin types, including sensitive skin.`
                }
            },
            {
                "@type": "Question",
                "name": `How long does it take to see results with ${(product && product.name) || 'this product'}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While immediate hydration is common, we recommend consistent use for 30-45 days to see significant improvements in skin and hair health."
                }
            }
        ]
    };

    return (
        <div className="product-detail-page pt-5">
            <AnimatePresence>
                {isRedirecting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white"
                        style={{ zIndex: 9999, transition: 'all 0.3s ease' }}
                    >
                        <div className="text-center p-4">
                            <Spinner animation="grow" variant="success" className="mb-4" />
                            <h3 className="fw-bold">Securing Your Fresh Batch...</h3>
                            <p className="text-muted">Redirecting you to our secure WhatsApp line.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <SEO
                title={`${product.name} | 100% Organic & Handmade | Herbalicious`}
                description={product.shortDescription}
                image={product.image}
                schema={[schemaData, howToSchema, faqSchema]}
                type="product"
            />

            <Container className="py-5">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb small">
                        <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none">Shop</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                    </ol>
                </nav>

                <Row className="gy-5">
                    <Col lg={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="product-image-container sticky-top"
                            style={{ top: '120px' }}
                        >
                            <div className="position-relative p-2 bg-white rounded-5 shadow-lg overflow-hidden glass-effect">
                                <motion.img
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    src={product.image}
                                    alt={product.name}
                                    className="img-fluid rounded-5 img-ratio-1-1"
                                    fetchpriority="high"
                                    loading="eager"
                                    width="600"
                                    height="600"
                                    onError={(e) => { e.target.src = '/Products/Herbalicious Shop.webp'; }}
                                />
                                <Badge bg="success" className="position-absolute top-4 start-4 px-3 py-2 rounded-pill shadow-sm">
                                    <FaCheckCircle className="me-2" /> In Stock
                                </Badge>

                                {/* Dynamic Scarcity/Urgency Overlay */}
                                <motion.div
                                    className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark text-white"
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="d-flex align-items-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="p-1 rounded-circle bg-success me-3 shadow"
                                        />
                                        <div>
                                            <div className="fw-bold small">Fresh Batch Cured (Dec 2025)</div>
                                            <div className="smaller opacity-75">Only 7 units left for delivery in Lahore</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                        <div className="d-flex gap-3 mt-4">
                            <div className="flex-fill p-3 bg-light rounded-4 text-center">
                                <FaLeaf className="text-primary mb-2" size={24} />
                                <div className="small fw-bold">100% Organic</div>
                            </div>
                            <div className="flex-fill p-3 bg-light rounded-4 text-center">
                                <FaShieldAlt className="text-primary mb-2" size={24} />
                                <div className="small fw-bold">Lab Tested</div>
                            </div>
                            <div className="flex-fill p-3 bg-light rounded-4 text-center">
                                <FaTruck className="text-primary mb-2" size={24} />
                                <div className="small fw-bold">Fast Delivery</div>
                            </div>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="ps-lg-4"
                        >
                            <div className="d-flex align-items-center mb-3">
                                <Badge bg="success-subtle" text="success" className="px-3 py-2 rounded-pill me-2">In Stock</Badge>
                                <Badge bg="warning-subtle" text="dark" className="px-3 py-2 rounded-pill">Best Seller</Badge>
                            </div>

                            <h1 className="display-5 fw-bold mb-3">{product.name}</h1>

                            <div className="d-flex align-items-center mb-4">
                                <div className="text-warning me-2">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <span className="text-muted small fw-bold">4.9/5 (120+ Enthusiastic Reviews)</span>
                            </div>

                            <div className="price-container mb-4 p-4 bg-primary-subtle rounded-4 border border-primary-subtle">
                                <div className="small text-uppercase fw-bold text-muted mb-1" style={{ letterSpacing: '1px' }}>Current Price</div>
                                <div className="d-flex align-items-baseline">
                                    <span className="h1 fw-bold text-primary mb-0">{product.price}</span>
                                    {product.oldPrice && (
                                        <span className="h4 text-muted text-decoration-line-through ms-3">{product.oldPrice}</span>
                                    )}
                                </div>
                                <div className="small text-success fw-bold mt-2">
                                    <FaCheckCircle className="me-1" /> Free Delivery on orders above ₨ 5,000
                                </div>
                            </div>

                            <p className="lead text-muted mb-5" style={{ lineHeight: '1.8' }}>
                                {product.description}
                            </p>

                            <div className="mb-4">
                                <h5 className="fw-bold mb-2">Suitable For:</h5>
                                <p className="text-muted small mb-3">{product.suitableFor}</p>

                                <h5 className="fw-bold mb-2">Key Actives:</h5>
                                <div className="d-flex flex-wrap gap-2">
                                    {(product.keyActives || []).map((active, i) => (
                                        <Badge key={i} bg="primary-subtle" text="primary" className="border border-primary-subtle px-3 py-1 rounded-pill small fw-medium">
                                            {active}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="d-grid gap-3 mb-5">
                                <Button
                                    onClick={handleOrder}
                                    variant="success"
                                    size="lg"
                                    className="py-3 rounded-pill shadow-lg fw-bold border-0 d-flex align-items-center justify-content-center transition-all hover-lift"
                                    style={{
                                        backgroundColor: '#25d366',
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    <FaWhatsapp className="me-3" size={28} /> Confirm Order via WhatsApp
                                </Button>
                                <div className="d-flex gap-2">
                                    <Button
                                        as={Link}
                                        to={`/quote?productId=${product.id}&step=2`}
                                        variant="outline-primary"
                                        className="flex-grow-1 py-3 rounded-pill fw-bold"
                                    >
                                        Customized Routine
                                    </Button>
                                    <CatalogueButton variant="outline-secondary" className="px-4 rounded-pill" />
                                </div>
                            </div>

                            <Accordion defaultActiveKey="0" className="custom-accordion">
                                <Accordion.Item eventKey="0" className="border-0 bg-light rounded-4 mb-3 overflow-hidden">
                                    <Accordion.Header className="fw-bold">Specifications & Ingredients</Accordion.Header>
                                    <Accordion.Body>
                                        <Table borderless size="sm" className="mb-0">
                                            <tbody>
                                                {Object.entries(product.attributes || {}).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td className="fw-bold text-muted">{key}</td>
                                                        <td className="text-end">{value}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td className="fw-bold text-muted">Certifications</td>
                                                    <td className="text-end">100% Organic, Cruelty-Free</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                                {product.proTip && (
                                    <Accordion.Item eventKey="expert-tip" className="border-0 rounded-4 mb-3 overflow-hidden" style={{ backgroundColor: '#fff9e6', border: '1px solid #ffecb3' }}>
                                        <Accordion.Header className="fw-bold">💡 Expert Pro-Tip</Accordion.Header>
                                        <Accordion.Body className="small fst-italic">
                                            {product.proTip}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )}
                                <Accordion.Item eventKey="1" className="border-0 bg-light rounded-4 mb-3 overflow-hidden">
                                    <Accordion.Header className="fw-bold">How to Use</Accordion.Header>
                                    <Accordion.Body className="small">
                                        <div className="steps-wrapper">
                                            {howToSteps.map((step, idx) => (
                                                <div key={idx} className="mb-3">
                                                    <div className="fw-bold text-primary mb-1">Step {idx + 1}: {step.name}</div>
                                                    <div className="text-muted">{step.text}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="safety" className="border-0 bg-light rounded-4 mb-3 overflow-hidden">
                                    <Accordion.Header className="fw-bold">🌿 Safety & Clean Standard</Accordion.Header>
                                    <Accordion.Body className="small text-muted">
                                        {product.safetyProfile}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className="border-0 bg-light rounded-4 overflow-hidden">
                                    <Accordion.Header className="fw-bold">Shipping & Returns</Accordion.Header>
                                    <Accordion.Body className="text-muted small">
                                        <div className="mb-2"><FaTruck className="me-2 text-primary" /> <strong>Lahore:</strong> 24 Hours Delivery</div>
                                        <div className="mb-2"><FaTruck className="me-2 text-primary" /> <strong>Rest of Pakistan:</strong> 2-4 Business Days</div>
                                        <div><FaUndo className="me-2 text-primary" /> <strong>Returns:</strong> 7-day no-questions-asked refund policy for damage.</div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <div className="mt-4 p-4 rounded-4 border border-dashed text-center bg-white shadow-sm">
                                <h6 className="fw-bold mb-2">Loving your results?</h6>
                                <p className="small text-muted mb-3">Share your transformation and help others discover natural wellness.</p>
                                <Button
                                    href="https://g.page/r/CVjBuP5ln7nwEAE/review"
                                    target="_blank"
                                    variant="outline-dark"
                                    size="sm"
                                    className="rounded-pill px-4 fw-bold"
                                >
                                    <FaGoogle className="me-2 text-danger" /> Rate us on Google
                                </Button>
                            </div>
                        </motion.div>
                    </Col>
                </Row>

                {/* Science & Tradition Hub (E-E-A-T Section) */}
                {(() => {
                    const insight = productSEOInsights.find(si => si.productId === product.id);
                    if (!insight || !insight.relatedBlogs || insight.relatedBlogs.length === 0) return null;

                    return (
                        <div className="mt-5 pt-5">
                            <div className="d-flex align-items-center mb-4">
                                <Badge bg="primary" className="me-3 px-3 py-2 rounded-pill">Science & Tradition</Badge>
                                <h2 className="fw-bold mb-0">The Knowledge Hub</h2>
                            </div>
                            <p className="text-muted mb-5 lead">Deep dives into the ingredients and regional wisdom behind {product.name}.</p>

                            <Row className="g-4">
                                {insight.relatedBlogs.map((blog) => (
                                    <Col lg={6} key={blog.id}>
                                        <motion.div
                                            whileHover={{ y: -5 }}
                                            className="h-100"
                                        >
                                            <Card as={Link} to={`/blog/${blog.id}`} className="h-100 border-0 shadow-sm rounded-4 overflow-hidden text-decoration-none">
                                                <Row className="g-0 h-100">
                                                    <Col md={4}>
                                                        <div className="h-100 position-relative" style={{ minHeight: '200px' }}>
                                                            <Card.Img
                                                                src={blog.image}
                                                                className="h-100 w-100 object-fit-cover position-absolute"
                                                                onError={(e) => { e.target.src = '/Products/Herbalicious Shop.png'; }}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={8}>
                                                        <Card.Body className="p-4">
                                                            <div className="small text-primary fw-bold mb-2 uppercase" style={{ letterSpacing: '1px' }}>Expert Insight</div>
                                                            <Card.Title className="fw-bold text-dark mb-2">{blog.title}</Card.Title>
                                                            <Card.Text className="small text-muted mb-0">
                                                                {blog.excerpt}
                                                            </Card.Text>
                                                            <div className="mt-3 small fw-bold text-dark">Read More →</div>
                                                        </Card.Body>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    );
                })()}

                {relatedProducts.length > 0 && (
                    <div className="mt-5 pt-5">
                        <hr className="mb-5 opacity-10" />
                        <h2 className="fw-bold mb-4">Complete Your Routine</h2>
                        <Row className="g-4">
                            {relatedProducts.map((rp) => (
                                <Col key={rp.id} lg={3} md={6}>
                                    <Card as={Link} to={`/product/${rp.id}`} className="h-100 border-0 shadow-sm rounded-4 text-decoration-none hover-lift overflow-hidden bg-white">
                                        <div className="p-3">
                                            <Card.Img variant="top" src={rp.image} className="rounded-3 img-ratio-1-1" loading="lazy" onError={(e) => { e.target.src = '/Products/Herbalicious Shop.png'; }} />
                                        </div>
                                        <Card.Body className="pt-0">
                                            <div className="small text-muted mb-1">{rp.category}</div>
                                            <h6 className="fw-bold text-dark mb-2 text-truncate">{rp.name.split('(')[0]}</h6>
                                            <div className="text-primary fw-bold">{rp.price}</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default ProductDetailPage;
