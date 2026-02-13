import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Button, Form, ProgressBar, Badge, InputGroup, Offcanvas } from 'react-bootstrap';
import { FaUser, FaWhatsapp, FaMapMarkerAlt, FaSearch, FaChevronRight, FaChevronLeft, FaCheck, FaShieldAlt, FaTrash, FaLeaf, FaMagic, FaGift, FaHandSparkles, FaCloudSun, FaHeartbeat, FaShoppingBasket } from 'react-icons/fa';
import products from '../data/products.json';
import { pkCities } from '../data/cities';
import SEO from '../components/SEO';

const waNumbers = ['923434178994', '923434055363'];

const interestAreas = [
    { id: 'hair', title: 'Hair Care', icon: <FaMagic />, desc: 'Oils, Shampoos & Serums' },
    { id: 'skin', title: 'Skin Care', icon: <FaHandSparkles />, desc: 'Organic Soaps & Facial Care' },
    { id: 'wellness', title: 'Wellness', icon: <FaHeartbeat />, desc: 'Supplements & Healthy Oils' },
    { id: 'gifts', title: 'Bundles', icon: <FaGift />, desc: 'Ready-to-Gift Sets' }
];

const conditionCategories = {
    hair: [
        { id: 'hair-growth', title: 'Hair Growth & Density', cats: ['Hair Care'] },
        { id: 'hair-fall', title: 'Anti-Hair Fall Solution', cats: ['Hair Care'] },
        { id: 'dandruff', title: 'Dandruff & Itchy Scalp', cats: ['Hair Care'] }
    ],
    skin: [
        { id: 'brightening', title: 'Skin Brightening & Glow', cats: ['Organic Soap', 'Facial Care'] },
        { id: 'acne', title: 'Acne & Pimple Control', cats: ['Organic Soap', 'Facial Care'] },
        { id: 'eczema', title: 'Eczema & Psoriasis Relief', cats: ['Organic Soap', 'Body Care'] }
    ],
    wellness: [
        { id: 'immunity', title: 'Immunity & Energy', cats: ['Wellness'] },
        { id: 'joints', title: 'Joint & Bone Health', cats: ['Wellness'] },
        { id: 'kids', title: 'Safe for Kids & Babies', cats: ['Organic Soap', 'Wellness'] }
    ],
    gifts: [
        { id: 'anniversary', title: 'Anniversary Gift Sets', cats: ['Bundles'] },
        { id: 'bridal', title: 'Bridal Glow Packages', cats: ['Bundles'] },
        { id: 'box', title: 'Custom Organic Gift Box', cats: ['Bundles', 'Organic Soap'] }
    ]
};

const quickRequirements = [
    "Dry Skin Solution", "Hair Fall Recovery", "Gift Wrapping Wanted",
    "Acne Control", "Sensitive Scalp", "Organic Baby Safe", "Bulk Inquiry"
];

const categoryToArea = {
    'Organic Shampoo': 'hair',
    'Hair Oil': 'hair',
    'Hair Serum': 'hair',
    'Organic Soap': 'skin',
    'Body Care': 'skin',
    'Facial Care': 'skin',
    'Wellness': 'wellness',
    'Bundles': 'gifts',
    'Health & Beauty': 'wellness'
};

const QuotePage = () => {
    const [searchParams] = useSearchParams();
    const [step, setStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCart, setShowCart] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load initial state from localStorage or defaults
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('herbalicious_quote_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error parsing saved cart", e);
            }
        }
        return {
            area: '',
            condition: '',
            selectedProducts: [],
            name: '',
            whatsapp: '',
            city: '',
            requirement: ''
        };
    });

    // Save to localStorage whenever formData changes
    useEffect(() => {
        localStorage.setItem('herbalicious_quote_data', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        const productId = searchParams.get('productId');
        const customStep = searchParams.get('step');
        const areaParam = searchParams.get('area');

        if (productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                const area = categoryToArea[product.category] || 'wellness';

                // Smart auto-population
                setFormData(prev => ({
                    ...prev,
                    area: area,
                    selectedProducts: [{
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        image: product.image,
                        price: product.price
                    }]
                }));

                if (customStep) {
                    setStep(parseInt(customStep));
                } else {
                    setStep(4);
                }
            }
        } else if (areaParam && interestAreas.find(a => a.id === areaParam)) {
            setFormData(prev => ({ ...prev, area: areaParam }));
            setStep(2);
        }
    }, [searchParams]);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const activeConditions = useMemo(() => {
        return conditionCategories[formData.area] || [];
    }, [formData.area]);

    const filteredProducts = useMemo(() => {
        let baseProducts = products;

        if (formData.area) {
            const currentCond = activeConditions.find(c => c.id === formData.condition);
            if (currentCond) {
                baseProducts = products.filter(p => currentCond.cats.includes(p.category));
            } else {
                const areaCats = Object.values(conditionCategories[formData.area] || {}).flatMap(c => c.cats);
                baseProducts = products.filter(p => areaCats.includes(p.category));
            }
        }

        return baseProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, formData.area, formData.condition, activeConditions]);

    const toggleProduct = (product) => {
        const isSelected = formData.selectedProducts.find(p => p.id === product.id);
        let newSelection;
        if (isSelected) {
            newSelection = formData.selectedProducts.filter(p => p.id !== product.id);
        } else {
            newSelection = [...formData.selectedProducts, { id: product.id, name: product.name, category: product.category, image: product.image, price: product.price }];
        }
        setFormData({ ...formData, selectedProducts: newSelection });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const selectArea = (areaId) => {
        setFormData({ ...formData, area: areaId, condition: '', selectedProducts: [] });
        nextStep();
    };

    const selectCondition = (condId) => {
        setFormData({ ...formData, condition: condId, selectedProducts: [] });
        nextStep();
    };

    const toggleRequirement = (req) => {
        const current = formData.requirement;
        if (current.includes(req)) {
            setFormData({ ...formData, requirement: current.replace(req + ', ', '').replace(req, '').trim() });
        } else {
            setFormData({ ...formData, requirement: current ? `${current}, ${req}` : req });
        }
    };

    const calculateSubtotal = () => {
        return formData.selectedProducts.reduce((acc, p) => {
            const priceValue = typeof p.price === 'string' ? parseInt(p.price.replace(/[^\d]/g, '')) : p.price;
            return acc + (isNaN(priceValue) ? 0 : priceValue);
        }, 0);
    };

    const calculateShipping = () => {
        const subtotal = calculateSubtotal();
        if (subtotal === 0 || subtotal >= 5000) return 0;
        return (formData.city || '').toLowerCase() === 'lahore' ? 250 : 500;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const randomWA = waNumbers[Math.floor(Math.random() * waNumbers.length)];
        const productList = formData.selectedProducts.map(p => `- *${p.name}* (${p.price})`).join('%0A');
        const shipping = calculateShipping();
        const shippingText = shipping === 0 ? 'FREE' : `₨ ${shipping}`;

        const areaName = interestAreas.find(a => a.id === formData.area)?.title || 'N/A';
        const conditionName = activeConditions.find(c => c.id === formData.condition)?.title || 'General Browsing';

        const message = `🚀 *SMART ORDER REQUEST* 🚀%0A-------------------------------------------%0A👤 *Client:* ${formData.name}%0A📍 *Location:* ${formData.city}%0A📞 *WhatsApp:* ${formData.whatsapp}%0A%0A🎯 *Focus Area:* ${areaName}%0A🌿 *Concerns:* ${conditionName}%0A%0A📦 *PRODUCTS ORDERED:*%0A${productList}%0A%0A💰 *Subtotal:* ₨ ${calculateSubtotal()}%0A🚚 *Shipping:* ${shippingText}%0A✨ *Grand Total:* ₨ ${calculateTotal()}%0A%0A📝 *NOTES:*%0A"${formData.requirement}"%0A-------------------------------------------%0A_Sent via Herbalicious Smart Checkout_`;

        const waUrl = `https://wa.me/${randomWA}?text=${message}`;

        setTimeout(() => {
            window.open(waUrl, '_blank');
            setIsSubmitting(false);
        }, 2000);
    };

    const CartContent = () => (
        <div className="summary-details">
            {formData.area && (
                <div className="mb-3 p-3 bg-light rounded-4 border shadow-sm">
                    <div className="d-flex align-items-center mb-2 text-primary">
                        {interestAreas.find(a => a.id === formData.area)?.icon}
                        <span className="ms-2 fw-bold">{interestAreas.find(a => a.id === formData.area)?.title}</span>
                    </div>
                    {formData.condition && (
                        <div className="small text-muted border-top pt-2 mt-2">
                            <FaCloudSun className="me-2" />
                            {activeConditions.find(c => c.id === formData.condition)?.title || 'Mixed Products'}
                        </div>
                    )}
                </div>
            )}

            <div className="selected-items-list mb-3">
                {formData.selectedProducts.length > 0 ? (
                    formData.selectedProducts.map(p => (
                        <div key={p.id} className="d-flex align-items-center mb-2 p-2 bg-white rounded-3 border">
                            <img src={p.image} style={{ width: '30px', height: '30px', objectFit: 'cover' }} className="rounded-circle me-2" alt="" />
                            <div className="flex-grow-1">
                                <div className="small fw-bold text-truncate" style={{ maxWidth: '120px' }}>{p.name.split('(')[0]}</div>
                                <div className="text-primary smaller fw-bold" style={{ fontSize: '0.7rem' }}>{p.price}</div>
                            </div>
                            <FaTrash className="text-danger small cursor-pointer ms-2" onClick={() => toggleProduct(p)} style={{ fontSize: '0.8rem' }} />
                        </div>
                    ))
                ) : (
                    <p className="text-muted small">Items appear as you select them.</p>
                )}
            </div>

            {formData.selectedProducts.length > 0 && (
                <div className="p-3 bg-primary-subtle rounded-3 mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                        <span>Subtotal:</span>
                        <span>₨ {calculateSubtotal()}</span>
                    </div>
                    <div className="d-flex justify-content-between small mb-2 pb-2 border-bottom">
                        <span>Delivery:</span>
                        <span className={calculateShipping() === 0 ? 'text-success fw-bold' : ''}>
                            {calculateShipping() === 0 ? 'FREE' : `₨ ${calculateShipping()}`}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                        <span>Grand Total:</span>
                        <span className="text-primary">₨ {calculateTotal()}</span>
                    </div>
                </div>
            )}
            <hr />
            <div className="d-flex align-items-center text-muted small mt-4">
                <FaShieldAlt className="me-2 text-success" />
                <span>Handcrafted Organic Assurance</span>
            </div>
        </div>
    );

    const progress = (step / 6) * 100;

    return (
        <div className="quote-page pt-5 mt-5" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white"
                        style={{ zIndex: 9999 }}
                    >
                        <div className="text-center p-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="display-1 text-success mb-4"
                            >
                                <FaLeaf />
                            </motion.div>
                            <h3 className="fw-bold">Generating Your Personal Routine...</h3>
                            <p className="text-muted">Taking you to our wellness experts on WhatsApp.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <SEO title="Smart Multi-Product Order | Herbalicious Shop" description="Tailor your wellness routine. Start with your focus area and let our system guide you to the perfect organic products." />

            {/* Mobile Floating Cart Trigger */}
            <div
                className={`d-lg-none position-fixed bottom-0 start-0 w-100 p-3 z-3 transition-all ${formData.selectedProducts.length > 0 ? 'translate-y-0' : 'translate-y-100'}`}
                style={{ transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
                <Button
                    variant="primary"
                    className="w-100 py-3 rounded-pill shadow-lg d-flex justify-content-between align-items-center px-4 border-0"
                    onClick={() => setShowCart(true)}
                    style={{ background: 'linear-gradient(45deg, #0d6efd, #004fb1)' }}
                >
                    <div className="d-flex align-items-center">
                        <FaShoppingBasket className="me-2" />
                        <span className="fw-bold">{formData.selectedProducts.length} Items</span>
                    </div>
                    <div className="fw-bold">
                        ₨ {calculateTotal()} <FaChevronRight className="ms-2 small" />
                    </div>
                </Button>
            </div>

            {/* Mobile Cart Offcanvas */}
            <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="bottom" className="rounded-top-5 h-75 border-0">
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="fw-bold">Smart Cart Summary</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="bg-light">
                    <CartContent />
                </Offcanvas.Body>
            </Offcanvas>

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={11} xl={10}>
                        <Row>
                            {/* Summary Sidebar */}
                            <Col lg={4} className="d-none d-lg-block">
                                <motion.div
                                    className="glass-effect p-4 rounded-4 shadow-sm sticky-top"
                                    style={{ top: '100px' }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h5 className="fw-bold mb-4">Smart Cart</h5>
                                    <CartContent />
                                </motion.div>
                            </Col>

                            {/* Main Form Area */}
                            <Col lg={8}>
                                <div className="form-container bg-white p-3 p-md-5 rounded-4 shadow-sm border mx-n2 mx-md-0">
                                    <div className="text-center mb-5">
                                        <h2 className="fw-bold mb-2">Build Your Routine</h2>
                                        <p className="text-muted">A personalized experience for your wellness</p>
                                        <div className="px-lg-5">
                                            <ProgressBar now={progress} variant="primary" className="mt-4 mb-2 shadow-sm" style={{ height: '8px', borderRadius: '10px' }} />
                                            <div className="d-flex justify-content-between small text-muted fw-bold d-none d-sm-flex" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                                                <span>AREA</span>
                                                <span>GOAL</span>
                                                <span>SELECT</span>
                                                <span>SPECS</span>
                                                <span>INFO</span>
                                                <span>DONE</span>
                                            </div>
                                            <div className="text-muted fw-bold d-sm-none" style={{ fontSize: '0.7rem' }}>
                                                Step {step} of 6: {step === 1 ? 'AREA' : step === 2 ? 'GOAL' : step === 3 ? 'SELECT' : step === 4 ? 'SPECS' : step === 5 ? 'INFO' : 'REVEIW'}
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                                <h4 className="mb-4 text-center fw-bold">Where should we start?</h4>
                                                <Row className="g-4">
                                                    {interestAreas.map((area) => (
                                                        <Col md={6} xs={6} key={area.id}>
                                                            <div
                                                                className={`p-2 p-md-4 border rounded-4 text-center transition-all h-100 d-flex flex-column align-items-center justify-content-center ${formData.area === area.id ? 'border-primary bg-primary-subtle shadow-sm' : 'hover-lift bg-white'}`}
                                                                style={{ cursor: 'pointer', border: '2px solid #eee' }}
                                                                onClick={() => selectArea(area.id)}
                                                            >
                                                                <div className="display-6 text-primary mb-2 mb-md-3">{area.icon}</div>
                                                                <h6 className="fw-bold mb-1" style={{ fontSize: 'clamp(0.75rem, 3vw, 1rem)' }}>{area.title}</h6>
                                                                <small className="text-muted d-none d-md-block" style={{ fontSize: '0.75rem' }}>{area.desc}</small>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                <h4 className="mb-4 text-center fw-bold">Select Your Primary Concern</h4>
                                                <Row className="g-3">
                                                    {activeConditions.map((cond) => (
                                                        <Col md={12} key={cond.id}>
                                                            <div
                                                                className={`p-3 border rounded-4 transition-all d-flex align-items-center ${formData.condition === cond.id ? 'border-primary bg-primary-subtle' : 'bg-white hover-shadow'}`}
                                                                style={{ cursor: 'pointer', border: '2px solid #eee' }}
                                                                onClick={() => selectCondition(cond.id)}
                                                            >
                                                                <div className="p-2 bg-white rounded-circle me-3 border">
                                                                    <FaCheck className={formData.condition === cond.id ? 'text-primary' : 'text-light'} />
                                                                </div>
                                                                <h6 className="fw-bold mb-0">{cond.title}</h6>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                    <Col md={12}>
                                                        <div
                                                            className={`p-3 border rounded-4 transition-all d-flex align-items-center ${formData.condition === 'mixed' ? 'border-primary bg-primary-subtle' : 'bg-white hover-shadow'}`}
                                                            style={{ cursor: 'pointer', border: '2px solid #eee' }}
                                                            onClick={() => selectCondition('mixed')}
                                                        >
                                                            <div className="p-2 bg-white rounded-circle me-3 border">
                                                                <FaSearch className={formData.condition === 'mixed' ? 'text-primary' : 'text-light'} />
                                                            </div>
                                                            <h6 className="fw-bold mb-0">Browsing Mixed Products</h6>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="text-center mt-5">
                                                    <Button variant="link" className="text-muted text-decoration-none" onClick={prevStep}><FaChevronLeft /> Back to Areas</Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                <h4 className="mb-4 text-center fw-bold">Curated Matches for You</h4>
                                                <InputGroup className="mb-4 shadow-sm rounded-pill overflow-hidden border">
                                                    <InputGroup.Text className="bg-white border-0"><FaSearch className="text-muted" /></InputGroup.Text>
                                                    <Form.Control
                                                        placeholder="Quick search curated list..."
                                                        className="border-0 py-2"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </InputGroup>

                                                <Row className="g-3 mb-4" style={{ maxHeight: '420px', overflowY: 'auto', padding: '10px' }}>
                                                    {filteredProducts.map((product) => {
                                                        const isSelected = formData.selectedProducts.find(p => p.id === product.id);
                                                        return (
                                                            <Col md={6} key={product.id}>
                                                                <div
                                                                    className={`selectable-card p-3 border rounded-4 text-start transition-all ${isSelected ? 'border-primary bg-primary-subtle shadow-sm' : 'hover-shadow bg-white'}`}
                                                                    style={{ cursor: 'pointer', border: '2px solid #eee' }}
                                                                    onClick={() => toggleProduct(product)}
                                                                >
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="position-relative">
                                                                            <img src={product.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="rounded-3" />
                                                                            {isSelected && (
                                                                                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-primary bg-opacity-25 rounded-3">
                                                                                    <FaCheck className="text-white" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="mb-0 fw-bold small text-truncate" style={{ maxWidth: '150px' }}>{product.name}</h6>
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <Badge bg="light" text="dark" className="fw-normal border smaller" style={{ fontSize: '0.65rem' }}>{product.category}</Badge>
                                                                                <span className="text-primary fw-bold small">{product.price}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        );
                                                    })}
                                                </Row>
                                                <div className="d-flex justify-content-between pt-3">
                                                    <Button variant="link" className="text-muted text-decoration-none" onClick={prevStep}><FaChevronLeft /> Back</Button>
                                                    <Button variant="primary" size="lg" className="rounded-pill px-5 shadow-sm" onClick={nextStep} disabled={formData.selectedProducts.length === 0}>Next: Requirements <FaChevronRight /></Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 4 && (
                                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                <h4 className="mb-4 text-center fw-bold">Requirements & Lifestyle</h4>

                                                <div className="mb-4">
                                                    <p className="small text-muted mb-2">Select areas of concern:</p>
                                                    <div className="d-flex flex-wrap gap-2 mb-4">
                                                        {quickRequirements.map((req, i) => (
                                                            <Badge
                                                                key={i}
                                                                pill
                                                                bg={formData.requirement.includes(req) ? 'primary' : 'light'}
                                                                text={formData.requirement.includes(req) ? 'white' : 'dark'}
                                                                className="px-3 py-2 cursor-pointer border shadow-sm"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => toggleRequirement(req)}
                                                            >
                                                                {req}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="fw-bold">Any specific instructions or sensitivities?</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={4}
                                                        name="requirement"
                                                        className="rounded-4 border-2 p-3 bg-light shadow-inner"
                                                        value={formData.requirement}
                                                        onChange={handleInputChange}
                                                        placeholder="e.g. Please suggest the best hair oil for post-covid fall..."
                                                    />
                                                </Form.Group>
                                                <div className="d-flex justify-content-between pt-3">
                                                    <Button variant="link" className="text-muted text-decoration-none" onClick={prevStep}><FaChevronLeft /> Back</Button>
                                                    <Button variant="primary" size="lg" className="rounded-pill px-5 shadow-sm" onClick={nextStep} disabled={!formData.requirement}>Address Info <FaChevronRight /></Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 5 && (
                                            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                <h4 className="mb-4 text-center fw-bold">Contact & Shipping</h4>

                                                <Row className="gy-4">
                                                    <Col md={12}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-bold"><FaUser className="me-2 text-primary" /> Full Name</Form.Label>
                                                            <Form.Control type="text" name="name" className="py-2 rounded-3" value={formData.name} onChange={handleInputChange} placeholder="Your Name" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-bold"><FaWhatsapp className="me-2 text-success" /> WhatsApp Number</Form.Label>
                                                            <Form.Control type="text" name="whatsapp" className="py-2 rounded-3" value={formData.whatsapp} onChange={handleInputChange} placeholder="03XXXXXXXXX" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-bold"><FaMapMarkerAlt className="me-2 text-danger" /> City</Form.Label>
                                                            <Form.Control as="select" name="city" className="py-2 rounded-3" value={formData.city} onChange={handleInputChange}>
                                                                <option value="">Select City</option>
                                                                {pkCities.map(city => <option key={city} value={city}>{city}</option>)}
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <div className="d-flex justify-content-between pt-5">
                                                    <Button variant="link" className="text-muted text-decoration-none" onClick={prevStep}><FaChevronLeft /> Back</Button>
                                                    <Button variant="primary" size="lg" className="rounded-pill px-5 shadow-sm" onClick={nextStep} disabled={!formData.name || !formData.whatsapp || !formData.city}>Review Order <FaChevronRight /></Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 6 && (
                                            <motion.div key="step6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                                <div className="success-lottie mb-4">
                                                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg" style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}>
                                                        <FaCheck />
                                                    </div>
                                                </div>
                                                <h3 className="fw-bold mb-3">Order Confirmation</h3>
                                                <p className="text-muted mb-4">Review your personalized routine before sending.</p>

                                                <div className="bg-light p-4 rounded-5 text-start mb-4 border-dashed shadow-sm" style={{ border: '2px dashed #ddd' }}>
                                                    <div className="mb-4">
                                                        <h6 className="fw-bold text-uppercase border-bottom pb-2 mb-3" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Proposed Routine</h6>
                                                        {formData.selectedProducts.map(p => (
                                                            <div key={p.id} className="d-flex justify-content-between align-items-center mb-2">
                                                                <span>{p.name.split('(')[0]}</span>
                                                                <span className="fw-bold text-primary">{p.price}</span>
                                                            </div>
                                                        ))}
                                                        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top small">
                                                            <span>Subtotal:</span>
                                                            <span>₨ {calculateSubtotal()}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center mb-2 small">
                                                            <span>Delivery Charges ({formData.city}):</span>
                                                            <span className={calculateShipping() === 0 ? 'text-success fw-bold' : ''}>
                                                                {calculateShipping() === 0 ? 'FREE' : `₨ ${calculateShipping()}`}
                                                            </span>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top fw-bold h5">
                                                            <span>Grand Total:</span>
                                                            <span className="text-success">₨ {calculateTotal()}</span>
                                                        </div>
                                                    </div>

                                                    <div className="row small gy-2 border-top pt-3 mt-3">
                                                        <div className="col-6"><strong>Customer:</strong> {formData.name}</div>
                                                        <div className="col-6"><strong>Location:</strong> {formData.city}</div>
                                                        <div className="col-12"><strong>Routine Focus:</strong> {conditionCategories[formData.area]?.find(c => c.id === formData.condition)?.title || 'Custom'}</div>
                                                    </div>
                                                </div>

                                                <div className="d-grid gap-3">
                                                    <Button variant="success" size="lg" className="py-3 rounded-pill shadow fw-bold d-flex align-items-center justify-content-center border-0" onClick={handleSubmit} style={{ backgroundColor: '#25D366' }}>
                                                        <FaWhatsapp className="me-2 fs-4" /> CONFIRM & ORDER VIA WHATSAPP
                                                    </Button>
                                                    <Button variant="link" className="text-muted" onClick={prevStep}>Change Details</Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default QuotePage;
