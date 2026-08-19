import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FeatureItem = ({ num, name, desc, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            className="pd-feature-item"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.06, type: 'spring', stiffness: 90 }}
        >
            <span className="pd-feature-num">{num}</span>
            <div className="pd-feature-text">
                <div className="pd-feature-name">{name}</div>
                <div className="pd-feature-desc">{desc}</div>
            </div>
        </motion.div>
    );
};

const ProjectFeatures = ({ features = [] }) => {
    if (!features || features.length === 0) return null;

    return (
        <div className="pd-content-card">
            <div className="pd-card-header">
                <div className="pd-card-icon pd-icon--violet">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label="Key Features Icon">
                        <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                        <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                        <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                        <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                </div>
                <span className="pd-card-title">Key Features</span>
            </div>
            <div className="pd-features-grid">
                {features.map((f, i) => (
                    <FeatureItem key={f.num || f.name} {...f} index={i} />
                ))}
            </div>
        </div>
    );
};

export default ProjectFeatures;
