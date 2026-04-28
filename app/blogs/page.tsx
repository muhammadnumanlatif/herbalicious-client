import React, { Suspense } from 'react';
import { Metadata } from 'next';
import BlogsClient from './BlogsClient';
import { getPosts } from '@/lib/wordpress';
import { blogs as staticBlogs } from '@/src/data/seoInsights';

export const metadata: Metadata = {
    title: 'Natural Beauty Insights | Herbalicious Organic Blog',
    description: 'Expert advice on organic skincare, hair care routines, and ingredient benefits. Discover local wellness secrets from across Pakistan.',
    openGraph: {
        title: 'Herbalicious Insights - Natural Wellness Blog',
        description: 'Your guide to organic living in Pakistan. Tips, tricks, and traditional remedies for modern life.',
    }
};

async function BlogsContent() {
    let posts: any[] = [];
    try {
        posts = await getPosts();
    } catch (error) {
        console.warn('Failed to fetch posts from WordPress, falling back to static data.');
    }

    if (!posts || posts.length === 0) {
        // Fallback or map static data to new structure if needed
        posts = staticBlogs.map(b => ({
            id: b.id,
            title: b.title,
            slug: b.id, // Assuming ID is slug compatible for static data
            date: b.date,
            excerpt: b.excerpt,
            image: b.image,
            author: b.author
        }));
    }

    return <BlogsClient posts={posts} />;
}

export default function BlogsPage() {
    return (
        <Suspense fallback={<div className="container py-5 text-center">Loading blogs...</div>}>
            <BlogsContent />
        </Suspense>
    );
}
