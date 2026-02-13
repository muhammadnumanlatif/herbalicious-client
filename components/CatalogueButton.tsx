'use client';

import React from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

interface CatalogueButtonProps {
    variant?: string;
    size?: 'sm' | 'lg';
    className?: string;
    showIcon?: boolean;
    fullWidth?: boolean;
}

export default function CatalogueButton({
    variant = 'primary',
    size,
    className = '',
    showIcon = true,
    fullWidth = false
}: CatalogueButtonProps) {
    const MotionDiv = motion.div as any;

    return (
        <MotionDiv
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
                className={`rounded-pill fw-bold d-flex align-items-center justify-content-center px-4 py-2 ${className} ${fullWidth ? 'w-100' : ''}`}
            >
                {showIcon && <FaDownload className="me-2" />}
                Download Full Catalogue
            </Button>
        </MotionDiv>
    );
}
