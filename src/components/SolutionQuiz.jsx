import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRedo, FaMagic, FaLeaf, FaHeartbeat, FaCheckCircle } from 'react-icons/fa';
import products from '../data/products.json';

const quizSteps = [
    {
        id: 'goal',
        question: "What's your primary wellness goal today?",
        options: [
            { id: 'skin', label: 'Glowing Skin', icon: '✨', area: 'skin' },
            { id: 'hair', label: 'Healthy Hair', icon: '🌿', area: 'hair' },
            { id: 'wellness', label: 'Total Wellness', icon: '🧘‍♀️', area: 'wellness' }
        ]
    },
    {
        id: 'skin-concern',
        depends: 'skin',
        question: "What's your main skin concern?",
        options: [
            { id: 'brightening', label: 'Dullness & Dark Spots', icon: '🌟', productId: 'vitamin-c-serum' },
            { id: 'acne', label: 'Acne & Pores', icon: '🧼', productId: 'charcoal-soap' },
            { id: 'dryness', label: 'Dryness & Sensitivity', icon: '🥛', productId: 'goat-milk-soap' }
        ]
    },
    {
        id: 'hair-concern',
        depends: 'hair',
        question: "What's your biggest hair challenge?",
        options: [
            { id: 'fall', label: 'Hair Fall', icon: '🍂', productId: 'miracle-hair-oil' },
            { id: 'growth', label: 'Slow Growth', icon: '🚀', productId: 'amla-reetha-shampoo' },
            { id: 'frizz', label: 'Frizz & Damage', icon: '✨', productId: 'miracle-hair-oil' }
        ]
    },
    {
        id: 'wellness-concern',
        depends: 'wellness',
        question: "How can nature help you most?",
        options: [
            { id: 'stress', label: 'Stress Relief', icon: '🌊', productId: 'magnesium-spray' },
            { id: 'immunity', label: 'Immunity Boost', icon: '🛡️', productId: 'pure-moringa-powder' },
            { id: 'vitality', label: 'Health & Vitality', icon: '✨', productId: 'pure-moringa-powder' }
        ]
    }
];

const SolutionQuiz = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [selections, setSelections] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const currentStep = quizSteps[currentStepIndex];

    const handleSelect = (option) => {
        const newSelections = { ...selections, [currentStep.id]: option };
        setSelections(newSelections);

        if (currentStepIndex === 0) {
            const nextStep = quizSteps.find(s => s.depends === option.id);
            if (nextStep) {
                setCurrentStepIndex(quizSteps.indexOf(nextStep));
            } else {
                setIsFinished(true);
            }
        } else {
            setIsFinished(true);
        }
    };

    const resetQuiz = () => {
        setCurrentStepIndex(0);
        setSelections({});
        setIsFinished(false);
    };

    const getRecommendation = () => {
        const lastSelection = Object.values(selections).pop();
        if (lastSelection?.productId) {
            return products.find(p => p.id === lastSelection.productId) || products[0];
        }
        return products[0];
    };

    const recommendedProduct = isFinished ? getRecommendation() : null;

    return (
        <section className="py-5 bg-primary-subtle rounded-5 mx-2 mx-md-5 my-5 shadow-sm border border-white position-relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ opacity: 0.05, pointerEvents: 'none' }}>
                <div className="position-absolute" style={{ top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>
                <div className="position-absolute" style={{ bottom: '-50px', left: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--secondary-color)' }}></div>
            </div>

            <Container className="position-relative">
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                        <AnimatePresence mode="wait">
                            {!isFinished ? (
                                <motion.div
                                    key={currentStep.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="quiz-card p-4 p-md-5"
                                >
                                    <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">Smart Solution Finder</Badge>
                                    <h2 className="display-6 fw-bold mb-5">{currentStep.question}</h2>

                                    <Row className="g-3">
                                        {currentStep.options.map((option) => (
                                            <Col md={4} key={option.id}>
                                                <motion.div
                                                    whileHover={{ y: -5, scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleSelect(option)}
                                                    className="p-4 bg-white rounded-4 shadow-sm border cursor-pointer h-100 d-flex flex-column align-items-center justify-content-center transition-all bg-white-hover"
                                                    style={{ border: '2px solid transparent' }}
                                                >
                                                    <div className="display-4 mb-3">{option.icon}</div>
                                                    <h5 className="fw-bold mb-0 text-dark">{option.label}</h5>
                                                </motion.div>
                                            </Col>
                                        ))}
                                    </Row>

                                    <div className="mt-5 text-muted small">
                                        Step {currentStepIndex === 0 ? '1' : '2'} of 2
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="result-card p-4 p-md-5"
                                >
                                    <div className="mb-4">
                                        <FaCheckCircle className="text-success display-4 mb-3" />
                                        <h2 className="fw-bold">We've Found Your Match!</h2>
                                        <p className="text-muted">Based on your concerns, we recommend starting with this organic powerhouse:</p>
                                    </div>

                                    <Card className="border-0 shadow-lg rounded-5 overflow-hidden mx-auto mb-4" style={{ maxWidth: '400px' }}>
                                        <div className="position-relative">
                                            <Card.Img variant="top" src={recommendedProduct.image} style={{ height: '250px', objectFit: 'cover' }} />
                                            <Badge bg="primary" className="position-absolute top-0 end-0 m-3 rounded-pill px-3 py-2">Most Effective Choice</Badge>
                                        </div>
                                        <Card.Body className="p-4 bg-white">
                                            <h5 className="fw-bold mb-2">{(recommendedProduct?.name || 'Organic Product').split('(')[0]}</h5>
                                            <p className="small text-muted mb-4">{recommendedProduct.shortDescription}</p>
                                            <div className="d-grid gap-2">
                                                <Button
                                                    as={Link}
                                                    to={`/quote?productId=${recommendedProduct.id}`}
                                                    variant="primary"
                                                    className="rounded-pill py-2 fw-bold"
                                                >
                                                    Get it via WhatsApp <FaArrowRight className="ms-2" />
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    className="text-muted text-decoration-none"
                                                    onClick={resetQuiz}
                                                >
                                                    <FaRedo className="me-2" /> Start Over
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .cursor-pointer { cursor: pointer; }
                .bg-white-hover:hover {
                    border-color: var(--primary-color) !important;
                    background: var(--primary-subtle) !important;
                }
            `}</style>
        </section>
    );
};

export default SolutionQuiz;
