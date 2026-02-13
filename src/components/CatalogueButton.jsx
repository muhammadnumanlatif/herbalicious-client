import React from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaDownload, FaFileAlt } from 'react-icons/fa';

const CatalogueButton = ({ variant = 'primary', size = 'md', className = '', showIcon = true, fullWidth = false }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={fullWidth ? 'w-100' : ''}
        >
            <Button
                as="a"
                href="/Products/Herbalicious Catalogue .pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant={variant}
                size={size}
                className={`rounded-pill fw-bold d-flex align-items-center justify-content-center ${className} ${fullWidth ? 'w-100' : ''}`}
            >
                {showIcon && <FaDownload className="me-2" />}
                Download Full Catalogue
            </Button>
        </motion.div>
    );
};

export default CatalogueButton;
