import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub, FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import './css/BirdSpeciesDetail.css';

// ── Data ─────────────────────────────────────────────────────────────────────

const PROJECT = {
    title: 'Bird Species Detection',
    subtitle: 'Deep Learning · Fine-Grained Visual Classification',
    demo: '',           // no live demo — model is local
    github: 'https://github.com/MeGH2711/birdspeciesrecognition',
    year: '2025',
    type: 'ML Research',
    status: 'Research Phase',
    badges: [
        { label: 'Completed', variant: 'green' },
        { label: 'Research Phase', variant: 'amber' },
        { label: 'Open Source', variant: 'violet' },
    ],
    metrics: [
        { label: 'Final Accuracy', value: '87.12% Test Set', accent: 'green' },
        { label: 'Classes Supported', value: '200 Bird Species', accent: 'blue' },
        { label: 'Architecture', value: 'ViT-B/16 Transformer', accent: 'violet' },
        { label: 'Dataset Size', value: '11,788 Images', accent: 'amber' },
    ],
    tech: ['Python', 'PyTorch', 'ViT-B/16', 'CUB-200-2011', 'NumPy', 'Matplotlib', 'scikit-learn', 'FP16/AMP'],
    vision: {
        problem:
            'Manual bird species identification demands expert ornithologists — a resource that is scarce, slow, and inaccessible for large-scale biodiversity monitoring and citizen science.',
        solution:
            'A fine-tuned Vision Transformer (ViT-B/16) trained on a meticulously cleaned CUB-200-2011 dataset, with custom stratified splits, advanced augmentation, and thorough misclassification analysis — achieving 87.12% accuracy on 200 species.',
        audience:
            'Ornithologists, AI researchers, wildlife conservation bodies, birdwatchers, and citizen scientists who need scalable, automated species recognition without expert dependency.',
    },
    features: [
        {
            num: '01',
            name: 'Vision Transformer (ViT-B/16) Backbone',
            desc: 'Leverages self-attention across 196 image patches for global receptive field — far superior to CNNs for fine-grained recognition where subtle inter-class differences matter most.',
        },
        {
            num: '02',
            name: 'Custom Stratified Dataset Split',
            desc: 'Replaced the default 50:50 train/test split with a stratified 80:10:10 split — ensuring minority classes are proportionally represented in validation and test sets for reliable evaluation.',
        },
        {
            num: '03',
            name: 'Manual Data Cleaning Pipeline',
            desc: 'Identified and removed 60+ mislabeled or corrupted images using t-SNE/PCA outlier detection, manual verification, and bounding box consistency checks — improving evaluation integrity.',
        },
        {
            num: '04',
            name: 'Advanced Data Augmentation',
            desc: 'Applied RandomResizedCrop, horizontal & vertical flips, small-angle rotations, color jitter, and ImageNet normalization — simulating real-world lighting, pose, and background variation.',
        },
        {
            num: '05',
            name: 'Misclassification Clustering Analysis',
            desc: 'Deep-dived into 70.2% of errors occurring within the same bird family — identifying systematic confusion patterns among Warblers, Sparrows, and Thrushes to guide future improvements.',
        },
        {
            num: '06',
            name: 'Mixed Precision Training (FP16/AMP)',
            desc: 'AdamW optimizer with cosine annealing, gradient clipping, and FP16 Automatic Mixed Precision — enabling stable 50-epoch training with early stopping and minimal overfitting.',
        },
    ],
    challenges: [
        {
            type: 'challenge',
            title: 'Severe Dataset Imbalance & Label Noise',
            desc: 'CUB-200-2011 contains classes ranging from 30 to 60+ images, and ~4% of images are mislabeled or ambiguous — creating a noisy evaluation environment that inflates apparent accuracy.',
        },
        {
            type: 'learning',
            title: 'Stratified Splitting + Outlier-Based Cleaning',
            desc: 'Built a custom stratified splitter preserving class proportions across all three sets, combined with t-SNE and PCA anomaly detection to systematically surface and remove mislabeled images.',
        },
        {
            type: 'challenge',
            title: 'Fine-Grained Confusion Within Bird Families',
            desc: '70.2% of misclassifications occur within the same family — species like Brewer\'s vs. Clay-colored Sparrows differ only by faint plumage tones, causing the model to collapse on superficial cues.',
        },
        {
            type: 'learning',
            title: 'Misclassification Clustering for Targeted Improvement',
            desc: 'Categorized all errors into same-family vs. cross-family buckets and visualised confusion hotspots — informing future directions like part-based attention (head, wings, tail) and hierarchical classification.',
        },
        {
            type: 'challenge',
            title: 'Accuracy–Quality Trade-off After Cleaning',
            desc: 'Removing 60+ mislabeled images slightly reduced overall accuracy from 89.4% to 87.12% — counterintuitive at first, since the model previously benefited from memorising noisy labels.',
        },
        {
            type: 'learning',
            title: 'Reliability Over Raw Accuracy',
            desc: 'Learned that a clean evaluation set is more scientifically valid than a high number on a noisy benchmark. 87.12% on verified data is a stronger claim than 89.4% on a mislabeled set.',
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
    <motion.div className={`bsd-metric-card bsd-metric--${accent}`} variants={fadeUp}>
        <span className="bsd-metric-label">{label}</span>
        <span className="bsd-metric-value">{value}</span>
    </motion.div>
);

const Badge = ({ label, variant }) => (
    <span className={`bsd-badge bsd-badge--${variant}`}>
        <span className="bsd-badge-dot" />
        {label}
    </span>
);

const FeatureItem = ({ num, name, desc, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            className="bsd-feature-item"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.06, type: 'spring', stiffness: 90 }}
        >
            <span className="bsd-feature-num">{num}</span>
            <div className="bsd-feature-text">
                <div className="bsd-feature-name">{name}</div>
                <div className="bsd-feature-desc">{desc}</div>
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
            className={`bsd-challenge-item bsd-challenge--${type}`}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 85 }}
        >
            <span className={`bsd-challenge-tag bsd-tag--${type}`}>
                {type === 'challenge' ? 'Challenge' : 'Learning'}
            </span>
            <div className="bsd-challenge-content">
                <div className="bsd-challenge-title">{title}</div>
                <div className="bsd-challenge-desc">{desc}</div>
            </div>
        </motion.div>
    );
};

// ── Accuracy Progress Bar ─────────────────────────────────────────────────────

const milestones = [
    { label: 'ResNet18 Baseline', acc: 55, color: 'bsd-bar--neutral' },
    { label: 'ViT · Min. Augmentation', acc: 84, color: 'bsd-bar--blue' },
    { label: 'ViT · Stronger Augmentation', acc: 86, color: 'bsd-bar--blue' },
    { label: 'Custom 80:10:10 Split', acc: 88, color: 'bsd-bar--violet' },
    { label: 'External Images Added', acc: 89.4, color: 'bsd-bar--green' },
    { label: 'After Mislabel Removal', acc: 87.12, color: 'bsd-bar--amber' },
];

const MilestoneBar = ({ label, acc, color, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-30px' });
    return (
        <motion.div
            ref={ref}
            className="bsd-milestone-row"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.07 }}
        >
            <div className="bsd-milestone-meta">
                <span className="bsd-milestone-label">{label}</span>
                <span className="bsd-milestone-acc">{acc}%</span>
            </div>
            <div className="bsd-bar-track">
                <motion.div
                    className={`bsd-bar-fill ${color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(acc / 100) * 100}%` } : {}}
                    transition={{ duration: 0.7, delay: index * 0.07 + 0.15, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const BirdSpeciesDetail = () => {
    const navigate = useNavigate();
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="bsd-page">

            {/* Back Button */}
            <button className="bsd-back-button" onClick={() => navigate('/')}>
                <FaArrowLeft />
                <span>Back to Home</span>
            </button>

            {/* ── Stats Bar ── */}
            <motion.div
                ref={statsRef}
                className="bsd-stats-bar"
                initial="hidden"
                animate={statsInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <div className="bsd-stats-top">
                    <motion.div className="bsd-proj-identity" variants={fadeUp}>
                        <h1 className="bsd-proj-title">{PROJECT.title}</h1>
                        <span className="bsd-proj-subtitle">{PROJECT.subtitle}</span>
                    </motion.div>
                    <motion.div className="bsd-badges" variants={fadeUp}>
                        {PROJECT.badges.map(b => (
                            <Badge key={b.label} {...b} />
                        ))}
                    </motion.div>
                </div>

                <div className="bsd-metrics-row">
                    {PROJECT.metrics.map(m => (
                        <Stat key={m.label} {...m} />
                    ))}
                </div>
            </motion.div>

            {/* ── Body ── */}
            <div className="bsd-body-layout">

                {/* Sidebar */}
                <aside className="bsd-sidebar">
                    <div className="bsd-sidebar-thumb">
                        <div className="bsd-thumb-inner">
                            <div className="bsd-thumb-grid" />
                            <div className="bsd-thumb-logo">
                                <div className="bsd-thumb-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 19 C7 19 2 14 1 9 C4 11 7.5 12 10 11 C11.5 10.5 12 9 12 8 C12 9 12.5 10.5 14 11 C16.5 12 20 11 23 9 C22 14 17 19 12 19Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                        <circle cx="9.5" cy="10.5" r="1" fill="currentColor" />
                                    </svg>
                                </div>
                                Bird Species AI
                            </div>
                        </div>
                        <div className="bsd-thumb-meta">
                            {[
                                ['Type', PROJECT.type],
                                ['Status', PROJECT.status],
                                ['Year', PROJECT.year],
                            ].map(([k, v]) => (
                                <div key={k} className="bsd-thumb-meta-row">
                                    <span className="bsd-meta-label">{k}</span>
                                    <span className={`bsd-meta-val ${k === 'Status' ? 'bsd-meta-val--research' : ''}`}>{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {PROJECT.demo ? (
                        <a href={PROJECT.demo} target="_blank" rel="noreferrer" className="bsd-sidebar-btn bsd-btn--primary">
                            <FaArrowUpRightFromSquare size={13} />
                            Live Preview
                        </a>
                    ) : (
                        <div className="bsd-sidebar-btn bsd-btn--disabled" title="No live deployment — model runs locally">
                            <FaArrowUpRightFromSquare size={13} />
                            No Live Demo
                        </div>
                    )}

                    <a href={PROJECT.github} target="_blank" rel="noreferrer" className="bsd-sidebar-btn bsd-btn--secondary">
                        <FaGithub size={14} />
                        GitHub Repo
                    </a>

                    <div className="bsd-sidebar-tech">
                        <div className="bsd-section-micro-label">Tech Stack</div>
                        <div className="bsd-tech-tags">
                            {PROJECT.tech.map(t => (
                                <span key={t} className="bsd-tech-tag">{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* ── New Designer Contributor Card ── */}
                    <div className="bsd-sidebar-contributor">
                        <div className="bsd-section-micro-label">Contributor</div>
                        <a
                            href="https://github.com/konarkk12"
                            target="_blank"
                            rel="noreferrer"
                            className="bsd-contributor-card"
                        >
                            <div className="bsd-contributor-avatar">
                                {/* Replace with an actual img tag if you have a URL, otherwise using a stylized icon */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label='Contributor Avatar Icons'>
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="bsd-contributor-info">
                                <span className="bsd-contributor-name">Konark Karia</span>
                                <span className="bsd-contributor-link">@konarkk12</span>
                            </div>
                            <FaArrowUpRightFromSquare size={10} className="bsd-contributor-arrow" />
                        </a>
                    </div>

                </aside>

                {/* Main content */}
                <div className="bsd-main-content">

                    {/* Vision */}
                    <AnimatedSection className="bsd-content-card">
                        <motion.div className="bsd-card-header" variants={fadeUp}>
                            <div className="bsd-card-icon bsd-icon--green">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label='Clock Icon'>
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                                    <path d="M8 5v3.5L10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="bsd-card-title">Vision &amp; Purpose</span>
                        </motion.div>
                        <motion.div className="bsd-vision-grid" variants={fadeUp}>
                            {[
                                { key: 'problem', label: 'Problem', text: PROJECT.vision.problem },
                                { key: 'solution', label: 'Solution', text: PROJECT.vision.solution },
                                { key: 'audience', label: 'Audience', text: PROJECT.vision.audience },
                            ].map(({ key, label, text }) => (
                                <div key={key} className={`bsd-vision-block bsd-vision-block--${key}`}>
                                    <span className={`bsd-vision-label bsd-vision-label--${key}`}>{label}</span>
                                    <p className="bsd-vision-text">{text}</p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatedSection>

                    {/* Accuracy Progression */}
                    <div className="bsd-content-card">
                        <div className="bsd-card-header">
                            <div className="bsd-card-icon bsd-icon--amber">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label='Progression Icon'>
                                    <polyline points="2,12 5,8 8,10 11,5 14,3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="bsd-card-title">Accuracy Progression</span>
                        </div>
                        <div className="bsd-milestone-list">
                            {milestones.map((m, i) => (
                                <MilestoneBar key={m.label} {...m} index={i} />
                            ))}
                        </div>
                        <p className="bsd-milestone-note">
                            ⬆ Cleaning mislabeled images reduced accuracy from 89.4% → 87.12%, but produced a more <em>reliable</em> evaluation environment — a deliberate, principled trade-off.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="bsd-content-card">
                        <div className="bsd-card-header">
                            <div className="bsd-card-icon bsd-icon--violet">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label='Key Features Icon'>
                                    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                </svg>
                            </div>
                            <span className="bsd-card-title">Key Features</span>
                        </div>
                        <div className="bsd-features-grid">
                            {PROJECT.features.map((f, i) => (
                                <FeatureItem key={f.num} {...f} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Challenges */}
                    <div className="bsd-content-card">
                        <div className="bsd-card-header">
                            <div className="bsd-card-icon bsd-icon--red">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label='Challenges Icon'>
                                    <path d="M8 2L9.5 6.5H14L10.25 9.25L11.75 13.5L8 10.5L4.25 13.5L5.75 9.25L2 6.5H6.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="bsd-card-title">Challenges &amp; Learnings</span>
                        </div>
                        <div className="bsd-challenge-list">
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

export default BirdSpeciesDetail;
