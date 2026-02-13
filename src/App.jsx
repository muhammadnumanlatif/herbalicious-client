import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Global Components
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingBar from './components/FloatingBar';
import ScrollToTop from './components/ScrollToTop';
import Breadcrumb from './components/Breadcrumb';
import BackToTop from './components/BackToTop';
import CommandPalette from './components/CommandPalette';
import MobileBottomNav from './components/MobileBottomNav';
import SmartQuoteWidget from './components/SmartQuoteWidget';

// Lazy Loaded Pages (Code Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const CityLandingPage = lazy(() => import('./pages/CityLandingPage'));
const NicheLandingPage = lazy(() => import('./pages/NicheLandingPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const QuotePage = lazy(() => import('./pages/QuotePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DirectoryPage = lazy(() => import('./pages/DirectoryPage'));
const LahoreDirectoryPage = lazy(() => import('./pages/LahoreDirectoryPage'));
const IngredientsPage = lazy(() => import('./pages/IngredientsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Simple Loading Spinner for Suspense
const LoadingScreen = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

const AppContent = () => {
    const location = useLocation();
    return (
        <div className="app-wrapper">
            <TopBar />
            <Header />
            <Breadcrumb />
            <FloatingBar />
            <ScrollToTop />
            <SmartQuoteWidget />
            <main style={{ minHeight: '80vh' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.98, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
                        animate={{ opacity: 1, scale: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                        exit={{ opacity: 0, scale: 1.02, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="page-transition-wrapper"
                    >
                        <Suspense fallback={<LoadingScreen />}>
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/quote" element={<QuotePage />} />
                                <Route path="/shop" element={<ShopPage />} />
                                <Route path="/product/:id" element={<ProductDetailPage />} />
                                <Route path="/blogs" element={<BlogsPage />} />
                                <Route path="/blog/:id" element={<BlogDetailPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/directory" element={<DirectoryPage />} />
                                <Route path="/directory/lahore" element={<LahoreDirectoryPage />} />
                                <Route path="/ingredients" element={<IngredientsPage />} />

                                {/* Silo Structure Routes */}
                                <Route path="/:niche" element={<NicheLandingPage />} />
                                <Route path="/:niche/:country" element={<NicheLandingPage />} />
                                <Route path="/:niche/:country/:city" element={<CityLandingPage />} />
                                <Route path="/legal/:page" element={<LegalPage />} />
                                <Route path="/about-us" element={<LegalPage />} />
                                <Route path="/privacy-policy" element={<LegalPage />} />
                                <Route path="/terms-of-service" element={<LegalPage />} />
                                <Route path="/disclaimer" element={<LegalPage />} />
                                <Route path="/shipping-policy" element={<LegalPage />} />

                                {/* Status 301 Simulation (Redirects) */}
                                <Route path="/products" element={<Navigate to="/shop" replace />} />
                                <Route path="/about" element={<Navigate to="/about-us" replace />} />
                                <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />

                                {/* Status 404 Branded Page */}
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            </main>
            <BackToTop />
            <CommandPalette />
            <MobileBottomNav />
            <Footer />
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <GlobalErrorBoundary>
                <AppContent />
            </GlobalErrorBoundary>
        </Router>
    );
};

export default App;
