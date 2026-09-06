import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { listBlogPosts } from '@/lib/db';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
    const posts = await listBlogPosts();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Blog Posts</h2>
                <Link href="/dashboard/blogs/new">
                    <Button variant="success" className="rounded-pill fw-bold">+ New Post</Button>
                </Link>
            </div>

            <Card className="border-0 shadow-sm rounded-4 p-4">
                {posts.length === 0 ? (
                    <p className="text-muted mb-0">No blog posts yet.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((p) => (
                                    <tr key={p.id}>
                                        <td className="fw-bold">{p.title}</td>
                                        <td>{p.author}</td>
                                        <td>{p.date}</td>
                                        <td className="text-end">
                                            <Link href={`/blog/${p.id}`} target="_blank" className="btn btn-outline-secondary btn-sm me-2">
                                                View
                                            </Link>
                                            <Link href={`/dashboard/blogs/${p.id}`} className="btn btn-outline-secondary btn-sm me-2">
                                                Edit
                                            </Link>
                                            <DeleteButton url={`/api/admin/blogs/${p.id}`} confirmText={`Delete post "${p.title}"?`} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
