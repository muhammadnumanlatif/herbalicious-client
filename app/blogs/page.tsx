'use client';

import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import Link from 'next/link';
import { blogs } from '@/src/data/seoInsights';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Natural Beauty Insights | Herbalicious Organic Blog',
    description: 'Expert advice on organic skincare, hair care routines, and ingredient benefits. Discover local wellness secrets from across Pakistan.',
    openGraph: {
        title: 'Herbalicious Insights - Natural Wellness Blog',
        description: 'Your guide to organic living in Pakistan. Tips, tricks, and traditional remedies for modern life.',
    }
};

export default function BlogsPage() {
    return (
        <div className="blogs-page pt-5">
            {/* Hero Section */}
            <div className="bg-light py-5 mb-5 border-bottom position-relative overflow-hidden">
                <Container className="position-relative z-1">
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <Badge bg="success-subtle" text="success" className="px-3 py-2 rounded-pill mb-3">
                                Wellness Journal
                            </Badge>
                            <h1 className="display-4 fw-bold mb-3">Natural Beauty <span className="text-primary">Insights</span></h1>
                            <p className="lead text-muted mb-4">
                                Discover expert tips, local ingredient spotlights, and traditional remedies
                                tailored for Pakistan's unique climate and lifestyle.
                            </p>
                        </Col>
                    </Row>
                </Container>

                {/* Abstract Background Element */}
                <div
                    className="position-absolute opacity-10"
                    style={{
                        top: '-50%',
                        left: '-10%',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, var(--bs-primary) 0%, transparent 70%)',
                        zIndex: 0
                    }}
                />
            </div>

            <Container className="pb-5">
                <Row className="g-4">
                    {blogs.map((blog, idx) => (
                        <Col key={blog.id} lg={4} md={6}>
                            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift transition-all">
                                <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                                    <Card.Img
                                        variant="top"
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-100 w-100 object-fit-cover transition-transform hover-scale-img"
                                    />
                                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-black-50 to-transparent opacity-0 hover-opacity-100 transition-opacity" />
                                </div>

                                <Card.Body className="p-4 d-flex flex-column">
                                    <div className="d-flex align-items-center gap-3 text-muted small mb-3">
                                        <div className="d-flex align-items-center gap-1">
                                            <FaCalendarAlt className="text-primary" />
                                            <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <FaUser className="text-primary" />
                                            <span>{blog.author}</span>
                                        </div>
                                    </div>

                                    <Card.Title className="h5 fw-bold mb-3 line-clamp-2">
                                        <Link href={`/blog/${blog.id}`} className="text-dark text-decoration-none stretched-link">
                                            {blog.title}
                                        </Link>
                                    </Card.Title>

                                    <Card.Text className="text-muted small line-clamp-3 mb-4 flex-grow-1">
                                        {blog.excerpt}
                                    </Card.Text>

                                    <div className="d-flex align-items-center text-primary fw-bold small mt-auto">
                                        Read Article <FaArrowRight className="ms-2" />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <style jsx global>{`
                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
                }
                .hover-lift:hover .hover-scale-img {
                    transform: scale(1.05);
                }
                .hover-scale-img {
                    transition: transform 0.5s ease;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
