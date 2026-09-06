import { NextResponse } from 'next/server';
import { getBlogPostById, updateBlogPost, deleteBlogPost, type BlogPostWriteInput } from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
    const { id } = await params;
    const post = await getBlogPostById(id);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: Params) {
    const { id } = await params;
    try {
        const body = (await request.json()) as BlogPostWriteInput;
        if (!body.title || !body.date) {
            return NextResponse.json({ error: 'title and date are required' }, { status: 400 });
        }
        await updateBlogPost(id, body);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update blog post:', error);
        return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: Params) {
    const { id } = await params;
    await deleteBlogPost(id);
    return NextResponse.json({ success: true });
}
