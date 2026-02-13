'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok, FaYoutube, FaLinkedinIn, FaPlus, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const socials = [
    { icon: <FaFacebookF />, url: "https://web.facebook.com/people/Herbalicious/61551950484433/", color: "#1877f2", external: true },
    { icon: <FaInstagram />, url: "https://www.instagram.com/so_herbalicious/", color: "#e4405f", external: true },
    { icon: <FaPinterestP />, url: "https://www.pinterest.com/herbaliciouss/", color: "#bd081c", external: true },
    { icon: <FaTiktok />, url: "https://www.tiktok.com/@soherbalicious", color: "#000000", external: true },
    { icon: <FaYoutube />, url: "https://www.youtube.com/@Soherbalicious", color: "#ff0000", external: true },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/herbalicious-soap-48a71b300/", color: "#0a66c2", external: true }
];

export default function FloatingBar() {
    const [isOpen, setIsOpen] = useState(false);
    const MotionDiv = motion.div as any;
    const MotionButton = motion.button as any;

    return (
        <div className="floating-social-bar d-flex flex-column align-items-center" style={{ position: 'fixed', left: '20px', bottom: '100px', zIndex: 1000 }}>
            <MotionButton
                className="social-trigger d-md-none border-0 mb-2 shadow-lg rounded-circle d-flex align-items-center justify-content-center"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    backgroundColor: 'var(--bs-primary)',
                    color: 'white',
                    width: '45px',
                    height: '45px',
                    cursor: 'pointer'
                }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <FaTimes /> : <FaPlus />}
            </MotionButton>

            <div className={`social-icons-wrapper d-flex flex-column gap-2 ${isOpen ? 'show' : 'd-none d-md-flex'}`}>
                {socials.map((social, index) => (
                    <MotionDiv
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{
                            scale: 1.2,
                            backgroundColor: social.color,
                            color: '#fff',
                            x: 5
                        }}
                    >
                        <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link d-flex align-items-center justify-content-center rounded-circle bg-white shadow-sm border"
                            style={{ width: '40px', height: '40px', color: '#666', transition: 'all 0.3s ease' }}
                        >
                            {social.icon}
                        </a>
                    </MotionDiv>
                ))}
            </div>

            <style jsx>{`
                .social-icons-wrapper.show {
                    display: flex !important;
                }
                .social-link {
                    text-decoration: none;
                }
            `}</style>
        </div>
    );
}
