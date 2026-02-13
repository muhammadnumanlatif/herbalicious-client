import React from 'react';

export default function GlobalSchema() {
    const siteUrl = 'https://herbalicious-shop.com';
    const logoUrl = `${siteUrl}/Products/logo.webp`;

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                "name": "Herbalicious",
                "url": siteUrl,
                "logo": {
                    "@type": "ImageObject",
                    "@id": `${siteUrl}/#logo`,
                    "url": logoUrl,
                    "contentUrl": logoUrl,
                    "width": 512,
                    "height": 512,
                    "caption": "Herbalicious Logo"
                },
                "image": { "@id": `${siteUrl}/#logo` },
                "sameAs": [
                    "https://web.facebook.com/people/Herbalicious/61551950484433/",
                    "https://www.instagram.com/so_herbalicious/",
                    "https://www.tiktok.com/@soherbalicious",
                    "https://www.youtube.com/@Soherbalicious"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+92-343-4178994",
                    "contactType": "customer service",
                    "areaServed": "PK",
                    "availableLanguage": ["English", "Urdu"]
                }
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": "Herbalicious",
                "publisher": { "@id": `${siteUrl}/#organization` },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${siteUrl}/shop?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
