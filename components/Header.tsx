'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { FaBagShopping } from 'react-icons/fa6';
import { useCart } from '@/context/CartContext';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Ingredients', href: '/ingredients' },
        { name: 'Insights', href: '/blogs' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'} ${pathname === '/' && !scrolled ? 'navbar-dark' : 'navbar-light bg-white shadow-sm'}`}
        >
            <Container>
                <Link href="/" className="navbar-brand d-flex align-items-center">
                    <img
                        src="/Products/logo.webp"
                        alt="Herbalicious Logo"
                        className="transition-all duration-300"
                        style={{ height: scrolled ? '40px' : '55px', width: 'auto' }}
                    />
                </Link>

                <div className="d-flex align-items-center gap-2 d-lg-none">
                    <Link href="/shop" className="btn btn-link text-dark position-relative p-2">
                        <FaBagShopping size={20} />
                        {totalItems > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <Navbar.Toggle aria-controls="main-nav" border-0 />
                </div>

                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto align-items-center gap-2 gap-lg-4 mt-3 mt-lg-0">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-link fw-semibold ${pathname === link.href ? 'text-primary' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/quote"
                            className="btn btn-primary rounded-pill px-4 py-2 text-white fw-bold shadow-sm transition-transform hover-scale"
                        >
                            Get a Quote
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
