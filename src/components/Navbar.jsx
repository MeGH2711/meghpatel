import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './css/Navbar.css';
import logoImg from '../assets/images/logoBlack.avif';
import ThemeToggle from './ThemeToggle'; // adjust path to wherever ThemeToggle.jsx actually lives

const HomeNavbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About', path: 'about' },
        { name: 'Techstack', path: 'techstack' },
        { name: 'Education', path: 'education' },
        { name: 'Projects', path: 'projects' },
        { name: 'Experience', path: 'workexperience' },
        { name: 'Certifications', path: 'certifications' },
        { name: 'Contact Me', path: 'contact' },
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -70% 0px',
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    // Close the mobile menu automatically if the viewport grows past the mobile breakpoint
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setIsMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                className="home-nav"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="nav-container">
                    <a
                        href="#home"
                        onClick={(e) => handleScroll(e, 'home')}
                        className="nav-logo-wrapper"
                    >
                        <img src={logoImg} alt="Logo" className="nav-custom-logo brand-logo" />
                    </a>

                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.path}`}
                                className={`nav-item ${activeSection === link.path ? 'active' : ''}`}
                                onClick={(e) => handleScroll(e, link.path)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="nav-right">
                        <ThemeToggle />

                        <button
                            type="button"
                            className={`nav-hamburger ${isMenuOpen ? 'open' : ''}`}
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="nav-mobile-menu"
                            initial={{ opacity: 0, y: -12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.97 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={`#${link.path}`}
                                    className={`nav-mobile-item ${activeSection === link.path ? 'active' : ''}`}
                                    onClick={(e) => handleScroll(e, link.path)}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.05 + i * 0.04 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="nav-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default HomeNavbar;