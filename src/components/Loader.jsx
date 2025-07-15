import React from 'react';
import './css/Loader.css';

const Loader = () => {
    return (
        <div className="email-loader-overlay">
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Sending...</span>
            </div>
        </div>
    );
};

export default Loader;