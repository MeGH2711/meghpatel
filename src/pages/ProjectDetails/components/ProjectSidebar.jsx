import React from 'react';
import { FaGithub, FaBrain } from 'react-icons/fa6';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const ProjectSidebarThumb = ({ thumb = {}, type, status, statusVariant, year }) => {
    const renderVisual = () => {
        if (thumb.type === 'bird') {
            return (
                <div className="pd-thumb-logo">
                    <div className="pd-thumb-icon pd-thumb-icon--bird">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 19 C7 19 2 14 1 9 C4 11 7.5 12 10 11 C11.5 10.5 12 9 12 8 C12 9 12.5 10.5 14 11 C16.5 12 20 11 23 9 C22 14 17 19 12 19Z"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinejoin="round"
                            />
                            <circle cx="9.5" cy="10.5" r="1" fill="currentColor" />
                        </svg>
                    </div>
                    {thumb.label || 'Bird Species AI'}
                </div>
            );
        }

        if (thumb.type === 'brain') {
            return (
                <>
                    <div className="pd-thumb-visual pd-thumb-visual--brain">
                        <div className="pd-scan-rings">
                            <div className="pd-ring pd-ring--1" />
                            <div className="pd-ring pd-ring--2" />
                            <div className="pd-ring pd-ring--3" />
                        </div>
                        <div className="pd-thumb-icon pd-thumb-icon--brain">
                            <FaBrain size={22} />
                        </div>
                    </div>
                    <div className="pd-thumb-label">{thumb.label || '2.5D Swin-UNet'}</div>
                </>
            );
        }

        if (thumb.type === 'road') {
            return (
                <div className="pd-thumb-logo">
                    <div className="pd-thumb-icon pd-thumb-icon--road">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="10" width="20" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M11 4 L13 4 L12 10Z" fill="currentColor" opacity="0.7" />
                            <path d="M11 20 L13 20 L12 14Z" fill="currentColor" opacity="0.7" />
                            <circle cx="6" cy="12" r="1.2" fill="currentColor" />
                            <circle cx="18" cy="12" r="1.2" fill="currentColor" />
                        </svg>
                    </div>
                    {thumb.label || 'Road Marking Segmentation'}
                </div>
            );
        }

        // Default: Text / Initials
        return (
            <div className="pd-thumb-logo">
                <div className="pd-thumb-icon">{thumb.initials || 'IX'}</div>
                {thumb.label || 'Project'}
            </div>
        );
    };

    const getStatusClass = () => {
        if (statusVariant === 'live') return 'pd-meta-val--live';
        if (statusVariant === 'research') return 'pd-meta-val--research';
        if (statusVariant === 'dev') return 'pd-meta-val--dev';
        return '';
    };

    return (
        <div className="pd-sidebar-thumb">
            <div className={`pd-thumb-inner ${thumb.type ? `pd-thumb-inner--${thumb.type}` : ''}`}>
                <div className="pd-thumb-grid" />
                {renderVisual()}
            </div>
            <div className="pd-thumb-meta">
                {[
                    ['Type', type],
                    ['Status', status],
                    ['Year', year],
                ].map(([k, v]) => (
                    <div key={k} className="pd-thumb-meta-row">
                        <span className="pd-meta-label">{k}</span>
                        <span className={`pd-meta-val ${k === 'Status' ? getStatusClass() : ''}`}>{v}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectSidebar = ({
    thumb,
    type,
    status,
    statusVariant,
    year,
    demo,
    github,
    tech = [],
    modelConfig,
    contributors,
}) => {
    return (
        <aside className="pd-sidebar">
            {/* Thumbnail Box with Metadata */}
            <ProjectSidebarThumb
                thumb={thumb}
                type={type}
                status={status}
                statusVariant={statusVariant}
                year={year}
            />

            {/* Live Demo Button */}
            {demo ? (
                <a href={demo} target="_blank" rel="noreferrer" className="pd-sidebar-btn pd-btn--primary">
                    <FaArrowUpRightFromSquare size={13} />
                    Live Preview
                </a>
            ) : (
                <div
                    className="pd-sidebar-btn pd-btn--disabled"
                    title="No live deployment — model runs locally or in research environment"
                >
                    <FaArrowUpRightFromSquare size={13} />
                    No Live Demo
                </div>
            )}

            {/* GitHub Button */}
            {github && (
                <a href={github} target="_blank" rel="noreferrer" className="pd-sidebar-btn pd-btn--secondary">
                    <FaGithub size={14} />
                    GitHub Repo
                </a>
            )}

            {/* Tech Stack */}
            {tech.length > 0 && (
                <div className="pd-sidebar-tech">
                    <div className="pd-section-micro-label">Tech Stack</div>
                    <div className="pd-tech-tags">
                        {tech.map(t => (
                            <span key={t} className="pd-tech-tag">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Optional Model Config (e.g. HIE) */}
            {modelConfig && modelConfig.length > 0 && (
                <div className="pd-sidebar-tech pd-arch-card">
                    <div className="pd-section-micro-label">Model Config</div>
                    <div className="pd-arch-list">
                        {modelConfig.map(({ label, value }) => (
                            <div key={label} className="pd-arch-row">
                                <span className="pd-arch-label">{label}</span>
                                <span className="pd-arch-val">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Optional Contributors Card */}
            {contributors && contributors.length > 0 && (
                <div className="pd-sidebar-contributor">
                    <div className="pd-section-micro-label">Contributor{contributors.length > 1 ? 's' : ''}</div>
                    {contributors.map(c => (
                        <a
                            key={c.handle || c.name}
                            href={c.url}
                            target="_blank"
                            rel="noreferrer"
                            className="pd-contributor-card"
                        >
                            <div className="pd-contributor-avatar">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-label="Contributor Avatar"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="pd-contributor-info">
                                <span className="pd-contributor-name">{c.name}</span>
                                <span className="pd-contributor-link">{c.handle}</span>
                            </div>
                            <FaArrowUpRightFromSquare size={10} className="pd-contributor-arrow" />
                        </a>
                    ))}
                </div>
            )}
        </aside>
    );
};

export default ProjectSidebar;
