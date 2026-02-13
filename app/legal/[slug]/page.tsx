'use client';

import React from 'react';
import { Container, Badge } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import legalData from '@/src/data/legal.json';

type LegalKey = keyof typeof legalData;

export default function LegalPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Default to privacy-policy if slug is missing or not found
    const PAGE = (legalData as any)[slug] || legalData['privacy-policy'];

    return (
        <div className="legal-page pt-5">
            <Container className="py-5">
                <div className="text-center mb-5">
                    <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Legal & Governance</Badge>
                    <h1 className="display-4 fw-bold">{PAGE.title}</h1>
                </div>

                <div className="mx-auto" style={{ maxWidth: '900px' }}>
                    <div className="base-content bg-white p-4 p-md-5 rounded-5 shadow-sm border legal-styled-content">
                        <div dangerouslySetInnerHTML={{ __html: PAGE.content }} />
                    </div>
                </div>
            </Container>

            <style jsx global>{`
                .legal-styled-content h2 {
                    font-weight: 800;
                    color: var(--bs-dark);
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-size: 1.75rem;
                }
                .legal-styled-content h3 {
                    font-weight: 700;
                    color: var(--bs-primary);
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    font-size: 1.25rem;
                }
                .legal-styled-content p {
                    color: #555;
                    line-height: 1.8;
                    margin-bottom: 1.25rem;
                }
                .legal-styled-content ul, .legal-styled-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.25rem;
                }
                .legal-styled-content li {
                    color: #555;
                    margin-bottom: 0.75rem;
                    line-height: 1.6;
                }
                .legal-styled-content strong {
                    color: var(--bs-dark);
                }
            `}</style>
        </div>
    );
}
