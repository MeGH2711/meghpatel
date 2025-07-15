// ExperienceCard.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './css/ExperienceCard.css';

const ExperienceCard = ({ exp, isLeft }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            className={`timeline-element ${isLeft ? 'left' : 'right'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={`timeline-dot ${isLeft ? 'dot-left' : 'dot-right'}`}>
                {exp.icon}
            </div>
            <div className={`timeline-card ${isLeft ? '' : 'align-right'}`}>
                <h3 className="exp-title">{exp.title}</h3>
                <h5 className="exp-subtitle">{exp.company} | {exp.date}</h5>
                <p className="exp-description">{exp.description}</p>
                <div className="exp-tags">
                    {exp.tech.map((tech, i) => (
                        <span className="tag" key={i}>{tech}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ExperienceCard;