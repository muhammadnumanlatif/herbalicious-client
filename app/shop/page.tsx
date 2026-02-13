import ShopClient from '@/components/ShopClient';
import { getProducts } from '@/lib/wordpress';
import staticProducts from '@/src/data/products.json';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Organic Shop | Natural Skincare & Hair Care Pakistan',
    description: 'Browse Pakistan\'s finest selection of organic goat milk soaps, traditional amla reetha shampoos, and pure wellness serums. Handcrafted for your beauty ritual.',
    openGraph: {
        title: 'Herbalicious Organic Shop',
        description: 'Purest organic skincare and hair care products in Pakistan.',
    }
};

export default async function ShopPage() {
    let products = [];
    try {
        // Try fetching from WordPress first
        products = await getProducts();
    } catch (error) {
        console.warn('Failed to fetch products from WordPress, falling back to static data.');
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
