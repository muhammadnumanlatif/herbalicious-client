'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaShoppingBag, FaArrowRight, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

import { Product } from '@/src/types';
import { useCart } from '@/context/CartContext';

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
    const { addToCart } = useCart();
    const MotionDiv = motion.div as any;
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const initialCategory = searchParams.get('category') || 'All';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    useEffect(() => {
        const cat = searchParams.get('category') || 'All';
        setSelectedCategory(cat);
    }, [searchParams]);

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        const params = new URLSearchParams(searchParams.toString());
        if (cat === 'All') {
            params.delete('category');
        } else {
            params.set('category', cat);
        }
        router.push(`/shop?${params.toString()}`);
    };

    const categories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))];

    const filteredProducts = initialProducts.filter(p => {
        const title = p.name?.toLowerCase() || '';
        const desc = p.shortDescription?.toLowerCase() || '';
        const term = searchTerm.toLowerCase();
        const matchesSearch = title.includes(term) || desc.includes(term);
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="shop-page pt-5">
            {/* Header Section */}
            <div className="bg-light py-5 mb-5 overflow-hidden position-relative border-bottom">
                <Container className="position-relative">
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <MotionDiv initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                                <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Fresh Batches Ready</Badge>
                                <h1 className="display-3 fw-bold mb-3">Our Natural <span className="text-primary">Repository</span></h1>
                                <p className="lead text-muted mb-0">
                                    Every item is handcrafted with care in Lahore, using 100% organic
                                    ingredients sourced directly from nature.
                                </p>
                            </MotionDiv>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block">
                            <div className="img-placeholder bg-secondary-subtle rounded-5 shadow-sm border" style={{ height: '300px' }}></div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-4">
                {/* Search and Filters */}
                <div className="shop-toolbar glass-effect p-2 p-md-4 rounded-5 shadow-sm bg-white border mb-5">
                    <Row className="g-4 align-items-center">
                        <Col lg={4}>
                            <InputGroup className="bg-light rounded-pill border-0 px-3">
                                <InputGroup.Text className="bg-transparent border-0 text-muted">
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    className="bg-transparent border-0 py-3 shadow-none"
                                    placeholder="Search for solutions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col lg={8}>
                            <div className="d-flex flex-wrap gap-2 justify-content-lg-end align-items-center">
                                <span className="small fw-bold text-muted me-2 d-none d-md-inline">
                                    <FaFilter className="me-1" /> Category:
                                </span>
                                {categories.map(cat => (
                                    <Button
                                        key={cat as string}
                                        variant={selectedCategory === cat ? 'primary' : 'light'}
                                        size="sm"
                                        className={`rounded-pill px-4 py-2 border-0 fw-bold shadow-sm transition-all ${selectedCategory === cat ? '' : 'text-muted'}`}
                                        onClick={() => handleCategoryChange(cat as string)}
                                    >
                                        {cat as string}
                                    </Button>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Product Grid */}
                <Row className="g-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, idx) => (
                            <Col key={product.id} lg={3} md={4} sm={6}>
                                <MotionDiv
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                >
                                    <Card className="h-100 border-0 shadow-sm rounded-5 overflow-hidden product-card-v2 bg-white">
                                        <Link href={`/product/${product.id}`}>
                                            <Card.Img
                                                variant="top"
                                                src={product.image}
                                                alt={product.name}
                                                style={{ height: '280px', objectFit: 'cover' }}
                                            />
                                        </Link>
                                        <Card.Body className="p-4 d-flex flex-column">
                                            <Card.Title className="h6 fw-bold mb-1">{product.name}</Card.Title>
                                            <p className="text-muted small mb-2">{product.category}</p>
                                            <div className="mb-3 mt-auto">
                                                <span className="h5 fw-bold text-primary">{product.price}</span>
                                            </div>
                                            <div className="d-grid gap-2">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="rounded-pill py-2 fw-bold"
                                                    onClick={() => addToCart(product)}
                                                >
                                                    Add to Basket
                                                </Button>
                                                <Link href={`/product/${product.id}`} className="btn btn-outline-light btn-sm rounded-pill py-2 text-dark border">
                                                    View Details
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </MotionDiv>
                            </Col>
                        ))}
                    </AnimatePresence>
                </Row>
            </Container>
        </div>
    );
}
