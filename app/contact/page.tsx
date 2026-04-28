import React from 'react';
import ContactClient from './ContactClient';
import { getPageByURI } from '@/lib/wordpress';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Herbalicious Shop',
    description: 'Get in touch with Herbalicious Shop for support, questions, or just to say hello.',
};

export default async function ContactPage() {
    let pageData = null;
    try {
        pageData = await getPageByURI('/contact');
    } catch (e) {
        console.warn('Failed to fetch contact page from WordPress');
    }

    return <ContactClient pageData={pageData} />;
}
