import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './css/Socials.css';

const socialLinks = [
    {
        icon: FaGithub,
        link: 'https://www.github.com/MeGH2711',
        label: 'GitHub',
        handle: '@MeGH2711',
        desc: 'Code & Projects',
        color: '#e2e8f0',
        glow: 'rgba(226,232,240,0.18)',
    },
    {
        icon: FaLinkedin,
        link: 'https://www.linkedin.com/in/meghpatel2711',
        label: 'LinkedIn',
        handle: 'meghpatel2711',
        desc: 'Professional Network',
        color: '#0a66c2',
        glow: 'rgba(10,102,194,0.28)',
    },
    {
        icon: FaInstagram,
        link: 'https://www.instagram.com/megh_vekaria',
        label: 'Instagram',
        handle: '@megh_vekaria',
        desc: 'Life & Moments',
        color: '#e1306c',
        glow: 'rgba(225,48,108,0.25)',
    },
    {
        icon: FaYoutube,
        link: 'https://www.youtube.com/@meghthebaadal',
        label: 'YouTube',
        handle: '@meghthebaadal',
        desc: 'Videos & Tutorials',
        color: '#ff0000',
        glow: 'rgba(255,0,0,0.22)',
    },
    {
        icon: FaXTwitter,
        link: 'https://www.x.com/meghthebaadal',
        label: 'X (Twitter)',
        handle: '@mojilomegh',
        desc: 'Thoughts & Updates',
        color: '#e7e9ea',
        glow: 'rgba(231,233,234,0.15)',
    },
    {
        icon: FaEnvelope,
        link: 'mailto:patelmeghmahesh2701@gmail.com',
        label: 'Email',
        handle: 'patelmeghmahesh2701',
        desc: 'Say Hello Directly',
        color: '#3b82f6',
        glow: 'rgba(59,130,246,0.28)',
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 18 } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const SocialCard = ({ icon: Icon, link, label, handle, desc, color, glow, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.a
            ref={ref}
            href={link}
            target={link.startsWith('mailto') ? undefined : '_blank'}
            rel={link.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="social-card"
            aria-label={link.startsWith('mailto') ? label : `${label} (opens in new window)`}
            style={{ '--card-color': color, '--card-glow': glow }}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.07, type: 'spring', stiffness: 80 }}
            whileHover={{ y: -6, scale: 1.025 }}
        >
            <div className="social-card-top">
                <span className="social-icon-wrap">
                    <Icon className="social-icon" />
                </span>
                <span className="social-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label='Socials Arrow Icon'>
                        <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>

            <div className="social-card-body">
                <span className="social-label">{label}</span>
                <span className="social-handle">{handle}</span>
                <span className="social-desc">{desc}</span>
            </div>

            <div className="social-card-glow" />
            <div className="social-card-shimmer" />
        </motion.a>
    );
};

const Socials = () => {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

    return (
        <section className="socials-section">

            {/* ── Header ── */}
            <motion.div
                ref={headingRef}
                className="socials-header"
                initial="hidden"
                animate={headingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    Find Me Online
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="socials-heading" variants={fadeUp}>
                    Let's{' '}
                    <span className="heading-accent">connect</span>
                    <br />
                    across the web.
                </motion.h2>

                <motion.p className="socials-subheading" variants={fadeUp}>
                    Whether it's code, content, or conversation. I'm only a click away. Pick your platform and let's talk.
                </motion.p>
            </motion.div>

            {/* ── Cards Grid ── */}
            <div className="socials-grid">
                {socialLinks.map((s, i) => (
                    <SocialCard key={s.label} {...s} index={i} />
                ))}
            </div>

            {/* ── Bottom note ── */}
            <motion.p
                className="socials-footnote"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                Always open to interesting conversations, collabs, and opportunities.
            </motion.p>
        </section>
    );
};

export default Socials;
