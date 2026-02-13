'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function BotanicalCursor() {
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('resize', checkMobile);
        };
    }, [cursorX, cursorY]);

    if (isMobile) return null;

    const MotionDiv = motion.div as any;

    return (
        <>
            <MotionDiv
                className="custom-cursor"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isHovering ? 2.5 : 1,
                }}
            />
            <style jsx global>{`
                .custom-cursor {
                    position: fixed;
                    left: -12px;
                    top: -12px;
                    width: 24px;
                    height: 24px;
                    background: rgba(86, 109, 21, 0.4);
                    border: 2px solid rgba(86, 109, 21, 0.2);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 999999;
                    backdrop-filter: blur(2px);
                    transition: scale 0.3s ease, background 0.3s ease;
                }
                a:hover ~ .custom-cursor,
                button:hover ~ .custom-cursor {
                    background: rgba(86, 109, 21, 0.1);
                }
                * {
                    cursor: none !important;
                }
                @media (max-width: 767px) {
                    * {
                        cursor: auto !important;
                    }
                }
            `}</style>
        </>
    );
}
