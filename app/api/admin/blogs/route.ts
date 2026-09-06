import { NextResponse } from 'next/server';
import { listBlogPosts, createBlogPost, type BlogPostWriteInput } from '@/lib/db';

export async function GET() {
    const posts = await listBlogPosts();
    return NextResponse.json({ posts });
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as BlogPostWriteInput;
        if (!body.id || !body.title || !body.date) {
            return NextResponse.json({ error: 'id, title, and date are required' }, { status: 400 });
        }
        await createBlogPost(body);
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Failed to create blog post:', error);
        return NextResponse.json({ error: 'Failed to create blog post (id may already exist)' }, { status: 500 });
    }
}
