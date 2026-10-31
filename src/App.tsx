import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { LoveLetterPage } from './pages/LoveLetterPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { PoetryPage } from './pages/PoetryPage';
import { MemoryGamePage } from './pages/MemoryGamePage';
import { CatchMyHeartPage } from './pages/CatchMyHeartPage';
import { LittleThingsPage } from './pages/LittleThingsPage';
import { PromisesPage } from './pages/PromisesPage';
import { SecretSurprisePage } from './pages/SecretSurprisePage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/ZAZA">
      <div className="relative min-h-screen bg-[#0E050A] text-[#ECE0D8] overflow-x-hidden flex flex-col justify-between selection:bg-[#E83F67]/30 selection:text-[#FFF3EA]">
        {/* Ambient Celestial Particle Canvas */}
        <StarfieldCanvas />

        {/* Scroll restoration */}
        <ScrollToTop />

        {/* Top Navigation Bar */}
        <Navbar />

        {/* Main Routed Content */}
        <main className="relative z-10 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/letter" element={<LoveLetterPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/poems" element={<PoetryPage />} />
            <Route path="/games/memory" element={<MemoryGamePage />} />
            <Route path="/games/catch-my-heart" element={<CatchMyHeartPage />} />
            <Route path="/little-things" element={<LittleThingsPage />} />
            <Route path="/promises" element={<PromisesPage />} />
            <Route path="/secret-surprise" element={<SecretSurprisePage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Editorial Footer */}
        <Footer />
            </div>
    </BrowserRouter>
  );
}