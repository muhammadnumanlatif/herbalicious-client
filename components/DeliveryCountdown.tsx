'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import { FaTruck, FaClock } from 'react-icons/fa';
import { useParams } from 'next/navigation';

export default function DeliveryCountdown() {
    const params = useParams();
    const city = params.city as string;
    const [timeLeft, setTimeLeft] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);

    // Only show for Lahore/Karachi to drive local urgency
    const isLocalCity = city && (city.toLowerCase() === 'lahore' || city.toLowerCase() === 'karachi');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const cutoff = new Date();
            cutoff.setHours(14, 0, 0, 0); // 2 PM cutoff for same-day/next-day processing

            if (now > cutoff) {
                cutoff.setDate(cutoff.getDate() + 1);
            }

            const diff = cutoff.getTime() - now.getTime();
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (hours < 2) setIsUrgent(true);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, []);

    if (!isLocalCity) return null;

    return (
        <div className={`delivery-countdown p-3 rounded-4 border mb-4 transition-all ${isUrgent ? 'bg-danger-subtle border-danger text-danger' : 'bg-success-subtle border-success text-success'}`}>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className={`icon-glow rounded-circle p-2 me-3 ${isUrgent ? 'bg-danger text-white' : 'bg-success text-white'}`}>
                        <FaTruck size={18} />
                    </div>
                    <div>
                        <div className="fw-bold small">{isUrgent ? 'Final Call for Lahore Delivery!' : 'Order Now for Next Day Delivery'}</div>
                        <div className="smaller opacity-75">Express dispatch for your area</div>
                    </div>
                </div>
                <div className="text-end">
                    <div className="small opacity-75 mb-1 d-flex align-items-center justify-content-end">
                        <FaClock className="me-1" /> Ends in:
                    </div>
                    <div className="fw-bold font-monospace h5 mb-0">{timeLeft}</div>
                </div>
            </div>

            <style jsx>{`
                .icon-glow {
                    box-shadow: 0 0 15px currentColor;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .smaller { font-size: 0.75rem; }
            `}</style>
        </div>
    );
}
