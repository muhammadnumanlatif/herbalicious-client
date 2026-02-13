import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogs } from '@/src/data/seoInsights';
import BlogDetailClient from './BlogDetailClient';

export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = blogs.find((b) => b.id === slug);

    if (!blog) return { title: 'Blog Not Found' };

    return {
        title: `${blog.title} | Herbalicious Blog`,
        description: blog.excerpt,
        openGraph: {
            images: [blog.image],
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Validate existence before rendering client component
    const blog = blogs.find((b) => b.id === slug);
    if (!blog) {
        notFound();
    }

    return <BlogDetailClient slug={slug} />;
}
