import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaShoppingBag, FaArrowRight, FaStar } from 'react-icons/fa';
import SEO from '../components/SEO';
import products from '../data/products.json';
import CatalogueButton from '../components/CatalogueButton';

const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = React.useState('');
    const initialCategory = searchParams.get('category') || 'All';
    const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);

    React.useEffect(() => {
        const cat = searchParams.get('category') || 'All';
        setSelectedCategory(cat);
    }, [searchParams]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat === 'All') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', cat);
        }
        setSearchParams(searchParams);
    };

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(p => {
        const title = p.name?.toLowerCase() || '';
        const desc = p.shortDescription?.toLowerCase() || '';
        const term = searchTerm.toLowerCase();
        const matchesSearch = title.includes(term) || desc.includes(term);
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="shop-page pt-5">
            <SEO
                title="Herbalicious Shop | Organic, Handmade & Natural Solutions"
                description="Explore our full range of 100% organic wellness products. From goat milk soaps to miracle hair oils, find your natural match today."
            />

            {/* Header Section */}
            <div className="bg-light py-5 mb-5 overflow-hidden position-relative border-bottom">
                <Container className="position-relative">
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Fresh Batches Ready</Badge>
                                <h1 className="display-3 fw-bold mb-3">Our Natural <span className="text-primary">Repository</span></h1>
                                <p className="lead text-muted mb-0">
                                    Every item is handcrafted with care in Lahore, using 100% organic
                                    ingredients sourced directly from nature.
                                </p>
                            </motion.div>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block">
                            <img src="/Products/Herbalicious Shop.png" alt="Herbalicious Shop" className="img-fluid rounded-5 shadow-sm border" style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }} />
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
                                        key={cat}
                                        variant={selectedCategory === cat ? 'primary' : 'light'}
                                        size="sm"
                                        className={`rounded-pill px-4 py-2 border-0 fw-bold shadow-sm transition-all ${selectedCategory === cat ? '' : 'text-muted'}`}
                                        onClick={() => handleCategoryChange(cat)}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Results Count */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="text-muted mb-0">Showing <strong>{filteredProducts.length}</strong> products</p>
                    <div className="d-none d-md-block h-px bg-light flex-grow-1 mx-4"></div>
                    <Badge bg="white" text="dark" className="border px-3 py-2 rounded-pill fw-normal">
                        Silo Optimized Catalog
                    </Badge>
                </div>

                {/* Product Grid */}
                <Row className="g-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, idx) => (
                            <Col key={product.id} lg={3} md={4} sm={6}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                >
                                    <Card className="h-100 border-0 shadow-sm rounded-5 overflow-hidden product-card-v2 bg-white">
                                        <div className="position-relative overflow-hidden group">
                                            <Link to={`/product/${product.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="transition-all"
                                                    style={{ height: '280px', objectFit: 'cover' }}
                                                    onError={(e) => { e.target.src = '/Products/Herbalicious Shop.png'; }}
                                                />
                                            </Link>
                                            {product.oldPrice && (
                                                <Badge bg="danger" className="position-absolute top-0 end-0 m-3 rounded-pill px-3 py-2 shadow-sm">
                                                    SAVE {Math.round((1 - parseInt(product.price.replace(/[^0-9]/g, '')) / parseInt(product.oldPrice.replace(/[^0-9]/g, ''))) * 100)}%
                                                </Badge>
                                            )}
                                            <div className="card-actions position-absolute bottom-0 start-0 w-100 p-3 opacity-0 transition-all transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                                                <Button as={Link} to={`/product/${product.id}`} variant="white" className="w-100 rounded-pill shadow-sm fw-bold">
                                                    Quick View
                                                </Button>
                                            </div>
                                        </div>
                                        <Card.Body className="p-4 d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <small className="text-uppercase fw-bold text-primary" style={{ letterSpacing: '1px', fontSize: '0.65rem' }}>{product.category}</small>
                                                <div className="small text-warning">
                                                    <FaStar size={10} /><FaStar size={10} /><FaStar size={10} /><FaStar size={10} /><FaStar size={10} />
                                                </div>
                                            </div>
                                            <Card.Title className="h6 fw-bold mb-2 text-dark" style={{ minHeight: '2.5rem' }}>
                                                <Link to={`/product/${product.id}`} className="text-decoration-none text-dark hover-primary transition-all">
                                                    {product.name.split('(')[0]}
                                                </Link>
                                            </Card.Title>
                                            <div className="mb-3 d-flex align-items-baseline">
                                                <span className="h5 fw-bold text-primary mb-0">{product.price}</span>
                                                {product.oldPrice && (
                                                    <span className="text-muted text-decoration-line-through ms-2 small opacity-50">{product.oldPrice}</span>
                                                )}
                                            </div>
                                            <p className="text-muted small mb-4 flex-grow-1" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                                                {product.shortDescription || product.description.substring(0, 80) + '...'}
                                            </p>
                                            <Button
                                                as={Link}
                                                to={`/quote?productId=${product.id}`}
                                                variant="success"
                                                className="w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center"
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                <FaShoppingBag className="me-2" /> Buy via WhatsApp
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </AnimatePresence>
                </Row>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-5"
                    >
                        <div className="display-1 mb-4">🔍</div>
                        <h3 className="fw-bold text-dark">No matches found</h3>
                        <p className="text-muted mb-4">Try adjusting your search or filters to find what you're looking for.</p>
                        <Button
                            variant="primary"
                            className="rounded-pill px-5"
                            onClick={() => { setSearchTerm(''); handleCategoryChange('All'); }}
                        >
                            Reset All Filters
                        </Button>
                    </motion.div>
                )}

                {/* Bottom Trust Section */}
                <div className="mt-5 pt-5 text-center">
                    <Row className="g-4 justify-content-center">
                        <Col md={10}>
                            <div className="p-4 p-md-5 bg-dark text-white rounded-5 shadow">
                                <h2 className="fw-bold mb-4">Can't find exactly what you need?</h2>
                                <p className="lead opacity-75 mb-4">
                                    Our artisans can create custom organic blends tailored specifically for your unique skin or hair profile.
                                </p>
                                <div className="d-flex flex-wrap gap-3 justify-content-center">
                                    <Button as={Link} to="/quote" variant="outline-light" size="lg" className="rounded-pill px-5 fw-bold">
                                        Consult our Experts <FaArrowRight className="ms-2" />
                                    </Button>
                                    <CatalogueButton variant="outline-light" size="lg" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default ShopPage;
