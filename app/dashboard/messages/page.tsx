import React from 'react';
import Link from 'next/link';
import { Card, Badge } from 'react-bootstrap';
import { listContactMessages } from '@/lib/db';

export const dynamic = 'force-dynamic';

const statusVariant: Record<string, string> = {
    unread: 'warning',
    read: 'secondary',
    replied: 'success',
};

export default async function MessagesPage() {
    const messages = await listContactMessages();

    return (
        <div>
            <h2 className="fw-bold mb-4">Messages</h2>

            <Card className="border-0 shadow-sm rounded-4 p-4">
                {messages.length === 0 ? (
                    <p className="text-muted mb-0">No messages yet.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((m) => (
                                    <tr key={m.id} className={m.status === 'unread' ? 'fw-bold' : ''}>
                                        <td>
                                            <Link href={`/dashboard/messages/${m.id}`}>{m.name}</Link>
                                            <div className="small text-muted fw-normal">{m.email}</div>
                                        </td>
                                        <td className="fw-normal">{m.subject || '(no subject)'}</td>
                                        <td>
                                            <Badge bg={statusVariant[m.status] ?? 'secondary'} className="text-capitalize">
                                                {m.status}
                                            </Badge>
                                        </td>
                                        <td className="fw-normal">{new Date(m.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
