import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import TechStack from './pages/TechStack';
import GitHubActivity from './pages/GitHubActivity';
import Education from './pages/Education';
import Projects from './pages/Projects';
import WorkExperience from './pages/WorkExperience';
import Certifications from './pages/Certifications';
import Socials from './pages/Socials';
import Contact from './pages/Contact';

// Project Detail Pages
import HIEDetection from './pages/ProjectDetails/HIEDetail';
import BirdSpeciesDetail from './pages/ProjectDetails/BirdSpeciesDetail';
import InventuraXDetail from './pages/ProjectDetails/InventuraXDetail';
import RoadMarkingSegmentation from './pages/ProjectDetails/RoadMarkingDetail';

// ── Main single-page layout ───────────────────────────────
const MainLayout = () => (
  <>
    <section id="home"><Home /></section>
    <section id="about"><About /></section>
    <section id="techstack"><TechStack /></section>
    <section id="gitHubactivity"><GitHubActivity /></section>
    <section id="education"><Education /></section>
    <section id="projects"><Projects /></section>
    <section id="workexperience"><WorkExperience /></section>
    <section id="certifications"><Certifications /></section>
    <section id="socials"><Socials /></section>
    <section id="contact"><Contact /></section>
  </>
);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Megh Portfolio";
  }, []);

  const isProjectPage = location.pathname.startsWith('/projects/');

  return (
    <>
      <CustomCursor />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="noise-overlay" />
      <div className="grid-lines" />

      {!isProjectPage && <Navbar />}
      <SocialSidebar />

      <main>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/projects/inventurax" element={<InventuraXDetail />} />
          <Route path="/projects/birdspeciesdetection" element={<BirdSpeciesDetail />} />
          <Route path="/projects/hiedetection" element={<HIEDetection />} />
          <Route path="/projects/roadmarkingsegmentation" element={<RoadMarkingSegmentation />} />
        </Routes>
      </main>

      {!isProjectPage && <Footer />}
      <ThemeToggle />
    </>
  );
};

export default App;
