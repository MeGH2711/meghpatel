import React, { useEffect, useState } from 'react';
import './css/ThemeToggle.css'
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    const getSystemTheme = () =>
        window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light';

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
            className="btn btn-toggleTheme rounded-circle position-fixed d-flex align-items-center justify-content-center shadow fs-5"
            style={{
                bottom: '1.5rem',
                right: '3rem',
                width: '50px',
                height: '50px',
                zIndex: 9999,
            }}
            title="Toggle Theme"
        >
            {theme === 'dark' ? <FaSun color="#f39c12" /> : <FaMoon color="#34495e" />}
        </button>
    );
};

export default ThemeToggle;