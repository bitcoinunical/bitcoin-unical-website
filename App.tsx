
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ResearchPage from './pages/ResearchPage';
import ProjectPage from './pages/ProjectPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import SupportPage from './pages/SupportPage';
import PartnershipPage from './pages/PartnershipPage';
import ContactPage from './pages/ContactPage';
import FloatingButton from './components/FloatingButton';
import LibraryPage from './pages/LibraryPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/partnership" element={<PartnershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButton />
      </div>
    </HashRouter>
  );
}

export default App;