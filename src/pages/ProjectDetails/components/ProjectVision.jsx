import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, fadeUp } from './AnimatedSection';

const ProjectVision = ({ vision }) => {
    if (!vision) return null;

    const items = [
        { key: 'problem', label: 'Problem', text: vision.problem },
        { key: 'solution', label: 'Solution', text: vision.solution },
        { key: 'audience', label: 'Audience', text: vision.audience },
    ];

    return (
        <AnimatedSection className="pd-content-card">
            <motion.div className="pd-card-header" variants={fadeUp}>
                <div className="pd-card-icon pd-icon--blue">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label="Vision Icon">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M8 5v3.5L10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="pd-card-title">Vision &amp; Purpose</span>
            </motion.div>
            <motion.div className="pd-vision-grid" variants={fadeUp}>
                {items.map(({ key, label, text }) => (
                    <div key={key} className={`pd-vision-block pd-vision-block--${key}`}>
                        <span className={`pd-vision-label pd-vision-label--${key}`}>{label}</span>
                        <p className="pd-vision-text">{text}</p>
                    </div>
                ))}
            </motion.div>
        </AnimatedSection>
    );
};

export default ProjectVision;
