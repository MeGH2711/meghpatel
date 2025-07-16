import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/About.css';
import { Tooltip } from 'bootstrap';
import { motion, useInView } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiFigma, SiPython, SiAdobephotoshop, SiAdobepremierepro } from 'react-icons/si';
import EducationCard from '../components/EducationCard';
import Footer from '../components/Footer';
import profileImg from '../assets/images/meghImage.webp';
import guLogo from '../assets/images/guLogo.webp';
import auLogo from '../assets/images/auLogo.webp';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const About = () => {

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new Tooltip(tooltipTriggerEl);
        });
    }, []);

    // Refs and inView hooks
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const educationRef = useRef(null);

    const isAboutInView = useInView(aboutRef, { once: true, threshold: 0.2 });
    const isSkillsInView = useInView(skillsRef, { once: true, threshold: 0.2 });
    const isEducationInView = useInView(educationRef, { once: true, threshold: 0.2 });

    const skills = [
        { Icon: FaHtml5, label: "HTML5" },
        { Icon: FaCss3Alt, label: "CSS3" },
        { Icon: FaJs, label: "JavaScript" },
        { Icon: FaBootstrap, label: "Bootstrap" },
        { Icon: FaReact, label: "React.js" },
        { Icon: FaNodeJs, label: "Node.js" },
        { Icon: SiMongodb, label: "MongoDB" },
        { Icon: FaGitAlt, label: "Git" },
        { Icon: SiFigma, label: "Figma" },
        { Icon: SiPython, label: "Python" },
        { Icon: SiAdobephotoshop, label: "Photoshop" },
        { Icon: SiAdobepremierepro, label: "Premiere Pro" }
    ];

    const navigate = useNavigate();

    return (
        <>
            <motion.div
                className="about-section container"
                ref={aboutRef}
                variants={fadeInUp}
                initial="hidden"
                animate={isAboutInView ? 'visible' : 'hidden'}
            >
                <div className="row align-items-center">
                    <div className="col-md-7">
                        <h2 className="section-title">About Me</h2>
                        <p className="intro-text text-justify">
                            Hi! I am <span className="highlightedText">Megh Patel</span>, currently pursuing my bachelor's degree in Computer Engineering at <strong>Gandhinagar Institute of Technology</strong> (Gandhinagar University) Affiliated with <strong>Gujarat Technological University</strong>.
                            I’m passionate about <strong>UI/UX design, web development</strong> and exploring the world of <strong>AI</strong>.
                        </p>
                        <div className="bio-box my-4 p-4 rounded shadow-sm">
                            <div className="row row-cols-1 row-cols-md-2 g-3 g-md-4">
                                <div className="col">
                                    <ul className="bio-list">
                                        <li><span>Qualification:</span> Bachelors in Engineering</li>
                                        <li><span>Email:</span> patelmeghmahesh2701@gmail.com</li>
                                        <li><span>Freelance:</span> Available</li>
                                    </ul>
                                </div>
                                <div className="col secondCol">
                                    <ul className="bio-list">
                                        <li><span>City:</span> Ahmedabad, Gujarat</li>
                                        <li><span>Age:</span> 22</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p className="detail-text text-justify mt-2">
                            I immerse myself in diverse fields—from coding and software architecture to design and innovation. I’ve actively participated in lab work, internships, and team projects...
                        </p>
                        <p className="detail-text text-justify mt-3">
                            On top of all this, I love hosting events, connecting with people, and contributing to experiences that bring joy and creativity—adding excitement to my professional journey.
                        </p>
                    </div>
                    <div className="col-md-5 text-center mt-4 mt-md-0">
                        <motion.img
                            src={profileImg}
                            alt="Megh Patel"
                            className="img-fluid profile-image"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isAboutInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="skills-section container"
                ref={skillsRef}
                variants={fadeInUp}
                initial="hidden"
                animate={isSkillsInView ? 'visible' : 'hidden'}
            >
                <h3 className="section-title">Skills & Tools</h3>
                <div className="skills-grid">
                    {skills.map(({ Icon, label }, index) => (
                        <motion.div
                            key={index}
                            className="skill-icon"
                            data-bs-toggle="tooltip"
                            title={label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isSkillsInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Icon />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="education-section container mt-5"
                ref={educationRef}
                variants={fadeInUp}
                initial="hidden"
                animate={isEducationInView ? 'visible' : 'hidden'}
            >
                <h3 className="section-title">Education</h3>
                <div className="row gy-4 mt-3">
                    <div className="col-md-6 d-flex justify-content-center">
                        <EducationCard
                            logo={auLogo}
                            altText="Ahmedabad University"
                            degree="Master's in Computer Science & Engineering"
                            duration="Planned: 2025 – 2027 (Expected)"
                            description="Planning to pursue a Master's degree in Computer Science to deepen my expertise in latest technologies. This will be a crucial step in expanding my research capabilities and contributing to innovative tech solutions."
                        />
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <EducationCard
                            logo={guLogo}
                            altText="Gandhinagar University"
                            degree="Bachelor of Engineering (B.E.)"
                            duration="Completed: 2021 – 2025"
                            description="Studying Computer Engineering at Gandhinagar Institute of Technology (Gandhinagar University), affiliated with Gujarat Technological University. This journey is enriching me with strong technical knowledge, hands-on experience, and a resilient problem-solving approach."
                        />
                    </div>
                </div>
            </motion.div>

            <div className='container'>

                <div className="d-flex justify-content-between align-items-center mt-4">
                    <motion.div
                        whileHover={{ x: -5 }}
                        style={{ cursor: 'pointer', color: '#000000ff', fontWeight: '500' }}
                        className="navigationLeftArrow"
                        onClick={() => navigate('/')}
                    >
                        Home ←
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 5 }}
                        style={{ cursor: 'pointer', color: '#000000ff', fontWeight: '500' }}
                        className="navigationRightArrow"
                        onClick={() => navigate('/experience')}
                    >
                        → View My Experience
                    </motion.div>
                </div>

            </div>

            <Footer />
        </>
    );
};

export default About;
