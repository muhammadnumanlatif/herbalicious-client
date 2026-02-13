import React from 'react';

const Shimmer = ({ width = '100%', height = '20px', className = '' }) => {
    return (
        <div
            className={`shimmer rounded-3 ${className}`}
            style={{ width, height }}
        />
    );
};

export default Shimmer;
