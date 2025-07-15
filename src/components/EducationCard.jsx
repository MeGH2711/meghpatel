import React from 'react';
import './css/EducationCard.css';

const EducationCard = ({ logo, altText, degree, duration, description }) => {
    return (
        <div className="education-modern-card text-center">
            <div className="edu-logo-wrap mb-3">
                <img src={logo} alt={altText} className="edu-logo" />
            </div>
            <h5 className="edu-degree mb-1">{degree}</h5>
            <p className="edu-duration text-muted mb-2">{duration}</p>
            <p className="edu-desc detail-text">{description}</p>
        </div>
    );
};

export default EducationCard;