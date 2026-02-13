import React from 'react';
import { Metadata } from 'next';
import BlogsClient from './BlogsClient';

export const metadata: Metadata = {
    title: 'Natural Beauty Insights | Herbalicious Organic Blog',
    description: 'Expert advice on organic skincare, hair care routines, and ingredient benefits. Discover local wellness secrets from across Pakistan.',
    openGraph: {
        title: 'Herbalicious Insights - Natural Wellness Blog',
        description: 'Your guide to organic living in Pakistan. Tips, tricks, and traditional remedies for modern life.',
    }
};

export default function BlogsPage() {
    return <BlogsClient />;
}
