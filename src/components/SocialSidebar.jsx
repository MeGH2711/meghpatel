import React from 'react';
import './css/SocialSidebar.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../index.css';

const SocialSidebar = () => {
    return (
        <>
            <motion.div
                className="left-sidebar"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.4 }}
            >
                <ul>
                    <li>
                        <a href="https://github.com/MeGH2711" target="_blank" rel="noreferrer">
                            <FaGithub />
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/meghpatel2711" target="_blank" rel="noreferrer">
                            <FaLinkedin />
                        </a>
                    </li>
                </ul>
            </motion.div>

            <motion.div
                className="right-sidebar"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.6 }}
            >
                <ul>
                    <li>
                        <a href="mailto:patelmeghmahesh2701@gmail.com">patelmeghmahesh2701@gmail.com</a>
                    </li>
                </ul>
            </motion.div>
        </>
    );
};

export default SocialSidebar;
