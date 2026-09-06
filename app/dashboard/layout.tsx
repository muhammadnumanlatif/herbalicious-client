import React from 'react';
import Link from 'next/link';
import { Badge } from 'react-bootstrap';
import LogoutButton from '@/components/admin/LogoutButton';
import { listContactMessages } from '@/lib/db';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let unreadCount = 0;
    try {
        unreadCount = (await listContactMessages()).filter((m) => m.status === 'unread').length;
    } catch {
        // Login page renders inside this layout before a session exists; ignore.
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-dark sidebar min-vh-100 p-4">
                    <div className="sidebar-sticky">
                        <h5 className="text-white mb-4">Herbalicious Hub</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link href="/dashboard" className="nav-link text-white opacity-75 hover-opacity-100">
                                    Overview
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link href="/dashboard/products" className="nav-link text-white opacity-75 hover-opacity-100">
                                    Manage Products
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link href="/dashboard/orders" className="nav-link text-white opacity-75 hover-opacity-100">
                                    Orders
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link href="/dashboard/blogs" className="nav-link text-white opacity-75 hover-opacity-100">
                                    Blogs
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link href="/dashboard/testimonials" className="nav-link text-white opacity-75 hover-opacity-100">
                                    Testimonials
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link href="/dashboard/messages" className="nav-link text-white opacity-75 hover-opacity-100 d-flex align-items-center gap-2">
                                    Messages
                                    {unreadCount > 0 && <Badge bg="danger" pill>{unreadCount}</Badge>}
                                </Link>
                            </li>
                            <li className="nav-item mt-4">
                                <Link href="/" className="nav-link text-primary">
                                    View Site
                                </Link>
                            </li>
                            <li className="nav-item mt-2">
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-10 ms-sm-auto px-md-4 py-4 bg-light min-vh-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
