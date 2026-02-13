import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css'; // Importing existing styles
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: {
        default: 'Herbalicious | Natural & Organic Skin & Hair Care in Pakistan',
        template: '%s | Herbalicious'
    },
    description: 'Shop Pakistan\'s purest organic skincare & hair care. Handcrafted goat milk soaps, amla reetha shampoos, & wellness serums. 100% natural, chemical-free solutions.',
    keywords: ['organic skincare pakistan', 'natural hair care', 'goat milk soap lahore', 'herbal shampoo pakistan', 'pure amla reetha shampoo', 'organic wellness stores'],
    authors: [{ name: 'Herbalicious' }],
    metadataBase: new URL('https://herbalicious-shop.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Herbalicious | Natural & Organic Skin & Hair Care in Pakistan',
        description: 'Purest organic skincare and hair care products. Handcrafted soaps, serums, and wellness solutions.',
        url: 'https://herbalicious-shop.com',
        siteName: 'Herbalicious',
        images: [
            {
                url: '/Products/Hero Section.webp',
                width: 1200,
                height: 630,
                alt: 'Herbalicious Natural Products',
            },
        ],
        locale: 'en_PK',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Herbalicious | Natural & Organic Skin & Hair Care',
        description: 'Shop handmade organic skincare and hair care in Pakistan.',
        images: ['/Products/Hero Section.webp'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: '/manifest.json',
};

export const viewport = {
    themeColor: '#566d15',
    width: 'device-width',
    initialScale: 1,
};

import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import MobileBottomNav from '@/components/MobileBottomNav';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import FloatingBar from '@/components/FloatingBar';
import BackToTop from '@/components/BackToTop';
import CommandPalette from '@/components/CommandPalette';
import SmartQuoteWidget from '@/components/SmartQuoteWidget';
import LayoutWrapper from '@/components/LayoutWrapper';
import BotanicalCursor from '@/components/BotanicalCursor';
import SocialProofToast from '@/components/SocialProofToast';
import ExitIntentModal from '@/components/ExitIntentModal';
import GlobalSchema from '@/components/GlobalSchema';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <GlobalSchema />
                <CartProvider>
                    <div className="d-flex flex-column min-vh-100">
                        <TopBar />
                        <Header />
                        <main className="flex-grow-1">
                            <LayoutWrapper>
                                {children}
                            </LayoutWrapper>
                        </main>
                        <Footer />
                        <CartDrawer />
                        <BotanicalCursor />
                        <SocialProofToast />
                        <ExitIntentModal />
                        <MobileBottomNav />
                        <FloatingBar />
                        <BackToTop />
                        <CommandPalette />
                        <SmartQuoteWidget />
                    </div>
                </CartProvider>
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
