import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub, FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import './css/RoadMarkingDetail.css';

// ── Data ─────────────────────────────────────────────────────────────────────

const PROJECT = {
    title: 'Road Marking Segmentation',
    subtitle: 'Semantic Segmentation · Ensemble Deep Learning · Domain Adaptation',
    demo: '',
    github: 'https://github.com/MeGH2711/roadmarkingsegmentation',
    year: '2025',
    type: 'CV Research',
    status: 'Research Phase',
    badges: [
        { label: 'Completed', variant: 'green' },
        { label: 'Research Phase', variant: 'amber' },
        { label: 'Open Source', variant: 'violet' },
    ],
    metrics: [
        { label: 'Best mIoU', value: 'Ensemble Soft Vote', accent: 'green' },
        { label: 'Architectures', value: 'DeepLabV3+ & SegFormer', accent: 'blue' },
        { label: 'Loss Function', value: 'Dice + CrossEntropy', accent: 'violet' },
        { label: 'Domain Adapt.', value: 'CeyMo → AU Drone', accent: 'amber' },
    ],
    tech: [
        'Python', 'PyTorch', 'DeepLabV3+', 'SegFormer', 'ResNet-101', 'MiT-B2',
        'Albumentations', 'HuggingFace Transformers', 'FP16/AMP', 'YOLO Polygon Masks', 'OpenCV',
    ],
    vision: {
        problem:
            'Road marking detection in autonomous driving and drone-based infrastructure inspection is an unsolved precision problem — existing single-model segmenters trained on one domain fail catastrophically when deployed on footage from different camera angles, resolutions, or geographies. Labels like lane lines, arrows, crosswalks, and stop lines require pixel-perfect delineation that standard classifiers cannot deliver.',
        solution:
            'A two-stage ensemble pipeline: DeepLabV3+ (ResNet-101 backbone with ASPP) and SegFormer (MiT-B2 transformer) are independently trained on CeyMo road marking data, then domain-adapted via fine-tuning on AU drone footage. Their predictions are fused via Soft Voting (probability averaging) and Hard Voting (per-pixel majority), with Test-Time Augmentation — consistently outperforming any single model on mIoU.',
        audience:
            'Autonomous vehicle researchers, smart city infrastructure teams, drone-based road inspection agencies, and transportation authorities that need scalable, high-accuracy road marking analysis across diverse geographies.',
    },
    features: [
        {
            num: '01',
            name: 'DeepLabV3+ with ASPP (ResNet-101)',
            desc: 'Atrous Spatial Pyramid Pooling with dilated convolutions at rates [6, 12, 18] captures multi-scale context — critical for detecting road markings at varying distances and camera heights in drone footage.',
        },
        {
            num: '02',
            name: 'SegFormer Transformer (MiT-B2)',
            desc: 'HuggingFace SegFormerForSemanticSegmentation with Mix Transformer B2 backbone — self-attention across patch hierarchies captures long-range spatial dependencies that CNNs miss, especially for large continuous markings.',
        },
        {
            num: '03',
            name: 'Soft Vote + Hard Vote Ensemble',
            desc: 'Soft voting averages calibrated softmax probabilities per pixel; hard voting applies per-pixel majority class. Both strategies are benchmarked against individual models — with soft vote consistently winning on mIoU.',
        },
        {
            num: '04',
            name: 'YOLO Polygon → Semantic Mask Pipeline',
            desc: 'Custom converter transforms YOLO-format normalised polygon coordinates into pixel-level semantic masks — enabling seamless use of YOLO-annotated datasets for dense prediction tasks without re-labelling.',
        },
        {
            num: '05',
            name: 'Domain Adaptation: CeyMo → AU Drone',
            desc: 'Phase-1 pre-training on CeyMo road marking dataset establishes rich segmentation priors; Phase-2 fine-tuning on AU Drone frames adapts the model to aerial perspective, reducing domain shift without catastrophic forgetting.',
        },
        {
            num: '06',
            name: 'Dice + Cross-Entropy Hybrid Loss',
            desc: 'Combined loss (0.6× CrossEntropy + 0.4× Dice) with FP16 AMP, gradient clipping, and cosine annealing — stabilises training on imbalanced road marking classes where background pixels dominate.',
        },
        {
            num: '07',
            name: 'Test-Time Augmentation (TTA)',
            desc: 'Horizontal flip TTA applied at inference on both models before ensembling — averaging predictions across augmented views to reduce boundary artifacts and boost consistency on asymmetric markings.',
        },
        {
            num: '08',
            name: 'Per-Class IoU Analysis & CSV Export',
            desc: 'Full per-class IoU breakdown across all road marking categories (lanes, arrows, crosswalks, stop lines) exported as CSV and visualised as grouped bar charts — enabling systematic identification of weak classes.',
        },
    ],
    challenges: [
        {
            type: 'challenge',
            title: 'Extreme Class Imbalance in Road Markings',
            desc: 'Background pixels dominate road marking datasets by a factor of 50:1 — standard CrossEntropy training collapses to predicting background, making rare classes like stop lines and directional arrows near-invisible to the model.',
        },
        {
            type: 'learning',
            title: 'Hybrid Dice + CrossEntropy Loss Stabilises Rare Classes',
            desc: 'Combining Dice loss (class-balanced by design) with weighted CrossEntropy forces the model to attend to rare markings. The 60:40 CE–Dice ratio was tuned empirically to balance overall accuracy with per-class fairness.',
        },
        {
            type: 'challenge',
            title: 'Domain Shift Between Ground-Level and Drone Footage',
            desc: 'Models pre-trained on ground-level CeyMo images failed on AU Drone aerial data — perspective distortion, vanishing point shifts, and scale differences caused mIoU to drop dramatically without adaptation.',
        },
        {
            type: 'learning',
            title: 'Two-Phase Training with Pseudo-Label Bootstrapping',
            desc: 'Phase-1 CeyMo pre-training provides generalised road marking priors; Phase-2 fine-tuning on AU Drone data adapts geometry. Pseudo-labels generated from unlabelled drone frames further bootstrapped the fine-tuning set.',
        },
        {
            type: 'challenge',
            title: 'Ensemble Calibration: When Do Two Models Disagree?',
            desc: 'DeepLabV3+ excels at fine-grained local boundaries while SegFormer captures long-range coherence — their disagreements on thin markings (lane dashes, painted arrows) required careful calibration to avoid soft-vote blurring.',
        },
        {
            type: 'learning',
            title: 'Soft Vote Beats Hard Vote on Boundary Pixels',
            desc: 'Quantitative evaluation showed soft voting consistently outperformed hard voting, especially on boundary pixels where models had high entropy. Hard voting introduced artefacts when both models were equally uncertain.',
        },
        {
            type: 'challenge',
            title: 'YOLO Polygon Format Not Native to Segmentation Pipelines',
            desc: 'AU Drone dataset annotations used YOLO normalised polygon format — incompatible with standard semantic segmentation loaders that expect per-pixel label masks, requiring a custom polygon rasterisation converter.',
        },
        {
            type: 'learning',
            title: 'Custom YOLO → Mask Converter with OpenCV Rasterisation',
            desc: 'Built a converter using OpenCV fillPoly on normalised polygon coordinates to generate 512×512 semantic masks — enabling reuse of YOLO-annotated datasets for dense segmentation without any re-annotation overhead.',
        },
    ],
};

// ── Progression milestones ────────────────────────────────────────────────────

const milestones = [
    { label: 'DeepLabV3+ — Pre-train (CeyMo)', miou: 61, color: 'rmd-bar--neutral' },
    { label: 'SegFormer — Pre-train (CeyMo)', miou: 65, color: 'rmd-bar--blue' },
    { label: 'DeepLabV3+ — Fine-tuned (AU Drone)', miou: 72, color: 'rmd-bar--blue' },
    { label: 'SegFormer — Fine-tuned (AU Drone)', miou: 75, color: 'rmd-bar--violet' },
    { label: 'Hard Vote Ensemble', miou: 77, color: 'rmd-bar--green' },
    { label: 'Soft Vote Ensemble + TTA', miou: 80, color: 'rmd-bar--amber' },
];

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
    <motion.div className={`rmd-metric-card rmd-metric--${accent}`} variants={fadeUp}>
        <span className="rmd-metric-label">{label}</span>
        <span className="rmd-metric-value">{value}</span>
    </motion.div>
);

const Badge = ({ label, variant }) => (
    <span className={`rmd-badge rmd-badge--${variant}`}>
        <span className="rmd-badge-dot" />
        {label}
    </span>
);

const FeatureItem = ({ num, name, desc, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            className="rmd-feature-item"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.06, type: 'spring', stiffness: 90 }}
        >
            <span className="rmd-feature-num">{num}</span>
            <div className="rmd-feature-text">
                <div className="rmd-feature-name">{name}</div>
                <div className="rmd-feature-desc">{desc}</div>
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
            className={`rmd-challenge-item rmd-challenge--${type}`}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 85 }}
        >
            <span className={`rmd-challenge-tag rmd-tag--${type}`}>
                {type === 'challenge' ? 'Challenge' : 'Learning'}
            </span>
            <div className="rmd-challenge-content">
                <div className="rmd-challenge-title">{title}</div>
                <div className="rmd-challenge-desc">{desc}</div>
            </div>
        </motion.div>
    );
};

const MilestoneBar = ({ label, miou, color, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-30px' });
    return (
        <motion.div
            ref={ref}
            className="rmd-milestone-row"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.07 }}
        >
            <div className="rmd-milestone-meta">
                <span className="rmd-milestone-label">{label}</span>
                <span className="rmd-milestone-acc">{miou}%</span>
            </div>
            <div className="rmd-bar-track">
                <motion.div
                    className={`rmd-bar-fill ${color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${miou}%` } : {}}
                    transition={{ duration: 0.7, delay: index * 0.07 + 0.15, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const RoadMarkingDetail = () => {
    const navigate = useNavigate();
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="rmd-page">

            {/* Back Button */}
            <button className="rmd-back-button" onClick={() => navigate('/')}>
                <FaArrowLeft />
                <span>Back to Home</span>
            </button>

            {/* ── Stats Bar ── */}
            <motion.div
                ref={statsRef}
                className="rmd-stats-bar"
                initial="hidden"
                animate={statsInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <div className="rmd-stats-top">
                    <motion.div className="rmd-proj-identity" variants={fadeUp}>
                        <h1 className="rmd-proj-title">{PROJECT.title}</h1>
                        <span className="rmd-proj-subtitle">{PROJECT.subtitle}</span>
                    </motion.div>
                    <motion.div className="rmd-badges" variants={fadeUp}>
                        {PROJECT.badges.map(b => (
                            <Badge key={b.label} {...b} />
                        ))}
                    </motion.div>
                </div>

                <div className="rmd-metrics-row">
                    {PROJECT.metrics.map(m => (
                        <Stat key={m.label} {...m} />
                    ))}
                </div>
            </motion.div>

            {/* ── Body ── */}
            <div className="rmd-body-layout">

                {/* Sidebar */}
                <aside className="rmd-sidebar">
                    <div className="rmd-sidebar-thumb">
                        <div className="rmd-thumb-inner">
                            <div className="rmd-thumb-grid" />
                            <div className="rmd-thumb-logo">
                                <div className="rmd-thumb-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="10" width="20" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M11 4 L13 4 L12 10Z" fill="currentColor" opacity="0.7" />
                                        <path d="M11 20 L13 20 L12 14Z" fill="currentColor" opacity="0.7" />
                                        <circle cx="6" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="18" cy="12" r="1.2" fill="currentColor" />
                                    </svg>
                                </div>
                                Road Marking Segmentation
                            </div>
                        </div>
                        <div className="rmd-thumb-meta">
                            {[
                                ['Type', PROJECT.type],
                                ['Status', PROJECT.status],
                                ['Year', PROJECT.year],
                            ].map(([k, v]) => (
                                <div key={k} className="rmd-thumb-meta-row">
                                    <span className="rmd-meta-label">{k}</span>
                                    <span className={`rmd-meta-val ${k === 'Status' ? 'rmd-meta-val--research' : ''}`}>{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {PROJECT.demo ? (
                        <a href={PROJECT.demo} target="_blank" rel="noreferrer" className="rmd-sidebar-btn rmd-btn--primary">
                            <FaArrowUpRightFromSquare size={13} />
                            Live Preview
                        </a>
                    ) : (
                        <div className="rmd-sidebar-btn rmd-btn--disabled" title="No live deployment — models run locally">
                            <FaArrowUpRightFromSquare size={13} />
                            No Live Demo
                        </div>
                    )}

                    <a href={PROJECT.github} target="_blank" rel="noreferrer" className="rmd-sidebar-btn rmd-btn--secondary">
                        <FaGithub size={14} />
                        GitHub Repo
                    </a>

                    <div className="rmd-sidebar-tech">
                        <div className="rmd-section-micro-label">Tech Stack</div>
                        <div className="rmd-tech-tags">
                            {PROJECT.tech.map(t => (
                                <span key={t} className="rmd-tech-tag">{t}</span>
                            ))}
                        </div>
                    </div>

                    <div className="rmd-sidebar-contributor">
                        <div className="rmd-section-micro-label">Contributor</div>
                        <a
                            href="https://github.com/devanshi523"
                            target="_blank"
                            rel="noreferrer"
                            className="rmd-contributor-card"
                        >
                            <div className="rmd-contributor-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="rmd-contributor-info">
                                <span className="rmd-contributor-name">Devanshi Pathak</span>
                                <span className="rmd-contributor-link">@devanshi523</span>
                            </div>
                            <FaArrowUpRightFromSquare size={10} className="rmd-contributor-arrow" />
                        </a>
                        <a
                            href="https://github.com/Dharmi01"
                            target="_blank"
                            rel="noreferrer"
                            className="rmd-contributor-card"
                        >
                            <div className="rmd-contributor-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="rmd-contributor-info">
                                <span className="rmd-contributor-name">Dharmi Vekariya</span>
                                <span className="rmd-contributor-link">@Dharmi01</span>
                            </div>
                            <FaArrowUpRightFromSquare size={10} className="rmd-contributor-arrow" />
                        </a>
                        <a
                            href="https://github.com/konarkk12"
                            target="_blank"
                            rel="noreferrer"
                            className="rmd-contributor-card"
                        >
                            <div className="rmd-contributor-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="rmd-contributor-info">
                                <span className="rmd-contributor-name">Konark Karia</span>
                                <span className="rmd-contributor-link">@konarkk12</span>
                            </div>
                            <FaArrowUpRightFromSquare size={10} className="rmd-contributor-arrow" />
                        </a>
                    </div>

                </aside>

                {/* Main content */}
                <div className="rmd-main-content">

                    {/* Vision */}
                    <AnimatedSection className="rmd-content-card">
                        <motion.div className="rmd-card-header" variants={fadeUp}>
                            <div className="rmd-card-icon rmd-icon--green">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                                    <path d="M8 5v3.5L10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="rmd-card-title">Vision &amp; Purpose</span>
                        </motion.div>
                        <motion.div className="rmd-vision-grid" variants={fadeUp}>
                            {[
                                { key: 'problem', label: 'Problem', text: PROJECT.vision.problem },
                                { key: 'solution', label: 'Solution', text: PROJECT.vision.solution },
                                { key: 'audience', label: 'Audience', text: PROJECT.vision.audience },
                            ].map(({ key, label, text }) => (
                                <div key={key} className={`rmd-vision-block rmd-vision-block--${key}`}>
                                    <span className={`rmd-vision-label rmd-vision-label--${key}`}>{label}</span>
                                    <p className="rmd-vision-text">{text}</p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatedSection>

                    {/* mIoU Progression */}
                    <div className="rmd-content-card">
                        <div className="rmd-card-header">
                            <div className="rmd-card-icon rmd-icon--amber">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <polyline points="2,12 5,8 8,10 11,5 14,3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="rmd-card-title">mIoU Progression</span>
                        </div>
                        <div className="rmd-milestone-list">
                            {milestones.map((m, i) => (
                                <MilestoneBar key={m.label} {...m} index={i} />
                            ))}
                        </div>
                        <p className="rmd-milestone-note">
                            ⬆ Ensemble Soft Vote + TTA achieves the highest mIoU — outperforming both individual models by fusing DeepLabV3+'s local precision with SegFormer's <em>global spatial coherence</em>.
                        </p>
                    </div>

                    {/* Architecture overview */}
                    <div className="rmd-content-card">
                        <div className="rmd-card-header">
                            <div className="rmd-card-icon rmd-icon--blue">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <rect x="1" y="5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="9" y="5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                                    <path d="M7 8h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                    <path d="M4 2v3M4 11v3M12 2v3M12 11v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="rmd-card-title">Ensemble Architecture</span>
                        </div>
                        <div className="rmd-arch-grid">
                            {[
                                {
                                    label: 'DeepLabV3+',
                                    sub: 'ResNet-101 · ASPP',
                                    accent: 'blue',
                                    desc: 'CNN-based local feature extractor with multi-scale dilated convolutions. Strong on fine boundaries and small-scale road markings.',
                                },
                                {
                                    label: 'SegFormer',
                                    sub: 'MiT-B2 · Transformer',
                                    accent: 'violet',
                                    desc: 'Hierarchical attention-based encoder. Captures long-range spatial relationships — superior for large continuous lane lines.',
                                },
                                {
                                    label: 'Soft Vote',
                                    sub: 'Probability Averaging',
                                    accent: 'green',
                                    desc: 'Averages calibrated softmax probabilities per pixel. Best ensemble strategy — reduces boundary artefacts and uncertain regions.',
                                },
                                {
                                    label: 'Hard Vote',
                                    sub: 'Per-Pixel Majority',
                                    accent: 'amber',
                                    desc: 'Each model casts a class vote per pixel, majority wins. Fast and interpretable, but loses calibration on uncertain boundaries.',
                                },
                            ].map(({ label, sub, accent, desc }) => (
                                <div key={label} className={`rmd-arch-card rmd-arch--${accent}`}>
                                    <div className="rmd-arch-top">
                                        <span className="rmd-arch-label">{label}</span>
                                        <span className="rmd-arch-sub">{sub}</span>
                                    </div>
                                    <p className="rmd-arch-desc">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="rmd-content-card">
                        <div className="rmd-card-header">
                            <div className="rmd-card-icon rmd-icon--violet">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                </svg>
                            </div>
                            <span className="rmd-card-title">Key Features</span>
                        </div>
                        <div className="rmd-features-grid">
                            {PROJECT.features.map((f, i) => (
                                <FeatureItem key={f.num} {...f} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Challenges */}
                    <div className="rmd-content-card">
                        <div className="rmd-card-header">
                            <div className="rmd-card-icon rmd-icon--red">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2L9.5 6.5H14L10.25 9.25L11.75 13.5L8 10.5L4.25 13.5L5.75 9.25L2 6.5H6.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="rmd-card-title">Challenges &amp; Learnings</span>
                        </div>
                        <div className="rmd-challenge-list">
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

export default RoadMarkingDetail;
