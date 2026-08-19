import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

export const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

export const AnimatedSection = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={stagger}
            transition={{ delayChildren: delay }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
