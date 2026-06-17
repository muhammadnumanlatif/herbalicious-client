'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaKeyboard, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

import Testimonials from '@/components/Testimonials';
import SolutionQuiz from '@/components/SolutionQuiz';
import SmartNavigator from '@/components/SmartNavigator';

const collectionsData = [
    {
        title: "Botanical Skincare",
        description: "Soothe dry skin and eczema with raw fresh goat milk, honey, oatmeal, and tea tree active botanical bars.",
        badge: "100% Pure Soap & Serums",
        image: "/Products/Herbalicious Goat To Be Clean(Goat Milk Soap) organic soap, Handmade Goat Milk Soap.webp",
        link: "/shop?category=Organic Soap"
    },
    {
        title: "Herbal Hair Care",
        description: "Restore volume, prevent premature graying, and stimulate follicle growth with Amla, Reetha, and Hibiscus.",
        badge: "Sulfate-Free Shampoos",
        image: "/Products/Miracle Hair Oil – 11 Herb & Flower Blend.webp",
        link: "/shop?category=Organic Shampoo"
    },
    {
        title: "Superfood Wellness",
        description: "Boost your daily energy, immunity, and bone density with Phool Makhana powders and transdermal magnesium.",
        badge: "100% Pure Nutrient Blend",
        image: "/Products/Herbalicious Pure Moringa Powder.webp",
        link: "/shop?category=Wellness"
    }
];

const CollectionCard = ({ title, description, badge, image, link }: any) => {
    const [hovered, setHovered] = useState(false);
    const MotionDiv = motion.div as any;
    return (
        <MotionDiv
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-100"
        >
            <Card 
                className="border-0 shadow-sm rounded-5 overflow-hidden h-100 position-relative"
                style={{ 
                    minHeight: '420px',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: hovered ? '0 15px 30px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.05)'
                }}
            >
                <div className="position-absolute w-100 h-100 top-0 start-0 z-0 overflow-hidden">
                    <motion.img 
                        src={image} 
                        alt={title} 
                        className="w-100 h-100 object-fit-cover"
                        animate={{ scale: hovered ? 1.08 : 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ filter: 'brightness(0.65)' }}
                    />
                    <div 
                        className="position-absolute w-100 h-100 top-0 start-0" 
                        style={{ 
                            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)' 
                        }} 
                    />
                </div>
                <Card.Body className="position-relative z-1 d-flex flex-column justify-content-end p-4 p-lg-5 text-white">
                    <Badge bg="success" className="align-self-start mb-3 px-3 py-2 rounded-pill" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                        {badge}
                    </Badge>
                    <h3 className="fw-bold mb-2 h4">{title}</h3>
                    <p className="small mb-4 opacity-90" style={{ lineHeight: '1.6' }}>
                        {description}
                    </p>
                    <Link href={link} className="btn btn-light rounded-pill px-4 py-2 fw-bold text-primary align-self-start shadow-sm d-flex align-items-center gap-2" style={{ transition: 'all 0.3s ease' }}>
                        Explore Collection <FaChevronRight size={10} />
                    </Link>
                </Card.Body>
            </Card>
        </MotionDiv>
    );
};

export default function HomeClient() {
    const [showHint, setShowHint] = useState(false);
    const collectionsRef = useRef(null);
    const nichesRef = useRef(null);
    const bestSellersRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(true), 2000);
        const hideTimer = setTimeout(() => setShowHint(false), 8000);
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
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

    const MotionDiv = motion.div as any;

    return (
        <main className="home-page">
            {/* Hero Section */}
            <section
                className="hero-section text-white d-flex align-items-center position-relative overflow-hidden"
                style={{
                    minHeight: '90vh',
                    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/Products/Hero Section.webp") center/cover no-repeat',
                    paddingTop: '80px'
                }}
            >
                <div className="position-absolute w-100 h-100 overflow-hidden" style={{ zIndex: 1, pointerEvents: 'none' }}>
                    {[...Array(6)].map((_, i) => (
                        <MotionDiv
                            key={i}
                            className="position-absolute"
                            initial={{ opacity: 0.2, x: `${i * 15}%`, y: '100%' }}
                            animate={{ y: '-10%', rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 2 }}
                            style={{ fontSize: '2rem' }}
                        >
                            <FaLeaf style={{ color: 'rgba(255,255,255,0.1)' }} />
                        </MotionDiv>
                    ))}
                </div>

                <Container>
                    <Row className="justify-content-center justify-content-lg-start">
                        <Col lg={8} xl={7} className="text-center text-lg-start">
                            <MotionDiv
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="p-4 p-md-5 rounded-5 glass-dark shadow-lg"
                            >
                                <h1 className="fw-bold mb-4">
                                    Nature's Purest Secrets, <br /><span className="text-primary">Crafted for You.</span>
                                </h1>
                                <p className="lead mb-5">
                                    Experience the power of organic skincare and wellness. Handmade with tradition, delivered with care.
                                </p>
                                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                                    <Link href="/shop" className="btn btn-primary btn-lg rounded-pill shadow-sm px-5">Shop Now</Link>
                                    <Button variant="outline-light" size="lg" className="rounded-pill px-5">View Catalogue</Button>
                                </div>
                            </MotionDiv>
                        </Col>
                    </Row>
                </Container>
            </section>

            <SolutionQuiz />

            {/* Natural Collections Section */}
            <section className="py-5 bg-light position-relative overflow-hidden">
                <Container className="py-4">
                    <div className="text-center mb-5">
                        <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-2">Our Natural Collections</Badge>
                        <h2 className="display-5 fw-bold text-dark mb-3">Targeted care for every skin and hair concern.</h2>
                        <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                            Handcrafted in small batches using active botanical ingredients tailored to your specific wellness needs.
                        </p>
                    </div>

                    <Row className="g-4 justify-content-center">
                        {collectionsData.map((col, index) => (
                            <Col key={index} md={6} lg={4}>
                                <CollectionCard {...col} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <SmartNavigator />

            <Testimonials />
        </main>
    );
}
