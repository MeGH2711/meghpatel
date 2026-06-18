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
            className="btn-toggleTheme nav-theme-toggle rounded-circle d-flex align-items-center justify-content-center"
            style={{
                width: '36px',
                height: '36px',
                padding: 0,
                overflow: 'hidden',
                flexShrink: 0
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
                        <FaSun size={16} />
                    ) : (
                        <FaMoon className='text-warning' size={14} />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;