import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './css/Home.css';
import resume from '../assets/documents/MeghCV.pdf';
import { FaReact, FaRobot, FaPalette } from 'react-icons/fa';

/* ── Image Sequence Player ───────────────────────────────── */
const FRAME_COUNT = 158;
const FPS = 45;
const FRAME_PATH = (i) => `/images/frames/frame_${String(i).padStart(5, '0')}.avif`;

const ImageSequencePlayer = ({ frameCount = FRAME_COUNT, fps = FPS }) => {
    const canvasRef = useRef(null);
    const framesRef = useRef([]);
    const rafRef = useRef(null);
    const currentFrameRef = useRef(0);
    const lastTimeRef = useRef(null);
    const [loadProgress, setLoadProgress] = useState(0);
    const [ready, setReady] = useState(false);
    const interval = 1000 / fps;

    useEffect(() => {
        if (frameCount === 0) return;

        let loaded = 0;
        const images = [];

        const handleLoad = (e) => {
            loaded++;
            setLoadProgress(Math.round((loaded / frameCount) * 100));
            if (loaded === frameCount) {
                framesRef.current = images;
                setReady(true);
            }
        };

        const handleError = (e) => {
            console.error("Failed to load:", e.target.src);
            loaded++; // Count it anyway so the app doesn't hang at 99%
            if (loaded === frameCount) setReady(true);
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = FRAME_PATH(i);
            img.onload = handleLoad;
            img.onerror = handleError;
            images.push(img);
        }

        return () => {
            framesRef.current = [];
        };
    }, [frameCount]);

    // Animation loop
    const animate = useCallback((timestamp) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const elapsed = timestamp - lastTimeRef.current;

        if (elapsed >= interval) {
            lastTimeRef.current = timestamp - (elapsed % interval);
            const canvas = canvasRef.current;
            const frames = framesRef.current;
            if (canvas && frames.length > 0) {
                const ctx = canvas.getContext('2d');
                const frame = frames[currentFrameRef.current];
                if (frame && frame.complete) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Cover-fit: maintain aspect ratio, center crop
                    const cw = canvas.width, ch = canvas.height;
                    const fw = frame.naturalWidth, fh = frame.naturalHeight;
                    const scale = Math.max(cw / fw, ch / fh);
                    const dw = fw * scale, dh = fh * scale;
                    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
                    ctx.drawImage(frame, dx, dy, dw, dh);
                }
                currentFrameRef.current = (currentFrameRef.current + 1) % frames.length;
            }
        }

        rafRef.current = requestAnimationFrame(animate);
    }, [interval]);

    useEffect(() => {
        if (!ready) return;
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [ready, animate]);

    return (
        <div className="hero-video" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Loading state */}
            {!ready && frameCount > 0 && (
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '12px', background: 'rgba(10,15,25,0.6)',
                    zIndex: 2,
                }}>
                    <div style={{
                        width: '120px', height: '3px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '999px', overflow: 'hidden',
                    }}>
                        <div style={{
                            height: '100%', width: `${loadProgress}%`,
                            background: 'var(--accent)',
                            transition: 'width 0.2s ease',
                            borderRadius: '999px',
                        }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-lo)', letterSpacing: '0.1em' }}>
                        {loadProgress}%
                    </span>
                </div>
            )}

            {/* Fallback placeholder when frameCount not set */}
            {frameCount === 0 && (
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(10,15,25,0.5)',
                    color: 'var(--text-lo)', fontSize: '0.8rem',
                }}>
                    Set FRAME_COUNT in Home.jsx
                </div>
            )}

            <canvas
                ref={canvasRef}
                width={380}
                height={420}
                style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: ready ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                }}
            />
        </div>
    );
};

/* ── Home Component ──────────────────────────────────────── */
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

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
            {/* LEFT — Text */}
            <div className="hero-text-container">
                <motion.h1 variants={fadeUp}>
                    <span className="greeting">Hey, I'm</span>
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
                            <motion.span
                                className="role-chip"
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                                    borderColor: "var(--accent)"
                                }}
                            >
                                {role}
                            </motion.span>
                            {i < roles.length - 1 && <span className="role-sep">·</span>}
                        </React.Fragment>
                    ))}
                </motion.div>

                <motion.div className="hero-buttons" variants={fadeUp}>
                    <button className="btn-primary" onClick={(e) => handleScroll(e, 'projects')}>
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

            {/* RIGHT — Image Sequence Card */}
            <motion.div
                className="hero-video-wrapper"
                variants={fadeIn}
                style={{ rotateX, rotateY, transformPerspective: 1000 }}
            >
                <div className="video-card">
                    <div className="video-glow" />
                    <ImageSequencePlayer />
                    <div className="video-border-ring" />
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
