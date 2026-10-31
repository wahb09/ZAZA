import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  Camera, 
  Mic, 
  MessageSquare, 
  Moon, 
  Shield, 
  Feather,
  Plus
} from 'lucide-react';
import { initialLittleThings, LittleThingItem } from '../data/littleThingsData';
import { soundEngine } from '../utils/sound';

export const LittleThingsPage: React.FC = () => {
  const [items, setItems] = useState<LittleThingItem[]>(initialLittleThings);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [activeThoughtId, setActiveThoughtId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newThought, setNewThought] = useState('');

  // Load likes & custom items
  useEffect(() => {
    const savedLikes = localStorage.getItem('zaza_little_things_likes');
    if (savedLikes) {
      try {
        setLikes(JSON.parse(savedLikes));
      } catch {
        // safe
      }
    }

    const customSaved = localStorage.getItem('zaza_custom_little_things');
    if (customSaved) {
      try {
        const customItems = JSON.parse(customSaved);
        setItems([...initialLittleThings, ...customItems]);
      } catch {
        // safe
      }
    }
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = likes[id] || 0;
    const updated = { ...likes, [id]: current + 1 };
    setLikes(updated);
    localStorage.setItem('zaza_little_things_likes', JSON.stringify(updated));
    soundEngine.playHeartCatch();
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newItem: LittleThingItem = {
      id: `custom-${Date.now()}`,
      iconType: 'sparkle',
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'A Treasured Detail',
      description: newDesc.trim(),
      personalThought: newThought.trim() || 'A quiet nuance kept deep in my heart.'
    };

    const updated = [...items, newItem];
    setItems(updated);

    const customOnly = updated.filter(item => item.id.startsWith('custom-'));
    localStorage.setItem('zaza_custom_little_things', JSON.stringify(customOnly));

    setNewTitle('');
    setNewSubtitle('');
    setNewDesc('');
    setNewThought('');
    setShowAddForm(false);
    soundEngine.playSuccessChord();
  };

  const getIcon = (type: LittleThingItem['iconType']) => {
    switch (type) {
      case 'camera': return Camera;
      case 'mic': return Mic;
      case 'message': return MessageSquare;
      case 'moon': return Moon;
      case 'shield': return Shield;
      case 'feather': return Feather;
      case 'heart': return Heart;
      default: return Sparkles;
    }
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
          Treasured Nuances · Wahb & Zaza
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D9B477] font-semibold">
          Authentic Details
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
          Little Things I Love
        </h1>
        <p className="text-sm text-[#B89F9E] max-w-xl mx-auto">
          The subtle realities of loving someone across screens: your rare photographs, the quiet dignity of your messages, and the patient anticipation of your voice.
        </p>
      </div>

      {/* Grid of Little Things */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const Icon = getIcon(item.iconType);
          const isThoughtOpen = activeThoughtId === item.id;
          const likeCount = likes[item.id] || 0;

          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveThoughtId(isThoughtOpen ? null : item.id);
                soundEngine.playChime(500);
              }}
              className="glass-hairline-card rounded-2xl p-6 flex flex-col justify-between hover:border-[#FFB5C8]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#E83F67]/15 cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#2A0A19] border border-[#D9B477]/30 flex items-center justify-center text-[#E83F67] group-hover:text-[#FFB5C8] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16090F] hover:bg-[#2A0A19] border border-[#D9B477]/20 text-xs transition-colors"
                    title="Send a heart"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likeCount > 0 ? 'text-[#E83F67] fill-[#E83F67]' : 'text-[#B89F9E]'}`} />
                    <span className="text-[11px] font-mono text-[#FFF3EA]">{likeCount}</span>
                  </button>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#FFF3EA] group-hover:text-[#FFB5C8] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D9B477]/90 italic mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-[#ECE0D8]/85 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Personal thought reveal */}
                {isThoughtOpen && (
                  <div className="p-3.5 rounded-xl bg-[#2A0A19]/80 border border-[#FFB5C8]/30 text-xs text-[#FFB5C8] italic leading-relaxed animate-fade-in">
                    "{item.personalThought}"
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-[#D9B477]/10 flex items-center justify-between text-xs text-[#D9B477]">
                <span className="text-[11px] text-[#B89F9E]">
                  {isThoughtOpen ? 'Click to minimize' : 'Tap to view Wahb’s thought'}
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Nuance Form */}
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
            <span>Add a Treasured Detail</span>
          </button>
        ) : (
          <div className="glass-surface max-w-lg mx-auto p-6 sm:p-8 rounded-2xl border border-[#D9B477]/30 text-left space-y-4 animate-fade-in">
            <h3 className="font-serif text-xl text-[#FFF3EA]">
              Add a Little Thing
            </h3>
            <p className="text-xs text-[#B89F9E]">
              Add a personal detail or nuance of our bond that you cherish.
            </p>

            <form onSubmit={handleAddCustom} className="space-y-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Your Midnight Typing Speed"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#12070E] border border-[#644E57] focus:border-[#E83F67] text-sm text-[#FFF3EA] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. A Sweet Daily Habit"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#12070E] border border-[#644E57] focus:border-[#E83F67] text-sm text-[#FFF3EA] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="What makes this detail special to you..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#12070E] border border-[#644E57] focus:border-[#E83F67] text-sm text-[#FFF3EA] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Intimate Reflection
                </label>
                <textarea
                  rows={2}
                  placeholder="A quiet note or memory..."
                  value={newThought}
                  onChange={(e) => setNewThought(e.target.value)}
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
                  Save Detail
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
