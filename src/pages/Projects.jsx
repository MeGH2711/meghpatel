// components/Projects.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./css/Projects.css";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import inventuraxImage from "../assets/images/inventurax.webp";
import debakers from "../assets/images/debakers.webp";
import anchorMegh from "../assets/images/anchorMegh.webp";
import neoflex from "../assets/images/neoflex.webp";
import dftalumini from "../assets/images/dftalumini.webp";
import treeStory from "../assets/images/treeStory.webp";

const projects = [
    {
        title: "InventuraX : Sales and Billing Software",
        description:
            "PDF generation, QR-based UPI, sessions, invoicing and sales management.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js", "MongoDB"],
        image: inventuraxImage,
        github: "https://github.com/MeGH2711/inventurax",
        demo: ""
    },
    {
        title: "De Baker's & More (Bakery Website)",
        description:
            "A charming website for a local bakery featuring a dynamic product catalog, custom cake ordering, and contact form integration.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        image: debakers,
        github: "https://github.com/MeGH2711/debakersandmore.com",
        demo: "https://megh2711.github.io/debakersandmore.com/"
    },
    {
        title: "Anchoring Portfolio Site",
        description:
            "Personal website showcasing hosting experience, event highlights, and booking contact with an elegant UI.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "SMTP API"],
        image: anchorMegh,
        github: "https://github.com/MeGH2711/anchormegh",
        demo: "https://anchormegh.vercel.app/"
    },
    {
        title: "Neoflex (Luxury Watch Brand Website)",
        description:
            "A modern, responsive website for showcasing luxury timepieces with product galleries, brand story, and purchase links.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "GSAP"],
        image: neoflex,
        github: "https://github.com/MeGH2711/neoflex.com",
        demo: "https://megh2711.github.io/neoflex.com/"
    },
    {
        title: "DFT Alumini Association",
        description:
            "A dedicated platform for DFT Bhavnagar alumni to reconnect, share memories, and stay updated on events and opportunities.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        image: dftalumini,
        github: "https://github.com/MeGH2711/dftalumini.com",
        demo: "https://megh2711.github.io/dftalumini.com/"
    },
    {
        title: "Tree Story",
        description:
            "A website that explores the diversity, importance, and fascinating stories of trees in our environment.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        image: treeStory,
        github: "https://github.com/MeGH2711/dftalumini.com",
        demo: "https://megh2711.github.io/treestory.com/"
    }
];

const Projects = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <div className="projects-hero">
                <motion.h1
                    className="hero-heading"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Projects
                </motion.h1>
                <motion.p
                    className="hero-subtext"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                >
                    Blueprints of innovation, built with passion and precision.
                </motion.p>
            </div>
            <Row className="projectCardsContainer g-4">
                {projects.map((project, idx) => (
                    <Col key={idx} sm={12} md={6} lg={6}>
                        <ProjectCard {...project} />
                    </Col>
                ))}
            </Row>

            <div className='container'>
                <div className="d-flex justify-content-between align-items-center mt-5">
                    <motion.div
                        whileHover={{ x: -5 }}
                        style={{ cursor: 'pointer', color: '#000000ff', fontWeight: '500' }}
                        className="navigationLeftArrow"
                        onClick={() => navigate('/experience')}
                    >
                        Experience ←
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 5 }}
                        style={{ cursor: 'pointer', color: '#000000ff', fontWeight: '500' }}
                        className="navigationRightArrow"
                        onClick={() => navigate('/contact')}
                    >
                        → Contact
                    </motion.div>
                </div>
            </div>

            <Footer />
        </Container>
    );
};

export default Projects;
