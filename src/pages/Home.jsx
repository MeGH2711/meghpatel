import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './css/Home.css';
import resume from '../assets/documents/MeghCV.pdf';
import profileVideo from '../assets/videos/loopedvideo.webm';
import { FaReact, FaRobot, FaPalette } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

    const rotateX = useTransform(springY, [-300, 300], [8, -8]);
    const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX - innerWidth / 2);
            mouseY.set(e.clientY - innerHeight / 2);
            setMousePos({
                x: (e.clientX / innerWidth) * 100,
                y: (e.clientY / innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } }
    };

    const fadeIn = {
        hidden: { opacity: 0, scale: 0.92 },
        show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 70, damping: 18, delay: 0.3 } }
    };

    const roles = ['AI Engineer', 'Developer', 'UI/UX Designer'];

    return (
        <motion.section
            className="home-hero pt-5"
            ref={containerRef}
            initial="hidden"
            animate="show"
            variants={containerVariants}
            style={{
                '--mx': `${mousePos.x}%`,
                '--my': `${mousePos.y}%`,
            }}
        >
            {/* Ambient background orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            {/* Noise texture overlay */}
            <div className="noise-overlay" />

            {/* Grid lines */}
            <div className="grid-lines" />

            {/* LEFT — Text */}
            <div className="hero-text-container">
                {/* <motion.div className="eyebrow-tag" variants={fadeUp}>
                    <span className="dot" />
                    <span>Available for opportunities</span>
                </motion.div> */}

                <motion.h1 variants={fadeUp}>
                    <span className="greeting">Hey, I'm</span>
                    {/* <br /> */}
                    <span className="name-block">
                        <span className="name-fill">Megh</span>
                        <span className="name-outline"> Patel</span>
                    </span>
                </motion.h1>

                <motion.p className="tagline" variants={fadeUp}>
                    Crafting code with <em>creativity</em> &amp; precision.
                </motion.p>

                <motion.div className="roles-row" variants={fadeUp}>
                    {roles.map((role, i) => (
                        <React.Fragment key={role}>
                            <span className="role-chip">{role}</span>
                            {i < roles.length - 1 && <span className="role-sep">·</span>}
                        </React.Fragment>
                    ))}
                </motion.div>

                <motion.div className="hero-buttons" variants={fadeUp}>
                    <button className="btn-primary" onClick={() => navigate('/projects')}>
                        <span>View My Work</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <a href={resume} download className="btn-secondary">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Resume</span>
                    </a>
                </motion.div>

                <motion.div className="stat-row" variants={fadeUp}>
                    {[
                        { val: '3+', label: 'Years building' },
                        { val: '20+', label: 'Projects shipped' }
                    ].map(({ val, label }) => (
                        <div className="stat-item" key={label}>
                            <span className="stat-val">{val}</span>
                            <span className="stat-label">{label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* RIGHT — Video Card */}
            <motion.div
                className="hero-video-wrapper"
                variants={fadeIn}
                style={{ rotateX, rotateY, transformPerspective: 1000 }}
            >
                <div className="video-card">
                    <div className="video-glow" />
                    <video
                        className="hero-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src={profileVideo} type="video/webm" />
                    </video>
                    <div className="video-border-ring" />
                    {/* <div className="video-badge">
                        <span className="badge-dot pulse" />
                        <span>Open to work</span>
                    </div> */}
                </div>

                <motion.div
                    className="float-pill pill-react"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <FaReact color="#61DAFB" /> <span>React</span>
                </motion.div>

                <motion.div
                    className="float-pill pill-ai"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <FaRobot color="#3b82f6" /> <span>AI/ML</span>
                </motion.div>

                <motion.div
                    className="float-pill pill-ux"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <FaPalette color="#fbbf24" /> <span>UX</span>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Home;
