import React from 'react';
import './css/SkipLink.css';

const SkipLink = () => {
    const handleSkip = (e) => {
        e.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <a href="#main-content" onClick={handleSkip} className="skip-link">
            Skip to main content
        </a>
    );
};

export default SkipLink;
