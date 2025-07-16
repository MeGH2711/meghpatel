import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/Home.css';
import '../index.css';
import resume from '../assets/documents/MeghCV.pdf';

const Home = () => {
    const navigate = useNavigate();

    const handleViewWork = () => {
        navigate('/projects');
    };

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <motion.div
            className="home-hero"
            initial="hidden"
            animate="show"
            variants={containerVariants}
        >
            <div className="hero-content">
                <motion.h1 variants={itemVariants}>
                    Hey, I'm <span className="highlight">Megh Patel</span>
                </motion.h1>

                <motion.p className="tagline" variants={itemVariants}>
                    Crafting code with creativity & precision.
                </motion.p>

                <motion.p className="roles" variants={itemVariants}>
                    Developer • UI/UX Designer • AI Enthusiast
                </motion.p>

                <motion.div className="hero-buttons gap-3" variants={itemVariants}>
                    <Button className="hero-btn" onClick={handleViewWork}>
                        View My Work
                    </Button>
                    <a
                        href={resume}
                        download
                        className="hero-btn-outline"
                    >
                        Download Resume
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Home;
