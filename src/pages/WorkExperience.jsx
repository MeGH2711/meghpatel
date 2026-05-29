import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaLaptopCode, FaPaintBrush, FaMicrophone, FaSpaceShuttle } from 'react-icons/fa';
import './css/WorkExperience.css';

const experiences = [
    {
        icon: <FaSpaceShuttle style={{ transform: `rotate(-45deg)` }} />,
        company: "Space Application Center, ISRO",
        title: "Research Intern",
        date: "May 2026 – Present",
        description: "At SAC, ISRO I will be working on planetary surface features extraction, 3D Reconstruction of Elevation Maps, generation of high resolution Digital Elevation Maps (DEM) which can be very much helpful for path planning, choosing a landing site for landers on different planets.",
        tech: ["Research", "GAN"]
    },
    {
        icon: <FaLaptopCode />,
        company: "Ellkay Software Pvt. Ltd.",
        title: "Web Developer & Designer Intern",
        date: "February 2025 – April 2025",
        description: "Built responsive UI using HTML, CSS, JS & Bootstrap, improving load time by 30%. Led integration of APIs for accurate data display. Collaborated in Agile sprints, ensuring 100% on-time delivery. Learnt WCAG 3.0 compliance to support health-tech tasks, accelerating onboarding by 50%.",
        tech: ["Figma", "React", "Node.js", "Bootstrap", "Git"]
    },
    {
        icon: <FaPaintBrush />,
        company: "360 Design",
        title: "Web Developer Intern",
        date: "June 2024 – July 2024",
        description: "Worked on web design using React.js, focusing on building interactive UIs and managing state with hooks. Developed CLOTHIFY, an online clothing store using the MERN stack, featuring product categorization and CRUD operations via RESTful APIs. Gained experience integrating APIs with Axios and enhancing app scalability.",
        tech: ["Figma", "React", "Node.js", "MongoDB", "Bootstrap"]
    },
    {
        icon: <FaMicrophone />,
        company: "Gandhinagar University",
        title: "TechFest Organizer & Host",
        date: "January 2024 – March 2024",
        description: "Led end-to-end coordination for large-scale campus tech events, engaging over 3,000 attendees. Hosted multiple coding and gaming competitions and workshops. Contributed to event branding, marketing strategy, and enhancing the overall attendee experience.",
        tech: ["Event Hosting", "Leadership", "Team Coordination", "Public Speaking"]
    },
    {
        icon: <FaLaptopCode />,
        company: "Oasis Infobyte",
        title: "Web Development & Designing Intern",
        date: "March 2023 – April 2023",
        description: "Gained hands-on experience in web development by working on real-world projects. Quickly adapted to using modern frameworks like Bootstrap, enhancing front-end development skills. Built a professional portfolio showcasing projects and skills effectively.",
        tech: ["HTML5", "CSS3", "JavaScript"]
    }
];

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 18 } }
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
};

const ExperienceCard = ({ icon, company, title, date, description, tech, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const isEven = index % 2 === 0;

    return (
        <div className="exp-row" ref={ref}>
            {/* Timeline dot */}
            <motion.div
                className="exp-dot-wrap"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.1, type: 'spring', stiffness: 120 }}
            >
                <div className="exp-dot">
                    <span className="exp-dot-icon">{icon}</span>
                </div>
                {index < experiences.length - 1 && <div className="exp-line" />}
            </motion.div>

            {/* Card */}
            <motion.div
                className={`exp-card ${isEven ? 'card-left' : 'card-right'}`}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.1, type: 'spring', stiffness: 72, damping: 18 }}
                whileHover={{ y: -4 }}
            >
                <div className="exp-card-top">
                    <div className="exp-card-left-col">
                        <div className="exp-company-tag">
                            <span className="exp-company-dot" />
                            <span>{company}</span>
                        </div>
                        <h3 className="exp-title">{title}</h3>
                    </div>
                    <span className="exp-date">{date}</span>
                </div>

                <p className="exp-desc">{description}</p>

                <div className="exp-tech-row">
                    {tech.map(t => (
                        <span key={t} className="exp-tech-pill">{t}</span>
                    ))}
                </div>

                <div className="exp-card-glow" />
            </motion.div>
        </div>
    );
};

const WorkExperience = () => {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

    return (
        <section className="work-section">

            {/* ── Header ── */}
            <motion.div
                ref={headingRef}
                className="work-header"
                initial="hidden"
                animate={headingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    Experience
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="work-heading" variants={fadeUp}>
                    Where I've{' '}
                    <span className="heading-accent">shipped</span>
                    <br />
                    real things.
                </motion.h2>

                <motion.p className="work-subheading" variants={fadeUp}>
                    From health-tech startups to university stages — every role sharpened
                    a different edge.
                </motion.p>
            </motion.div>

            {/* ── Timeline ── */}
            <div className="exp-timeline">
                {experiences.map((exp, i) => (
                    <ExperienceCard key={exp.company + i} {...exp} index={i} />
                ))}
            </div>

        </section>
    );
};

export default WorkExperience;
