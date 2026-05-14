import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import './css/Footer.css';

const Footer = () => {
    // Synchronized navigation mechanism from Navbar
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

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="footer-container">
                {/* ── Large Background Brand Text ── */}
                <div className="footer-bg-text">MEGH</div>

                {/* ── Top Row: Big CTA ── */}
                <div className="footer-top">
                    <motion.div
                        className="footer-cta"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="footer-big-heading">
                            Ready to start <br />
                            <span className="heading-accent">the next chapter?</span>
                        </h2>
                        <a href="mailto:patelmeghmahesh2701@gmail.com" className="footer-mail-link">
                            patelmeghmahesh2701@gmail.com
                            <span className="mail-underline" />
                        </a>
                    </motion.div>

                    {/* Updated to use handleScroll for consistency */}
                    <button
                        className="back-to-top"
                        onClick={(e) => handleScroll(e, 'home')}
                        aria-label="Back to top"
                    >
                        <FaArrowUp />
                    </button>
                </div>

                <div className="footer-divider" />

                {/* ── Bottom Row: Links & Copyright ── */}
                <div className="footer-bottom">
                    <div className="footer-info">
                        <span className="footer-logo">MP.</span>
                        <p className="footer-tagline">AI Engineer & Designer based in India.</p>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-link-group">
                            <span className="link-label">Navigation</span>
                            {/* Applied handleScroll to internal links */}
                            <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
                            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>Projects</a>
                            <a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a>
                        </div>
                        <div className="footer-link-group">
                            <span className="link-label">Socials</span>
                            <a href="https://github.com/megh2711" target="_blank" rel="noreferrer" aria-label="Visit GitHub (opens in new window)">GitHub</a>
                            <a href="https://linkedin.com/meghpatel2711" target="_blank" rel="noreferrer" aria-label="Visit LinkedIn (opens in new window)">LinkedIn</a>
                            <a href="https://twitter.com/meghthebaadal" target="_blank" rel="noreferrer" aria-label="Visit Twitter (opens in new window)">Twitter</a>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <span>© {currentYear} Megh Patel. Built with React & Framer Motion.</span>
                    <div className="footer-social-icons">
                        <a href="https://github.com/megh2711" target="_blank" rel="noreferrer" aria-label="GitHub (opens in new window)"><FaGithub /></a>
                        <a href="https://linkedin.com/meghpatel2711" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new window)"><FaLinkedin /></a>
                        <a href="https://twitter.com/meghthebaadal" target="_blank" rel="noreferrer" aria-label="Twitter (opens in new window)"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            {/* Ambient Glow to match About page */}
            <div className="footer-glow" />
        </footer>
    );
};

export default Footer;