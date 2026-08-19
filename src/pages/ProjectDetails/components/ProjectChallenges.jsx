import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ChallengeItem = ({ type = 'challenge', title, desc, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            className={`pd-challenge-item pd-challenge--${type}`}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 85 }}
        >
            <span className={`pd-challenge-tag pd-tag--${type}`}>
                {type === 'challenge' ? 'Challenge' : 'Learning'}
            </span>
            <div className="pd-challenge-content">
                <div className="pd-challenge-title">{title}</div>
                <div className="pd-challenge-desc">{desc}</div>
            </div>
        </motion.div>
    );
};

const ProjectChallenges = ({ challenges = [] }) => {
    if (!challenges || challenges.length === 0) return null;

    return (
        <div className="pd-content-card">
            <div className="pd-card-header">
                <div className="pd-card-icon pd-icon--amber">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label="Challenges Icon">
                        <path
                            d="M8 2L9.5 6.5H14L10.25 9.25L11.75 13.5L8 10.5L4.25 13.5L5.75 9.25L2 6.5H6.5L8 2Z"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <span className="pd-card-title">Challenges &amp; Learnings</span>
            </div>
            <div className="pd-challenge-list">
                {challenges.map((c, i) => (
                    <ChallengeItem key={c.title} {...c} index={i} />
                ))}
            </div>
        </div>
    );
};

export default ProjectChallenges;
