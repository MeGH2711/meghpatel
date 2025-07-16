import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/Navbar.css';
import '../index.css';
import logo from '../assets/images/logoBlack.webp';

const MyNavbar = () => {
    const [hideNavbar, setHideNavbar] = useState(false);
    const lastScrollY = useRef(0);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setHideNavbar(true);
            } else {
                setHideNavbar(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2 + i * 0.1,
                duration: 0.4,
                ease: 'easeOut'
            }
        })
    };

    return (
        <div
            ref={navRef}
            className={`navbar-wrapper ${hideNavbar ? 'navbar-hidden' : ''}`}
        >
            <Navbar expand="lg" className="custom-navbar">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <Navbar.Brand as={NavLink} to="/">
                            <img
                                src={logo}
                                alt="Brand Logo"
                                height="60"
                                className="d-inline-block align-middle"
                            />
                        </Navbar.Brand>
                    </motion.div>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {['/', '/about', '/experience', '/projects', '/contact'].map((path, i) => (
                                <motion.div
                                    key={path}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={navItemVariants}
                                >
                                    <Nav.Link
                                        as={NavLink}
                                        to={path}
                                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    >
                                        {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                                    </Nav.Link>
                                </motion.div>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default MyNavbar;
