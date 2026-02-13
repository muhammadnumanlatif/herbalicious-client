'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp, FaMagic, FaMortarPestle } from 'react-icons/fa';

export default function SmartQuoteWidget() {
    const [isHovered, setIsHovered] = useState(false);
    const waNumber = '923434178994';
    const MotionDiv = motion.div as any;

    return (
        <div className="fixed-bottom p-3 p-md-4 smart-quote-widget" style={{ zIndex: 1050, left: 0, right: 'auto', width: 'auto' }}>
            <AnimatePresence>
                {isHovered && (
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.8, x: -20, y: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20, y: 10 }}
                        className="glass-effect rounded-5 shadow-lg border-0 p-4 mb-3 text-start bg-white"
                        style={{
                            border: '1px solid rgba(0,0,0,0.05)',
                            maxWidth: '260px'
                        }}
                    >
                        <div className="d-flex align-items-center mb-2">
                            <div className="p-2 bg-primary-subtle rounded-circle me-2 text-primary">
                                <FaMagic size={14} />
                            </div>
                            <h6 className="fw-bold mb-0 small">Routine Designer</h6>
                        </div>
                        <p className="smaller text-muted mb-3" style={{ fontSize: '0.75rem' }}>
                            Ready to craft your personalized organic routine? Start your journey now.
                        </p>
                        <Link
                            href="/directory"
                            className="btn btn-primary btn-sm rounded-pill w-100 fw-bold shadow-sm py-2"
                            style={{ fontSize: '0.7rem' }}
                        >
                            Build My Potion →
                        </Link>
                    </MotionDiv>
                )}
            </AnimatePresence>

            <div
                className="position-relative d-flex align-items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="smart-quote-trigger d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
                >
                    <Link href="/directory" className="text-decoration-none d-flex align-items-center">
                        <div
                            className="bg-white rounded-pill shadow-lg border d-flex align-items-center p-1 pe-3"
                            style={{ height: '54px', border: '1px solid rgba(37, 211, 102, 0.2)' }}
                        >
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm"
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    background: 'linear-gradient(45deg, #10b981, #059669)',
                                    fontSize: '1.2rem'
                                }}
                            >
                                <FaMortarPestle />
                            </div>
                            <div className="ms-3 d-none d-md-block">
                                <div className="fw-bold text-dark" style={{ fontSize: '0.75rem', lineHeight: '1' }}>Smart Quote</div>
                                <div className="text-success fw-bold pulse-text" style={{ fontSize: '0.65rem' }}>Routine Builder</div>
                            </div>
                        </div>
                    </Link>

                    <a
                        href={`https://wa.me/${waNumber}?text=Hi, I'd like a custom organic wellness consultation.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-n2 bg-success rounded-circle d-flex align-items-center justify-content-center text-white shadow-lg border-2 border-white expert-bubble"
                        style={{ width: '40px', height: '40px', zIndex: 1, textDecoration: 'none', transition: '0.3s' }}
                        title="Chat with Expert"
                    >
                        <FaWhatsapp size={20} />
                    </a>
                </MotionDiv>
            </div>

            <style jsx>{`
                .ms-n2 { margin-left: -12px !important; }
                .pulse-text {
                    animation: pulse-green 2s infinite;
                }
                @keyframes pulse-green {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(0.98); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .expert-bubble:hover {
                    background-color: #128C7E !important;
                    transform: scale(1.1) rotate(10deg);
                }
            `}</style>
        </div>
    );
}
