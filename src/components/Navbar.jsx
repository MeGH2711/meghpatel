import React from 'react';
import { motion } from 'framer-motion';
import './css/Navbar.css';
import logoImg from '../assets/images/logoBlack.avif';

const HomeNavbar = () => {
    const navLinks = [
        { name: 'About', path: 'about' },
        { name: 'Techstack', path: 'techstack' },
        { name: 'Education', path: 'education' },
        { name: 'Projects', path: 'projects' },
        { name: 'Experience', path: 'workexperience' },
        { name: 'Certifications', path: 'certifications' },
    ];

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
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
                            className="nav-item"
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