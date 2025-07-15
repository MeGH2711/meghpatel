// Experience.jsx
import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { FaLaptopCode, FaPaintBrush, FaMicrophone } from 'react-icons/fa';
import './css/Experience.css';
import ExperienceCard from '../components/ExperienceCard';
import Footer from '../components/Footer';

const experiences = [
    {
        title: "Web Developer & Designer Intern",
        icon: <FaLaptopCode />,
        date: "February 2025 – April 2025",
        company: "Ellkay Software Pvt. Ltd.",
        description: "Built responsive UI using HTML, CSS, JS & Bootstrap, improving load time by 30%. Led integration of APIs for accurate data display. Collaborated in Agile sprints, ensuring 100% on-time delivery. Learnt WCAG 3.0 compaliance to support health-tech tasks, accelerating onboarding by 50%.",
        tech: ["Figma", "React", "Node.js", "Bootstrap", "Git"]
    },
    {
        title: "Web Developer Intern",
        icon: <FaPaintBrush />,
        date: "June 2024 - July 2024",
        company: "360 Design",
        description: "During my internship, I worked on web design using React.js, focusing on building interactive UIs and managing state with hooks. I developed CLOTHIFY, an online clothing store using the MERN stack, featuring product categorization and CRUD operations via RESTful APIs. I gained experience integrating APIs with Axios and enhancing app scalability. Future improvements include adding user authentication, a shopping cart, and payment integration.",
        tech: ["Figma", "React", "Node.js", "MongoDB", "Bootstrap"]
    },
    {
        title: "TechFest Organizer & Host",
        icon: <FaMicrophone />,
        date: "March 2024",
        company: "Gandhinagar University",
        description: "Led end-to-end coordination for large-scale campus tech events, engaging over 3,000 attendees. Took charge of event planning, logistics, and execution to ensure smooth operations. Hosted multiple coding competitions and workshops, driving active participation. Also contributed to event branding, marketing strategy, and enhancing the overall attendee experience.",
        tech: ["Event Hosting", "Leadership", "Team Coordination", "Public Speaking"]
    },
    {
        title: "Web Development & Designing Intern",
        icon: <FaLaptopCode />,
        date: "March 2023 - April 2023",
        company: "Oasis Infobyte",
        description: "During my internship at Oasis Infobyte, I gained hands-on experience in web development by working on real-world projects. I quickly adapted to using modern frameworks like Bootstrap enhancing both my technical skills and understanding of front-end development. One of the highlights was learning how to build a professional portfolio, showcasing my projects and skills effectively. Oasis Infobyte made my internship a highly rewarding and educational experience.",
        tech: ["HTML5", "CSS3", "JavaScript"]
    }
];

const Experience = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="experience-hero">
                <motion.h1
                    className="hero-heading"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Work Experience
                </motion.h1>
                <motion.p
                    className="hero-subtext"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                >
                    A timeline of passion, progress, and pixel-perfect pursuits.
                </motion.p>
            </div>
            <div className="container">
                <div className="custom-timeline">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} exp={exp} isLeft={index % 2 === 0} />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Experience;