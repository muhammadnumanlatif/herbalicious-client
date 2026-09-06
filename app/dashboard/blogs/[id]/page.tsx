import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostById } from '@/lib/db';
import BlogForm from '@/components/admin/BlogForm';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getBlogPostById(id);
    if (!post) notFound();

    return (
        <div>
            <h2 className="fw-bold mb-4">Edit Blog Post</h2>
            <BlogForm mode="edit" initial={post} />
        </div>
    );
}
