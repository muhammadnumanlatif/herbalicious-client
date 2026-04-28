import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getPosts } from '@/lib/wordpress';
import BlogDetailClient from './BlogDetailClient';

export async function generateStaticParams() {
    const posts = await getPosts(100);
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

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
        relatedProductId: null // Pending custom field implementation
    };

    return <BlogDetailClient post={adaptedPost} />;
}
