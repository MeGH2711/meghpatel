import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaReact, FaRobot, FaPalette, FaCode, FaBrain, FaLayerGroup } from 'react-icons/fa';
import './css/About.css';

const skills = [
    { icon: <FaReact color="#61DAFB" />, label: 'Frontend Dev', desc: 'React' },
    { icon: <FaRobot color="#3b82f6" />, label: 'AI Engineering', desc: 'LLMs, RAG, Fine-tuning' },
    { icon: <FaPalette color="#fbbf24" />, label: 'UI/UX Design', desc: 'Figma, Design Systems' },
    { icon: <FaCode color="#a78bfa" />, label: 'Full Stack', desc: 'Node, Python, FastAPI' },
    { icon: <FaBrain color="#f472b6" />, label: 'ML / Deep Learning', desc: 'PyTorch, Transformers' },
    { icon: <FaLayerGroup color="#34d399" />, label: 'Product Thinking', desc: 'Shipping end-to-end' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 18 } }
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
};

const SkillCard = ({ icon, label, desc, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            className="skill-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.07, type: 'spring', stiffness: 300 }}
            whileHover={{ y: -3, borderColor: 'rgba(59,130,246,0.35)' }}
        >
            <span className="skill-icon">{icon}</span>
            <span className="skill-label">{label}</span>
            <span className="skill-desc">{desc}</span>
        </motion.div>
    );
};

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="about-section" ref={sectionRef}>

            {/* ── Header ── */}
            <motion.div
                ref={headingRef}
                className="about-header"
                initial="hidden"
                animate={headingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    About Me
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="about-heading" variants={fadeUp}>
                    A developer who{' '}
                    <span className="heading-accent">thinks</span>
                    <br />
                    like a designer.
                </motion.h2>

                <motion.p className="about-subheading" variants={fadeUp}>
                    I sit at the intersection of logic and aesthetics<br /> writing code that's as
                    intentional as the interfaces it powers. 3+ years deep, still obsessed.
                </motion.p>
            </motion.div>

            {/* ── Main Grid ── */}
            <div className="about-grid">

                {/* Left — Bio Card */}
                <motion.div
                    className="bio-card"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 70, damping: 18 }}
                >
                    <div className="bio-card-inner">
                        <div className="bio-tag">
                            <span className="bio-dot" />
                            <span>Who I am</span>
                        </div>

                        <p className="bio-text">
                            Hey, I'm <strong>Megh Patel</strong>, an AI engineer
                            based in India. I build products that blend powerful AI backends with
                            interfaces people actually enjoy using.
                        </p>
                        <p className="bio-text">
                            My sweet spot is the space where machine intelligence meets polished UX.
                            I obsess over the details like the micro-interactions, the data pipelines,
                            the performance wins that make products feel <em>alive</em>.
                        </p>
                        <p className="bio-text">
                            When I'm not shipping, I'm exploring new model architectures, tinkering
                            with design systems, or finding ways to make AI genuinely useful.
                        </p>

                        <div className="bio-divider" />

                        <div className="bio-meta">
                            {[
                                { label: 'Location', val: 'India 🇮🇳' },
                                { label: 'Focus', val: 'AI + Frontend' },
                                { label: 'Status', val: 'Open to Work' },
                            ].map(({ label, val }) => (
                                <div key={label} className="bio-meta-item">
                                    <span className="meta-label">{label}</span>
                                    <span className="meta-val">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bio-card-glow" />
                </motion.div>

                {/* Right — Skills Grid */}
                <div className="skills-side">
                    <motion.p
                        className="skills-eyebrow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        What I bring to the table
                    </motion.p>
                    <div className="skills-grid">
                        {skills.map((s, i) => (
                            <SkillCard key={s.label} {...s} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom CTA strip ── */}
            <motion.div
                className="about-cta"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 70 }}
            >
                <span className="cta-text">Let's build something remarkable together.</span>

                {/* Keep the <a> tag and class for hover effects, change functionality */}
                <a
                    href="#!"
                    onClick={scrollToContact}
                    className="cta-btn"
                >
                    Get in touch
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </motion.div>
        </section>
    );
};

export default About;
