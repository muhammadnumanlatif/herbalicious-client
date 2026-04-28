import { getPageByURI } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Container, Badge } from 'react-bootstrap';
import { Metadata } from 'next';

// Define params type correctly for Next.js 15+
type Props = {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const uri = slug?.join('/') || '';
    const page = await getPageByURI(uri);

    if (!page) {
        return {
            title: 'Page Not Found',
        };
    }

    return {
        title: page.seo?.title || page.title,
        description: page.seo?.metaDesc || '',
        openGraph: {
            title: page.seo?.opengraphTitle || page.title,
            description: page.seo?.opengraphDescription || '',
            images: page.seo?.opengraphImage?.sourceUrl ? [page.seo.opengraphImage.sourceUrl] : [],
        },
    };
}

export default async function GenericPage({ params }: Props) {
    const { slug } = await params;
    const uri = slug?.join('/') || '';
    const page = await getPageByURI(uri);

    if (!page) {
        notFound();
    }

    return (
        <div className="generic-page pt-5">
            <Container className="py-5">
                <div className="text-center mb-5">
                    {/* Optional Badge for context, maybe map slugs to badges? */}
                    {['privacy-policy', 'terms-of-service', 'disclaimer'].some(s => uri.includes(s)) && (
                        <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Legal & Governance</Badge>
                    )}
                    {uri.includes('about') && (
                        <Badge bg="success-subtle" text="success" className="px-3 py-2 rounded-pill mb-3">Our Story</Badge>
                    )}

                    <h1 className="display-4 fw-bold mb-4">{page.title}</h1>
                </div>

                <div className="mx-auto" style={{ maxWidth: '900px' }}>
                    <div
                        className="base-content bg-white p-4 p-md-5 rounded-5 shadow-sm border styled-content"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </Container>

            <style>{`
                .styled-content h2 {
                    font-weight: 800;
                    color: var(--bs-dark);
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-size: 1.75rem;
                }
                .styled-content h3 {
                    font-weight: 700;
                    color: var(--bs-primary);
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    font-size: 1.25rem;
                }
                .styled-content p {
                    color: #555;
                    line-height: 1.8;
                    margin-bottom: 1.25rem;
                }
                .styled-content ul, .styled-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.25rem;
                }
                .styled-content li {
                    color: #555;
                    margin-bottom: 0.75rem;
                    line-height: 1.6;
                }
                .styled-content strong {
                    color: var(--bs-dark);
                }
            `}</style>
        </div>
    );
}
