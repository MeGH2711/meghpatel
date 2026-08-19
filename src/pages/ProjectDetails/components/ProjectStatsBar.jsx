import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, stagger } from './AnimatedSection';

export const Badge = ({ label, variant = 'blue' }) => (
    <span className={`pd-badge pd-badge--${variant}`}>
        <span className="pd-badge-dot" />
        {label}
    </span>
);

export const Stat = ({ label, value, accent = 'blue' }) => (
    <motion.div className={`pd-metric-card pd-metric--${accent}`} variants={fadeUp}>
        <span className="pd-metric-label">{label}</span>
        <span className="pd-metric-value">{value}</span>
    </motion.div>
);

const ProjectStatsBar = ({ title, titleSub, subtitle, badges = [], metrics = [] }) => {
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={statsRef}
            className="pd-stats-bar"
            initial="hidden"
            animate={statsInView ? 'show' : 'hidden'}
            variants={stagger}
        >
            <div className="pd-stats-top">
                <motion.div className="pd-proj-identity" variants={fadeUp}>
                    <h1 className="pd-proj-title">
                        {title}
                        {titleSub && <span className="pd-title-sub">{titleSub}</span>}
                    </h1>
                    <span className="pd-proj-subtitle">{subtitle}</span>
                </motion.div>
                <motion.div className="pd-badges" variants={fadeUp}>
                    {badges.map(b => (
                        <Badge key={b.label} {...b} />
                    ))}
                </motion.div>
            </div>

            <div className="pd-metrics-row">
                {metrics.map(m => (
                    <Stat key={m.label} {...m} />
                ))}
            </div>
        </motion.div>
    );
};

export default ProjectStatsBar;
