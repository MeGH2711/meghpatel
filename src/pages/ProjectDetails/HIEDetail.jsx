import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaArrowLeft, FaBrain, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import './css/HIEDetail.css';

// ── Data ─────────────────────────────────────────────────────────────────────

const PROJECT = {
    title: 'HIE Lesion Seg.',
    subtitle: 'Medical AI · Deep Learning · Image Segmentation',
    github: '',
    year: '2025',
    type: 'Research · AI/ML',
    status: 'In Development',
    badges: [
        { label: 'Research Phase', variant: 'amber' },
        { label: 'Deep Learning', variant: 'teal' },
        { label: 'Medical AI', variant: 'violet' },
    ],
    metrics: [
        { label: 'Test Dice Score', value: '0.542 Dice', accent: 'teal' },
        { label: 'Test Mean IoU', value: '0.421 IoU', accent: 'violet' },
        { label: 'vs. ADC Baseline', value: '+0.28 Dice Gain', accent: 'green' },
        { label: 'Dataset Size', value: '133 Neonates', accent: 'amber' },
    ],
    tech: ['PyTorch', 'MONAI', 'Swin-UNet', 'SimpleITK', 'NumPy', 'OpenCV', 'NIfTI', 'Google Colab'],
    vision: {
        problem:
            'Neonatal Hypoxic-Ischemic Encephalopathy (HIE) affects 1–5 per 1,000 live births worldwide — 750,000 cases annually. Despite treatment, ~1/3 of infants still die or develop neurocognitive deficits. Current best DL segmentation achieves only ~0.5 Dice, far below the 0.8+ seen in brain tumor benchmarks.',
        solution:
            'A 2.5D Swin-UNet architecture with 6-channel input (ADC + Z-ADC triplet stacks) that gives the transformer volumetric spatial context without full 3D overhead. Combined Dice+BCE loss with pos_weight=30 addresses extreme class imbalance where over 55% of patients have lesions occupying less than 1% of brain volume.',
        audience:
            'Neonatal neurologists, neuroradiologists, and clinical AI researchers working on early brain injury diagnosis. The BONBID-HIE public dataset (133 patients, 5 expert consensus annotations) makes this directly reproducible for medical imaging researchers.',
    },
    features: [
        {
            num: '01',
            name: '2.5D Transformer Architecture',
            desc: 'Stacks adjacent MRI slices (i−1, i, i+1) from both ADC and Z-ADC maps into a 6-channel input, giving the Swin-UNet volumetric 3D context without the compute cost of full 3D attention.',
        },
        {
            num: '02',
            name: 'Swin-UNet with Skip Connections',
            desc: 'Pure transformer encoder-decoder with Window Multi-Head Self-Attention (W-MSA) and Shifted Window Attention (SW-MSA). ~28M parameters capturing long-range anatomical dependencies across the neonatal brain.',
        },
        {
            num: '03',
            name: 'Extreme Class Imbalance Handling',
            desc: 'Combined Dice + BCE loss (0.5:0.5) with BCE pos_weight=30 specifically addresses the severe imbalance where lesion voxels may represent <1% of total brain volume in the majority of patients.',
        },
        {
            num: '04',
            name: 'Z-ADC Dual-Channel Input',
            desc: 'Z-score normalized ADC maps (ZADC) quantify voxel-wise deviations from a healthy neonatal atlas — ZADC@−2 alone achieves 0.54 Dice, and combining it with raw ADC as a 6-channel input enriches feature representation.',
        },
        {
            num: '05',
            name: 'BONBID-HIE Dataset Integration',
            desc: 'Trained on the first public neonatal HIE MRI dataset — 133 patients across GE 1.5T and Siemens 3T scanners with multi-expert consensus annotations from 5 neuroradiologists, split 89/44 train/test.',
        },
        {
            num: '06',
            name: 'Preprocessing & Augmentation Pipeline',
            desc: 'End-to-end pipeline: skull stripping, percentile clipping [p1, p99], volume normalization, .mha → NIfTI conversion, and augmentations (random flips, 90° rotations, brightness jitter ±15%) for robust generalization.',
        },
    ],
    challenges: [
        {
            type: 'challenge',
            title: 'Severe Class Imbalance (<1% Lesion Voxels)',
            desc: 'Over 55% of patients have lesions occupying less than 1% of total brain volume — naive cross-entropy loss caused the model to predict "no lesion" everywhere and still achieve 99%+ pixel accuracy while Dice remained near zero.',
        },
        {
            type: 'learning',
            title: 'Dice + BCE Combined Loss with pos_weight=30',
            desc: 'Replaced standard loss with a 0.5×DiceLoss + 0.5×BCEWithLogitsLoss combination; the BCE pos_weight=30 aggressively penalizes missed lesion voxels, forcing the model to locate even tiny focal abnormalities.',
        },
        {
            type: 'challenge',
            title: 'Multi-Scanner Domain Gap (GE 1.5T vs Siemens 3T)',
            desc: 'The dataset spans two scanner types with different field strengths and signal characteristics. Without careful normalization, the model learns scanner-specific artifacts rather than lesion features, causing poor generalization.',
        },
        {
            type: 'learning',
            title: 'Z-ADC Maps as Scanner-Invariant Features',
            desc: 'Z-score normalized ADC maps (ZADC) express each voxel as deviation from a healthy neonatal atlas, effectively normalizing away scanner-specific intensity ranges and providing a physically meaningful lesion signal.',
        },
        {
            type: 'challenge',
            title: 'Boundary Slice Artifacts in 2.5D Stacking',
            desc: 'Slices at the start/end of each MRI volume have no valid neighboring slices, creating undefined channels in the 2.5D triplet input and causing erratic predictions at volume boundaries during inference.',
        },
        {
            type: 'learning',
            title: 'Boundary Padding with Slice Repetition',
            desc: 'Implemented boundary repeat padding — the first slice is replicated for the "i−1" channel and the last slice for the "i+1" channel at volume edges. This ensures all slices receive valid 6-channel input consistently.',
        },
    ],
    architecture: {
        model: '2.5D Swin-UNet',
        params: '~28M Parameters',
        input: '6-channel (3 ADC + 3 Z-ADC slices)',
        imgSize: '224 × 224 px',
        embedDim: '96',
        depths: '[2, 2, 6, 2]',
        numHeads: '[3, 6, 12, 24]',
        windowSize: '7',
        loss: '0.5 × Dice + 0.5 × BCE',
        optimizer: 'AdamW (LR=1e-4)',
        epochs: '100 (Early Stop @ 83)',
        scheduler: 'Cosine Annealing',
    },
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
            transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 85 }}
        >
            <span className={`ix-challenge-tag ix-tag--${type}`}>{type === 'challenge' ? 'Challenge' : 'Learning'}</span>
            <div className="ix-challenge-content">
                <div className="ix-challenge-title">{title}</div>
                <div className="ix-challenge-desc">{desc}</div>
            </div>
        </motion.div>
    );
};

// ── Architecture Spec Card ────────────────────────────────────────────────────

const ArchCard = ({ label, value }) => (
    <div className="hie-arch-row">
        <span className="hie-arch-label">{label}</span>
        <span className="hie-arch-val">{value}</span>
    </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const HIEDetail = () => {

    const navigate = useNavigate();

    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="ix-page hie-page">

            {/* Back Button */}
            <button className="ix-back-button" onClick={() => navigate('/')}>
                <FaArrowLeft />
                <span>Back to Home</span>
            </button>

            {/* ── Stats Bar ── */}
            <motion.div
                ref={statsRef}
                className="ix-stats-bar hie-stats-bar"
                initial="hidden"
                animate={statsInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <div className="ix-stats-top">
                    <motion.div className="ix-proj-identity" variants={fadeUp}>
                        <h1 className="ix-proj-title">
                            Neonatal HIE
                            <span className="hie-title-sub"> Lesion Segmentation</span>
                        </h1>
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
                    <div className="ix-sidebar-thumb hie-sidebar-thumb">
                        <div className="ix-thumb-inner hie-thumb-inner">
                            <div className="ix-thumb-grid hie-thumb-grid" />
                            {/* Animated brain-scan visual */}
                            <div className="hie-thumb-visual">
                                <div className="hie-scan-rings">
                                    <div className="hie-ring hie-ring--1" />
                                    <div className="hie-ring hie-ring--2" />
                                    <div className="hie-ring hie-ring--3" />
                                </div>
                                <div className="hie-thumb-icon">
                                    <FaBrain size={22} />
                                </div>
                            </div>
                            <div className="hie-thumb-label">2.5D Swin-UNet</div>
                        </div>
                        <div className="ix-thumb-meta">
                            {[
                                ['Type', PROJECT.type],
                                ['Status', PROJECT.status],
                                ['Year', PROJECT.year],
                            ].map(([k, v]) => (
                                <div key={k} className="ix-thumb-meta-row">
                                    <span className="ix-meta-label">{k}</span>
                                    <span className={`ix-meta-val ${k === 'Status' ? 'hie-meta-dev' : ''}`}>{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {PROJECT.github && (
                        <a
                            href={PROJECT.github}
                            target="_blank"
                            rel="noreferrer"
                            className="ix-sidebar-btn ix-btn--secondary hie-btn--github"
                        >
                            <FaGithub size={14} />
                            GitHub Repo
                        </a>
                    )}

                    <div className="ix-sidebar-tech">
                        <div className="ix-section-micro-label">Tech Stack</div>
                        <div className="ix-tech-tags">
                            {PROJECT.tech.map(t => (
                                <span key={t} className="ix-tech-tag hie-tech-tag">{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Architecture quick-ref */}
                    <div className="ix-sidebar-tech hie-arch-card">
                        <div className="ix-section-micro-label">Model Config</div>
                        <div className="hie-arch-list">
                            {[
                                ['Model', PROJECT.architecture.model],
                                ['Params', PROJECT.architecture.params],
                                ['Input', PROJECT.architecture.input],
                                ['Img Size', PROJECT.architecture.imgSize],
                                ['Loss', PROJECT.architecture.loss],
                                ['Optimizer', PROJECT.architecture.optimizer],
                            ].map(([k, v]) => (
                                <ArchCard key={k} label={k} value={v} />
                            ))}
                        </div>
                    </div>

                    <div className="bsd-sidebar-contributor">
                        <div className="bsd-section-micro-label">Contributor</div>
                        <a
                            href="https://github.com/Dharmi01"
                            target="_blank"
                            rel="noreferrer"
                            className="bsd-contributor-card"
                        >
                            <div className="bsd-contributor-avatar">
                                {/* Replace with an actual img tag if you have a URL, otherwise using a stylized icon */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="bsd-contributor-info">
                                <span className="bsd-contributor-name">Dharmi Vekariya</span>
                                <span className="bsd-contributor-link">@Dharmi01</span>
                            </div>
                            <FaArrowUpRightFromSquare size={10} className="bsd-contributor-arrow" />
                        </a>
                        <a
                            href="https://github.com/devanshi523"
                            target="_blank"
                            rel="noreferrer"
                            className="bsd-contributor-card"
                        >
                            <div className="bsd-contributor-avatar">
                                {/* Replace with an actual img tag if you have a URL, otherwise using a stylized icon */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="bsd-contributor-info">
                                <span className="bsd-contributor-name">Devanshi Pathak</span>
                                <span className="bsd-contributor-link">@devanshi523</span>
                            </div>
                            <FaArrowUpRightFromSquare size={10} className="bsd-contributor-arrow" />
                        </a>
                    </div>
                </aside>

                {/* Main content */}
                <div className="ix-main-content">

                    {/* Vision */}
                    <AnimatedSection className="ix-content-card">
                        <motion.div className="ix-card-header" variants={fadeUp}>
                            <div className="ix-card-icon hie-icon--teal">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                                    <path d="M5 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
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

                    {/* Architecture Overview */}
                    <AnimatedSection className="ix-content-card">
                        <motion.div className="ix-card-header" variants={fadeUp}>
                            <div className="ix-card-icon hie-icon--teal">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <rect x="1" y="6" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
                                    <rect x="6" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
                                    <rect x="6" y="11" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
                                    <rect x="11" y="6" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
                                    <path d="M5 8h1M10 8h1M8 5v1M8 10v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="ix-card-title">Architecture Overview</span>
                        </motion.div>
                        <motion.div className="hie-pipeline" variants={fadeUp}>
                            {[
                                { label: 'Input', sub: '6×224×224', desc: 'ADC+ZADC 2.5D Stack', color: 'teal' },
                                { label: 'Patch Partition', sub: '4×4 patches', desc: '→ Token Embeddings', color: 'violet' },
                                { label: 'Swin Encoder', sub: '4 Stages', desc: 'W-MSA + SW-MSA', color: 'violet' },
                                { label: 'Bottleneck', sub: 'Embed 768', desc: 'Global Context', color: 'amber' },
                                { label: 'Swin Decoder', sub: '4 Stages', desc: 'Skip Connections', color: 'violet' },
                                { label: 'Output', sub: '1×224×224', desc: 'Binary Lesion Mask', color: 'green' },
                            ].map((step, i, arr) => (
                                <React.Fragment key={step.label}>
                                    <div className={`hie-pipe-step hie-pipe--${step.color}`}>
                                        <span className="hie-pipe-label">{step.label}</span>
                                        <span className="hie-pipe-sub">{step.sub}</span>
                                        <span className="hie-pipe-desc">{step.desc}</span>
                                    </div>
                                    {i < arr.length - 1 && (
                                        <div className="hie-pipe-arrow">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </motion.div>

                        {/* Results callout */}
                        <motion.div className="hie-results-row" variants={fadeUp}>
                            {[
                                { label: 'Test Mean Dice', value: '0.542', note: 'slice-level avg' },
                                { label: 'Test Mean IoU', value: '0.421', note: 'Jaccard index' },
                                { label: 'Best Val Dice', value: '0.561', note: 'peak checkpoint' },
                                { label: 'vs ZADC@−2.0', value: '≈ Matches', note: 'published baseline' },
                            ].map(r => (
                                <div key={r.label} className="hie-result-chip">
                                    <span className="hie-result-val">{r.value}</span>
                                    <span className="hie-result-label">{r.label}</span>
                                    <span className="hie-result-note">{r.note}</span>
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
                            <span className="ix-card-title">Key Features &amp; Modules</span>
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

export default HIEDetail;
