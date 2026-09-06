import React from 'react';
import { notFound } from 'next/navigation';
import { Card, Row, Col } from 'react-bootstrap';
import { getContactMessageById, updateContactMessageStatus } from '@/lib/db';
import MessageStatusSelect from '@/components/admin/MessageStatusSelect';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const messageId = Number(id);
    const message = await getContactMessageById(messageId);
    if (!message) notFound();

    if (message.status === 'unread') {
        await updateContactMessageStatus(messageId, 'read');
        message.status = 'read';
    }

    return (
        <div>
            <h2 className="fw-bold mb-4">Message from {message.name}</h2>

            <Row className="g-4">
                <Col lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-1">{message.subject || '(no subject)'}</h5>
                        <p className="text-muted small mb-4">
                            {message.email} &middot; {new Date(message.createdAt).toLocaleString()}
                        </p>
                        <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{message.message}</p>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
                        <h6 className="fw-bold mb-3">Status</h6>
                        <MessageStatusSelect messageId={message.id} status={message.status} />
                    </Card>
                    <Card className="border-0 shadow-sm rounded-4 p-4 d-flex flex-row gap-2">
                        <a href={`mailto:${message.email}`} className="btn btn-success rounded-pill fw-bold flex-grow-1">
                            Reply via Email
                        </a>
                        <DeleteButton url={`/api/admin/messages/${message.id}`} confirmText="Delete this message?" />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
