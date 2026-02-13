'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaLeaf, FaMapMarkerAlt, FaFlask, FaKeyboard } from 'react-icons/fa';
import products from '@/src/data/products.json';
import { ingredients } from '@/src/data/ingredients';
import { pkCities } from '@/src/data/cities';
import { allNiches } from '@/src/data/niches';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const MotionDiv = motion.div as any;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const results = query.trim() === '' ? [] : [
        ...products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            (query.toLowerCase().includes('skin') && p.category.toLowerCase().includes('skin')) ||
            (query.toLowerCase().includes('hair') && p.category.toLowerCase().includes('hair')) ||
            (query.toLowerCase().includes('shampoo') && p.category.toLowerCase().includes('shampoo')) ||
            (query.toLowerCase().includes('soap') && p.category.toLowerCase().includes('soap'))
        ).map(p => ({ ...p, type: 'product', icon: <FaLeaf className="text-success" /> })),
        ...ingredients.filter(i =>
            i.name.toLowerCase().includes(query.toLowerCase()) ||
            i.benefits.toLowerCase().includes(query.toLowerCase())
        ).map(i => ({ ...i, name: i.name, type: 'ingredient', icon: <FaFlask className="text-primary" /> })),
        ...pkCities.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map(c => ({ id: c, name: c, type: 'city', icon: <FaMapMarkerAlt className="text-danger" /> })),
        ...allNiches.filter(n =>
            n.title.toLowerCase().includes(query.toLowerCase()) ||
            n.description.toLowerCase().includes(query.toLowerCase()) ||
            (query.toLowerCase().includes('routine') && true)
        ).map(n => ({ ...n, name: n.title, type: 'niche', icon: <FaSearch className="text-warning" /> }))
    ].slice(0, 10);

    const handleSelect = (item: any) => {
        setIsOpen(false);
        setQuery('');
        if (item.type === 'product') router.push(`/product/${item.id}`);
        else if (item.type === 'ingredient') router.push('/ingredients');
        else if (item.type === 'city') router.push(`/goat-milk-skincare/pk/${item.name.toLowerCase().replace(/ /g, '-')}`);
        else if (item.type === 'niche') router.push(`/${item.id}`);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="command-palette-overlay" onClick={() => setIsOpen(false)}>
                        <MotionDiv
                            className="command-box overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <div className="p-4 border-bottom">
                                <div className="d-flex align-items-center bg-light rounded-pill px-4 py-3 border shadow-sm">
                                    <FaSearch className="text-muted me-3" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="w-100 border-0 bg-transparent outline-none p-0 fw-medium"
                                        placeholder="Search products, cities, routines..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <div className="d-none d-md-flex align-items-center ms-2 text-muted fw-bold small">
                                        <FaKeyboard className="me-2" /> ESC
                                    </div>
                                </div>
                            </div>

                            <div className="results-container py-2" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                                {results.length > 0 ? (
                                    results.map((item: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-3 d-flex align-items-center justify-content-between cursor-pointer palette-item"
                                            onClick={() => handleSelect(item)}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="p-2 rounded-4 bg-white shadow-sm border me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{item.name}</div>
                                                    <div className="small text-muted text-capitalize">{item.type}</div>
                                                </div>
                                            </div>
                                            <div className="text-muted small d-none d-sm-block">Enter ↵</div>
                                        </div>
                                    ))
                                ) : query ? (
                                    <div className="p-5 text-center text-muted">
                                        <div className="display-4 mb-3">🍃</div>
                                        <div>No matches found for "{query}"</div>
                                    </div>
                                ) : (
                                    <div className="p-4">
                                        <div className="small fw-bold text-muted text-uppercase mb-3 px-1" style={{ letterSpacing: '1px' }}>Quick Suggestions</div>
                                        <div className="d-flex flex-wrap gap-2">
                                            {['Goat Milk', 'Amla', 'Lahore', 'Hair Fall', 'Brightening'].map(s => (
                                                <Badge key={s} bg="white" text="dark" className="px-3 py-2 rounded-pill cursor-pointer border hover-primary-lite transition-all" onClick={() => setQuery(s)}>
                                                    {s}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </MotionDiv>
                    </div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .command-palette-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0,0,0,0.4);
                    backdrop-filter: blur(12px);
                    z-index: 10000;
                    display: flex;
                    justify-content: center;
                    padding-top: 12vh;
                }
                .command-box {
                    width: 90%;
                    max-width: 650px;
                    background: white;
                    border-radius: 32px;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.15);
                    height: fit-content;
                    border: 1px solid rgba(0,0,0,0.05);
                }
                .palette-item {
                    transition: all 0.2s ease;
                    cursor: pointer;
                }
                .palette-item:hover {
                    background: rgba(var(--bs-primary-rgb), 0.03);
                    transform: translateX(8px);
                }
                .outline-none { outline: none; }
                .hover-primary-lite:hover {
                    border-color: var(--bs-primary) !important;
                    color: var(--bs-primary) !important;
                }
                .cursor-pointer { cursor: pointer; }
            `}</style>
        </>
    );
}
