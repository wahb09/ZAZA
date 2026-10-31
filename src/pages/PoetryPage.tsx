import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Bookmark, 
  Copy, 
  Check, 
  Heart, 
  Sparkles,
  Feather
} from 'lucide-react';
import { poemsList, Poem } from '../data/poemsData';
import { soundEngine } from '../utils/sound';

export const PoetryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePoemModal, setActivePoemModal] = useState<Poem | null>(null);

  // Load bookmarks
  useEffect(() => {
    const saved = localStorage.getItem('zaza_bookmarked_poems');
    if (saved) {
      try {
        setBookmarkedIds(JSON.parse(saved));
      } catch {
        // safe
      }
    }
  }, []);

  const categories = ['All', 'The Unseen Soul', 'Rebuilding Trust', 'Distance & Patience', 'Devotion to Zaza'];

  const filteredPoems = selectedCategory === 'All'
    ? poemsList
    : poemsList.filter(p => p.category === selectedCategory);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let next: string[];
    if (bookmarkedIds.includes(id)) {
      next = bookmarkedIds.filter(item => item !== id);
      soundEngine.playChime(350);
    } else {
      next = [...bookmarkedIds, id];
      soundEngine.playChime(659.25);
    }
    setBookmarkedIds(next);
    localStorage.setItem('zaza_bookmarked_poems', JSON.stringify(next));
  };

  const handleCopyPoem = (poem: Poem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${poem.title}\n\n${poem.stanzas.join('\n')}\n\n— Wahb, for ZAZA`;
    navigator.clipboard.writeText(text);
    setCopiedId(poem.id);
    soundEngine.playChime(783.99);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-[#ECE0D8]">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          onClick={() => soundEngine.playChime(440)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9B477] hover:text-[#FFF3EA] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B89F9E]">
          Verses of Devotion · For ZAZA
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D9B477] font-semibold">
          Poetry Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
          Verses Across the Silence
        </h1>
        <p className="text-sm text-[#B89F9E] max-w-xl mx-auto">
          Honest poetic meditations honoring our true reality: loving an unseen soul, facing the weight of the month apart, and finding peace in patience.
        </p>
      </div>

      {/* Categories Filter Tabs (Interactive Filter Controls, zero-pill discipline) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                soundEngine.playChime(523.25);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-colors ${
                isActive
                  ? 'bg-[#2A0A19] text-[#FFB5C8] border border-[#FFB5C8]/40 shadow-sm'
                  : 'bg-[#16090F]/70 text-[#ECE0D8]/70 hover:text-[#FFF3EA] border border-[#D9B477]/15'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Poems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPoems.map((poem) => {
          const isBookmarked = bookmarkedIds.includes(poem.id);
          const isCopied = copiedId === poem.id;

          return (
            <article
              key={poem.id}
              onClick={() => {
                setActivePoemModal(poem);
                soundEngine.playChime(600);
              }}
              className="glass-hairline-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#FFB5C8]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#E83F67]/15 cursor-pointer group"
            >
              <div className="space-y-6">
                {/* Header metadata */}
                <div className="flex items-center justify-between text-xs text-[#D9B477]">
                  <span className="uppercase tracking-[0.18em] font-medium">
                    {poem.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleCopyPoem(poem, e)}
                      className="p-1.5 rounded-md hover:bg-[#2A0A19] text-[#B89F9E] hover:text-[#FFF3EA] transition-colors"
                      title="Copy Poem"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={(e) => toggleBookmark(poem.id, e)}
                      className="p-1.5 rounded-md hover:bg-[#2A0A19] transition-colors"
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Poem'}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isBookmarked ? 'text-[#E83F67] fill-[#E83F67]' : 'text-[#B89F9E] hover:text-[#FFF3EA]'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl text-[#FFF3EA] group-hover:text-[#FFB5C8] transition-colors">
                  {poem.title}
                </h2>

                {/* Stanzas preview */}
                <div className="font-light text-sm sm:text-base text-[#ECE0D8]/90 leading-relaxed space-y-3 italic border-l border-[#D9B477]/20 pl-4 py-1">
                  {poem.stanzas.slice(0, 4).map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                  {poem.stanzas.length > 4 && (
                    <p className="text-xs text-[#D9B477]/80 not-italic pt-1">
                      ... tap card to read full poem
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-6 mt-6 border-t border-[#D9B477]/10 flex items-center justify-between text-xs">
                <span className="text-[#B89F9E] italic">{poem.dateTag}</span>
                <span className="text-[#D9B477] font-semibold group-hover:text-[#FFF3EA] flex items-center gap-1">
                  <span>Read Full Poem</span>
                  <Feather className="w-3 h-3" />
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Reading Modal */}
      {activePoemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E050A]/90 backdrop-blur-md animate-fade-in">
          <div className="glass-hairline-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-2xl space-y-6 border border-[#FFB5C8]/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9B477]/15">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D9B477]">
                {activePoemModal.category}
              </span>
              <button
                onClick={() => setActivePoemModal(null)}
                className="px-3 py-1 rounded-lg bg-[#2A0A19] hover:bg-[#3B1024] text-xs text-[#FFF3EA] border border-[#D9B477]/20 transition-colors"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FFF3EA]">
                {activePoemModal.title}
              </h3>
              <p className="text-xs text-[#D9B477]/80 italic">
                By Wahb · Dedicated to ZAZA
              </p>
            </div>

            {/* Complete Stanzas */}
            <div className="font-light text-base sm:text-lg text-[#ECE0D8] leading-loose space-y-4 italic py-4">
              {activePoemModal.stanzas.map((line, idx) => (
                <p key={idx}>{line || <br />}</p>
              ))}
            </div>

            {/* Wahb's Reflection Note */}
            <div className="p-4 rounded-xl bg-[#2A0A19]/70 border border-[#D9B477]/20 text-xs text-[#B89F9E] space-y-1">
              <span className="text-[#D9B477] font-semibold uppercase tracking-wider block">
                Wahb’s Truth
              </span>
              <p>{activePoemModal.reflection}</p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={(e) => handleCopyPoem(activePoemModal, e)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Poem</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
