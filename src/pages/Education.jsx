import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import guLogo from '../assets/images/guLogo.webp';
import auLogo from '../assets/images/auLogo.png';
import './css/Education.css';

/* ─── University logos ───────────────────────────────────── */
const GIT_LOGO = guLogo;
const AU_LOGO  = auLogo;

/* ─── Data ───────────────────────────────────────────────── */
const entries = [
    {
        id: 'btech',
        index: '01',
        status: 'done',
        statusLabel: 'Completed',
        degree: 'B.Tech',
        field: 'Computer Engineering',
        university: 'Gandhinagar Institute of Technology',
        affiliation: 'Affiliated · Gujarat Technological University (GTU)',
        logo: GIT_LOGO,
        monogram: 'GIT',
        year: '2021 – 2025',
        description:
            'Studied Computer Engineering at Gandhinagar Institute of Technology, building a rock-solid foundation in algorithms, data structures, software engineering, and systems design. This journey enriched me with hands-on technical knowledge and a resilient, first-principles problem-solving approach.',
        tags: ['Data Structures', 'Algorithms', 'OS', 'DBMS', 'Networks', 'Software Engineering'],
        meta: [
            { key: 'Duration', val: '4 Years' },
            { key: 'Affiliation', val: 'GTU' },
            { key: 'Degree', val: 'B.Tech' },
        ],
    },
    {
        id: 'mtech',
        index: '02',
        status: 'active',
        statusLabel: 'In Progress',
        degree: 'M.Tech',
        field: 'Computer Science and Engineering',
        university: 'Ahmedabad University',
        affiliation: 'School of Engineering and Applied Science',
        logo: AU_LOGO,
        monogram: 'AU',
        year: '2025 – Present',
        description:
            'Pursuing a Master\'s degree in Computer Science to sharpen expertise in cutting-edge technologies. A crucial leap toward expanding research capabilities and contributing to innovative solutions with deep focus on Artificial Intelligence, Machine Learning, Deep Learning, and Data Science.',
        tags: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Data Science', 'NLP', 'Computer Vision'],
        meta: [
            { key: 'Duration', val: '2 Years' },
            { key: 'Specialization', val: 'AI / ML / DL' },
            { key: 'Degree', val: 'M.Tech' },
        ],
    },
];

/* ─── Variants ───────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 18 } },
};
const hdrStagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };

/* ─── Logo with monogram fallback ────────────────────────── */
const Emblem = ({ logo, monogram }) => {
    const [err, setErr] = useState(false);
    return (
        <div className="edu-emblem-ring">
            {!err
                ? <img src={logo} alt={monogram} onError={() => setErr(true)} />
                : <span className="edu-emblem-mono">{monogram}</span>
            }
        </div>
    );
};

/* ─── Single card ────────────────────────────────────────── */
const EduCard = ({ entry }) => {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            className="edu-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 65, damping: 18, delay: 0.12 }}
        >
            <div className="edu-card-layout">

                {/* ── Emblem side-strip ── */}
                <div className="edu-card-emblem-strip">
                    <Emblem logo={entry.logo} monogram={entry.monogram} />
                    <span className="edu-emblem-year">{entry.year}</span>
                </div>

                {/* ── Main body ── */}
                <div className="edu-card-body">

                    <div className="edu-uni-row">
                        <p className="edu-uni-name">{entry.university}</p>
                        <p className="edu-uni-sub">{entry.affiliation}</p>
                    </div>

                    <div className="edu-rule" />

                    <p className="edu-desc">{entry.description}</p>

                    <div className="edu-tags">
                        {entry.tags.map(t => (
                            <span key={t} className="edu-tag">{t}</span>
                        ))}
                    </div>

                    <div className="edu-rule" />

                    <div className="edu-meta">
                        {entry.meta.map(({ key, val }) => (
                            <div key={key} className="edu-meta-item">
                                <span className="edu-meta-key">{key}</span>
                                <span className="edu-meta-val">{val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="edu-card-glow" />
        </motion.div>
    );
};

/* ─── Entry row ──────────────────────────────────────────── */
const EduEntry = ({ entry, isLast }) => {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <>
            <div className="edu-entry" ref={ref}>

                {/* Left — oversized index + bar */}
                <div className="edu-index-col">
                    <motion.span
                        className="edu-index-num"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                    >
                        {entry.index}
                    </motion.span>
                    <div className="edu-index-bar" />
                </div>

                {/* Right — title + card */}
                <div className="edu-content">

                    <motion.div
                        className="edu-title-row"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.06 }}
                    >
                        <div className="edu-title-group">
                            <h3 className="edu-degree-name">{entry.degree}</h3>
                            <p className="edu-degree-field">{entry.field}</p>
                        </div>

                        <span className={`edu-status edu-status--${entry.status}`}>
                            <span className="edu-status-dot" />
                            {entry.statusLabel}
                        </span>
                    </motion.div>

                    <EduCard entry={entry} />
                </div>
            </div>
        </>
    );
};

/* ─── Section ────────────────────────────────────────────── */
const Education = () => {
    const hdrRef    = useRef(null);
    const hdrInView = useInView(hdrRef, { once: true, margin: '-80px' });

    return (
        <section className="edu-section">

            {/* ── Header ── */}
            <motion.div
                ref={hdrRef}
                className="edu-header"
                initial="hidden"
                animate={hdrInView ? 'show' : 'hidden'}
                variants={hdrStagger}
            >
                <div className="edu-header-left">
                    <motion.span className="edu-eyebrow" variants={fadeUp}>
                        <span className="edu-eyebrow-tick" />
                        Education
                    </motion.span>

                    <motion.h2 className="edu-heading" variants={fadeUp}>
                        Built on a <em>foundation</em>
                        <br />of real learning.
                    </motion.h2>
                </div>

                <motion.span
                    className="edu-header-count"
                    variants={fadeUp}
                    aria-hidden="true"
                >
                    {entries.length.toString().padStart(2, '0')}
                </motion.span>
            </motion.div>

            {/* ── Stack ── */}
            <div className="edu-stack">
                {entries.map((entry, i) => (
                    <EduEntry
                        key={entry.id}
                        entry={entry}
                        isLast={i === entries.length - 1}
                    />
                ))}
            </div>
        </section>
    );
};

export default Education;
