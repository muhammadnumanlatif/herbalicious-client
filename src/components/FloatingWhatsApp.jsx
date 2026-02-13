import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaUserMd, FaCut, FaTruck, FaTimes, FaCommentDots } from 'react-icons/fa';

const experts = [
    {
        id: 'skin',
        name: 'Skin Consultant',
        icon: <FaUserMd />,
        color: '#e67e22',
        msg: 'Hi, I need assistance with choosing the right organic soap for my skin type.'
    },
    {
        id: 'hair',
        name: 'Hair Specialist',
        icon: <FaCut />,
        color: '#27ae60',
        msg: 'Hello, I want to discuss my hair concerns and find the best organic oil/shampoo routine.'
    },
    {
        id: 'support',
        name: 'Order Support',
        icon: <FaTruck />,
        color: '#2980b9',
        msg: 'Hi, I have a question regarding my order status or delivery.'
    }
];

const FloatingWhatsApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const waNumber = '923434178994'; // Main Herbalicious WhatsApp

    const openChat = (msg) => {
        const encodedMsg = encodeURIComponent(msg);
        window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="fixed-bottom p-3 p-md-4" style={{ zIndex: 1050, right: 'auto', maxWidth: '300px' }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
                        className="glass-effect rounded-5 shadow-lg border-0 p-4 mb-3 text-start overflow-hidden position-relative"
                        style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(15px)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            border: '1px solid rgba(37, 211, 102, 0.2)'
                        }}
                    >
                        {/* Botanical Background Pattern */}
                        <div className="position-absolute top-0 end-0 p-3 opacity-10 pointer-events-none">
                            <FaLeaf size={80} style={{ transform: 'rotate(45deg)', color: '#25D366' }} />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h6 className="fw-bold mb-0 text-dark">Potion Assistant</h6>
                                <small className="text-success fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>ONLINE NOW</small>
                            </div>
                            <div
                                className="bg-light rounded-circle shadow-sm d-flex align-items-center justify-content-center cursor-pointer"
                                style={{ width: '30px', height: '30px' }}
                                onClick={() => setIsOpen(false)}
                            >
                                <FaTimes className="text-muted" style={{ fontSize: '0.8rem' }} />
                            </div>
                        </div>

                        <p className="small text-muted mb-4 position-relative" style={{ zIndex: 1 }}>How can we help your <strong>natural beauty</strong> flourish today?</p>

                        <div className="d-grid gap-3">
                            {experts.map(expert => (
                                <motion.div
                                    key={expert.id}
                                    whileHover={{ x: 10, backgroundColor: 'rgba(37, 211, 102, 0.05)' }}
                                    onClick={() => openChat(expert.msg)}
                                    className="p-3 rounded-4 border bg-white d-flex align-items-center cursor-pointer shadow-sm transition-all"
                                    style={{ borderLeft: `5px solid ${expert.color} !important` }}
                                >
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                                        style={{ width: '36px', height: '36px', background: `${expert.color}15`, color: expert.color }}
                                    >
                                        {expert.icon}
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="small fw-bold text-dark">{expert.name}</div>
                                        <div className="smaller text-muted text-truncate" style={{ fontSize: '0.65rem' }}>Ask about your routine</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 pt-3 border-top text-center">
                            <Link to="/quote" className="small text-primary fw-bold text-decoration-none hover-underline" onClick={() => setIsOpen(false)}>
                                <FaCommentDots className="me-1" /> Get a Custom Quote →
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Unique Custom Button Design */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="floating-potion-btn rounded-pill shadow-lg d-flex align-items-center bg-white border cursor-pointer p-1"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    minWidth: '180px',
                    height: '56px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(37, 211, 102, 0.3)'
                }}
            >
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                        fontSize: '1.4rem'
                    }}
                >
                    {isOpen ? <FaTimes /> : <FaWhatsapp />}
                </div>
                <div className="px-3">
                    <div className="fw-bold text-dark mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>Build Routine</div>
                    <div className="text-success small fw-bold" style={{ fontSize: '0.7rem' }}>Get Quote</div>
                </div>
            </motion.div>

            <style>{`
                .floating-potion-btn {
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .hover-underline:hover {
                    text-decoration: underline !important;
                }
                .cursor-pointer { cursor: pointer; }
            `}</style>
        </div>
    );
};

export default FloatingWhatsApp;
