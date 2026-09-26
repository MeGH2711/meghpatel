import React from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaArrowUpRightFromSquare, FaDownload } from 'react-icons/fa6';
import { AnimatedSection, fadeUp } from './AnimatedSection';

const ProjectPapers = ({ papers }) => {
    if (!papers || papers.length === 0) return null;

    return (
        <AnimatedSection className="pd-content-card pd-papers-section">
            <motion.div className="pd-card-header" variants={fadeUp}>
                <div className="pd-card-icon pd-icon--violet">
                    <FaFilePdf size={15} />
                </div>
                <div>
                    <span className="pd-card-title">Research Papers & Publications</span>
                </div>
            </motion.div>

            <motion.p className="pd-papers-intro" variants={fadeUp}>
                Detailed studies conducted for the <strong>MICCAI ISLES’26 Challenge</strong> (Ischemic Stroke Lesion Segmentation) analyzing multicenter performance across 1,453 stroke MRI cases.
            </motion.p>

            <div className="pd-papers-grid">
                {papers.map((paper, idx) => (
                    <motion.div
                        key={paper.paperNumber || idx}
                        className="pd-paper-full-card"
                        variants={fadeUp}
                    >
                        {/* Top Meta Header */}
                        <div className="pd-paper-full-header">
                            <div className="pd-paper-badge-group">
                                <span className="pd-paper-badge pd-paper-badge--accent">
                                    Paper #{paper.paperNumber}
                                </span>
                                <span className="pd-paper-badge pd-paper-badge--sub">
                                    {paper.tag || "MICCAI ISLES'26"}
                                </span>
                            </div>
                            {paper.score && (
                                <span className="pd-paper-metric-pill">
                                    {paper.score}
                                </span>
                            )}
                        </div>

                        {/* Title & Authors */}
                        <h3 className="pd-paper-full-title">{paper.title}</h3>
                        
                        <div className="pd-paper-authors-line">
                            <span className="pd-paper-authors">
                                <strong>Authors:</strong> {paper.authors}
                            </span>
                            <span className="pd-paper-affiliation">
                                {paper.affiliation}
                            </span>
                            {paper.mentor && (
                                <span className="pd-paper-mentor">
                                    <strong>Faculty Guide:</strong> {paper.mentor}
                                </span>
                            )}
                        </div>

                        {/* Abstract */}
                        <div className="pd-paper-abstract-box">
                            <span className="pd-paper-abstract-label">Abstract Overview</span>
                            <p className="pd-paper-abstract-text">{paper.abstract}</p>
                        </div>

                        {/* Metrics Pills */}
                        {paper.keyMetrics && paper.keyMetrics.length > 0 && (
                            <div className="pd-paper-metrics-chips">
                                {paper.keyMetrics.map(km => (
                                    <div key={km.label} className={`pd-paper-chip pd-chip--${km.variant || 'teal'}`}>
                                        <span className="pd-chip-label">{km.label}</span>
                                        <span className="pd-chip-val">{km.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Key Discoveries / Takeaways */}
                        {paper.keyInsights && paper.keyInsights.length > 0 && (
                            <div className="pd-paper-insights">
                                <span className="pd-paper-insights-label">Key Discoveries & Contributions:</span>
                                <ul className="pd-paper-insights-list">
                                    {paper.keyInsights.map((insight, i) => (
                                        <li key={i}>{insight}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Actions: View and Download */}
                        <div className="pd-paper-actions">
                            <a
                                href={paper.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pd-paper-action-btn pd-paper-btn--view"
                            >
                                <FaArrowUpRightFromSquare size={12} />
                                View Full Paper (PDF)
                            </a>
                            <a
                                href={paper.file}
                                download
                                className="pd-paper-action-btn pd-paper-btn--download"
                            >
                                <FaDownload size={12} />
                                Download PDF
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </AnimatedSection>
    );
};

export default ProjectPapers;
