import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createContactMessage } from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = (await request.json()) as {
            name?: string;
            email?: string;
            subject?: string;
            message?: string;
        };

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await createContactMessage({ name, email, subject, message });

        try {
            await resend.emails.send({
                from: 'Herbalicious Contact <info@herbalicious-shop.com>', // Update this with your verified domain
                to: 'support@herbalicious-shop.com', // Update receiving email
                subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
                replyTo: email,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            });
        } catch (emailError) {
            // The message is safely stored in the dashboard even if the email notification fails.
            console.error('Failed to send contact notification email:', emailError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
    }
}
