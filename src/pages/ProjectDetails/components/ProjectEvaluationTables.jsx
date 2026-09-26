import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTable, FaChartLine } from 'react-icons/fa6';
import { AnimatedSection, fadeUp } from './AnimatedSection';

const ProjectEvaluationTables = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!data || !data.tables || data.tables.length === 0) return null;

    const currentTable = data.tables[activeTab];

    return (
        <AnimatedSection className="pd-content-card pd-eval-section">
            <motion.div className="pd-card-header" variants={fadeUp}>
                <div className="pd-card-icon pd-icon--blue">
                    <FaTable size={14} />
                </div>
                <div>
                    <span className="pd-card-title">{data.title || "Benchmark & Size-Stratified Evaluation"}</span>
                </div>
            </motion.div>

            {data.description && (
                <motion.p className="pd-eval-desc" variants={fadeUp}>
                    {data.description}
                </motion.p>
            )}

            {/* Table Selector Tabs */}
            <motion.div className="pd-eval-tabs" variants={fadeUp}>
                {data.tables.map((t, idx) => (
                    <button
                        key={t.id || idx}
                        className={`pd-eval-tab ${activeTab === idx ? 'pd-eval-tab--active' : ''}`}
                        onClick={() => setActiveTab(idx)}
                    >
                        <span className="pd-eval-tab-paper">{t.paperTag}</span>
                        <span className="pd-eval-tab-title">{t.shortTitle || t.title}</span>
                    </button>
                ))}
            </motion.div>

            {/* Active Table Display */}
            <motion.div
                key={currentTable.id || activeTab}
                className="pd-eval-table-container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="pd-eval-table-meta">
                    <h4 className="pd-eval-table-heading">{currentTable.title}</h4>
                    {currentTable.subtitle && (
                        <p className="pd-eval-table-sub">{currentTable.subtitle}</p>
                    )}
                </div>

                <div className="pd-table-scroll">
                    <table className="pd-data-table">
                        <thead>
                            <tr>
                                {currentTable.headers.map((h, i) => (
                                    <th key={i}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentTable.rows.map((row, rIdx) => (
                                <tr key={rIdx} className={row.highlight ? 'pd-row--highlight' : ''}>
                                    {row.cells.map((cell, cIdx) => (
                                        <td key={cIdx} className={cIdx === 0 ? 'pd-cell-primary' : ''}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {currentTable.note && (
                    <div className="pd-table-note">
                        <FaChartLine size={12} className="pd-table-note-icon" />
                        <span>{currentTable.note}</span>
                    </div>
                )}
            </motion.div>
        </AnimatedSection>
    );
};

export default ProjectEvaluationTables;
