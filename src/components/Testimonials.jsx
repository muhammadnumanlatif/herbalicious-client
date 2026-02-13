import React, { useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaMapMarkerAlt, FaCheckCircle, FaShoppingBag, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import reviews from '@/data/reviews.json';
import products from '@/src/data/products.json'; // Adjusted import path if needed, assuming src/components is the location

const Testimonials = ({ locationFilter }) => {
    // ... (rest of the logic)

    // In the return:
    // ...
    {
        relatedProduct && (
            <Link
                href={`/product/${relatedProduct.id}`}
                className="d-flex align-items-center p-2 rounded-3 bg-light text-decoration-none border transition-all hover-lift"
            >
                <img
    // ...
                                                        </Link>
        )
    }
    // ...
    <div className="text-center mt-5">
        <Link href="/shop" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
            Experience the Magic Yourself →
        </Link>
    </div>
    // ...

    export default Testimonials;
