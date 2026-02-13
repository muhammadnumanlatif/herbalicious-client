import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaMapMarkerAlt, FaCheckCircle, FaShoppingBag, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import reviews from '@/data/reviews.json';
import products from '@/src/data/products.json';

const Testimonials = ({ locationFilter }) => {
    // Filter by location if provided, otherwise random selection
    let filteredReviews = locationFilter
        ? reviews.filter(r => r.location.toLowerCase() === locationFilter.toLowerCase())
        : [];

    // If not enough reviews for a specific location, pad with others
    const remainingCount = 9 - filteredReviews.length;
    let otherReviews = reviews.filter(r => !filteredReviews.includes(r));

    // Stable sort (or just slice) to avoid Hydration Error
    // We remove the random sort here for SSR consistency.
    // If randomization is needed, it must happen in useEffect on the client.

    const displayReviews = [...filteredReviews, ...otherReviews.slice(0, Math.max(0, remainingCount))];
    const sliderRef = useRef(null);

    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const container = sliderRef.current;
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
                scrollSlider('right');
            }
        }, 4000); // Auto-scroll every 4 seconds on mobile

        return () => clearInterval(interval);
    }, []);

    // Framer Motion variant for text
    const MotionDiv = motion.div;

    return (
        <section className="py-5 bg-light overflow-hidden">
            <Container>
                <div className="text-center mb-5">
                    <Badge bg="success-subtle" text="success" className="px-3 py-2 rounded-pill mb-3">Community Love</Badge>
                    <h2 className="display-5 fw-bold">Voices of Our Community</h2>
                    <p className="lead text-muted">Real stories from people who've embraced organic purity.</p>
                </div>

                <div className="position-relative">
                    {/* Mobile Arrows */}
                    <div className="d-flex d-md-none position-absolute w-100 start-0 justify-content-between align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
                        <div className="slider-arrow ms-2" onClick={() => scrollSlider('left')} style={{ pointerEvents: 'auto' }}>
                            <FaChevronLeft />
                        </div>
                        <div className="slider-arrow me-2" onClick={() => scrollSlider('right')} style={{ pointerEvents: 'auto' }}>
                            <FaChevronRight />
                        </div>
                    </div>

                    <div
                        ref={sliderRef}
                        className="row g-4 mobile-slider-wrapper"
                    >
                        {displayReviews.map((review, idx) => {
                            const relatedProduct = products.find(p => p.id === review.productId);

                            return (
                                <Col key={idx} xs={12} lg={4} md={6} className="mobile-slider-item">
                                    <MotionDiv
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (idx % 3) * 0.1 }}
                                        className="h-100"
                                    >
                                        <Card className="h-100 border-0 shadow-sm rounded-4 p-4 testimonial-card position-relative overflow-hidden bg-white mx-1">
                                            {/* Decorative Quote Mark */}
                                            <div className="position-absolute" style={{ top: '20px', right: '20px', opacity: 0.1 }}>
                                                <FaQuoteLeft size={30} className="text-primary" />
                                            </div>

                                            <Card.Body className="p-0 d-flex flex-column">
                                                <div className="mb-3">
                                                    <Badge bg="info-subtle" text="info" className="small rounded-pill py-1 px-2">
                                                        <FaCheckCircle className="me-1" /> Verified Purchase
                                                    </Badge>
                                                </div>

                                                <p className="text-muted mb-4 flex-grow-1" style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                                                    "{review.content}"
                                                </p>

                                                <div className="mt-auto pt-3 border-top">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div
                                                            className="avatar-placeholder rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-3"
                                                            style={{ width: '45px', height: '45px', fontSize: '1.2rem' }}
                                                        >
                                                            {review.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h6 className="fw-bold mb-0">{review.name}</h6>
                                                            <small className="text-muted d-flex align-items-center">
                                                                <FaMapMarkerAlt className="me-1" style={{ fontSize: '0.75rem' }} />
                                                                {review.location}
                                                            </small>
                                                        </div>
                                                    </div>

                                                    {relatedProduct && (
                                                        <Link
                                                            href={`/product/${relatedProduct.id}`}
                                                            className="d-flex align-items-center p-2 rounded-3 bg-light text-decoration-none border transition-all hover-lift"
                                                        >
                                                            <img
                                                                src={relatedProduct.image}
                                                                alt={relatedProduct.name}
                                                                className="rounded-2 me-2"
                                                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                                loading="lazy"
                                                                onError={(e) => { e.currentTarget.src = '/Products/Herbalicious Shop.webp'; }}
                                                            />
                                                            <div className="overflow-hidden">
                                                                <div className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Related Product</div>
                                                                <div className="small text-dark text-truncate fw-bold">{relatedProduct.name.split('(')[0]}</div>
                                                            </div>
                                                        </Link>
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </MotionDiv>
                                </Col>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center mt-5">
                    <Link href="/shop" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
                        Experience the Magic Yourself →
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;
