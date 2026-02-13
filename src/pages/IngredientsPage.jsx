import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ingredients } from '../data/ingredients';
import { FaLeaf, FaMapMarkerAlt, FaHistory } from 'react-icons/fa';

const IngredientsPage = () => {
    return (
        <div className="ingredients-page pt-5 mt-5">
            <SEO
                title="Our Ingredients | The Science of Natural Wellness | Herbalicious"
                description="Explore the pure, organic botanical ingredients that make Herbalicious products effective and safe. From Amla to Magnesium, discover our subcontinental heritage."
            />

            <Container className="py-5">
                <div className="text-center mb-5 pb-4">
                    <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill mb-3">Ingredient Encyclopedia</Badge>
                    <h1 className="display-4 fw-bold">Pure. Potent. Proven.</h1>
                    <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
                        We believe in complete transparency. Every herb, oil, and mineral we use is selected for its bioactive potency and traditional heritage.
                    </p>
                </div>

                <Row className="g-4">
                    {ingredients.map((item, index) => (
                        <Col lg={4} md={6} key={item.id}>
                            <motion.di
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift">
                                    <div className="p-4 bg-primary text-white text-center">
                                        <div className="display-4 mb-2">{item.icon}</div>
                                        <h4 className="fw-bold mb-0">{item.name}</h4>
                                    </div>
                                    <Card.Body className="p-4">
                                        <div className="mb-3 pb-3 border-bottom">
                                            <div className="small fw-bold text-primary text-uppercase mb-2"><FaLeaf className="me-2" /> Primary Benefit</div>
                                            <p className="mb-0 text-dark">{item.benefits}</p>
                                        </div>
                                        <div className="mb-3">
                                            <div className="small fw-bold text-muted text-uppercase mb-2"><FaHistory className="me-2" /> Used In</div>
                                            <p className="mb-0 small">{item.usage}</p>
                                        </div>
                                        <div className="p-3 bg-light rounded-3">
                                            <div className="small fw-bold text-muted text-uppercase mb-1"><FaMapMarkerAlt className="me-2" /> Sourcing</div>
                                            <p className="mb-0 small fst-italic text-muted">{item.origin}</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.di>
                        </Col>
                    ))}
                </Row>

                <div className="mt-5 pt-5 text-center">
                    <div className="glass-effect p-5 rounded-5 border shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
                        <h2 className="fw-bold mb-3">Non-Toxic Guarantee</h2>
                        <p className="text-muted mb-0">
                            Our list isn't just about what we put in—it's about what we leave out.
                            <strong> Zero</strong> Parabens. <strong>Zero</strong> Sulfates. <strong>Zero</strong> Synthetic Phthalates.
                            Just pure subcontinental heritage in every bottle.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default IngredientsPage;
