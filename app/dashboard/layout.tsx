import React from 'react';
import DashboardNav from '@/components/admin/DashboardNav';
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
        // D1 binding may briefly be unavailable; don't block the whole dashboard on it.
    }

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                <DashboardNav unreadCount={unreadCount} />
                <main className="col-md-10 ms-sm-auto px-3 px-md-4 py-4 bg-light min-vh-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
