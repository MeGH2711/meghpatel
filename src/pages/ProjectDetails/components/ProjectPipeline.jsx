import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, fadeUp } from './AnimatedSection';

const ProjectPipeline = ({ pipeline }) => {
    if (!pipeline) return null;

    const { title = 'Architecture Overview', steps = [], results = [] } = pipeline;

    return (
        <AnimatedSection className="pd-content-card">
            <motion.div className="pd-card-header" variants={fadeUp}>
                <div className="pd-card-icon pd-icon--teal">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label="Architecture Pipeline Icon">
                        <rect x="1" y="6" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
                        <rect x="6" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
                        <rect x="6" y="11" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
                        <rect x="11" y="6" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M5 8h1M10 8h1M8 5v1M8 10v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="pd-card-title">{title}</span>
            </motion.div>

            {steps.length > 0 && (
                <motion.div className="pd-pipeline" variants={fadeUp}>
                    {steps.map((step, i, arr) => (
                        <React.Fragment key={step.label}>
                            <div className={`pd-pipe-step pd-pipe--${step.color || 'teal'}`}>
                                <span className="pd-pipe-label">{step.label}</span>
                                <span className="pd-pipe-sub">{step.sub}</span>
                                <span className="pd-pipe-desc">{step.desc}</span>
                            </div>
                            {i < arr.length - 1 && (
                                <div className="pd-pipe-arrow">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M4 8h8M9 5l3 3-3 3"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
            )}

            {results.length > 0 && (
                <motion.div className="pd-results-row" variants={fadeUp}>
                    {results.map(r => (
                        <div key={r.label} className="pd-result-chip">
                            <span className="pd-result-val">{r.value}</span>
                            <span className="pd-result-label">{r.label}</span>
                            <span className="pd-result-note">{r.note}</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatedSection>
    );
};

export default ProjectPipeline;
