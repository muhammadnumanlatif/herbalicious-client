import React from 'react';
import { allNiches } from '@/src/data/niches';
import { getCityData, pkCities } from '@/src/data/cities';
import products from '@/src/data/products.json';
import CityLandingClient from './CityLandingClient';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ niche: string; city: string }>;
};

export async function generateStaticParams() {
    // Generate static pages for top cities and niches to keep build time fast
    // In a full production build, you might want to generate all pkCities
    const topNiches = allNiches.slice(0, 5);
    const topCities = pkCities.slice(0, 20);

    const routes = [];
    for (const niche of topNiches) {
        for (const city of topCities) {
            routes.push({
                niche: niche.id,
                city: city.toLowerCase().replace(/ /g, '-'),
            });
        }
    }
    return routes;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { niche: nicheId, city: citySlug } = await params;
    const niche = allNiches.find(n => n.id === nicheId);
    const cityName = citySlug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const city = getCityData(cityName);

    if (!niche) return { title: 'Location Logic Error' };

    return {
        title: `Organic ${niche.product} in ${city.name} | Herbalicious Pakistan`,
        description: `Get premium organic ${niche.product} delivered in ${city.name} within 24-48 hours. Hand-blended solutions for ${city.name}'s ${city.weather.toLowerCase()} environment.`,
        openGraph: {
            title: `${niche.title} - ${city.name} Specialized`,
            description: `Nature's answer to ${city.name} urban living. Join the organic revolution in Pakistan.`,
        }
    };
}

export default async function CityLandingPage({ params }: Props) {
    const { niche: nicheId, city: citySlug } = await params;

    const niche = allNiches.find(n => n.id === nicheId);
    const cityName = citySlug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const city = getCityData(cityName);

    if (!niche) return <div>Location Logic Error</div>;

    return <CityLandingClient niche={niche} city={city} products={products} />;
}
