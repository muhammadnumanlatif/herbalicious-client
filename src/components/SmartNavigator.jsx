import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Badge, Card, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLayerGroup, FaBoxOpen, FaMapMarkerAlt, FaChevronRight, FaSearch, FaHeartbeat, FaLeaf, FaMagic, FaCloudSun, FaChevronLeft } from 'react-icons/fa';
import { categories } from '../data/niches';
import products from '../data/products.json';
import { pkCities } from '../data/cities';
import Shimmer from './Shimmer';

const SmartNavigator = () => {
    const [citySearch, setCitySearch] = useState('');
    const [activeCatId, setActiveCatId] = useState(categories[0].id);
    const [activeNicheId, setActiveNicheId] = useState(categories[0].niches[0].id);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, [activeCatId, activeNicheId]);

    const activeCat = categories.find(c => c.id === activeCatId) || categories[0];
    const activeNiche = activeCat.niches.find(n => n.id === activeNicheId) || activeCat.niches[0];

    const filteredCities = pkCities.filter(city =>
        city.toLowerCase().includes(citySearch.toLowerCase())
    ).slice(0, 48);

    const sliderRef = useRef(null);

    const handleCatChange = (id) => {
        setActiveCatId(id);
        const firstNiche = categories.find(c => c.id === id).niches[0];
        setActiveNicheId(firstNiche.id);
    };

    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth;
            sliderRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="smart-navigator-section section-spacer bg-light">
            <Container>
                <div className="text-center mb-5">
                    <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Geo-Smart Discovery</Badge>
                    <h2 className="display-5 fw-bold text-dark">Herbalicious in Your City</h2>
                    <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
                        Choose your concern, select your city, and get <span className="text-primary fw-bold">Fresh Organic Potions</span> delivered to your doorstep.
                    </p>
                </div>

                <div className="smart-navigator-container glass-effect p-3 p-md-5 rounded-5 shadow-sm bg-white border mx-1 mx-md-0">
                    {/* Level 1: Focus Area (Main Tabs) */}
                    <div className="category-tabs-wrapper mb-4">
                        <Tabs
                            activeKey={activeCatId}
                            onSelect={handleCatChange}
                            className="justify-content-center border-0 custom-nav-tabs"
                        >
                            {categories.map(cat => (
                                <Tab
                                    key={cat.id}
                                    eventKey={cat.id}
                                    title={
                                        <span className="d-flex align-items-center">
                                            <span className="me-2 d-none d-md-inline">
                                                {cat.id === 'ingredient-specific' && <FaLeaf />}
                                                {cat.id === 'problem-solution' && <FaHeartbeat />}
                                                {cat.id === 'superfood-wellness' && <FaMagic />}
                                                {cat.id === 'non-toxic-lifestyle' && <FaCloudSun />}
                                            </span>
                                            {cat.name.split(' ')[0]}
                                        </span>
                                    }
                                />
                            ))}
                        </Tabs>
                    </div>

                    {/* Level 2: Specific Niches (Pills) */}
                    <motion.div
                        key={activeCatId}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="niche-pills-container d-flex flex-wrap justify-content-center gap-2 mb-5 p-3 bg-light rounded-4 border"
                    >
                        {activeCat.niches.map(niche => (
                            <Button
                                key={niche.id}
                                variant={activeNicheId === niche.id ? 'primary' : 'outline-muted'}
                                className={`rounded-pill px-3 py-2 small fw-bold transition-all ${activeNicheId === niche.id ? 'shadow-sm' : 'bg-white border text-muted'}`}
                                onClick={() => setActiveNicheId(niche.id)}
                                style={{ fontSize: '0.85rem' }}
                            >
                                {niche.title}
                            </Button>
                        ))}
                    </motion.div>

                    <hr className="my-5 opacity-10" />

                    {/* Level 3: City Search & Grid */}
                    <div className="city-section text-center">
                        <div className="d-flex flex-column align-items-center mb-5">
                            <h4 className="fw-bold mb-1 text-primary">Finding {activeNiche.title}</h4>
                            <p className="small text-muted mb-4 px-3">Showing major cities across Pakistan for this routine.</p>

                            <div className="input-group rounded-pill border overflow-hidden shadow-sm bg-white" style={{ maxWidth: '400px' }}>
                                <span className="input-group-text bg-white border-0"><FaSearch className="text-muted" /></span>
                                <input
                                    type="text"
                                    className="form-control border-0 py-2"
                                    placeholder="Search your city..."
                                    value={citySearch}
                                    onChange={(e) => setCitySearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="position-relative px-md-0 px-4">
                            {/* Mobile Arrows */}
                            <div className="d-flex d-md-none position-absolute w-100 start-0 justify-content-between align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
                                <div className="slider-arrow ms-2" onClick={() => scrollSlider('left')} style={{ pointerEvents: 'auto' }}>
                                    <FaChevronLeft />
                                </div>
                                <div className="slider-arrow me-2" onClick={() => scrollSlider('right')} style={{ pointerEvents: 'auto' }}>
                                    <FaChevronRight />
                                </div>
                            </div>

                            <div
                                ref={sliderRef}
                                className="city-links-grid mobile-slider-wrapper"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(110px, 30vw, 160px), 1fr))',
                                    gap: 'clamp(8px, 2vw, 15px)'
                                }}
                            >
                                {isLoading ? (
                                    Array(12).fill(0).map((_, i) => (
                                        <div key={i} className="p-3 border rounded-3 bg-white">
                                            <Shimmer height="20px" />
                                        </div>
                                    ))
                                ) : (
                                    <AnimatePresence mode="popLayout">
                                        {filteredCities.map((city) => (
                                            <motion.div
                                                key={`${activeNicheId}-${city}`}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.2 }}
                                                className="mobile-slider-item"
                                            >
                                                <Link
                                                    to={`/${activeNicheId}/pk/${city.toLowerCase().replace(/ /g, '-')}`}
                                                    className="d-block p-3 p-md-2 rounded-3 text-decoration-none text-muted small border bg-white hover-primary text-truncate shadow-hover-lift"
                                                    title={`${activeNiche.title} in ${city}`}
                                                >
                                                    <FaMapMarkerAlt className="me-1 smaller opacity-50" /> {city}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </div>
                        </div>

                        <div className="mt-5 pt-4">
                            <Button as={Link} to="/directory" variant="success" className="rounded-pill px-5 shadow-sm py-3 fw-bold">
                                Browse All 110+ Locations <FaChevronRight className="ms-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SmartNavigator;
