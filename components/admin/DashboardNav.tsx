'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Badge, Offcanvas } from 'react-bootstrap';
import { FaChartPie, FaBoxOpen, FaShoppingBag, FaNewspaper, FaQuoteLeft, FaEnvelope, FaExternalLinkAlt, FaBars } from 'react-icons/fa';
import LogoutButton from './LogoutButton';

const NAV_ITEMS = [
    { href: '/dashboard', label: 'Overview', icon: FaChartPie },
    { href: '/dashboard/products', label: 'Manage Products', icon: FaBoxOpen },
    { href: '/dashboard/orders', label: 'Orders', icon: FaShoppingBag },
    { href: '/dashboard/blogs', label: 'Blogs', icon: FaNewspaper },
    { href: '/dashboard/testimonials', label: 'Testimonials', icon: FaQuoteLeft },
    { href: '/dashboard/messages', label: 'Messages', icon: FaEnvelope },
];

function NavLinks({ unreadCount, onNavigate }: { unreadCount: number; onNavigate?: () => void }) {
    const pathname = usePathname();

    return (
        <ul className="nav flex-column">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive = href === '/dashboard' ? pathname === href : pathname?.startsWith(href);
                return (
                    <li className="nav-item mb-1" key={href}>
                        <Link
                            href={href}
                            onClick={onNavigate}
                            className={`nav-link d-flex align-items-center gap-3 rounded-3 px-3 py-2 transition-all ${
                                isActive ? 'bg-success text-white fw-bold' : 'text-white opacity-75 hover-opacity-100'
                            }`}
                        >
                            <Icon size={16} />
                            <span className="flex-grow-1">{label}</span>
                            {label === 'Messages' && unreadCount > 0 && (
                                <Badge bg="danger" pill>{unreadCount}</Badge>
                            )}
                        </Link>
                    </li>
                );
            })}
            <li className="nav-item mt-4">
                <Link href="/" onClick={onNavigate} className="nav-link d-flex align-items-center gap-3 px-3 text-primary">
                    <FaExternalLinkAlt size={14} /> View Site
                </Link>
            </li>
            <li className="nav-item mt-2 px-3">
                <LogoutButton />
            </li>
        </ul>
    );
}

export default function DashboardNav({ unreadCount }: { unreadCount: number }) {
    const [showMobile, setShowMobile] = useState(false);

    return (
        <>
            <div className="d-md-none d-flex align-items-center justify-content-between bg-dark text-white px-3 py-3 sticky-top">
                <span className="fw-bold">Herbalicious Hub</span>
                <button
                    className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
                    onClick={() => setShowMobile(true)}
                    aria-label="Open menu"
                >
                    <FaBars /> Menu
                </button>
            </div>

            <Offcanvas show={showMobile} onHide={() => setShowMobile(false)} className="bg-dark text-white" style={{ maxWidth: 280 }}>
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Herbalicious Hub</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <NavLinks unreadCount={unreadCount} onNavigate={() => setShowMobile(false)} />
                </Offcanvas.Body>
            </Offcanvas>

            <nav className="col-md-2 d-none d-md-block bg-dark sidebar min-vh-100 p-4">
                <div className="sidebar-sticky sticky-top" style={{ top: '1rem' }}>
                    <h5 className="text-white mb-4">Herbalicious Hub</h5>
                    <NavLinks unreadCount={unreadCount} />
                </div>
            </nav>
        </>
    );
}
