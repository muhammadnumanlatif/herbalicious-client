'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaPlus, FaCheck, FaShoppingCart, FaMagic } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import products from '@/src/data/products.json';

const soaps = products.filter(p => p.category === 'Skincare' || p.category === 'Soap');

export default function BundleBuilder() {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const { addToCart } = useCart();
    const MotionDiv = motion.div as any;

    const toggleItem = (product: any) => {
        if (selectedItems.find(item => item.id === product.id)) {
            setSelectedItems(selectedItems.filter(item => item.id !== product.id));
        } else {
            if (selectedItems.length < 3) {
                setSelectedItems([...selectedItems, product]);
            }
        }
    };

    const handleAddBundle = () => {
        selectedItems.forEach(item => addToCart(item));
        setSelectedItems([]);
        alert('Bundle added to your healing basket!');
    };

    return (
        <div className="bundle-builder-page pb-5">
            <div className="bg-primary text-white py-5 mb-5 text-center position-relative overflow-hidden">
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ background: 'url("/Products/Herbalicious Shop.png") center/cover' }}></div>
                <Container className="position-relative">
                    <Badge bg="light" text="primary" className="mb-3 px-3 py-2 rounded-pill">Limited Time Offer</Badge>
                    <h1 className="display-3 fw-bold mb-3">Artisan <span className="text-white-50">Bundle Builder</span></h1>
                    <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
                        Build your own personalized organic ritual. Pick <strong>any 3 artisan soaps</strong> and save 15% instantly.
                    </p>
                </Container>
            </div>

            <Container>
                <Row className="g-5">
                    <Col lg={8}>
                        <h3 className="fw-bold mb-4 d-flex align-items-center">
                            <FaLeaf className="text-primary me-3" /> Step 1: Choose Your Potions ({selectedItems.length}/3)
                        </h3>
                        <Row className="g-4">
                            {soaps.map((product) => {
                                const isSelected = selectedItems.find(item => item.id === product.id);
                                return (
                                    <Col md={6} key={product.id}>
                                        <Card
                                            className={`h-100 border-0 shadow-sm rounded-5 overflow-hidden transition-all cursor-pointer ${isSelected ? 'ring-primary border-primary border-2' : ''}`}
                                            onClick={() => toggleItem(product)}
                                        >
                                            <div className="position-relative">
                                                <Card.Img src={product.image} style={{ height: '220px', objectFit: 'cover' }} />
                                                {isSelected && (
                                                    <div className="position-absolute top-0 end-0 m-3 bg-primary text-white p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                        <FaCheck />
                                                    </div>
                                                )}
                                            </div>
                                            <Card.Body className="p-4">
                                                <h6 className="fw-bold mb-1">{product.name}</h6>
                                                <p className="smaller text-muted mb-0">{product.category}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>

                    <Col lg={4}>
                        <div className="sticky-top" style={{ top: '100px' }}>
                            <h3 className="fw-bold mb-4 d-flex align-items-center">
                                <FaMagic className="text-primary me-3" /> Your Ritual
                            </h3>
                            <Card className="border-0 shadow-lg rounded-5 bg-white overflow-hidden">
                                <Card.Body className="p-4">
                                    <div className="bundle-slots mb-4">
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className={`d-flex align-items-center p-3 rounded-4 border border-dashed mb-2 ${selectedItems[i] ? 'bg-light border-0' : 'text-muted opacity-50'}`}>
                                                {selectedItems[i] ? (
                                                    <>
                                                        <img src={selectedItems[i].image} width={40} height={40} className="rounded-2 me-3" />
                                                        <div className="small fw-bold text-truncate">{selectedItems[i].name}</div>
                                                    </>
                                                ) : (
                                                    <div className="small w-100 text-center">Empty Slot {i + 1}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-3 border-top">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted small">Bundle Price</span>
                                            <span className="fw-bold h5">Rs. 3,600</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-4 text-success small fw-bold">
                                            <span>You Save</span>
                                            <span>- Rs. 650</span>
                                        </div>
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-100 rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center"
                                            disabled={selectedItems.length < 3}
                                            onClick={handleAddBundle}
                                        >
                                            <FaPlus className="me-2" /> {selectedItems.length < 3 ? `Add ${3 - selectedItems.length} More` : 'Add Bundle to Cart'}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .ring-primary {
                    box-shadow: 0 0 0 3px var(--bs-primary) !important;
                }
                .cursor-pointer { cursor: pointer; }
            `}</style>
        </div>
    );
}
