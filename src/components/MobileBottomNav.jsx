import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaSearch, FaWhatsapp, FaMagic } from 'react-icons/fa';

const MobileBottomNav = () => {
    return (
        <nav className="mobile-bottom-nav d-md-none">
            <NavLink to="/" className={({ isActive }) => `nav-item-mobile ${isActive ? 'active' : ''}`}>
                <FaHome />
                <span>Home</span>
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-item-mobile ${isActive ? 'active' : ''}`}>
                <FaShoppingBag />
                <span>Shop</span>
            </NavLink>
            <div
                className="nav-item-mobile cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="Open search command palette"
                onClick={() => {
                    const event = new KeyboardEvent('keydown', {
                        key: 'k',
                        metaKey: true,
                        ctrlKey: true,
                        bubbles: true
                    });
                    window.dispatchEvent(event);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const event = new KeyboardEvent('keydown', {
                            key: 'k',
                            metaKey: true,
                            ctrlKey: true,
                            bubbles: true
                        });
                        window.dispatchEvent(event);
                    }
                }}
            >
                <FaSearch aria-hidden="true" />
                <span>Search</span>
            </div>
            <NavLink to="/quote" className={({ isActive }) => `nav-item-mobile ${isActive ? 'active' : ''}`} aria-label="Go to solution finder">
                <FaMagic aria-hidden="true" />
                <span>Solution</span>
            </NavLink>
            <a href="https://wa.me/923434178994" target="_blank" rel="noopener noreferrer" className="nav-item-mobile" aria-label="Contact us on WhatsApp">
                <FaWhatsapp aria-hidden="true" />
                <span>WhatsApp</span>
            </a>
        </nav>
    );
};

export default MobileBottomNav;
