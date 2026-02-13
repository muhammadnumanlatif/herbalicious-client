import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogs } from '@/src/data/seoInsights';
import { FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';

export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = blogs.find((b) => b.id === slug);

    if (!blog) return { title: 'Blog Not Found' };

    return {
        title: `${blog.title} | Herbalicious Blog`,
        description: blog.excerpt,
        openGraph: {
            images: [blog.image],
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = blogs.find((b) => b.id === slug);

    if (!blog) {
        notFound();
    }

    // Process related products logic if needed, for now just linking
    // You could fetch the actual related product data here if desired

    return (
        <div className="blog-detail-page pt-5">
            {/* Hero Image */}
            <div className="position-relative overflow-hidden mb-5 product-hero" style={{ height: '400px' }}>
                <div
                    className="position-absolute w-100 h-100"
                    style={{
                        backgroundImage: `url(${blog.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(4px) brightness(0.7)'
                    }}
                />
                <Container className="h-100 position-relative z-1 d-flex align-items-center justify-content-center text-center">
                    <Row>
                        <Col lg={10} className="mx-auto text-white">
                            <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                                <span className="bg-primary px-3 py-1 rounded-pill small fw-bold">Wellness</span>
                                <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <h1 className="display-4 fw-bold mb-4">{blog.title}</h1>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <div className="bg-white rounded-circle p-1" style={{ width: '32px', height: '32px' }}>
                                    <FaUser className="text-dark w-100 h-100 p-1" />
                                </div>
                                <span className="lead">{blog.author}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="pb-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        {/* Article Content */}
                        <article className="blog-content mb-5 bg-white p-4 p-md-5 rounded-4 shadow-sm border">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </article>

                        {/* Author/Tag Section */}
                        <div className="d-flex align-items-center justify-content-between p-4 bg-light rounded-4 mb-5">
                            <div className="d-flex align-items-center gap-3">
                                <FaTag className="text-muted" />
                                <span className="fw-bold text-dark">Related Product:</span>
                                <Link href={`/product/${blog.relatedProductId}`} className="text-primary text-decoration-none hover-underline fw-bold">
                                    {blog.relatedProductId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                </Link>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="text-center">
                            <Link href="/blogs" className="btn btn-outline-dark rounded-pill px-5 py-2 fw-bold hover-lift">
                                ← Back to Journal
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style jsx global>{`
                .blog-content h2 {
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 800;
                    color: var(--bs-dark);
                }
                .blog-content h3 {
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    font-weight: 700;
                    color: var(--bs-primary);
                }
                .blog-content p {
                    margin-bottom: 1.25rem;
                    line-height: 1.8;
                    color: #555;
                    font-size: 1.1rem;
                }
                .hover-underline:hover {
                    text-decoration: underline !important;
                }
                .hover-lift:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
                }
            `}</style>
        </div>
    );
}
