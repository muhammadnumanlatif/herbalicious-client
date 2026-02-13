'use client';

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaLeaf, FaArrowLeft, FaHome } from 'react-icons/fa';
import Link from 'next/link';

export default function NotFound() {
    const MotionDiv = motion.div as any;

    return (
        <div className="not-found-page d-flex align-items-center justify-content-center text-center py-5">
            <Container>
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="display-1 fw-bold text-primary mb-3">404</div>
                    <div className="display-5 fw-bold mb-4">This Path has Grown Over...</div>
                    <div className="p-4 bg-light rounded-circle d-inline-block mb-4 text-success">
                        <FaLeaf size={80} />
                    </div>
                    <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: '600px' }}>
                        It seems the botanical trail you were following has been reclaimed by nature.
                        Let's get you back to the main garden.
                    </p>

                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                        <Link href="/" passHref>
                            <Button variant="primary" size="lg" className="rounded-pill px-5 py-3 fw-bold d-flex align-items-center justify-content-center shadow-sm">
                                <FaHome className="me-2" /> Return to Main Garden
                            </Button>
                        </Link>
                        <Button
                            variant="outline-primary"
                            size="lg"
                            className="rounded-pill px-5 py-3 fw-bold d-flex align-items-center justify-content-center"
                            onClick={() => window.history.back()}
                        >
                            <FaArrowLeft className="me-2" /> Go Back to Last Clearing
                        </Button>
                    </div>
                </MotionDiv>
            </Container>

            <style jsx>{`
                .not-found-page {
                    min-height: 70vh;
                }
            `}</style>
        </div>
    );
}
