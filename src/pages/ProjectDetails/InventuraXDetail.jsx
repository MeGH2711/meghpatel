import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub, FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import './css/InventuraXDetail.css';

// ── Data ─────────────────────────────────────────────────────────────────────

const PROJECT = {
    title: 'InventuraX',
    subtitle: 'Sales & Billing Software · Full-Stack',
    demo: 'https://inventuraxpro.vercel.app/',
    github: 'https://github.com/MeGH2711/inventuraxpro',
    year: '2025',
    type: 'Web App',
    status: 'Live',
    badges: [
        { label: 'Completed', variant: 'green' },
        { label: 'V2.0 Live', variant: 'blue' },
        { label: 'Open Source', variant: 'violet' },
    ],
    metrics: [
        { label: 'PDF Generation', value: 'Instant · Client-Side', accent: 'blue' },
        { label: 'Payment Mode', value: 'QR-Based UPI', accent: 'green' },
        { label: 'Offline Capability', value: '100% Offline Ready', accent: 'blue' },
        { label: 'Session Handling', value: 'Firebase Auth', accent: 'violet' },
    ],
    tech: ['ReactJS', 'Firebase', 'Bootstrap', 'Node.js', 'jsPDF', 'QR API'],
    vision: {
        problem:
            'Small and micro businesses in India are stuck using Excel sheets or expensive ERP tools for billing — neither built for their real-world, fast-paced workflow.',
        solution:
            'A lightweight, browser-based billing app with instant PDF invoicing, UPI QR code generation, and session-based access — zero setup, zero cost, runs anywhere.',
        audience:
            'Local shopkeepers, freelancers, and small retail businesses who need a professional invoicing tool without enterprise complexity or subscription fees.',
    },
    features: [
        {
            num: '01',
            name: 'Instant PDF Invoicing',
            desc: 'Client-side PDF generation via jsPDF — professional invoices printed and downloaded in under a second, no server round-trip required.',
        },
        {
            num: '02',
            name: 'QR-Based UPI Payments',
            desc: 'Auto-generates a scannable UPI QR code on every invoice with the exact amount pre-filled, so customers pay instantly from any UPI app.',
        },
        {
            num: '03',
            name: 'Session-Based Access',
            desc: 'Firebase Auth manages secure multi-user sessions — business owners log in once and their data persists across devices without any account management overhead.',
        },
        {
            num: '04',
            name: 'Sales & Inventory Tracking',
            desc: 'Real-time Firestore database tracks every transaction, product stock, and customer record — giving a live picture of business health at a glance.',
        },
        {
            num: '05',
            name: 'Offline Capability',
            desc: 'Core billing and PDF features work entirely offline. Firebase caches data locally so invoices can be created even without an internet connection.',
        },
        {
            num: '06',
            name: 'Clean Dashboard UI',
            desc: 'Minimal Bootstrap-based interface designed for speed — zero onboarding friction, keyboard-friendly, and accessible from mobile and desktop alike.',
        },
    ],
    challenges: [
        {
            type: 'challenge',
            title: 'PDF Layout Consistency Across Browsers',
            desc: 'Different browsers render HTML differently, causing jsPDF to produce inconsistent invoice layouts — fonts shifted, tables broke, and logo positions drifted between Chrome and Safari.',
        },
        {
            type: 'learning',
            title: 'Canvas-Based PDF Rendering',
            desc: 'Switched to a canvas-capture approach using html2canvas + jsPDF — rendering the invoice DOM element as a pixel-perfect image before embedding it in the PDF, eliminating all cross-browser inconsistencies.',
        },
        {
            type: 'challenge',
            title: 'UPI QR Deep-Link Formatting',
            desc: "India's UPI specification requires a precise URI format for QR codes to pre-fill merchant ID, name, and amount — any deviation causes payment apps to reject the QR entirely.",
        },
        {
            type: 'learning',
            title: 'UPI URI Spec & Dynamic QR Generation',
            desc: 'Studied the NPCI UPI deep-link specification thoroughly and built a URI composer that correctly encodes merchant VPA, name, and transaction amount — validated against PhonePe, GPay, and Paytm.',
        },
        {
            type: 'challenge',
            title: 'Firebase Firestore Cost & Read Efficiency',
            desc: 'Naively structured Firestore queries triggered unnecessary reads on every UI re-render, which could spiral costs at scale for a free-tier app.',
        },
        {
            type: 'learning',
            title: 'Optimistic UI + Batched Writes',
            desc: 'Implemented local state as the source of truth with React context, using Firebase as a sync layer — batch writes reduced round-trips and onSnapshot listeners replaced polling, keeping reads minimal.',
        },
    ],
};

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

// ── Sub-components ────────────────────────────────────────────────────────────

const AnimatedSection = ({ children, className, delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={stagger}
            transition={{ delayChildren: delay }}
        >
            {children}
        </motion.div>
    );
};

const Stat = ({ label, value, accent }) => (
    <motion.div className={`ix-metric-card ix-metric--${accent}`} variants={fadeUp}>
        <span className="ix-metric-label">{label}</span>
        <span className="ix-metric-value">{value}</span>
    </motion.div>
);

const Badge = ({ label, variant }) => (
    <span className={`ix-badge ix-badge--${variant}`}>
        <span className="ix-badge-dot" />
        {label}
    </span>
);

const FeatureItem = ({ num, name, desc, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            className="ix-feature-item"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.06, type: 'spring', stiffness: 90 }}
        >
            <span className="ix-feature-num">{num}</span>
            <div className="ix-feature-text">
                <div className="ix-feature-name">{name}</div>
                <div className="ix-feature-desc">{desc}</div>
            </div>
        </motion.div>
    );
};

const ChallengeItem = ({ type, title, desc, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            className={`ix-challenge-item ix-challenge--${type}`}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.07, type: 'spring', stiffness: 85 }}
        >
            <span className={`ix-challenge-tag ix-tag--${type}`}>
                {type === 'challenge' ? 'Challenge' : 'Learning'}
            </span>
            <div className="ix-challenge-content">
                <div className="ix-challenge-title">{title}</div>
                <div className="ix-challenge-desc">{desc}</div>
            </div>
        </motion.div>
    );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const InventuraXDetail = () => {

    const navigate = useNavigate();

    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="ix-page">

            {/* Back Button */}
            <button className="ix-back-button" onClick={() => navigate('/')}>
                <FaArrowLeft />
                <span>Back to Home</span>
            </button>

            {/* ── Stats Bar ── */}
            <motion.div
                ref={statsRef}
                className="ix-stats-bar"
                initial="hidden"
                animate={statsInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <div className="ix-stats-top">
                    <motion.div className="ix-proj-identity" variants={fadeUp}>
                        <h1 className="ix-proj-title">{PROJECT.title}</h1>
                        <span className="ix-proj-subtitle">{PROJECT.subtitle}</span>
                    </motion.div>
                    <motion.div className="ix-badges" variants={fadeUp}>
                        {PROJECT.badges.map(b => (
                            <Badge key={b.label} {...b} />
                        ))}
                    </motion.div>
                </div>

                <div className="ix-metrics-row">
                    {PROJECT.metrics.map(m => (
                        <Stat key={m.label} {...m} />
                    ))}
                </div>
            </motion.div>

            {/* ── Body ── */}
            <div className="ix-body-layout">

                {/* Sidebar */}
                <aside className="ix-sidebar">
                    <div className="ix-sidebar-thumb">
                        <div className="ix-thumb-inner">
                            <div className="ix-thumb-grid" />
                            <div className="ix-thumb-logo">
                                <div className="ix-thumb-icon">IX</div>
                                InventuraX
                            </div>
                        </div>
                        <div className="ix-thumb-meta">
                            {[
                                ['Type', PROJECT.type],
                                ['Status', PROJECT.status],
                                ['Year', PROJECT.year],
                            ].map(([k, v]) => (
                                <div key={k} className="ix-thumb-meta-row">
                                    <span className="ix-meta-label">{k}</span>
                                    <span className={`ix-meta-val ${k === 'Status' ? 'ix-meta-val--live' : ''}`}>{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <a href={PROJECT.demo} target="_blank" rel="noreferrer" className="ix-sidebar-btn ix-btn--primary">
                        <FaArrowUpRightFromSquare size={13} />
                        Live Preview
                    </a>

                    <a href={PROJECT.github} target="_blank" rel="noreferrer" className="ix-sidebar-btn ix-btn--secondary">
                        <FaGithub size={14} />
                        GitHub Repo
                    </a>

                    <div className="ix-sidebar-tech">
                        <div className="ix-section-micro-label">Tech Stack</div>
                        <div className="ix-tech-tags">
                            {PROJECT.tech.map(t => (
                                <span key={t} className="ix-tech-tag">{t}</span>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <div className="ix-main-content">

                    {/* Vision */}
                    <AnimatedSection className="ix-content-card">
                        <motion.div className="ix-card-header" variants={fadeUp}>
                            <div className="ix-card-icon ix-icon--blue">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                                    <path d="M8 5v3.5L10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="ix-card-title">Vision &amp; Purpose</span>
                        </motion.div>
                        <motion.div className="ix-vision-grid" variants={fadeUp}>
                            {[
                                { key: 'problem', label: 'Problem', text: PROJECT.vision.problem },
                                { key: 'solution', label: 'Solution', text: PROJECT.vision.solution },
                                { key: 'audience', label: 'Audience', text: PROJECT.vision.audience },
                            ].map(({ key, label, text }) => (
                                <div key={key} className={`ix-vision-block ix-vision-block--${key}`}>
                                    <span className={`ix-vision-label ix-vision-label--${key}`}>{label}</span>
                                    <p className="ix-vision-text">{text}</p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatedSection>

                    {/* Features */}
                    <div className="ix-content-card">
                        <div className="ix-card-header">
                            <div className="ix-card-icon ix-icon--violet">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                </svg>
                            </div>
                            <span className="ix-card-title">Key Features</span>
                        </div>
                        <div className="ix-features-grid">
                            {PROJECT.features.map((f, i) => (
                                <FeatureItem key={f.num} {...f} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Challenges */}
                    <div className="ix-content-card">
                        <div className="ix-card-header">
                            <div className="ix-card-icon ix-icon--amber">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2L9.5 6.5H14L10.25 9.25L11.75 13.5L8 10.5L4.25 13.5L5.75 9.25L2 6.5H6.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="ix-card-title">Challenges &amp; Learnings</span>
                        </div>
                        <div className="ix-challenge-list">
                            {PROJECT.challenges.map((c, i) => (
                                <ChallengeItem key={c.title} {...c} index={i} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default InventuraXDetail;
