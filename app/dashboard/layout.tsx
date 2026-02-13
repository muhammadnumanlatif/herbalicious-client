import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
                                <Link href="/dashboard/blogs" className="nav-link text-white opacity-75 hover-opacity-100">
                                    SEO Blogs
                                </Link>
                            </li>
                            <li className="nav-item mt-4">
                                <Link href="/" className="nav-link text-primary">
                                    View Site
                                </Link>
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
