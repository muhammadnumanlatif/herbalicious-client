import ShopClient from '@/components/ShopClient';
import { getProducts } from '@/lib/wordpress';
import staticProducts from '@/src/data/products.json';
import { Metadata } from 'next';
import { Suspense } from 'react';

// Products live in D1 and are dashboard-editable, so render per-request.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Organic Shop | Natural Skincare & Hair Care Pakistan',
    description: 'Browse Pakistan\'s finest selection of organic goat milk soaps, traditional amla reetha shampoos, and pure wellness serums. Handcrafted for your beauty ritual.',
    openGraph: {
        title: 'Herbalicious Organic Shop',
        description: 'Purest organic skincare and hair care products in Pakistan.',
    }
};

async function ShopContent() {
    let products: any[] = [];
    try {
        products = await getProducts();
    } catch (error) {
        console.warn('Failed to fetch products from D1, falling back to static data.');
    }

    // Fallback if WordPress returns empty array (e.g. not configured or optional)
    if (!products || products.length === 0) {
        products = staticProducts;
    }

    // Ensure products are in the format expected by ShopClient
    const formattedProducts = products.map((p: any) => {
        const priceStr = p.price || '0';
        const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;

        return {
            id: p.id || p.slug,
            name: p.title || p.name,
            image: p.featuredImage?.node?.sourceUrl || p.image || '/Products/Herbalicious Shop.webp',
            price: p.price || 'Contact for Price',
            numericPrice: numericPrice,
            category: p.category || 'All',
            shortDescription: p.description || p.shortDescription || '',
        };
    });

    return <ShopClient initialProducts={formattedProducts} />;
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading Shop...</span>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
