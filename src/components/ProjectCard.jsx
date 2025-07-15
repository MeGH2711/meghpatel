import React, { useState } from "react";
import { Card, Button, Row } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import './css/ProjectCard.css';

const getBadgeColor = (tech) => {
    const colors = {
        React: "info",
        "Node.js": "success",
        MongoDB: "success",
        Express: "secondary",
        "Material UI": "primary",
        HTML: "danger",
        CSS: "primary",
        JavaScript: "warning",
        Bootstrap: "purple"
    };
    return `bg-${colors[tech] || "dark"}`;
};

const ProjectCard = ({ title, description, tech, image, github, demo }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <Card className="project-card h-100 shadow-lg border-0 rounded-5" onClick={() => setIsOpen(true)}>
                    <div className="project-img-wrapper">
                        <Card.Img variant="top" src={image} className="project-img" />
                        <div className="card-content-overlay d-flex justify-content-center align-items-center">
                            <Row className="px-5">
                                <h5 className="fw-bold mb-2 projectCardTitle">{title}</h5>
                                <p className="small">{description}</p>
                                <div className="mt-2 mb-3">
                                    {tech.map((t, i) => (
                                        <span key={i} className={`badge me-2 ${getBadgeColor(t)}`}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <Button variant="dark" size="sm" href={github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <FaGithub className="me-1" /> Code
                                    </Button>
                                    {demo && (
                                        <Button className="d-flex align-items-center justify-content-center" variant="outline-light" size="sm" href={demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                            <span className="blinking-dot me-2"></span> Live
                                        </Button>
                                    )}
                                </div>
                            </Row>
                        </div>
                    </div>
                </Card>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={image} alt={title} className="modal-img" />
                            <h3 className="fw-bold projectCardTitle mb-2">{title}</h3>
                            <p className="text-muted">{description}</p>
                            <div className="mb-3">
                                {tech.map((t, i) => (
                                    <span key={i} className={`badge me-2 ${getBadgeColor(t)}`}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="modal-buttons mt-4">
                                <Button variant="dark" href={github} target="_blank" rel="noreferrer">
                                    <FaGithub className="me-1" />
                                    Code
                                </Button>
                                {demo && (
                                    <Button variant="outline-primary d-flex align-items-center justify-content-center" href={demo} target="_blank" rel="noreferrer">
                                        <span className="blinking-dot me-2"></span> Live
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectCard;
