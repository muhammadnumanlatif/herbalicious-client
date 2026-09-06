import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { getProductBySlug, getRawProductById } from '@/lib/wordpress';
import ProductClient from '@/components/ProductClient';
import RelatedProducts from '@/components/RelatedProducts';
import { productSEOInsights } from '@/src/data/seoInsights';
import { Metadata } from 'next';

// Products live in D1 and can be edited from the dashboard at any time,
// so this page renders per-request rather than being pre-built at SSG time.
export const dynamic = 'force-dynamic';

const howToMap: Record<string, any[]> = {
    'amla-reetha-shampoo': [
        { name: 'Wet Hair', text: 'Thoroughly wet your hair with lukewarm water.' },
        { name: 'Apply Shampoo', text: 'Take a small amount and massage it into your scalp.' },
        { name: 'Rinse', text: 'Rinse thoroughly until water runs clear.' }
    ],
    'goat-milk-soap': [
        { name: 'Lather', text: 'Rub the soap between your hands to create a creamy lather.' },
        { name: 'Cleanse', text: 'Gently massage onto your skin.' },
        { name: 'Rinse', text: 'Rinse with water and pat dry.' }
    ],
};

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductBySlug(id);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.seo?.title || `${product.title} | 100% Organic & Handmade | Herbalicious`,
        description: product.seo?.metaDesc || product.productFields?.shortDescription,
        openGraph: {
            title: product.seo?.opengraphTitle || product.title,
            description: product.seo?.opengraphDescription,
            images: product.seo?.opengraphImage?.sourceUrl ? [product.seo.opengraphImage.sourceUrl] : [],
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = await getRawProductById(id);
    if (!product) return <div>Product Not Found</div>;

    const howToSteps = howToMap[id] || [
        { name: 'Apply', text: 'Apply a small amount to the desired area.' },
        { name: 'Massage', text: 'Gently massage in circular motions.' },
        { name: 'Daily Use', text: 'Incorporate into your daily routine.' }
    ];

    const insight = productSEOInsights.find(si => si.productId === id);

    return (
        <>
            <ProductClient
                product={product}
                relatedProducts={[]}
                howToSteps={howToSteps}
                insight={insight}
            />

            <div className="container pb-5">
                <Suspense fallback={
                    <div className="d-flex justify-content-center py-5">
                        <Spinner animation="border" variant="success" />
                    </div>
                }>
                    <RelatedProducts category={product.category} currentId={product.id} />
                </Suspense>
            </div>
        </>
    );
}
