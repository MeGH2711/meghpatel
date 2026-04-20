import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/HomeNavbar.css';
import logoImg from '../assets/images/logoBlack.webp'; // Using the same logo as global nav

const HomeNavbar = () => {
    const navLinks = [
        { name: 'About', path: '/about' },
        { name: 'Experience', path: '/experience' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <motion.nav
            className="home-nav"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="nav-container">
                <Link to="/" className="nav-logo-wrapper">
                    {/* Added 'brand-logo' class to match global theme logic */}
                    <img src={logoImg} alt="Logo" className="nav-custom-logo brand-logo" />
                </Link>

                <div className="nav-links">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path} className="nav-item">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="nav-status">
                    <span className="status-dot"></span>
                    <span className="status-text">Available</span>
                </div>
            </div>
        </motion.nav>
    );
};

export default HomeNavbar;