import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import SkipLink from './components/SkipLink';

// Main Pages
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

// Project Detail Pages (Lazy Loaded for Route Splitting)
const ProjectDetail = lazy(() => import('./pages/ProjectDetails/ProjectDetail'));
const HIEDetection = lazy(() => import('./pages/ProjectDetails/HIEDetail'));
const BirdSpeciesDetail = lazy(() => import('./pages/ProjectDetails/BirdSpeciesDetail'));
const InventuraXDetail = lazy(() => import('./pages/ProjectDetails/InventuraXDetail'));
const RoadMarkingSegmentation = lazy(() => import('./pages/ProjectDetails/RoadMarkingDetail'));

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
    document.title = "Megh Patel | Portfolio";
  }, []);

  const isProjectPage = location.pathname.startsWith('/projects/');

  return (
    <>
      <SkipLink />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="noise-overlay" />
      <div className="grid-lines" />

      {!isProjectPage && <Navbar />}
      <SocialSidebar />

      <main id="main-content" tabIndex="-1">
        <Suspense fallback={<div className="route-loading-fallback" style={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/projects/inventurax" element={<InventuraXDetail />} />
            <Route path="/projects/birdspeciesdetection" element={<BirdSpeciesDetail />} />
            <Route path="/projects/hiedetection" element={<HIEDetection />} />
            <Route path="/projects/roadmarkingsegmentation" element={<RoadMarkingSegmentation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {!isProjectPage && <Footer />}
    </>
  );
};

export default App;
