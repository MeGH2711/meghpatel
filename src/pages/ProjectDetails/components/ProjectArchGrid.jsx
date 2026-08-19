import React from 'react';

const ProjectArchGrid = ({ archGrid }) => {
    if (!archGrid || !archGrid.cards) return null;

    const { title = 'Ensemble Architecture', cards = [] } = archGrid;

    return (
        <div className="pd-content-card">
            <div className="pd-card-header">
                <div className="pd-card-icon pd-icon--blue">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label="Architecture Grid Icon">
                        <rect x="1" y="5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                        <rect x="9" y="5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M7 8h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M4 2v3M4 11v3M12 2v3M12 11v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="pd-card-title">{title}</span>
            </div>
            <div className="pd-arch-grid">
                {cards.map(({ label, sub, accent = 'blue', desc }) => (
                    <div key={label} className={`pd-ensemble-card pd-ensemble--${accent}`}>
                        <div className="pd-ensemble-top">
                            <span className="pd-ensemble-label">{label}</span>
                            <span className="pd-ensemble-sub">{sub}</span>
                        </div>
                        <p className="pd-ensemble-desc">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectArchGrid;
