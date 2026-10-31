import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { storyMilestones, StoryMilestone } from '../data/storyData';
import { soundEngine } from '../utils/sound';

interface CustomMemory {
  id: string;
  title: string;
  date: string;
  description: string;
}

export const OurStoryPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('first-contact');
  const [customMemories, setCustomMemories] = useState<CustomMemory[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Load custom milestones
  useEffect(() => {
    const saved = localStorage.getItem('zaza_custom_memories');
    if (saved) {
      try {
        setCustomMemories(JSON.parse(saved));
      } catch {
        // safe
      }
    }
  }, []);

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const memory: CustomMemory = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      date: newDate.trim() || 'A Treasured Moment',
      description: newDesc.trim()
    };

    const updated = [...customMemories, memory];
    setCustomMemories(updated);
    localStorage.setItem('zaza_custom_memories', JSON.stringify(updated));

    setNewTitle('');
    setNewDate('');
    setNewDesc('');
    setShowAddForm(false);
    soundEngine.playSuccessChord();
  };

  const handleDeleteCustom = (id: string) => {
    const updated = customMemories.filter(m => m.id !== id);
    setCustomMemories(updated);
    localStorage.setItem('zaza_custom_memories', JSON.stringify(updated));
    soundEngine.playChime(350);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#ECE0D8]">
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
          Chronicle of Truth · Wahb & Zaza
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D9B477] font-semibold">
          Our Authentic Journey
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
          The Story of Us
        </h1>
        <p className="text-sm text-[#B89F9E] max-w-xl mx-auto">
          An unvarnished chronicle of how we met online, endured our separation, and chose to rebuild our foundation on absolute honesty.
        </p>
      </div>

      {/* Authenticity Guarantee Banner */}
      <div className="glass-surface p-6 rounded-xl border border-[#D9B477]/25 mb-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D9B477] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#D9B477]" />
            <span>Honoring Our Actual Reality</span>
          </div>
          <p className="text-xs text-[#B89F9E] leading-relaxed">
            Every chapter here represents the actual path we walked: online connection, zero physical meetings so far, holding sacred her rare photos and unrecorded voice, admitting my mistake, and working daily to earn back trust.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative border-l border-[#D9B477]/25 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {storyMilestones.map((milestone) => {
          const isExpanded = expandedId === milestone.id;

          return (
            <div key={milestone.id} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-[#16090F] border-2 border-[#D9B477] flex items-center justify-center group-hover:border-[#FFB5C8] group-hover:scale-110 transition-all shadow-md">
                <div className="w-2 h-2 rounded-full bg-[#E83F67]" />
              </div>

              {/* Milestone Card */}
              <div className="glass-hairline-card rounded-2xl p-6 sm:p-8 hover:border-[#FFB5C8]/40 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#E83F67]">
                      {milestone.number}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#D9B477]">
                      {milestone.phase}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#B89F9E] bg-[#2A0A19] px-3 py-1 rounded-full border border-[#D9B477]/20">
                    {milestone.truthBadge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF3EA] mb-3">
                  {milestone.title}
                </h3>

                <p className="font-serif italic text-sm text-[#FFB5C8] mb-4">
                  "{milestone.quote}"
                </p>

                {/* Narrative Paragraphs */}
                <div className="space-y-3 text-sm text-[#ECE0D8]/90 font-light leading-relaxed">
                  {milestone.narrative.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Expandable Lessons & Reflection */}
                <div className="mt-6 pt-4 border-t border-[#D9B477]/15">
                  <button
                    onClick={() => {
                      setExpandedId(isExpanded ? null : milestone.id);
                      soundEngine.playChime(500);
                    }}
                    className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-[#D9B477] hover:text-[#FFF3EA] transition-colors"
                  >
                    <span>Key Truths & Lessons</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-2 animate-fade-in">
                      {milestone.lessons.map((lesson, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#B89F9E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E83F67] shrink-0 mt-0.5" />
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* User-Added Milestones */}
        {customMemories.map((custom) => (
          <div key={custom.id} className="relative group animate-fade-in">
            <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-[#16090F] border-2 border-[#E83F67] flex items-center justify-center shadow-md">
              <div className="w-2 h-2 rounded-full bg-[#D9B477]" />
            </div>

            <div className="glass-hairline-card rounded-2xl p-6 sm:p-8 border border-[#FFB5C8]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#D9B477] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{custom.date}</span>
                </span>
                <button
                  onClick={() => handleDeleteCustom(custom.id)}
                  className="p-1 rounded hover:bg-[#2A0A19] text-[#B89F9E] hover:text-[#E83F67] transition-colors"
                  title="Remove milestone"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="font-serif text-2xl text-[#FFF3EA] mb-2">
                {custom.title}
              </h3>

              <p className="text-sm text-[#ECE0D8]/90 font-light leading-relaxed">
                {custom.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Milestone Form */}
      <div className="mt-16 text-center">
        {!showAddForm ? (
          <button
            onClick={() => {
              setShowAddForm(true);
              soundEngine.playChime(587.33);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] border border-[#D9B477]/30 text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add a Personal Milestone</span>
          </button>
        ) : (
          <div className="glass-surface max-w-xl mx-auto p-6 sm:p-8 rounded-2xl border border-[#D9B477]/30 text-left space-y-4 animate-fade-in">
            <h3 className="font-serif text-xl text-[#FFF3EA]">
              Record a New Milestone
            </h3>
            <p className="text-xs text-[#B89F9E]">
              Add a personal milestone, a date, or an honest memory to permanently save in your browser.
            </p>

            <form onSubmit={handleAddMemory} className="space-y-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Night We Talked Until Sunrise"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#12070E] border border-[#644E57] focus:border-[#E83F67] text-sm text-[#FFF3EA] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Approximate Date or Phase
                </label>
                <input
                  type="text"
                  placeholder="e.g. Autumn / Late Night"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#12070E] border border-[#644E57] focus:border-[#E83F67] text-sm text-[#FFF3EA] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Milestone Reflection
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the genuine memory and what it meant to our journey..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#12070E] border border-[#644E57] focus:border-[#E83F67] text-sm text-[#FFF3EA] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-full text-xs text-[#B89F9E] hover:text-[#FFF3EA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] text-white text-xs font-semibold uppercase tracking-wider shadow-md"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
