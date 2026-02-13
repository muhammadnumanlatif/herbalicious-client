'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag, FaStar } from 'react-icons/fa';

const locations = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot'];
const items = ['Goat Milk Soap', 'Amla Hair Oil', 'Vitamin C Serum', 'Hibiscus Shampoo', 'Himalayan Salt Soap'];

export default function SocialProofToast() {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({ location: '', item: '' });
    const MotionDiv = motion.div as any;

    useEffect(() => {
        const showToast = () => {
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            setData({ location: randomLocation, item: randomItem });
            setIsVisible(true);

            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.5) showToast();
        }, 30000); // Try to show every 30 seconds

        const firstTimeout = setTimeout(showToast, 10000); // First one after 10s

        return () => {
            clearInterval(interval);
            clearTimeout(firstTimeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionDiv
                    initial={{ opacity: 0, x: -50, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    className="social-proof-toast p-3 bg-white shadow-lg border-0 rounded-4 d-flex align-items-center"
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        left: '20px',
                        zIndex: 1060,
                        maxWidth: '280px',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}
                >
                    <div className="bg-primary-subtle p-2 rounded-circle me-3 text-primary d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                        <FaShoppingBag size={20} />
                    </div>
                    <div>
                        <div className="small text-muted mb-1 d-flex align-items-center">
                            <FaStar className="text-warning me-1" size={10} /> Verified Purchase
                        </div>
                        <div className="fw-bold small text-dark">
                            Someone in {data.location}
                        </div>
                        <div className="smaller text-muted">
                            Just ordered {data.item}
                        </div>
                    </div>

                    <style jsx>{`
                        .social-proof-toast {
                            box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
                        }
                        .smaller { font-size: 0.75rem; }
                    `}</style>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}
