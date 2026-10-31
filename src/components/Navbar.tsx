import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleAudioToggle = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playChime(659.25);
    }
  };

  const navLinks = [
    { name: 'Love Letter', path: '/letter' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Poems', path: '/poems' },
    { name: 'Memory Game', path: '/games/memory' },
    { name: 'Catch My Heart', path: '/games/catch-my-heart' },
    { name: 'Little Things', path: '/little-things' },
    { name: 'Promises', path: '/promises' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#12070E]/85 backdrop-blur-md border-b border-[#D9B477]/15 py-3 shadow-lg shadow-[#0E050A]/80'
          : 'bg-transparent border-b border-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <Link
          to="/"
          className="flex items-center gap-2 group text-left shrink-0"
          onClick={() => soundEngine.playChime(523.25)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E83F67] to-[#D9B477] p-[1px] flex items-center justify-center shadow-sm">
            <div className="w-full h-full bg-[#16090F] rounded-full flex items-center justify-center group-hover:bg-[#2A0A19] transition-colors">
              <Heart className="w-3.5 h-3.5 text-[#E83F67] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className="font-serif text-lg sm:text-xl font-normal tracking-tight text-[#FFF3EA] whitespace-nowrap">
            A Universe Made of Love
          </span>
        </Link>

        {/* Zone 2: Desktop Nav Links (Clean single-line links with subtle hover effects) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#ECE0D8]/80">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => soundEngine.playChime(440)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#FFF3EA] ${
                  isActive ? 'text-[#FFB5C8] font-semibold' : ''
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#E83F67] to-[#D9B477]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className="p-2 rounded-full text-[#D9B477] hover:text-[#FFF3EA] bg-[#2A0A19]/60 hover:bg-[#3B1024] border border-[#D9B477]/20 transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Primary CTA: Secret Surprise */}
          <Link
            to="/secret-surprise"
            onClick={() => soundEngine.playChime(783.99)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium tracking-wide uppercase text-[#FFF3EA] bg-gradient-to-r from-[#E83F67] to-[#B81647] hover:from-[#fe5076] hover:to-[#E83F67] rounded-full shadow-md shadow-[#E83F67]/25 hover:shadow-[#E83F67]/45 transition-all whitespace-nowrap shrink-0 border border-[#FFB5C8]/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFF3EA]" />
            <span>Secret Surprise</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              soundEngine.playChime(587.33);
            }}
            className="xl:hidden p-2 text-[#ECE0D8] hover:text-[#FFF3EA] bg-[#2A0A19]/50 rounded-lg border border-[#D9B477]/20 transition-colors"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[60px] bg-[#16090F]/95 backdrop-blur-xl border-b border-[#D9B477]/20 shadow-2xl px-6 py-6 transition-all duration-200">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-base transition-colors ${
                location.pathname === '/' ? 'bg-[#2A0A19] text-[#FFB5C8] font-semibold' : 'text-[#ECE0D8] hover:text-white'
              }`}
            >
              Home
            </Link>
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-base transition-colors ${
                    isActive ? 'bg-[#2A0A19] text-[#FFB5C8] font-semibold' : 'text-[#ECE0D8] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[#D9B477]/15">
              <Link
                to="/secret-surprise"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#E83F67] to-[#B81647] text-white text-sm font-medium uppercase tracking-wider shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Open Secret Surprise</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
