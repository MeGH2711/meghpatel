import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const NotFound = () => <div className="cont3ainer mt-5"><h2>404 - Not Found</h2></div>;

const App = () => {
  return (
    <>
      <MyNavbar />
      <SocialSidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;