import ProductClient from '@/components/ProductClient';
import staticProducts from '@/src/data/products.json';
import { productSEOInsights } from '@/src/data/seoInsights';
import { Metadata } from 'next';

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

export async function generateStaticParams() {
    return staticProducts.map((p) => ({
        id: p.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = staticProducts.find(p => p.id === id);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | 100% Organic & Handmade | Herbalicious`,
        description: product.shortDescription || product.description,
        openGraph: {
            images: [product.image],
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = staticProducts.find(p => p.id === id);
    if (!product) return <div>Product Not Found</div>;

    const relatedProducts = staticProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const howToSteps = howToMap[id] || [
        { name: 'Apply', text: 'Apply a small amount to the desired area.' },
        { name: 'Massage', text: 'Gently massage in circular motions.' },
        { name: 'Daily Use', text: 'Incorporate into your daily routine.' }
    ];

    const insight = productSEOInsights.find(si => si.productId === id);

    return (
        <ProductClient
            product={product}
            relatedProducts={relatedProducts}
            howToSteps={howToSteps}
            insight={insight}
        />
    );
}
