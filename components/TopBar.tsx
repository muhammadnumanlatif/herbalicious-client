'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
    "✨ Free Shipping on orders over Rs 5,000",
    "🌿 100% Organic & Handcrafted in Lahore",
    "🛍️ Use Code HERBAL10 for 10% Off",
    "⭐ 10,000+ Happy Customers Nationwide"
];

export default function TopBar() {
    const [index, setIndex] = useState(0);
    const MotionDiv = motion.div as any;

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="top-bar bg-primary text-white overflow-hidden" style={{ zIndex: 1100 }}>
            <div className="container py-1 px-3">
                <AnimatePresence mode="wait">
                    <MotionDiv
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.5 }}
                        className="top-bar-content fw-bold text-center small py-1"
                        style={{ height: '24px' }}
                    >
                        {messages[index]}
                    </MotionDiv>
                </AnimatePresence>
            </div>

            <style jsx>{`
                .top-bar {
                    background-color: var(--bs-primary);
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
            `}</style>
        </div>
    );
}
