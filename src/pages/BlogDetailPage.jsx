import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaChevronLeft, FaCalendar, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { blogs } from '../data/seoInsights';
import products from '../data/products.json';

const BlogDetailPage = () => {
    const { id } = useParams();
    const blog = blogs.find(b => b.id === id);

    if (!blog) {
        return <Container className="py-5 mt-5"><h2>Article not found</h2></Container>;
    }

    return (
        <div className="blog-detail-page pt-5 mt-5">
            <SEO title={`${blog.title} | Herbalicious Insights`} description={blog.excerpt} />

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Link to="/blogs" className="text-decoration-none text-muted mb-4 d-inline-block">
                            <FaChevronLeft className="me-2" /> Back to Insights
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="display-4 fw-bold mb-4">{blog.title}</h1>

                            <div className="d-flex gap-4 mb-4 text-muted small">
                                <span><FaCalendar className="me-2" /> {blog.date}</span>
                                <span><FaUser className="me-2" /> {blog.author}</span>
                            </div>

                            <div className="mb-5 rounded-4 overflow-hidden shadow-lg">
                                <img src={blog.image} alt={blog.title} className="w-100 img-fluid" />
                            </div>

                            <div
                                className="blog-content lead-text"
                                style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            <hr className="my-5" />

                            <div className="bg-light p-5 rounded-4 text-center">
                                {(() => {
                                    const relatedProd = products.find(p => p.id === blog.relatedProductId);
                                    if (relatedProd) {
                                        return (
                                            <>
                                                <h3 className="fw-bold mb-3">Experience the {relatedProd.name.split('(')[0]}</h3>
                                                <p className="mb-4">Bring the benefits discussed in this article into your daily routine.</p>
                                                <Button as={Link} to={`/product/${relatedProd.id}`} variant="primary" size="lg" className="rounded-pill px-5 shadow-sm">
                                                    View Product Details
                                                </Button>
                                            </>
                                        );
                                    }
                                    return (
                                        <>
                                            <h3>Interested in {blog.title.split(':')[0]}?</h3>
                                            <p className="mb-4">Explore our organic solutions specially crafted for these concerns.</p>
                                            <Button as={Link} to="/shop" variant="primary" size="lg" className="rounded-pill px-5">
                                                Shop the Collection
                                            </Button>
                                        </>
                                    );
                                })()}
                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BlogDetailPage;
