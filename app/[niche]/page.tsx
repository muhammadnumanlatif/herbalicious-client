import React from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import { allNiches } from '@/src/data/niches';
import products from '@/src/data/products.json';
import NicheClient from '@/components/NicheClient';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ niche: string }>;
};

export async function generateStaticParams() {
    return allNiches.map((niche) => ({
        niche: niche.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { niche: nicheId } = await params;
    const niche = allNiches.find(n => n.id === nicheId);

    if (!niche) {
        return {
            title: 'Niche Not Found',
        };
    }

    return {
        title: `${niche.title} | Organic ${niche.product} in Pakistan`,
        description: `Shop the best organic ${niche.product} in Pakistan. Specialized ${niche.title} solutions for ${(niche as any).problem || 'natural beauty'}. Handcrafted in Lahore with 100% natural ingredients.`,
        openGraph: {
            title: niche.title,
            description: `Mastering the science of ${(niche as any).ingredient || 'natural wellness'} for your beauty ritual.`,
            images: ['/Products/Hero Section.webp'],
        }
    };
}

export default async function NicheLandingPage({ params }: Props) {
    const { niche: nicheId } = await params;
    const niche = allNiches.find(n => n.id === nicheId);

    if (!niche) {
        return (
            <Container className="py-5 mt-5 text-center">
                <div className="display-1 mb-4">🌿</div>
                <h1 className="fw-bold mb-3">Niche Not Found</h1>
                <p className="lead text-muted mb-4">The organic wellness niche you're looking for doesn't exist.</p>
                <Link href="/" className="btn btn-primary rounded-pill px-5">Return Home</Link>
            </Container>
        );
    }

    return <NicheClient niche={niche} products={products} />;
}
