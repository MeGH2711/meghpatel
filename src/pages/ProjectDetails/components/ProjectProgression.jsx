import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MilestoneBar = ({ label, val, color = 'blue', suffix = '%', index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-30px' });

    return (
        <motion.div
            ref={ref}
            className="pd-milestone-row"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.07 }}
        >
            <div className="pd-milestone-meta">
                <span className="pd-milestone-label">{label}</span>
                <span className="pd-milestone-acc">
                    {val}
                    {suffix}
                </span>
            </div>
            <div className="pd-bar-track">
                <motion.div
                    className={`pd-bar-fill pd-bar--${color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${Math.min(val, 100)}%` } : {}}
                    transition={{ duration: 0.7, delay: index * 0.07 + 0.15, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    );
};

const ProjectProgression = ({ progression }) => {
    if (!progression || !progression.milestones) return null;

    const { title = 'Progression', milestones = [], note, metricSuffix = '%' } = progression;

    return (
        <div className="pd-content-card">
            <div className="pd-card-header">
                <div className="pd-card-icon pd-icon--amber">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label="Progression Icon">
                        <polyline
                            points="2,12 5,8 8,10 11,5 14,3"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <span className="pd-card-title">{title}</span>
            </div>
            <div className="pd-milestone-list">
                {milestones.map((m, i) => (
                    <MilestoneBar
                        key={m.label}
                        label={m.label}
                        val={m.val}
                        color={m.color}
                        suffix={metricSuffix}
                        index={i}
                    />
                ))}
            </div>
            {note && (
                <p
                    className="pd-milestone-note"
                    dangerouslySetInnerHTML={{ __html: note }}
                />
            )}
        </div>
    );
};

export default ProjectProgression;
