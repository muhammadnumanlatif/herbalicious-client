import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaLeaf, FaMapMarkerAlt, FaFlask, FaTimes, FaKeyboard } from 'react-icons/fa';
import products from '../data/products.json';
import { ingredients } from '../data/ingredients';
import { pkCities } from '../data/cities';
import { allNiches } from '../data/niches';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Keyboard shortcut listeners
    useEffect(() => {
        const handleKeyDown = (e) => {
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
        ...products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).map(p => ({ ...p, type: 'product', icon: <FaLeaf className="text-success" /> })),
        ...ingredients.filter(i => i.name.toLowerCase().includes(query.toLowerCase())).map(i => ({ ...i, type: 'ingredient', icon: <FaFlask className="text-primary" /> })),
        ...pkCities.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map(c => ({ id: c, name: c, type: 'city', icon: <FaMapMarkerAlt className="text-danger" /> })),
        ...allNiches.filter(n => n.title.toLowerCase().includes(query.toLowerCase())).map(n => ({ ...n, name: n.title, type: 'niche', icon: <FaSearch className="text-warning" /> }))
    ].slice(0, 10);

    const handleSelect = (item) => {
        setIsOpen(false);
        setQuery('');
        if (item.type === 'product') navigate(`/product/${item.id}`);
        else if (item.type === 'ingredient') navigate('/ingredients');
        else if (item.type === 'city') navigate(`/goat-milk-skincare/pk/${item.name.toLowerCase().replace(/ /g, '-')}`);
        else if (item.type === 'niche') navigate(`/${item.id}`);
    };

    return (
        <>
            {/* Quick Trigger Badge for Mobile/Users who don't know shortcuts */}
            <div
                className="command-trigger shadow-sm d-flex align-items-center justify-content-center"
                onClick={() => setIsOpen(true)}
                title="Search (Cmd + K)"
            >
                <FaSearch />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="command-palette-overlay" onClick={() => setIsOpen(false)}>
                        <motion.div
                            className="command-box glass-effect overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-bottom">
                                <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2 border shadow-inner">
                                    <FaSearch className="text-muted me-3" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="w-100 border-0 bg-transparent outline-none p-1"
                                        placeholder="Search products, ingredients, cities..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <div className="d-none d-md-flex align-items-center ms-2 text-muted fw-bold small">
                                        <FaKeyboard className="me-1" /> ESC
                                    </div>
                                </div>
                            </div>

                            <div className="results-container py-2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {results.length > 0 ? (
                                    results.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-3 d-flex align-items-center justify-content-between cursor-pointer palette-item"
                                            onClick={() => handleSelect(item)}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="p-2 rounded-3 bg-white shadow-sm me-3">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{item.name}</div>
                                                    <div className="small text-muted text-capitalize">{item.type}</div>
                                                </div>
                                            </div>
                                            <div className="text-muted small">Enter ↵</div>
                                        </div>
                                    ))
                                ) : query ? (
                                    <div className="p-5 text-center text-muted">
                                        <div className="display-4 mb-3">🍃</div>
                                        <div>No matches found for "{query}"</div>
                                    </div>
                                ) : (
                                    <div className="p-4">
                                        <div className="small fw-bold text-muted text-uppercase mb-3">Popular Searches</div>
                                        <div className="d-flex flex-wrap gap-2">
                                            {['Goat Milk', 'Amla', 'Lahore', 'Hair Fall', 'Brightening'].map(s => (
                                                <Badge key={s} bg="light" text="dark" className="px-3 py-2 rounded-pill cursor-pointer border hover-lift" onClick={() => setQuery(s)}>
                                                    {s}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .command-palette-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(8px);
                    z-index: 99999;
                    display: flex;
                    justify-content: center;
                    padding-top: 10vh;
                }
                .command-box {
                    width: 90%;
                    max-width: 600px;
                    background: white;
                    border-radius: 24px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.2);
                    height: fit-content;
                }
                .command-trigger {
                    position: fixed;
                    bottom: 90px;
                    right: 25px;
                    width: 50px;
                    height: 50px;
                    background: #566d15;
                    color: white;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 1000;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .command-trigger:hover {
                    transform: scale(1.1) rotate(15deg);
                    background: #6a831b;
                }
                .palette-item {
                    transition: all 0.2s ease;
                }
                .palette-item:hover {
                    background: #f8f9fa;
                    transform: translateX(10px);
                }
                .outline-none { outline: none; }
                .shadow-inner { box-shadow: inset 0 2px 4px rgba(0,0,0,0.06); }
            `}</style>
        </>
    );
};

export default CommandPalette;
