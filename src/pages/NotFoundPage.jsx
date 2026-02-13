import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { FaHome, FaSeedling } from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <div className="not-found-page py-5 mt-5 text-center">
            <SEO
                title="Page Not Found | Lost in the Garden | Herbalicious"
                description="The page you are looking for doesn't exist. Let's get you back to our organic collections."
            />
            <Container className="py-5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="display-1 text-primary mb-4" style={{ fontSize: '8rem', opacity: 0.2 }}>
                        <FaSeedling />
                    </div>
                    <h1 className="display-4 fw-bold mb-3">Lost in the Garden?</h1>
                    <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                        This plant hasn't grown here yet. The page you are looking for might have been moved, renamed, or perhaps it never existed in our botanical library.
                    </p>
                    <div className="d-flex gap-3 justify-content-center">
                        <Button as={Link} to="/" variant="primary" size="lg" className="rounded-pill px-5 shadow-sm">
                            <FaHome className="me-2" /> Back to Home
                        </Button>
                        <Button as={Link} to="/shop" variant="outline-primary" size="lg" className="rounded-pill px-5">
                            Shop All
                        </Button>
                    </div>
                </motion.div>

                <div className="mt-5 pt-5 opacity-50">
                    <p className="small text-muted">Error Code: 404 (Organic Fallback)</p>
                </div>
            </Container>
        </div>
    );
};

export default NotFoundPage;
