import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/wordpress';
import BlogDetailClient from './BlogDetailClient';

// Blog posts are dashboard-editable and live in D1, so render per-request.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return { title: 'Blog Not Found' };

    return {
        title: `${post.title} | Herbalicious Blog`,
        description: post.excerpt?.replace(/<[^>]+>/g, '') || post.title,
        openGraph: {
            images: [post.featuredImage?.node?.sourceUrl || '/images/blog-placeholder.jpg'],
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch data from WordPress
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Adapt the WordPress post data to match the expected format for the client component
    // We might need to handle 'relatedProductId' if it exists in custom fields, otherwise omit or use a fallback
    const adaptedPost = {
        id: post.slug,
        title: post.title,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt,
        content: post.content,
        image: post.featuredImage?.node?.sourceUrl || '/images/blog-placeholder.jpg',
        author: post.author?.node?.name || 'Herbalicious Team',
        relatedProductId: (post as any).relatedProductId ?? null
    };

    return <BlogDetailClient post={adaptedPost} />;
}
