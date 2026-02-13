'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaKeyboard, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

import Testimonials from '@/components/Testimonials';
import SolutionQuiz from '@/components/SolutionQuiz';
import SmartNavigator from '@/components/SmartNavigator';

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

            {/* Natural Collections Placeholder */}
            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Our Natural Collections</h2>
                        <p className="text-muted">Targeted care for every skin and hair concern.</p>
                    </div>
                </Container>
            </section>

            <SmartNavigator />

            <Testimonials />
        </main>
    );
}
