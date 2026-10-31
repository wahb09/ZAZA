import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  Feather, 
  Compass, 
  Gamepad2, 
  ScrollText, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight,
  BookmarkCheck,
  Stars
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const HomePage: React.FC = () => {
  const [activeStarWhisper, setActiveStarWhisper] = useState<string | null>(null);

  const starWhispers = [
    { id: 'star-1', name: 'Alkaid', text: 'I promise to always tell you the truth, even when it costs my pride.' },
    { id: 'star-2', name: 'Vega', text: 'Waiting to hear your voice one day is a privilege, not a burden.' },
    { id: 'star-3', name: 'Polaris', text: 'Your forgiveness gave our universe a second dawn.' },
    { id: 'star-4', name: 'Sirius', text: 'The few photos you shared are kept with sacred respect in my heart.' },
    { id: 'star-5', name: 'Betelgeuse', text: 'Distance only proves how resilient a true connection can be.' }
  ];

  const portals = [
    {
      title: 'The Love Letter',
      subtitle: 'A Handwritten Revelation',
      desc: 'An unvarnished confession of remorse, patience, and love across the digital divide.',
      path: '/letter',
      icon: Feather,
      tag: 'Heartfelt Confession',
      image: '/src/assets/images/luxury_letter_envelope_1793440571093.jpg'
    },
    {
      title: 'Our Real Story',
      subtitle: 'The Chronological Truth',
      desc: 'From our online beginning to the month of separation and our journey rebuilding trust.',
      path: '/our-story',
      icon: Compass,
      tag: 'Chronicle of Us',
      image: null
    },
    {
      title: 'Celestial Memory Game',
      subtitle: 'Test of Devotion & Focus',
      desc: 'Match cosmic romantic relics, uncover hidden messages, and celebrate our bond.',
      path: '/games/memory',
      icon: Gamepad2,
      tag: 'Interactive Play',
      image: '/src/assets/images/celestial_memory_relic_1793440570834.jpg'
    },
    {
      title: 'Catch My Heart Arcade',
      subtitle: 'Arcade Across the Stars',
      desc: 'Catch falling blessings, evade doubts, and navigate the distance in real-time.',
      path: '/games/catch-my-heart',
      icon: Heart,
      tag: 'Playable Arcade',
      image: null
    },
    {
      title: 'Poetry Collection',
      subtitle: 'Odes to the Unseen',
      desc: 'Stanzas dedicated to loving without voice or physical touch, and the grace of second chances.',
      path: '/poems',
      icon: ScrollText,
      tag: 'Verses for Zaza',
      image: null
    },
    {
      title: 'Solemn Promises',
      subtitle: 'Wahb’s Vows of Truth',
      desc: 'Six unbreakable commitments forged in honesty, patience, and continuous daily actions.',
      path: '/promises',
      icon: ShieldCheck,
      tag: 'Certified Vows',
      image: null
    },
    {
      title: 'Little Things I Love',
      subtitle: 'The Subtle Nuances',
      desc: 'The quiet beauty of your messages, your rare photographs, and your steadfast dignity.',
      path: '/little-things',
      icon: Sparkles,
      tag: 'Treasured Details',
      image: null
    },
    {
      title: 'Secret Surprise Vault',
      subtitle: 'A Locked Celestial Tribute',
      desc: 'A hidden realm reserved only for ZAZA, guarded by a special cipher.',
      path: '/secret-surprise',
      icon: KeyRound,
      tag: 'Exclusive to Zaza',
      image: null
    }
  ];

  return (
    <div className="relative min-h-screen text-[#ECE0D8] pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
        {/* Cinematic Backdrop Image with subtle dark scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/celestial_constellation_hero_1793440570542.jpg"
            alt="Nocturnal Celestial Cosmos"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E050A]/70 via-[#0E050A]/85 to-[#0E050A]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,63,103,0.12)_0%,transparent_70%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A0A19]/80 border border-[#D9B477]/30 text-xs tracking-[0.2em] uppercase text-[#D9B477] shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E83F67]" />
            <span>A Sanctuary Crafted by Wahb for ZAZA</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FFF3EA] leading-[1.15] text-balance">
            A Universe Made of <span className="italic text-[#FFB5C8] font-light">Love</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#ECE0D8]/85 font-light leading-relaxed">
            We have never met in person, nor have I heard your laughter aloud. Yet across the silent miles of the digital world,
            this sanctuary stands as my honest commitment to rebuild your trust with unwavering patience and truth.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/letter"
              onClick={() => soundEngine.playWaxSeal()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] hover:from-[#fe5076] hover:to-[#E83F67] text-[#FFF3EA] text-sm uppercase font-semibold tracking-wider shadow-lg shadow-[#E83F67]/30 hover:shadow-[#E83F67]/50 transition-all flex items-center justify-center gap-2 border border-[#FFB5C8]/40"
            >
              <Feather className="w-4 h-4" />
              <span>Read The Love Letter</span>
            </Link>

            <Link
              to="/our-story"
              onClick={() => soundEngine.playChime(523.25)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#16090F]/80 hover:bg-[#2A0A19] text-[#FFF3EA] text-sm uppercase font-medium tracking-wider border border-[#D9B477]/40 hover:border-[#D9B477] transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-[#D9B477]" />
              <span>Explore Our Real Story</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The Authentic Foundation Declaration Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="glass-hairline-card p-6 sm:p-8 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E83F67]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#D9B477] font-semibold">
                <BookmarkCheck className="w-4 h-4 text-[#D9B477]" />
                <span>Our Reality · Zero Fiction</span>
              </div>
              <h2 className="font-serif text-2xl text-[#FFF3EA] font-normal">
                Grounded in Complete Truth
              </h2>
              <p className="text-sm text-[#B89F9E] leading-relaxed max-w-2xl">
                No imaginary memories or fabricated moments. We met online, endured a painful month of separation after my mistake,
                and chose each other again. This website is not a showcase; it is my daily altar of dedication and honesty to you.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <Link
                to="/promises"
                onClick={() => soundEngine.playChime(659.25)}
                className="px-5 py-2.5 rounded-full bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] hover:text-[#FFF3EA] border border-[#D9B477]/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <span>Wahb’s Vows</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Constellation Stargazer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D9B477] font-semibold">
            Interactive Stargazer
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF3EA] font-normal">
            Whispers Hidden in the Constellation
          </h2>
          <p className="text-sm text-[#B89F9E] max-w-xl mx-auto">
            Click upon each star in ZAZA’s constellation to illuminate a private thought from Wahb.
          </p>
        </div>

        <div className="glass-surface rounded-2xl p-6 sm:p-10 border border-[#D9B477]/20 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {starWhispers.map((star) => {
              const isSelected = activeStarWhisper === star.id;
              return (
                <button
                  key={star.id}
                  onClick={() => {
                    setActiveStarWhisper(isSelected ? null : star.id);
                    soundEngine.playChime(isSelected ? 440 : 783.99);
                  }}
                  className={`group px-5 py-3 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#E83F67] to-[#B81647] text-white shadow-lg shadow-[#E83F67]/30 border border-[#FFB5C8]/50'
                      : 'bg-[#16090F]/90 text-[#ECE0D8] hover:text-white border border-[#D9B477]/20 hover:border-[#D9B477]/60'
                  }`}
                >
                  <Stars className={`w-4 h-4 transition-transform group-hover:rotate-45 ${isSelected ? 'text-white' : 'text-[#D9B477]'}`} />
                  <span>{star.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Whisper Card */}
          {activeStarWhisper && (
            <div className="mt-8 p-6 rounded-xl bg-[#2A0A19]/80 border border-[#FFB5C8]/30 max-w-2xl mx-auto text-center space-y-2 animate-fade-in">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9B477] font-semibold">
                {starWhispers.find((s) => s.id === activeStarWhisper)?.name} Speaks
              </span>
              <p className="font-serif text-lg sm:text-xl text-[#FFF3EA] italic">
                "{starWhispers.find((s) => s.id === activeStarWhisper)?.text}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Portals to All Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D9B477] font-semibold">
            Sanctuary Portals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF3EA] font-normal">
            Every Corner of Our Universe
          </h2>
          <p className="text-sm text-[#B89F9E] max-w-xl mx-auto">
            Each portal leads to a dedicated experience created with boundless thought and patience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.path}
                to={portal.path}
                onClick={() => soundEngine.playChime(587.33)}
                className="group relative flex flex-col justify-between p-6 rounded-xl glass-hairline-card hover:border-[#FFB5C8]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E83F67]/15 overflow-hidden"
              >
                {/* Optional subtle thumbnail background */}
                {portal.image && (
                  <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity">
                    <img
                      src={portal.image}
                      alt={portal.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16090F] via-[#16090F]/80 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#2A0A19] border border-[#D9B477]/30 flex items-center justify-center text-[#E83F67] group-hover:text-[#FFB5C8] group-hover:border-[#FFB5C8]/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D9B477] font-medium">
                      {portal.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl text-[#FFF3EA] group-hover:text-[#FFB5C8] transition-colors">
                      {portal.title}
                    </h3>
                    <p className="text-xs text-[#D9B477]/90 italic mb-2">
                      {portal.subtitle}
                    </p>
                    <p className="text-xs text-[#B89F9E] leading-relaxed">
                      {portal.desc}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-4 border-t border-[#D9B477]/10 flex items-center justify-between text-xs font-semibold text-[#D9B477] group-hover:text-[#FFF3EA] transition-colors">
                  <span>Enter</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Intimate Quote Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#2A0A19]/50 via-[#3B1024]/40 to-[#2A0A19]/50 border border-[#D9B477]/25 shadow-xl">
          <Heart className="w-8 h-8 text-[#E83F67] mx-auto mb-4 animate-pulse-subtle" />
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-light italic text-[#FFF3EA] leading-relaxed text-balance">
            "You gave me back the stars when all I left you was dark. Every tomorrow belongs to proving you were right to give us a second chance."
          </blockquote>
          <cite className="block mt-4 text-xs uppercase tracking-[0.2em] text-[#D9B477] not-italic font-semibold">
            — Wahb, for ZAZA
          </cite>
        </div>
      </section>
    </div>
  );
};
