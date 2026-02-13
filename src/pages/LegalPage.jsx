import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SEO from '../components/SEO';
import legalData from '../data/legal.json';

const LegalPage = () => {
    const { page } = useParams();
    const location = useLocation();

    // Handle routes like /about-us directly
    const path = location.pathname.replace(/^\//, '') || 'privacy-policy';
    const PAGE = legalData[page] || legalData[path] || legalData['privacy-policy'];

    return (
        <div className="legal-page pt-5 mt-5">
            <SEO title={`${PAGE.title} | Herbalicious`} description={PAGE.title} />
            <Container className="py-5">
                <h1 className="mb-5 text-center display-4 fw-bold">{PAGE.title}</h1>
                <div className="glass-effect p-4 p-md-5 rounded-4 shadow-sm legal-content">
                    <div dangerouslySetInnerHTML={{ __html: PAGE.content }} />
                </div>
            </Container>
        </div>
    );
};

export default LegalPage;
