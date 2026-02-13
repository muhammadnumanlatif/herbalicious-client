import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaMagic, FaLeaf, FaTimes, FaSpa, FaMortarPestle } from 'react-icons/fa';

const SmartQuoteWidget = () => {
    const [isHovered, setIsHovered] = useState(false);
    const waNumber = '923434178994';

    return (
        <div className="fixed-bottom p-3 p-md-4 smart-quote-widget" style={{ zIndex: 1050, right: 'auto', width: 'auto' }}>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -20, y: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20, y: 10 }}
                        className="glass-effect rounded-4 shadow-lg border-0 p-3 mb-3 text-start mb-3"
                        style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.5)',
                            maxWidth: '240px'
                        }}
                    >
                        <div className="d-flex align-items-center mb-2">
                            <div className="p-2 bg-primary-subtle rounded-circle me-2 text-primary">
                                <FaMagic size={14} />
                            </div>
                            <h6 className="fw-bold mb-0 small">Routine Designer</h6>
                        </div>
                        <p className="smaller text-muted mb-3" style={{ fontSize: '0.75rem' }}>
                            Ready to craft your personalized organic routine? Start your 6-step journey now.
                        </p>
                        <Link
                            to="/quote"
                            className="btn btn-primary btn-sm rounded-pill w-100 fw-bold shadow-sm"
                            style={{ fontSize: '0.7rem' }}
                        >
                            Build My Potion →
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className="position-relative d-flex align-items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Main Action Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="smart-quote-trigger d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
                >
                    <Link to="/quote" className="text-decoration-none d-flex align-items-center">
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
                            <div className="ms-2">
                                <div className="fw-bold text-dark" style={{ fontSize: '0.75rem', lineHeight: '1' }}>Smart Quote</div>
                                <div className="text-success fw-bold smaller pulse-text" style={{ fontSize: '0.65rem' }}>AI Routine Builder</div>
                            </div>
                        </div>
                    </Link>

                    {/* Side WhatsApp Bubble (Connected) */}
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
                </motion.div>
            </div>

            <style>{`
                .ms-n2 { margin-left: -12px !important; }
                .smaller { font-size: 0.8em; }
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
};

export default SmartQuoteWidget;
