'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const MotionDiv = motion.div as any;

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionDiv
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--bs-primary)', color: 'white' }}
                    whileTap={{ scale: 0.9 }}
                    className="back-to-top-btn"
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        left: '20px',
                        width: '45px',
                        height: '45px',
                        backgroundColor: 'white',
                        color: 'var(--bs-primary)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        zIndex: 1000,
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}
                >
                    <FaChevronUp />
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}
