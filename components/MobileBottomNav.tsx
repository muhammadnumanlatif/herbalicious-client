'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaShoppingBag, FaSearch, FaWhatsapp, FaMagic } from 'react-icons/fa';

export default function MobileBottomNav() {
    const pathname = usePathname();

    const openSearch = () => {
        const event = new KeyboardEvent('keydown', {
            key: 'k',
            metaKey: true,
            ctrlKey: true,
            bubbles: true
        });
        window.dispatchEvent(event);
    };

    return (
        <nav className="mobile-bottom-nav d-md-none border-top bg-white/80 backdrop-blur-md">
            <Link href="/" className={`nav-item-mobile ${pathname === '/' ? 'active' : ''}`}>
                <FaHome />
                <span>Home</span>
            </Link>
            <Link href="/shop" className={`nav-item-mobile ${pathname === '/shop' ? 'active' : ''}`}>
                <FaShoppingBag />
                <span>Shop</span>
            </Link>
            <div
                className="nav-item-mobile cursor-pointer"
                role="button"
                onClick={openSearch}
            >
                <FaSearch aria-hidden="true" />
                <span>Search</span>
            </div>
            <Link href="/directory" className={`nav-item-mobile ${pathname.startsWith('/directory') ? 'active' : ''}`}>
                <FaMagic aria-hidden="true" />
                <span>Explore</span>
            </Link>
            <a href="https://wa.me/923434178994" target="_blank" rel="noopener noreferrer" className="nav-item-mobile">
                <FaWhatsapp aria-hidden="true" />
                <span>WhatsApp</span>
            </a>

            <style jsx>{`
                .mobile-bottom-nav {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 65px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    z-index: 1000;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                }
                .nav-item-mobile {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-decoration: none;
                    color: #666;
                    font-size: 0.65rem;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    flex: 1;
                }
                .nav-item-mobile :global(svg) {
                    font-size: 1.25rem;
                    margin-bottom: 4px;
                }
                .nav-item-mobile.active {
                    color: var(--bs-primary);
                }
                .cursor-pointer { cursor: pointer; }
            `}</style>
        </nav>
    );
}
