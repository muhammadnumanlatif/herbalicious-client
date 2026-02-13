'use client';

import React from 'react';

interface ShimmerProps {
    width?: string;
    height?: string;
    className?: string;
}

export default function Shimmer({ width = '100%', height = '20px', className = '' }: ShimmerProps) {
    return (
        <div
            className={`shimmer placeholder rounded-3 ${className}`}
            style={{ width, height }}
        />
    );
}
