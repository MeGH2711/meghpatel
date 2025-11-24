// components/Projects.jsx
import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./css/Projects.css";
import BottomNavigation from "../components/BottomNavigation";
import Footer from "../components/Footer";
import inventuraxImage from "../assets/images/inventurax.webp";
import birdspeciesdetection from "../assets/images/birdspeciesdetection.png";

const projects = [
    {
        title: "Bird Species Detection Using Deep Learning",
        description:
            "A Vision Transformer–based deep learning model for fine-grained classification of 200 bird species using the CUB-200-2011 dataset.",
        tech: ["Python", "ViT-B/16 Model", "CNN Model", "PyTorch", "Gradio"],
        demo: "",
        image: birdspeciesdetection,
        github: "https://github.com/MeGH2711/birdspeciesrecognition",
    },
    {
        title: "De Baker's & More (Bakery Website) - Latest",
        description:
            "A charming website for a local bakery featuring a dynamic product catalog, and contact form integration with product availability support.",
        tech: ["ReactJS", "Bootstrap", "Node.js", "Firebase"],
        demo: "https://debakersandmore.vercel.app/",
        github: "https://github.com/MeGH2711/debakersandmore",
    },
    {
        title: "InventuraX : Sales and Billing Software",
        description:
            "PDF generation, QR-based UPI, sessions, invoicing and sales management.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js", "MongoDB"],
        demo: "",
        image: inventuraxImage,
        github: "https://github.com/MeGH2711/inventurax",
    },
    {
        title: "Anchoring Portfolio Site",
        description:
            "Personal website showcasing hosting experience, event highlights, and booking contact with an elegant UI.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "SMTP API"],
        demo: "https://anchormegh.vercel.app/",
        github: "https://github.com/MeGH2711/anchormegh",
    },
    {
        title: "De Baker's & More (Bakery Website)",
        description:
            "A charming website for a local bakery featuring a dynamic product catalog, custom cake ordering, and contact form integration.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        demo: "https://megh2711.github.io/debakersandmore.com/",
        github: "https://github.com/MeGH2711/debakersandmore.com",
    },
    {
        title: "Neoflex (Luxury Watch Brand Website)",
        description:
            "A modern, responsive website for showcasing luxury timepieces with product galleries, brand story, and purchase links.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "GSAP"],
        demo: "https://megh2711.github.io/neoflex.com/",
        github: "https://github.com/MeGH2711/neoflex.com",
    },
    {
        title: "DFT Alumini Association",
        description:
            "A dedicated platform for DFT Bhavnagar alumni to reconnect, share memories, and stay updated on events and opportunities.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        demo: "https://megh2711.github.io/dftalumini.com/",
        github: "https://github.com/MeGH2711/dftalumini.com",
    },
    {
        title: "Tree Story",
        description:
            "A website that explores the diversity, importance, and fascinating stories of trees in our environment.",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        demo: "https://megh2711.github.io/treestory.com/",
        github: "https://github.com/MeGH2711/treestory.com",
    },
];

const Projects = () => {
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

            {/* Masonry Grid Section */}
            <div className="masonry-container">
                {projects.map((project, idx) => (
                    <motion.div
                        className="masonry-card"
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-frame">
                            {project.demo ? (
                                <iframe
                                    src={project.demo}
                                    title={project.title}
                                    loading="lazy"
                                    sandbox="allow-same-origin allow-scripts"
                                ></iframe>
                            ) : (
                                <img src={project.image} alt={project.title} className="fallback-image" />
                            )}
                            <div className="overlay">
                                {project.demo && (
                                    <a href={project.demo} target="_blank" rel="noreferrer">
                                        Live Demo
                                    </a>
                                )}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noreferrer">
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="card-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.tech.map((t, i) => (
                                    <span key={i}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <BottomNavigation
                left="Experience"
                leftRoute="/experience"
                right="Certifications"
                rightRoute="/certifications"
            />
            <Footer />
        </Container>
    );
};

export default Projects;