import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, image, schema, type = 'website' }) => {
    const { pathname } = useLocation();
    const siteUrl = 'https://herbalicious-shop.com';
    const currentUrl = `${siteUrl}${pathname}`;
    const defaultImage = `${siteUrl}/Products/logo.webp`;
    const finalImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

    // Organization Schema (GEO Signal)
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Herbalicious",
        "url": siteUrl,
        "logo": defaultImage,
        "sameAs": [
            "https://www.facebook.com/HerbaliciousShop",
            "https://www.instagram.com/herbalicious_shop",
            "https://wa.me/923434178994"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+92-343-4178994",
            "contactType": "customer service",
            "areaServed": "PK",
            "availableLanguage": ["English", "Urdu"]
        }
    };

    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph (GEO/SEO) */}
            <meta property="og:site_name" content="Herbalicious" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:type" content={type} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalImage} />

            {/* Schema Injection (AEO/GEO) */}
            <script type="application/ld+json">
                {JSON.stringify(orgSchema)}
            </script>

            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}

            {/* Answer Engine (AEO) specific meta */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        </Helmet>
    );
};

export default SEO;
