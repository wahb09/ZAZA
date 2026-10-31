import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Feather, BookOpen, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-[#D9B477]/15 bg-[#12070E]/90 backdrop-blur-md pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Dedication */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl text-[#FFF3EA] tracking-wide">
                A Universe Made of Love
              </span>
            </div>
            <p className="text-sm text-[#B89F9E] leading-relaxed max-w-md">
              An intimate digital sanctuary created by Wahb for ZAZA. Born across distance, grounded in truth,
              and dedicated to rebuilding trust through unwavering honesty and patience.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#D9B477]/80">
              <ShieldCheck className="w-4 h-4 text-[#D9B477]" />
              <span>Dedicated with authentic devotion · No false memories, only real love</span>
            </div>
          </div>

          {/* Chapters & Written Words */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#D9B477] mb-4">
              Written Words
            </h4>
            <ul className="space-y-2.5 text-sm text-[#ECE0D8]/80">
              <li>
                <Link
                  to="/letter"
                  onClick={() => soundEngine.playChime(440)}
                  className="hover:text-[#FFB5C8] transition-colors flex items-center gap-1.5"
                >
                  <Feather className="w-3.5 h-3.5 text-[#E83F67]" />
                  <span>The Love Letter</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/poems"
                  onClick={() => soundEngine.playChime(440)}
                  className="hover:text-[#FFB5C8] transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#E83F67]" />
                  <span>Poetry Collection</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/our-story"
                  onClick={() => soundEngine.playChime(440)}
                  className="hover:text-[#FFB5C8] transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#E83F67]" />
                  <span>Our Real Story</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/promises"
                  onClick={() => soundEngine.playChime(440)}
                  className="hover:text-[#FFB5C8] transition-colors flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-[#E83F67]" />
                  <span>Wahb’s Promises</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Sanctuary */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#D9B477] mb-4">
              Sanctuary
            </h4>
            <ul className="space-y-2.5 text-sm text-[#ECE0D8]/80">
              <li>
                <Link
                  to="/games/memory"
                  onClick={() => soundEngine.playChime(440)}
                  className="hover:text-[#FFB5C8] transition-colors"
                >
                  Celestial Memory Game
                </Link>
              </li>
              <li>
                <Link
                  to="/games/catch-my-heart"
                  onClick={() => soundEngine.playChime(440)}
                  className="hover:text-[#FFB5C8] transition-colors"
                >
                  Catch My Heart Arcade
                </Link>
              </li>
              <li>
                <Link
                  to="/little-things"
                  onClick={() => soundEngine.playChime(440)}
                  className="hover:text-[#FFB5C8] transition-colors"
                >
                  Little Things I Love
                </Link>
              </li>
              <li>
                <Link
                  to="/secret-surprise"
                  onClick={() => soundEngine.playChime(440)}
                  className="hover:text-[#FFB5C8] transition-colors text-[#FFB5C8]"
                >
                  Secret Surprise Vault
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Subtle Bottom Bar */}
        <div className="pt-8 border-t border-[#D9B477]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B89F9E]">
          <p>© {new Date().getFullYear()} A Universe Made of Love — Wahb & ZAZA.</p>
          <div className="flex items-center gap-2">
            <span>Every word written in honesty</span>
            <span>·</span>
            <span>Forever patient</span>
            <span>·</span>
            <span className="text-[#FFB5C8]">ZAZA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
