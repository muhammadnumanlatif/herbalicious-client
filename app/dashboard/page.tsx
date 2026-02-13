import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default function DashboardPage() {
    return (
        <div>
            <h2 className="fw-bold mb-4">Dashboard Overview</h2>

            <Row className="g-4">
                <Col md={4}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <h6 className="text-muted mb-2">Total Products</h6>
                        <h2 className="fw-bold mb-0">24</h2>
                        <div className="small text-success mt-2">↑ Syncing from WordPress</div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <h6 className="text-muted mb-2">Active Niches</h6>
                        <h2 className="fw-bold mb-0">17</h2>
                        <div className="small text-muted mt-2">GEO/SEO Enabled</div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <h6 className="text-muted mb-2">City Pages</h6>
                        <h2 className="fw-bold mb-0">120+</h2>
                        <div className="small text-primary mt-2">Auto-generated</div>
                    </Card>
                </Col>
            </Row>

            <Card className="mt-5 border-0 shadow-sm p-4 rounded-4">
                <h5 className="fw-bold mb-4">WordPress Sync Status</h5>
                <div className="alert alert-info border-0 rounded-4">
                    <strong>Headless Backend:</strong> Your Next.js frontend is connected to <code>{process.env.WORDPRESS_API_URL}</code>
                </div>
                <p className="text-muted">
                    All changes made in the WordPress admin panel will be reflected on the Next.js site instantly via ISR/Incremental Static Regeneration.
                </p>
            </Card>
        </div>
    );
}
