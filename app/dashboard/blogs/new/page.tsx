import React from 'react';
import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
    return (
        <div>
            <h2 className="fw-bold mb-4">New Blog Post</h2>
            <BlogForm mode="create" />
        </div>
    );
}
