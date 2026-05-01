import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './css/Navbar.css';
import logoImg from '../assets/images/logoBlack.avif';

const HomeNavbar = () => {
    // 1. State to track the ID of the section currently in view
    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { name: 'About', path: 'about' },
        { name: 'Techstack', path: 'techstack' },
        { name: 'Education', path: 'education' },
        { name: 'Projects', path: 'projects' },
        { name: 'Experience', path: 'workexperience' },
        { name: 'Certifications', path: 'certifications' },
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -70% 0px', // Triggers when section is near top
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
        
        // Observe all sections defined in App.js
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
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
                            // 2. Apply "active" class based on state
                            className={`nav-item ${activeSection === link.path ? 'active' : ''}`}
                            onClick={(e) => handleScroll(e, link.path)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
};

export default HomeNavbar;