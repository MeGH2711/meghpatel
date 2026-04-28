import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './css/TechStack.css';

/* ── Tech Skill PNG logos ── */
const TECH_LOGOS = {
    HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    React: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    Bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    NodeJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    Transformers: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    Figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    Photoshop: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/500px-Adobe_Photoshop_CC_icon.svg.png',
    PremierePro: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/500px-Adobe_Premiere_Pro_CC_icon.svg.png',
};

/* ── AI Tool PNG logos ── */
const AI_LOGOS = {
    'Google Gemini': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/500px-Google_Gemini_icon_2025.svg.png',
    'ChatGPT': 'https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png',
    'Claude': 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.png',
};

/* ── Tech Skill Data ── */
const techCategories = [
    {
        category: 'Languages',
        color: '#61DAFB',
        items: [
            { name: 'HTML', icon: 'HTML', level: 95 },
            { name: 'Python', icon: 'Python', level: 92 },
            { name: 'CSS', icon: 'CSS', level: 90 },
            { name: 'JavaScript', icon: 'JavaScript', level: 88 },
        ],
    },
    {
        category: 'Frameworks & Libraries',
        color: '#a78bfa',
        items: [
            { name: 'React', icon: 'React', level: 88 },
            { name: 'Bootstrap', icon: 'Bootstrap', level: 85 },
            { name: 'Node.js', icon: 'NodeJS', level: 80 },
            { name: 'Transformers', icon: 'Transformers', level: 78 },
        ],
    },
    {
        category: 'Database & DevOps',
        color: '#34d399',
        items: [
            { name: 'Firebase', icon: 'Firebase', level: 95 },
            { name: 'Git', icon: 'Git', level: 90 },
            { name: 'MongoDB', icon: 'MongoDB', level: 78 },
        ],
    },
    {
        category: 'Design & Creative',
        color: '#fbbf24',
        items: [
            { name: 'Figma', icon: 'Figma', level: 85 },
            { name: 'Photoshop', icon: 'Photoshop', level: 75 },
            { name: 'Premiere Pro', icon: 'PremierePro', level: 70 },
        ],
    },
];

const aiTools = [
    {
        name: 'Google Gemini',
        role: 'Multimodal reasoning & code generation',
        accent: '#4285F4',
        glow: 'rgba(66,133,244,0.25)',
    },
    {
        name: 'ChatGPT',
        role: 'Prompt engineering & content automation',
        accent: '#10a37f',
        glow: 'rgba(16,163,127,0.25)',
    },
    {
        name: 'Claude',
        role: 'Complex reasoning, coding & workflows',
        accent: '#cc785c',
        glow: 'rgba(204,120,92,0.25)',
    },
];

/* ── Variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 18 } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
};

/* ── Skill Bar Component ── */
const SkillBar = ({ name, icon, level, delay }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            className="skill-bar-item"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay, type: 'spring', stiffness: 80 }}
        >
            <div className="skill-bar-header">
                <div className="skill-bar-avatar">
                    <img
                        src={TECH_LOGOS[icon]}
                        alt={name + ' logo'}
                        className="skill-bar-logo-img"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<span style="font-size:0.75rem;font-weight:700;color:var(--cat-color)">${name[0]}</span>`;
                        }}
                    />
                </div>
                <span className="skill-bar-name">{name}</span>
                <span className="skill-bar-pct">{level}%</span>
            </div>
            <div className="skill-bar-track">
                <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 0.9, delay: delay + 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
            </div>
        </motion.div>
    );
};

/* ── Category Card ── */
const CategoryCard = ({ category, color, items, cardIndex }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            className="tech-category-card"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: cardIndex * 0.1, type: 'spring', stiffness: 70 }}
            whileHover={{ y: -3 }}
            style={{ '--cat-color': color }}
        >
            <div className="category-header">
                <span className="category-dot" />
                <span className="category-name">{category}</span>
            </div>
            <div className="skill-bars">
                {items.map((item, i) => (
                    <SkillBar
                        key={item.name}
                        {...item}
                        delay={cardIndex * 0.08 + i * 0.07}
                    />
                ))}
            </div>
            <div className="category-glow" />
        </motion.div>
    );
};

/* ── AI Tool Card ── */
const AIToolCard = ({ name, role, accent, glow, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const logoUrl = AI_LOGOS[name];

    return (
        <motion.div
            ref={ref}
            className="ai-tool-card"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12, type: 'spring', stiffness: 80 }}
            whileHover={{ y: -5, borderColor: accent + '55' }}
            style={{ '--tool-accent': accent, '--tool-glow': glow }}
        >
            <div className="ai-tool-avatar" style={{ background: accent + '18', border: `1px solid ${accent}33` }}>
                <img
                    src={logoUrl}
                    alt={name + ' logo'}
                    className="ai-tool-logo-img"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<span class="ai-tool-symbol" style="color:${accent};font-size:1.3rem;font-weight:700;">${name[0]}</span>`;
                    }}
                />
            </div>
            <div className="ai-tool-body">
                <span className="ai-tool-name">{name}</span>
                <span className="ai-tool-role">{role}</span>
            </div>
            {/* <div className="ai-tool-tag">AI Tool</div> */}
            <div className="ai-tool-glow" />
        </motion.div>
    );
};

/* ── Main Component ── */
const TechStack = () => {
    const headingRef = useRef(null);
    const aiHeadingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
    const aiHeadingInView = useInView(aiHeadingRef, { once: true, margin: '-80px' });

    return (
        <section className="techstack-section">

            {/* ── Tech Skills Header ── */}
            <motion.div
                ref={headingRef}
                className="ts-header"
                initial="hidden"
                animate={headingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    Technical Skills
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="ts-heading" variants={fadeUp}>
                    Tools of the{' '}
                    <span className="heading-accent">craft.</span>
                </motion.h2>

                <motion.p className="ts-subheading" variants={fadeUp}>
                    A curated stack I've honed across real projects — from data pipelines to
                    pixel-perfect interfaces.
                </motion.p>
            </motion.div>

            {/* ── Tech Categories Grid ── */}
            <div className="tech-grid">
                {techCategories.map((cat, i) => (
                    <CategoryCard key={cat.category} {...cat} cardIndex={i} />
                ))}
            </div>

            {/* ── AI Tools Header ── */}
            <motion.div
                ref={aiHeadingRef}
                className="ts-header"
                initial="hidden"
                animate={aiHeadingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    AI Tools
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="ts-heading" variants={fadeUp}>
                    Powered by{' '}
                    <span className="heading-accent">intelligence.</span>
                </motion.h2>

                <motion.p className="ts-subheading" variants={fadeUp}>
                    I leverage leading AI assistants daily — for automation, rapid prototyping,
                    and pushing what's possible.
                </motion.p>
            </motion.div>

            {/* ── AI Tools Row ── */}
            <div className="ai-tools-row">
                {aiTools.map((tool, i) => (
                    <AIToolCard key={tool.name} {...tool} index={i} />
                ))}
            </div>

        </section>
    );
};

export default TechStack;
