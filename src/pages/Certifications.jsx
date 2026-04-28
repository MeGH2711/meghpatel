import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './css/Certifications.css';
import cpim2025 from '../assets/documents/cpim2025.pdf';
import tcsioncareeredgeyoungprofessional from '../assets/documents/tcsioncareeredgeyoungprofessional.pdf';
import nationalipawareness from '../assets/documents/nationalipawareness.pdf';

const certifications = [
    {
        title: "CPIM 2025",
        issuer: "SVGU",
        date: "Issued on April 2025",
        sortDate: "2025-04",
        link: cpim2025,
        badge: "https://images.shiksha.com/mediadata/images/1717483894phpW49Qzc.jpeg",
    },
    {
        title: "Python (Basic)",
        issuer: "HackerRank",
        date: "Issued on Nov 2025",
        sortDate: "2025-11",
        link: "https://www.hackerrank.com/certificates/927a24bc9b81",
        badge: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    },
    {
        title: "Basic SQL",
        issuer: "HackerRank",
        date: "Issued on July 2024",
        sortDate: "2024-07",
        link: "https://www.hackerrank.com/certificates/cd761dfeafa4",
        badge: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    },
    {
        title: "UI/UX Virtual Experience",
        issuer: "Accenture",
        date: "Issued on June 2024",
        sortDate: "2024-06",
        link: "https://www.futurelearn.com/certificates/8w9n2fe",
        badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png",
    },
    {
        title: "Digital Design & UX Job Simulation",
        issuer: "BP (British Petroleum)",
        date: "Issued June 2024",
        sortDate: "2024-06",
        link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/bp/uwvgu23YiJ366ipgH_bp_LTtwsfyReLSd4FdM8_1719392323903_completion_certificate.pdf",
        badge: "https://arda.africa/wp-content/uploads/2022/08/Arda_Sponsor_Logos_Silver_bp.png",
    },
    {
        title: "Python 101 for Data Science",
        issuer: "Cognitive Class",
        date: "Issued May 2024",
        sortDate: "2024-05",
        link: "https://courses.cognitiveclass.ai/certificates/e7b44bc8accc45c99da4617e180c546a",
        badge: "https://sn-portals-cognitiveclass.s3.us-south.cloud-object-storage.appdomain.cloud/644bcxng43h754iyqftkagb7aen1",
    },
    {
        title: "Google Play Store Listing Certificate",
        issuer: "Google Play Academy",
        date: "Issued Feb 2024",
        sortDate: "2024-02",
        link: "https://www.credential.net/fbcb8ba3-8fb8-4282-a5fe-9126a4a054c6#acc.AdGEkoHu",
        badge: "https://templates.images.credential.net/16599603554210827167471657137208.png",
    },
    {
        title: "TCS iON Career Edge - Young Professional",
        issuer: "TCS iON",
        date: "Issued on Jul 2023",
        sortDate: "2023-07",
        link: tcsioncareeredgeyoungprofessional,
        badge: "https://www.sxill.in/wp-content/uploads/2023/06/TCS-iON-Logo-RGB-Color-300x121.png",
    },
    {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco",
        date: "Issued Oct 2022",
        sortDate: "2022-10",
        link: "https://www.credly.com/badges/ae120aa9-2c8e-4b1c-bf38-4998fe66a0f1/linked_in_profile",
        badge: "https://images.credly.com/size/680x680/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
    },
    {
        title: "IP Awareness and Training Program",
        issuer: "IPO & MoE Innovation Cell",
        date: "Issued on Apr 2022",
        sortDate: "2022-04",
        link: nationalipawareness,
        badge: "https://employmentnews.gov.in/writereaddata/251020222131701.PNG",
    },
];

const ITEMS_PER_PAGE = 6;

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 18 } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const CertCard = ({ title, issuer, date, link, badge, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [imgError, setImgError] = useState(false);

    return (
        <motion.a
            ref={ref}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.07, type: 'spring', stiffness: 80 }}
            whileHover={{ y: -5 }}
            aria-label={`${title} by ${issuer} — View Certificate`}
        >
            {/* Badge */}
            <div className="cert-badge-wrap">
                {!imgError ? (
                    <img
                        src={badge}
                        alt={`${issuer} badge`}
                        className="cert-badge-img"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="cert-badge-fallback">
                        {issuer.charAt(0)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="cert-content">
                <span className="cert-issuer">{issuer}</span>
                <h3 className="cert-title">{title}</h3>
                <span className="cert-date">{date}</span>
            </div>

            {/* Arrow */}
            <div className="cert-arrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Hover glow */}
            <div className="cert-card-glow" />
        </motion.a>
    );
};

const Certifications = () => {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: '-80px' });
    const [showAll, setShowAll] = useState(false);

    const sorted = [...certifications].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    const visible = showAll ? sorted : sorted.slice(0, ITEMS_PER_PAGE);
    const remaining = sorted.length - ITEMS_PER_PAGE;

    return (
        <section className="cert-section">

            {/* ── Header ── */}
            <motion.div
                ref={headingRef}
                className="cert-header"
                initial="hidden"
                animate={headingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    Certifications
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="cert-heading" variants={fadeUp}>
                    Credentials that{' '}
                    <span className="heading-accent">validate</span>
                    <br />
                    the craft.
                </motion.h2>

                <motion.p className="cert-subheading" variants={fadeUp}>
                    A curated collection of certifications spanning AI, design, development, and beyond,
                    each one a deliberate investment in growing sharper.
                </motion.p>
            </motion.div>

            {/* ── Cert count badge ── */}
            <motion.div
                className="cert-count-row"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <span className="cert-count-pill">
                    <span className="cert-count-num">{certifications.length}</span>
                    <span className="cert-count-label">Certificates Earned</span>
                </span>
            </motion.div>

            {/* ── Cards Grid ── */}
            <div className="cert-grid">
                <AnimatePresence>
                    {visible.map((cert, i) => (
                        <CertCard key={cert.title} {...cert} index={i % ITEMS_PER_PAGE} />
                    ))}
                </AnimatePresence>
            </div>

            {/* ── Show More / Less ── */}
            {sorted.length > ITEMS_PER_PAGE && (
                <motion.div
                    className="cert-toggle-row"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 70 }}
                >
                    <button
                        className="cert-toggle-btn"
                        onClick={() => setShowAll(prev => !prev)}
                        aria-label={showAll ? 'Show fewer certifications' : `Show ${remaining} more certifications`}
                    >
                        {showAll ? (
                            <>
                                Show less
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                        ) : (
                            <>
                                Show {remaining} more
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                        )}
                    </button>
                </motion.div>
            )}
        </section>
    );
};

export default Certifications;
