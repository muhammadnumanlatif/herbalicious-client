import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { blogs } from '../data/seoInsights';

const BlogsPage = () => {
    return (
        <div className="blogs-page pt-5 mt-5">
            <SEO
                title="Natural Wellness Insights | Herbalicious Blog"
                description="Read our latest articles on organic skincare, hair care traditions, and natural wellness tips."
            />

            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">Wellness Insights</h1>
                    <p className="lead text-muted">Deep dives into nature's most powerful ingredients.</p>
                </div>

                <Row className="g-4">
                    {blogs.map((blog, idx) => (
                        <Col key={blog.id} lg={6}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100 blog-card">
                                    <Row className="g-0 h-100">
                                        <Col md={5}>
                                            <Card.Img
                                                src={blog.image}
                                                className="h-100 object-fit-cover rounded-start-4"
                                                style={{ minHeight: '250px' }}
                                            />
                                        </Col>
                                        <Col md={7}>
                                            <Card.Body className="p-4 d-flex flex-column h-100">
                                                <div className="mb-2">
                                                    <small className="text-primary fw-bold text-uppercase">{blog.date}</small>
                                                </div>
                                                <Card.Title className="h4 fw-bold mb-3">{blog.title}</Card.Title>
                                                <Card.Text className="text-muted flex-grow-1">
                                                    {blog.excerpt}
                                                </Card.Text>
                                                <Button as={Link} to={`/blog/${blog.id}`} variant="outline-primary" className="rounded-pill mt-3 align-self-start">
                                                    Read More
                                                </Button>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default BlogsPage;
