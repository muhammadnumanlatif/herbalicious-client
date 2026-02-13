import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    // Don't show breadcrumb on homepage
    if (pathnames.length === 0) return null;

    const formatBreadcrumbText = (text) => {
        return text
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const breadcrumbItems = [
        { name: 'Home', path: '/', icon: <FaHome /> }
    ];

    let currentPath = '';
    pathnames.forEach((segment, index) => {
        currentPath += `/${segment}`;
        breadcrumbItems.push({
            name: formatBreadcrumbText(segment),
            path: currentPath,
            isLast: index === pathnames.length - 1
        });
    });

    return (
        <div className="breadcrumb-wrapper bg-light border-bottom py-2">
            <Container>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 d-flex align-items-center flex-wrap">
                        {breadcrumbItems.map((item, index) => (
                            <motion.li
                                key={item.path}
                                className={`breadcrumb-item d-flex align-items-center ${item.isLast ? 'active' : ''}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {item.isLast ? (
                                    <span className="text-muted small d-flex align-items-center">
                                        {item.icon && <span className="me-1">{item.icon}</span>}
                                        {item.name}
                                    </span>
                                ) : (
                                    <>
                                        <Link
                                            to={item.path}
                                            className="text-decoration-none text-primary small d-flex align-items-center hover-underline"
                                        >
                                            {item.icon && <span className="me-1">{item.icon}</span>}
                                            {item.name}
                                        </Link>
                                        <FaChevronRight className="mx-2 text-muted" size={10} />
                                    </>
                                )}
                            </motion.li>
                        ))}
                    </ol>
                </nav>
            </Container>
            <style>{`
                .breadcrumb-item + .breadcrumb-item::before {
                    content: none;
                }
                .hover-underline:hover {
                    text-decoration: underline !important;
                }
            `}</style>
        </div>
    );
};

export default Breadcrumb;
