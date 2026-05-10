import React, { useEffect, useState } from 'react';
import './css/ThemeToggle.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('dark');

    const getSystemTheme = () =>
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const applyTheme = (newTheme) => {
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || getSystemTheme();
        applyTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn-toggleTheme rounded-circle position-fixed d-flex align-items-center justify-content-center"
            style={{
                bottom: '1.5rem', // Aligned higher for better thumb reach/visuals
                right: '3rem',
                width: '56px',
                height: '56px',
                zIndex: 9999,
                padding: 0,
                overflow: 'hidden'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode. Currently in ${theme} mode.`}
            aria-pressed={theme === 'dark'}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: 40 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: -40 }}
                    transition={{ duration: 0.3 }}
                    className="d-flex align-items-center justify-content-center"
                >
                    {theme === 'dark' ? (
                        <FaSun size={20} />
                    ) : (
                        <FaMoon className='text-warning' size={18} />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;