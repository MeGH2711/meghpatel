import React from "react";
import { motion } from "framer-motion";
import "./css/Home.css";

const Home = () => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
      },
    },
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();

    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.section
      className="home-hero"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="hero-content">
        {/* <motion.div className="eyebrow-tag" variants={fadeUp}>
          <span className="dot" />
          Available For Freelance & Full-Time
        </motion.div> */}

        <motion.h1 className="hero-name" variants={fadeUp}>
          <span className="first-name">Megh</span>
          <span className="last-name">Patel</span>
        </motion.h1>

        <motion.p className="hero-profession" variants={fadeUp}>
          AI Engineer · Developer · UI/UX Designer
        </motion.p>

        <motion.p className="hero-description" variants={fadeUp}>
          Designing intelligent experiences and building scalable digital
          products with creativity, precision, and modern technology.
        </motion.p>

        <motion.div className="hero-buttons" variants={fadeUp}>
          <button
            className="btn-primary"
            onClick={(e) => handleScroll(e, "projects")}
          >
            View My Work
          </button>

          <a
            href="/documents/MeghCV.pdf"
            download
            className="btn-secondary"
          >
            Resume
          </a>
        </motion.div>

        <motion.div className="stat-row" variants={fadeUp}>
          <div className="stat-item">
            <span className="stat-val">3+</span>
            <span className="stat-label">Years Experience</span>
          </div>

          <div className="stat-item">
            <span className="stat-val">20+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>

          <div className="stat-item">
            <span className="stat-val">100%</span>
            <span className="stat-label">Passion Driven</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Home;