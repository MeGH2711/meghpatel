import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./css/Certifications.css";
import BottomNavigation from "../components/BottomNavigation";
import Footer from "../components/Footer";

const certifications = [
    {
        title: "Python (Basic)",
        issuer: "HackerRank",
        date: "Issued on Nov 2025",
        link: "https://www.hackerrank.com/certificates/927a24bc9b81",
        badge: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    },
    {
        title: "Basic SQL",
        issuer: "HackerRank",
        date: "Issued on July 2024",
        link: "https://www.hackerrank.com/certificates/cd761dfeafa4",
        badge: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    },
    {
        title: "UI/UX Virtual Experience",
        issuer: "Accenture",
        date: "Issued on June 2024",
        link: "https://www.futurelearn.com/certificates/8w9n2fe",
        badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png",
    },
    {
        title: "Digital Design & UX Job Simulation",
        issuer: "BP (British Petroleum)",
        date: "Issued June 2024",
        link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/bp/uwvgu23YiJ366ipgH_bp_LTtwsfyReLSd4FdM8_1719392323903_completion_certificate.pdf",
        badge: "https://arda.africa/wp-content/uploads/2022/08/Arda_Sponsor_Logos_Silver_bp.png",
    },
    {
        title: "Python 101 for Data Science",
        issuer: "Cognitive Class",
        date: "Issued May 2024",
        link: "https://courses.cognitiveclass.ai/certificates/e7b44bc8accc45c99da4617e180c546a",
        badge: "https://sn-portals-cognitiveclass.s3.us-south.cloud-object-storage.appdomain.cloud/644bcxng43h754iyqftkagb7aen1",
    },
    {
        title: "Google Play Store Listing Certificate",
        issuer: "Google Play Academy",
        date: "Issued Feb 2024",
        link: "https://www.credential.net/fbcb8ba3-8fb8-4282-a5fe-9126a4a054c6#acc.AdGEkoHu",
        badge: "https://templates.images.credential.net/16599603554210827167471657137208.png",
    },
    {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco",
        date: "Issued Oct 2022",
        link: "https://www.credly.com/badges/ae120aa9-2c8e-4b1c-bf38-4998fe66a0f1/linked_in_profile",
        badge: "https://images.credly.com/size/680x680/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
    },
];

const Certifications = () => {
    return (
        <Container>
            <div className="certifications-hero">
                <motion.h1
                    className="hero-heading"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Certifications
                </motion.h1>
                <motion.p
                    className="hero-subtext"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                >
                    Verified credentials reflecting continuous learning and skill growth.
                </motion.p>
            </div>

            {/* ====== GRID SECTION ====== */}
            <div className="cert-grid">
                {certifications.map((cert, idx) => (
                    <motion.div
                        className="cert-card"
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="cert-header">
                            <img src={cert.badge} alt={cert.issuer} className="cert-badge" />
                            <div>
                                <h3>{cert.title}</h3>
                                <p>{cert.issuer}</p>
                            </div>
                        </div>
                        <div className="cert-body">
                            <p className="cert-date">{cert.date}</p>
                            <a href={cert.link} target="_blank" rel="noreferrer" className="view-btn">
                                View Certificate
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            <BottomNavigation
                left="Projects"
                leftRoute="/projects"
                right="Contact"
                rightRoute="/contact"
            />
            <Footer />
        </Container>
    );
};

export default Certifications;