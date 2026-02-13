'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaTimes, FaGift } from 'react-icons/fa';

export default function ExitIntentModal() {
    const [show, setShow] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setShow(true);
                setHasShown(true);
                localStorage.setItem('exitModalShown', 'true');
            }
        };

        const previouslyShown = localStorage.getItem('exitModalShown');
        if (!previouslyShown) {
            document.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasShown]);

    const handleClose = () => setShow(false);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="exit-intent-modal"
            contentClassName="rounded-5 border-0 shadow-lg overflow-hidden"
        >
            <div className="position-relative">
                <div className="p-5 text-center bg-white">
                    <div className="position-absolute top-0 end-0 p-3">
                        <Button variant="link" className="p-0 text-muted" onClick={handleClose}>
                            <FaTimes />
                        </Button>
                    </div>

                    <div className="mb-4 d-inline-block p-4 bg-primary-subtle rounded-circle text-primary">
                        <FaGift size={50} />
                    </div>

                    <Badge bg="success" className="mb-3 px-3 py-2 rounded-pill">Special Gardener Offer</Badge>
                    <h2 className="fw-bold mb-3">Wait! Your Skin Deserves This.</h2>
                    <p className="text-muted mb-4 px-lg-4">
                        Don't leave without your botanical glow. Use the code below for <strong>15% OFF</strong> on your first organic ritual.
                    </p>

                    <div className="p-4 bg-light rounded-4 border border-dashed mb-4">
                        <div className="small text-muted mb-2 font-monospace tracking-wide">YOUR PERSONAL CODE</div>
                        <div className="display-6 fw-bold text-success">GLOW15</div>
                    </div>

                    <div className="d-grid shadow-sm">
                        <Button variant="primary" size="lg" className="rounded-pill py-3 fw-bold" onClick={handleClose}>
                            Claim My Organic Ritual
                        </Button>
                    </div>
                </div>

                <div className="bg-primary py-3 text-center text-white small fw-bold">
                    <FaLeaf className="me-2" /> Valid for the next 24 hours only.
                </div>
            </div>

            <style jsx global>{`
                .exit-intent-modal .modal-content {
                    animation: modalScaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes modalScaleUp {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </Modal>
    );
}
