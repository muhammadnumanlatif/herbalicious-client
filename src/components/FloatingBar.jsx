import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok, FaYoutube, FaLinkedinIn, FaWhatsapp, FaTwitter, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const socials = [
    { icon: <FaFacebookF />, url: "https://web.facebook.com/people/Herbalicious/61551950484433/?sk=about_contact_and_basic_info&_rdc=1&_rdr", color: "#1877f2", external: true },
    { icon: <FaInstagram />, url: "https://www.instagram.com/so_herbalicious/", color: "#e4405f", external: true },
    { icon: <FaPinterestP />, url: "https://www.pinterest.com/herbaliciouss/", color: "#bd081c", external: true },
    { icon: <FaTiktok />, url: "https://www.tiktok.com/@soherbalicious", color: "#000000", external: true },
    { icon: <FaYoutube />, url: "https://www.youtube.com/@Soherbalicious", color: "#ff0000", external: true },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/herbalicious-soap-48a71b300/", color: "#0a66c2", external: true },
    { icon: <FaTwitter />, url: "https://herbalicious-shop.com/#", color: "#1da1f2", external: true }
];

const FloatingBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <div className="floating-bar d-flex flex-column align-items-center">
                {/* Mobile Toggle Button (Hidden on Desktop) */}
                <motion.button
                    className="social-icon d-md-none border-0 mb-2 shadow-lg"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close social menu" : "Open social menu"}
                    style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        zIndex: 1001,
                        cursor: 'pointer'
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <FaTimes /> : <FaPlus />}
                </motion.button>

                {/* Icons List */}
                <div className={`d-flex flex-column gap-2 ${isOpen ? 'd-flex' : 'd-none d-md-flex'}`}>
                    {socials.map((social, index) => {
                        const Component = social.external ? motion.a : motion(Link);
                        const props = social.external
                            ? { href: social.url, target: "_blank", rel: "noopener noreferrer" }
                            : { to: social.url };

                        return (
                            <Component
                                key={index}
                                {...props}
                                className="social-icon"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{
                                    scale: 1.2,
                                    backgroundColor: social.color,
                                    color: '#fff',
                                    x: -5
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                {social.icon}
                            </Component>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default FloatingBar;
