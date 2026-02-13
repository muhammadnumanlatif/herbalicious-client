import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { categories } from '../data/niches';
import { pkCities } from '../data/cities';
import SEO from '../components/SEO';
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaLeaf, FaKeyboard } from 'react-icons/fa';
import Testimonials from '../components/Testimonials';
import SmartNavigator from '../components/SmartNavigator';
import SolutionQuiz from '../components/SolutionQuiz';
import CatalogueButton from '../components/CatalogueButton';
import Magnetic from '../components/Magnetic';

const HomePage = () => {
    const bestSellersRef = useRef(null);
    const nichesRef = useRef(null);
    const collectionsRef = useRef(null);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(true), 2000);
        const hideTimer = setTimeout(() => setShowHint(false), 8000);
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const scrollContainer = (ref, direction) => {
        if (ref.current) {
            const container = ref.current;
            const scrollAmount = container.offsetWidth;
            const maxScroll = container.scrollWidth - container.offsetWidth;

            if (direction === 'right') {
                if (container.scrollLeft >= maxScroll - 5) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                if (container.scrollLeft <= 5) {
                    container.scrollTo({ left: maxScroll, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.innerWidth <= 768) {
                scrollContainer(bestSellersRef, 'right');
                scrollContainer(nichesRef, 'right');
                scrollContainer(collectionsRef, 'right');
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <div className="home-page">
            <SEO
                title="Herbalicious | Natural & Organic Skin & Hair Care in Pakistan"
                description="Discover the purest organic skincare and hair care products. Handcrafted soaps, serums, and wellness solutions delivered across Pakistan."
            />
            {/* Hero Section */}
            <section
                className="hero-section text-white d-flex align-items-center position-relative overflow-hidden img-ratio-hero"
                style={{
                    minHeight: '90vh',
                    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/Products/Hero Section.webp") center/cover no-repeat',
                    paddingTop: '80px'
                }}
            >
                {/* LCP Preload Hint */}
                <img src="/Products/Hero Section.webp" alt="Hero Preload" style={{ display: 'none' }} fetchpriority="high" />
                {/* Floating Natural Essence (Lottie-like Micro-animations) */}
                <div className="position-absolute w-100 h-100 overflow-hidden" style={{ zIndex: 1, pointerEvents: 'none' }}>
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="position-absolute"
                            initial={{
                                opacity: 0.2,
                                x: Math.random() * 100 + '%',
                                y: '100%'
                            }}
                            animate={{
                                y: '-10%',
                                rotate: 360,
                                x: (Math.random() * 100 - 10) + '%'
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 2
                            }}
                            style={{ fontSize: '2rem' }}
                        >
                            <FaLeaf style={{ color: 'rgba(255,255,255,0.1)' }} />
                        </motion.div>
                    ))}
                </div>

                {/* Subtle Parallax Overlay */}
                <motion.div
                    className="position-absolute top-0 left-0 w-100 h-100 opacity-25"
                    style={{
                        backgroundImage: 'radial-gradient(var(--primary-color) 0.5px, transparent 0.5px)',
                        backgroundSize: '30px 30px',
                        zIndex: 0,
                        pointerEvents: 'none',
                        y: yParallax
                    }}
                />
                <Container>
                    <Row className="justify-content-center justify-content-lg-start">
                        <Col lg={8} xl={7} className="text-center text-lg-start">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="p-4 p-md-5 rounded-5 glass-dark shadow-lg"
                            >
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="fw-bold mb-4"
                                >
                                    Nature's Purest Secrets, <br /><span className="text-primary text-gradient">Crafted for You.</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="lead mb-5 px-md-5 px-lg-0"
                                >
                                    Experience the power of organic skincare and wellness. Handmade with tradition, delivered with care.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start"
                                >
                                    <Magnetic>
                                        <Button as={Link} to="/shop" variant="primary" size="lg" className="rounded-pill shadow-sm px-5">Shop Now</Button>
                                    </Magnetic>
                                    <Magnetic>
                                        <CatalogueButton variant="outline-light" size="lg" />
                                    </Magnetic>
                                </motion.div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Natural Collections Section */}
            <section className="section-spacer bg-light">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-5"
                    >
                        <h2 className="fw-bold">How to Choose the Right Natural Collection for Your Routine</h2>
                        <p className="text-muted lead px-3">Targeted care for every skin and hair concern.</p>
                    </motion.div>
                    <div className="position-relative">
                        {/* Mobile Arrows */}
                        <div className="d-flex d-md-none position-absolute w-100 start-0 justify-content-between align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
                            <div className="slider-arrow ms-2" onClick={() => scrollContainer(collectionsRef, 'left')} style={{ pointerEvents: 'auto' }} role="button" aria-label="Previous slide">
                                <FaChevronLeft />
                            </div>
                            <div className="slider-arrow me-2" onClick={() => scrollContainer(collectionsRef, 'right')} style={{ pointerEvents: 'auto' }} role="button" aria-label="Next slide">
                                <FaChevronRight />
                            </div>
                        </div>

                        <div
                            ref={collectionsRef}
                            className="row g-4 mobile-slider-wrapper"
                        >
                            {[
                                {
                                    title: "Organic Soap",
                                    desc: "Indulge in handmade soaps, crafted to cleanse, soothe, and rejuvenate your skin naturally.",
                                    icon: "🧼",
                                    link: "/shop?category=Organic Soap"
                                },
                                {
                                    title: "Shampoo & Hair Oil",
                                    desc: "Nourish your hair from root to tip with our herbal shampoos and potent organic hair oils.",
                                    icon: "🌿",
                                    link: "/shop?category=Hair Care"
                                },
                                {
                                    title: "Hair Serum",
                                    desc: "Achieve a silky, frizz-free finish with our lightweight and protective hair serums.",
                                    icon: "✨",
                                    link: "/shop?category=Hair Care"
                                },
                                {
                                    title: "Body Care",
                                    desc: "Pamper your skin from head to toe with our range of nourishing body care essentials.",
                                    icon: "🧴",
                                    link: "/shop?category=Body Care"
                                },
                                {
                                    title: "Exclusive Bundles",
                                    desc: "Celebrate with us! Get our best-sellers in one exclusive, limited-time package deal.",
                                    icon: "🎁",
                                    link: "/shop?category=Bundles"
                                },
                                {
                                    title: "Wellness",
                                    desc: "Enhance your well-being with our collection of natural wellness and aromatherapy products.",
                                    icon: "🧘‍♀️",
                                    link: "/shop?category=Wellness"
                                }
                            ].map((col, idx) => (
                                <Col key={idx} xs={12} lg={4} md={6} className="mobile-slider-item">
                                    <motion.div
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="h-100"
                                    >
                                        <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center p-4 glass-effect mx-1">
                                            <div className="display-3 mb-3">{col.icon}</div>
                                            <Card.Title className="fw-bold h4 mb-3">{col.title}</Card.Title>
                                            <Card.Body className="p-0">
                                                <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                                    {col.desc}
                                                </p>
                                                <Button
                                                    as={Link}
                                                    to={col.link}
                                                    variant="dark"
                                                    className="rounded-pill px-4"
                                                    role="button"
                                                >
                                                    Explore Collection
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Signature Micro-Niches Section */}
            <section className="section-spacer" style={{ background: '#fff' }}>
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-5"
                    >
                        <Badge bg="primary" text="white" className="px-3 py-2 rounded-pill mb-3">Geo-Smart Discovery</Badge>
                        <h2 className="fw-bold">Our Specialized Solutions for Your Targeted Concerns</h2>
                        <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
                            We master specific organic niches to solve your unique skin and hair challenges.
                        </p>
                    </motion.div>

                    <div className="position-relative">
                        {/* Mobile Arrows */}
                        <div className="d-flex d-md-none position-absolute w-100 start-0 justify-content-between align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
                            <div className="slider-arrow ms-2" onClick={() => scrollContainer(nichesRef, 'left')} style={{ pointerEvents: 'auto' }}>
                                <FaChevronLeft />
                            </div>
                            <div className="slider-arrow me-2" onClick={() => scrollContainer(nichesRef, 'right')} style={{ pointerEvents: 'auto' }}>
                                <FaChevronRight />
                            </div>
                        </div>

                        <div
                            ref={nichesRef}
                            className="row g-4 mobile-slider-wrapper"
                        >
                            {[
                                {
                                    title: "Goat Milk Artistry",
                                    niche: "Goat Milk Soap",
                                    desc: "Rich in Lactic Acid & Vitamin A for gentle exfoliation and deep hydration.",
                                    benefit: "Best for Eczema & Dry Skin",
                                    color: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                                    accent: "#d4a373",
                                    icon: "🥛",
                                    link: "/goat-milk-skincare"
                                },
                                {
                                    title: "Hibiscus Vitality",
                                    niche: "Hibiscus Shampoos",
                                    desc: "Naturally high in AHAs and Mucilage to restore hair volume and scalp health.",
                                    benefit: "Scalp Cooling & Anti-Graying",
                                    color: "linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)",
                                    accent: "#e53e3e",
                                    icon: "🌺",
                                    link: "/hibiscus-hair-care"
                                },
                                {
                                    title: "Magnesium Relief",
                                    niche: "Magnesium Therapy",
                                    desc: "Transdermal magnesium for deep muscle relaxation and improved sleep quality.",
                                    benefit: "Stress & Cramp Relief",
                                    color: "linear-gradient(135deg, #f0f5ff 0%, #d6e4ff 100%)",
                                    accent: "#4c6ef5",
                                    icon: "⚡",
                                    link: "/natural-magnesium-therapy"
                                },
                                {
                                    title: "Radiance Boosters",
                                    niche: "Brightening Soaps",
                                    desc: "Infused with organic Turmeric and Honey for a natural, chemical-free glow.",
                                    benefit: "Even Tone & Dark Spot Care",
                                    color: "linear-gradient(135deg, #fffaf0 0%, #fef3c7 100%)",
                                    accent: "#d97706",
                                    icon: "✨",
                                    link: "/turmeric-honey-brightening"
                                }
                            ].map((niche, i) => (
                                <Col key={i} xs={12} lg={3} md={6} className="mobile-slider-item">
                                    <motion.div
                                        whileHover={{ y: -15 }}
                                        className="h-100"
                                    >
                                        <Link
                                            to={niche.link}
                                            className="text-decoration-none h-100 d-block"
                                        >
                                            <div
                                                className="h-100 p-4 rounded-4 shadow-sm border-0 position-relative overflow-hidden mx-1"
                                                style={{
                                                    background: niche.color,
                                                    border: `1px solid ${niche.accent}22`,
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <div className="display-4 mb-3">{niche.icon}</div>
                                                <h3 className="h5 fw-bold mb-2" style={{ color: niche.accent }}>{niche.title}</h3>
                                                <div className="small fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px', opacity: 0.7, color: '#333' }}>{niche.niche}</div>
                                                <p className="small text-muted mb-4">{niche.desc}</p>
                                                <div className="mt-auto">
                                                    <Badge bg="white" text="dark" className="border px-3 py-2 rounded-pill fw-normal small">
                                                        {niche.benefit}
                                                    </Badge>
                                                </div>
                                                {/* Decorative Gradient Blob */}
                                                <div
                                                    className="position-absolute"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        background: niche.accent,
                                                        filter: 'blur(60px)',
                                                        opacity: 0.1,
                                                        bottom: '-20px',
                                                        right: '-20px'
                                                    }}
                                                />
                                            </div>
                                        </Link>
                                    </motion.div>
                                </Col>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Solution Finder Quiz */}
            <SolutionQuiz />

            {/* Best Sellers Section */}
            <section className="section-spacer">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-end mb-5 gap-3"
                    >
                        <div className="text-center text-md-start">
                            <h2 className="fw-bold">Community Favorites: What's Working for Our Customers</h2>
                            <p className="text-muted mb-0">Discover what our community loves most.</p>
                        </div>
                        <Button as={Link} to="/shop" variant="link" className="text-dark fw-bold text-decoration-none border-bottom border-dark rounded-0 px-0 pb-1">
                            View All Products →
                        </Button>
                    </motion.div>
                    <div className="position-relative">
                        {/* Mobile Arrows */}
                        <div className="d-flex d-md-none position-absolute w-100 start-0 justify-content-between align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
                            <div className="slider-arrow ms-2" onClick={() => scrollContainer(bestSellersRef, 'left')} style={{ pointerEvents: 'auto' }} role="button" aria-label="Previous best sellers">
                                <FaChevronLeft />
                            </div>
                            <div className="slider-arrow me-2" onClick={() => scrollContainer(bestSellersRef, 'right')} style={{ pointerEvents: 'auto' }} role="button" aria-label="Next best sellers">
                                <FaChevronRight />
                            </div>
                        </div>

                        <div
                            ref={bestSellersRef}
                            className="row g-4 mobile-slider-wrapper"
                        >
                            {[
                                { id: 'goat-milk-soap', name: 'Goat Milk Soap', price: '₨ 850', img: '/Products/Herbalicious Goat To Be Clean(Goat Milk Soap) organic soap, Handmade Goat Milk Soap.webp' },
                                { id: 'amla-reetha-shampoo', name: 'Amla Reetha Shampoo', price: '₨ 900', img: '/Products/Amla Reetha Shampoo.webp' },
                                { id: 'aloe-vera-soap', name: 'Aloe Vera Soap', price: '₨ 850', img: '/Products/Aloe vera  Organic Soap.webp' },
                                { id: 'miracle-hair-oil', name: 'Miracle Hair Oil', price: '₨ 900', img: '/Products/Miracle Hair Oil – 11 Herb & Flower Blend.webp' }
                            ].map((prod, i) => (
                                <Col key={i} xs={12} lg={3} md={6} className="mobile-slider-item">
                                    <motion.div whileHover={{ scale: 1.02 }} className="h-100">
                                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100 mx-1">
                                            <div className="img-ratio-1-1 overflow-hidden">
                                                <Card.Img
                                                    variant="top"
                                                    src={prod.img}
                                                    alt={prod.name}
                                                    className="h-100 object-fit-cover"
                                                    loading="lazy"
                                                    width="400"
                                                    height="400"
                                                />
                                            </div>
                                            <Card.Body className="p-4">
                                                <h3 className="h6 fw-bold mb-1">{prod.name}</h3>
                                                <div className="text-primary fw-bold mb-3">{prod.price}</div>
                                                <Button as={Link} to={`/product/${prod.id}`} variant="outline-primary" size="sm" className="w-100 rounded-pill">
                                                    Buy Now
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            {/* Why Choose Us */}
            <section className="section-spacer bg-dark text-white overflow-hidden">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Why Choose Herbalicious?</h2>
                    </div>
                    <Row className="text-center g-4 g-md-5">
                        <Col sm={6} md={4}>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                                <div className="h1 mb-3">🍃</div>
                                <h3 className="h4 fw-bold">100% Organic</h3>
                                <p className="text-muted small">No chemicals, parabens, or sulfates. Just pure nature.</p>
                            </motion.div>
                        </Col>
                        <Col sm={6} md={4}>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                <div className="h1 mb-3">🤝</div>
                                <h3 className="h4 fw-bold">Handcrafted</h3>
                                <p className="text-muted small">Small batches made with care in Lahore, Pakistan.</p>
                            </motion.div>
                        </Col>
                        <Col md={4} className="d-sm-none d-md-block">
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                <div className="h1 mb-3">🚀</div>
                                <h3 className="h4 fw-bold">Fast Delivery</h3>
                                <p className="text-muted small">Quick shipping to all major cities across the country.</p>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Smart Explorer: Categories, Products, Cities */}
            <SmartNavigator />

            {/* CMD+K Hint Overlay */}
            <AnimatePresence>
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                        className="position-fixed bottom-0 start-0 m-4 d-none d-md-flex align-items-center bg-dark text-white p-3 rounded-4 shadow-lg glass-dark"
                        style={{ zIndex: 1050, border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <div className="me-3 p-2 bg-primary rounded-3 shadow-sm">
                            <FaKeyboard size={20} />
                        </div>
                        <div>
                            <div className="fw-bold small">Pro Tip: Search Instantly</div>
                            <div className="smaller opacity-75">Press <span className="badge bg-white text-dark px-2 mx-1">Cmd + K</span> to find anything.</div>
                        </div>
                        <button
                            className="btn btn-link text-white p-1 ms-3 opacity-50 hover-opacity-100"
                            onClick={() => setShowHint(false)}
                            style={{ textDecoration: 'none' }}
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomePage;
