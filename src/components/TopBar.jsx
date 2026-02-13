import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
    "✨ Free Shipping on orders over Rs 5,000",
    "🌿 100% Organic & Handcrafted in Lahore",
    "🛍️ Use Code HERBAL10 for 10% Off",
    "⭐ 5000+ Happy Customers Nationwide"
];

const TopBar = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="top-bar">
            <div className="container py-1 px-3">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.5 }}
                        className="top-bar-content fw-bold text-center small"
                    >
                        {messages[index]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TopBar;
