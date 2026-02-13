'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaUserMd, FaCut, FaTruck, FaTimes, FaCommentDots, FaLeaf } from 'react-icons/fa';
import Link from 'next/link';

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

export default function FloatingWhatsApp() {
    const [isOpen, setIsOpen] = useState(false);
    const waNumber = '923434178994';
    const MotionDiv = motion.div as any;

    const openChat = (msg: string) => {
        const encodedMsg = encodeURIComponent(msg);
        window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="fixed-bottom p-3 p-md-4" style={{ zIndex: 1050, left: 'auto', right: 0, maxWidth: '350px' }}>
            <AnimatePresence>
                {isOpen && (
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
                        className="rounded-5 shadow-lg border-0 p-4 mb-3 text-start overflow-hidden position-relative bg-white"
                        style={{
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            border: '1px solid rgba(37, 211, 102, 0.2)'
                        }}
                    >
                        <div className="position-absolute top-0 end-0 p-3 opacity-10 pointer-events-none" style={{ zIndex: 0 }}>
                            <FaLeaf size={80} style={{ transform: 'rotate(45deg)', color: '#25D366' }} />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3 position-relative" style={{ zIndex: 1 }}>
                            <div>
                                <h6 className="fw-bold mb-0 text-dark">Potion Assistant</h6>
                                <small className="text-success fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>ONLINE NOW</small>
                            </div>
                            <div
                                className="bg-light rounded-circle d-flex align-items-center justify-content-center cursor-pointer"
                                style={{ width: '30px', height: '30px' }}
                                onClick={() => setIsOpen(false)}
                            >
                                <FaTimes className="text-muted" style={{ fontSize: '0.8rem' }} />
                            </div>
                        </div>

                        <p className="small text-muted mb-4 position-relative" style={{ zIndex: 1 }}>How can we help your <strong>natural beauty</strong> flourish today?</p>

                        <div className="d-grid gap-3 position-relative" style={{ zIndex: 1 }}>
                            {experts.map(expert => (
                                <MotionDiv
                                    key={expert.id}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(37, 211, 102, 0.05)' }}
                                    onClick={() => openChat(expert.msg)}
                                    className="p-3 rounded-4 border bg-white d-flex align-items-center cursor-pointer shadow-sm transition-all"
                                    style={{ borderLeft: `5px solid ${expert.color}` }}
                                >
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                        style={{ width: '40px', height: '40px', background: `${expert.color}15`, color: expert.color }}
                                    >
                                        {expert.icon}
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="small fw-bold text-dark">{expert.name}</div>
                                        <div className="text-muted text-truncate" style={{ fontSize: '0.65rem' }}>Ask about your routine</div>
                                    </div>
                                </MotionDiv>
                            ))}
                        </div>

                        <div className="mt-4 pt-3 border-top text-center position-relative" style={{ zIndex: 1 }}>
                            <Link href="/directory" className="small text-primary fw-bold text-decoration-none hover-underline" onClick={() => setIsOpen(false)}>
                                <FaCommentDots className="me-1" /> Get a Custom Quote →
                            </Link>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>

            <MotionDiv
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-pill shadow-lg d-flex align-items-center bg-white border cursor-pointer p-1 float-end"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    minWidth: '56px',
                    height: '56px',
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
                <div className="px-3 d-none d-md-block">
                    <div className="fw-bold text-dark mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>Build Routine</div>
                    <div className="text-success small fw-bold" style={{ fontSize: '0.7rem' }}>Get Quote</div>
                </div>
            </MotionDiv>

            <style jsx>{`
                .cursor-pointer { cursor: pointer; }
                .hover-underline:hover { text-decoration: underline !important; }
            `}</style>
        </div>
    );
}
