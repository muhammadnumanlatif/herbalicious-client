import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar
            expand="lg"
            className={`sticky-header glass-effect ${scrolled ? 'shadow-sm' : ''}`}
            style={{ padding: '10px 0' }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/Products/logo.webp"
                        alt="Herbalicious Logo"
                        style={{ height: '50px', width: 'auto' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="fw-bold">Home</Nav.Link>
                        <Nav.Link as={Link} to="/shop" className="fw-bold">Shop</Nav.Link>
                        <Nav.Link as={Link} to="/ingredients" className="fw-bold">Ingredients</Nav.Link>
                        <Nav.Link as={Link} to="/blogs" className="fw-bold">Insights</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="fw-bold">Contact</Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/quote"
                            className="btn btn-primary text-white ms-lg-3 px-4"
                        >
                            Get a Quote
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
