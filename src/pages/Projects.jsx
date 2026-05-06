import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './css/Projects.css';
import birdspecies from '../assets/images/project_thumbnails/bird_species_detection.avif';
import hiedetection from '../assets/images/project_thumbnails/hie_detection_using_deep_learning.avif';

const PROJECT_PALETTES = [
    { from: '#3b82f6', to: '#6366f1' },  // blue → indigo
    { from: '#8b5cf6', to: '#ec4899' },  // violet → pink
    { from: '#10b981', to: '#3b82f6' },  // emerald → blue
    { from: '#f59e0b', to: '#ef4444' },  // amber → red
    { from: '#6366f1', to: '#8b5cf6' },  // indigo → violet
    { from: '#14b8a6', to: '#3b82f6' },  // teal → blue
    { from: '#f97316', to: '#f59e0b' },  // orange → amber
    { from: '#ec4899', to: '#8b5cf6' },  // pink → violet
];

const projects = [
    {
        title: "Hypoxic Ischemic Encephalopathy Lesion Segmentation",
        subtitle: "Deep Learning · Swin-Unet",
        description: "Transformer–based model for fine-grained segmentation task of HIE lesions using the BonBID2023 dataset.",
        tech: ["Python", "Swin-Unet", "PyTorch", "Transformer"],
        demo: "",
        github: "",
        image: hiedetection,
        path: "/projects/hiedetection",
        featured: true,
    },
    {
        title: "Bird Species Detection",
        subtitle: "Deep Learning · Vision Transformer",
        description: "ViT-B/16–based model for fine-grained classification of 200 bird species using the CUB-200-2011 dataset.",
        tech: ["Python", "ViT-B/16", "CNN", "PyTorch", "Gradio"],
        demo: "",
        github: "https://github.com/MeGH2711/birdspeciesrecognition",
        image: birdspecies,
        path: "/projects/birdspeciesdetection",
        featured: true,
    },
    {
        title: "InventuraX",
        subtitle: "Sales & Billing Software",
        description: "PDF generation, QR-based UPI, sessions, invoicing and sales management.",
        tech: ["ReactJS", "Firebase", "Bootstrap", "Node.js"],
        demo: "https://inventuraxpro.vercel.app/",
        github: "https://github.com/MeGH2711/inventuraxpro",
        path: "/projects/inventurax",
        featured: false,
    },
    {
        title: "De Baker's & More",
        subtitle: "Bakery Website · v2",
        description: "Dynamic product catalog with real-time availability and contact form integration for a local bakery.",
        tech: ["ReactJS", "Firebase", "Bootstrap", "Node.js"],
        demo: "https://debakersandmore.vercel.app/",
        github: "https://github.com/MeGH2711/debakersandmore",
    },
    {
        title: "Anchoring Portfolio",
        subtitle: "Personal Brand Site",
        description: "Showcases hosting experience, event highlights, and booking contact with an elegant UI.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "SMTP API"],
        demo: "https://anchormegh.vercel.app/",
        github: "https://github.com/MeGH2711/anchormegh",
    },
    {
        title: "Neoflex",
        subtitle: "Luxury Watch Brand",
        description: "Modern responsive showcase for luxury timepieces with product galleries, brand story, and purchase links.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "GSAP"],
        demo: "https://megh2711.github.io/neoflex.com/",
        github: "https://github.com/MeGH2711/neoflex.com",
    },
    {
        title: "DFT Alumni Association",
        subtitle: "Community Platform",
        description: "Platform for DFT Bhavnagar alumni to reconnect, share memories, and stay updated on events.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        demo: "https://megh2711.github.io/dftalumini.com/",
        github: "https://github.com/MeGH2711/dftalumini.com",
    },
    {
        title: "Tree Story",
        subtitle: "Nature & Environment",
        description: "Explores the diversity, importance, and fascinating stories of trees in our environment.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        demo: "https://megh2711.github.io/treestory.com/",
        github: "https://github.com/MeGH2711/treestory.com",
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

// ── Thumbnail component ───────────────────────────────────────────────────────
const ProjectThumbnail = ({ image, demo, palette, title }) => {
    const initials = title.split(' ').slice(0, 2).map(w => w[0]).join('');
    const wrapRef = useRef(null);
    const iframeRef = useRef(null);

    useEffect(() => {
        if (!demo || !wrapRef.current || !iframeRef.current) return;
        const IFRAME_WIDTH = 1440;

        const update = () => {
            // Check if wrapRef.current still exists before accessing offsetWidth
            if (wrapRef.current && iframeRef.current) {
                const wrapWidth = wrapRef.current.offsetWidth;
                const scale = wrapWidth / IFRAME_WIDTH;
                iframeRef.current.style.transform = `scale(${scale})`;
            }
        };

        update();
        const ro = new ResizeObserver(update);
        ro.observe(wrapRef.current);

        return () => {
            ro.disconnect();
        };
    }, [demo]);

    return (
        <div className="proj-thumb">
            {image ? (
                <img src={image} alt={title} className="proj-thumb-img" />
            ) : demo ? (
                <div className="proj-thumb-iframe-wrap" ref={wrapRef}>
                    <iframe
                        ref={iframeRef}
                        src={demo}
                        title={title}
                        className="proj-thumb-iframe"
                        scrolling="no"
                        tabIndex="-1"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
            ) : (
                <div
                    className="proj-thumb-placeholder"
                    style={{ '--grad-from': palette.from, '--grad-to': palette.to }}
                >
                    <span className="proj-thumb-initials">{initials}</span>
                    <div className="proj-thumb-grid" />
                </div>
            )}
            <div className="proj-thumb-overlay" />
        </div>
    );
};

// ── Featured (large) card ─────────────────────────────────────────────────────
const FeaturedCard = ({ project, index, palette }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            className="proj-featured-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 70 }}
            whileHover={{ y: -6 }}
        >
            <ProjectThumbnail image={project.image} demo={project.demo} palette={palette} title={project.title} />

            <div className="proj-featured-body">
                <span className="proj-featured-badge">Featured</span>

                <div className="proj-featured-text">
                    <h3 className="proj-card-title">{project.title}</h3>
                    <span className="proj-card-subtitle">{project.subtitle}</span>
                    <p className="proj-card-desc">{project.description}</p>
                </div>

                <div className="proj-footer">
                    <div className="proj-tech-list">
                        {project.tech.slice(0, 3).map(t => (
                            <span key={t} className="proj-tech-tag">{t}</span>
                        ))}
                        {project.tech.length > 3 && (
                            <span className="proj-tech-tag proj-tech-more">+{project.tech.length - 3}</span>
                        )}
                    </div>
                    
                    <div className="proj-actions">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-action-btn" title="View Code">
                                <FaGithub size={16} />
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-action-btn" title="Live Preview">
                                <FaExternalLinkAlt size={14} />
                            </a>
                        )}
                        {project.path && (
                            <Link to={project.path} className="proj-details-btn">
                                Details
                                <FaArrowRight size={11} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ── Regular card ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, palette }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            className="proj-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.07, type: 'spring', stiffness: 80 }}
            whileHover={{ y: -5, borderColor: 'rgba(59,130,246,0.3)' }}
        >
            <ProjectThumbnail image={project.image} demo={project.demo} palette={palette} title={project.title} />

            <div className="proj-card-body">
                <div className="proj-card-text">
                    <div className="proj-card-titles">
                        <h3 className="proj-card-title">{project.title}</h3>
                        <span className="proj-card-subtitle">{project.subtitle}</span>
                    </div>
                    <p className="proj-card-desc">{project.description}</p>
                </div>

                <div className="proj-footer">
                    <div className="proj-tech-list">
                        {project.tech.slice(0, 2).map(t => (
                            <span key={t} className="proj-tech-tag">{t}</span>
                        ))}
                        {project.tech.length > 2 && (
                            <span className="proj-tech-tag proj-tech-more">+{project.tech.length - 2}</span>
                        )}
                    </div>

                    <div className="proj-actions">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-action-btn proj-action-btn--sm" title="View Code">
                                <FaGithub size={14} />
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-action-btn proj-action-btn--sm" title="Live Preview">
                                <FaExternalLinkAlt size={12} />
                            </a>
                        )}
                        {project.path && (
                            <Link to={project.path} className="proj-details-btn proj-details-btn--sm">
                                Details
                                <FaArrowRight size={10} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ── Section ───────────────────────────────────────────────────────────────────
const Projects = () => {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

    const featured = projects.filter(p => p.featured);
    const rest = projects.filter(p => !p.featured);

    return (
        <section className="projects-section">

            {/* ── Header ── */}
            <motion.div
                ref={headingRef}
                className="about-header"           /* reuse About's header class */
                initial="hidden"
                animate={headingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    Projects
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="about-heading" variants={fadeUp}>
                    Things I've{' '}
                    <span className="heading-accent">built</span>
                    <br />
                    with intention.
                </motion.h2>

                <motion.p className="about-subheading" variants={fadeUp}>
                    A selection of projects spanning AI, full-stack, and branded web experiences
                    — each one shipped with care.
                </motion.p>
            </motion.div>

            {/* ── Featured row ── */}
            <div className={`proj-featured-row ${featured.length === 1 ? 'proj-featured-row--single' : ''}`}>
                {featured.map((p, i) => (
                    <FeaturedCard
                        key={p.title + p.subtitle}
                        project={p}
                        index={i}
                        palette={PROJECT_PALETTES[i % PROJECT_PALETTES.length]}
                    />
                ))}
            </div>

            {/* ── Regular grid ── */}
            <div className="proj-grid">
                {rest.map((p, i) => (
                    <ProjectCard
                        key={p.title + p.subtitle}
                        project={p}
                        index={i}
                        palette={PROJECT_PALETTES[(i + 2) % PROJECT_PALETTES.length]}
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;
