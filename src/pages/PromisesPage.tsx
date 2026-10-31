import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles, 
  Heart, 
  Lock, 
  Plus, 
  Award
} from 'lucide-react';
import { promisesList, PromiseVow } from '../data/promisesData';
import { soundEngine } from '../utils/sound';

export const PromisesPage: React.FC = () => {
  const [sealedVows, setSealedVows] = useState<string[]>([]);
  const [customVows, setCustomVows] = useState<PromiseVow[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newVow, setNewVow] = useState('');
  const [newExpl, setNewExpl] = useState('');

  // Load sealed vows state
  useEffect(() => {
    const saved = localStorage.getItem('zaza_sealed_vows');
    if (saved) {
      try {
        setSealedVows(JSON.parse(saved));
      } catch {
        // safe
      }
    } else {
      // Default to sealing all by Wahb
      const allIds = promisesList.map(p => p.id);
      setSealedVows(allIds);
      localStorage.setItem('zaza_sealed_vows', JSON.stringify(allIds));
    }

    const savedCustom = localStorage.getItem('zaza_custom_promises');
    if (savedCustom) {
      try {
        setCustomVows(JSON.parse(savedCustom));
      } catch {
        // safe
      }
    }
  }, []);

  const allVows = [...promisesList, ...customVows];

  const handleToggleSeal = (id: string) => {
    let next: string[];
    if (sealedVows.includes(id)) {
      next = sealedVows.filter(v => v !== id);
      soundEngine.playChime(350);
    } else {
      next = [...sealedVows, id];
      soundEngine.playWaxSeal();
      try {
        confetti({ particleCount: 30, spread: 50, colors: ['#D9B477', '#E83F67'] });
      } catch {
        // safe
      }
    }
    setSealedVows(next);
    localStorage.setItem('zaza_sealed_vows', JSON.stringify(next));
  };

  const handleAddCustomVow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVow.trim()) return;

    const newVowObj: PromiseVow = {
      id: `vow-${Date.now()}`,
      num: `VII+`,
      title: newTitle.trim(),
      vow: newVow.trim(),
      explanation: newExpl.trim() || 'A personal sacred vow added with pure intent.',
      tag: 'Personal Commitment'
    };

    const updated = [...customVows, newVowObj];
    setCustomVows(updated);
    localStorage.setItem('zaza_custom_promises', JSON.stringify(updated));

    // Automatically seal new vow
    const nextSealed = [...sealedVows, newVowObj.id];
    setSealedVows(nextSealed);
    localStorage.setItem('zaza_sealed_vows', JSON.stringify(nextSealed));

    setNewTitle('');
    setNewVow('');
    setNewExpl('');
    setShowAddForm(false);
    soundEngine.playSuccessChord();
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
          Solemn Commitments · Wahb to Zaza
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D9B477] font-semibold">
          Sacred Vows
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
          Promises Made in Truth
        </h1>
        <p className="text-sm text-[#B89F9E] max-w-xl mx-auto">
          These are not casual romantic declarations. They are binding covenants born from remorse, patience, and the resolve to earn back your complete trust.
        </p>
      </div>

      {/* Vow Counter & Status Banner */}
      <div className="glass-surface p-6 rounded-2xl border border-[#D9B477]/25 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#2A0A19] border border-[#D9B477]/40 flex items-center justify-center text-[#D9B477]">
            <ShieldCheck className="w-6 h-6 text-[#D9B477]" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#D9B477] font-semibold">
              Devotion Status
            </div>
            <div className="font-serif text-xl text-[#FFF3EA]">
              {sealedVows.length} of {allVows.length} Vows Actively Certified
            </div>
          </div>
        </div>

        <div className="text-xs text-[#B89F9E] italic text-center sm:text-right max-w-xs">
          Each vow is stamped with Wahb's personal seal of accountability.
        </div>
      </div>

      {/* Promises List */}
      <div className="space-y-6">
        {allVows.map((item) => {
          const isSealed = sealedVows.includes(item.id);

          return (
            <article
              key={item.id}
              className={`glass-hairline-card rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden ${
                isSealed
                  ? 'border-l-4 border-l-[#D9B477] shadow-lg shadow-[#E83F67]/10'
                  : 'opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#D9B477] bg-[#2A0A19] px-2.5 py-0.5 rounded border border-[#D9B477]/30">
                      {item.num}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#FFB5C8]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF3EA]">
                    {item.title}
                  </h3>

                  <blockquote className="font-serif italic text-base sm:text-lg text-[#FFB5C8]/90 pl-4 border-l-2 border-[#E83F67]/40 py-1">
                    "{item.vow}"
                  </blockquote>

                  <p className="text-sm text-[#ECE0D8]/80 font-light leading-relaxed pt-2">
                    {item.explanation}
                  </p>
                </div>

                {/* Wax Stamp Seal Button */}
                <div className="shrink-0 sm:self-center flex flex-col items-center">
                  <button
                    onClick={() => handleToggleSeal(item.id)}
                    className={`group px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      isSealed
                        ? 'bg-gradient-to-r from-[#910033] to-[#E83F67] text-white shadow-md shadow-[#E83F67]/30 border border-[#FFB5C8]/40'
                        : 'bg-[#16090F] text-[#B89F9E] border border-[#644E57] hover:border-[#D9B477]'
                    }`}
                  >
                    <CheckCircle className={`w-4 h-4 ${isSealed ? 'text-white' : 'text-[#B89F9E]'}`} />
                    <span>{isSealed ? 'Certified by Wahb' : 'Tap to Certify'}</span>
                  </button>
                  {isSealed && (
                    <span className="text-[10px] text-[#D9B477] mt-1.5 font-mono">
                      Seal Affixed
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Add Custom Vow Form */}
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
            <span>Formulate an Additional Promise</span>
          </button>
        ) : (
          <div className="glass-surface max-w-lg mx-auto p-6 sm:p-8 rounded-2xl border border-[#D9B477]/30 text-left space-y-4 animate-fade-in">
            <h3 className="font-serif text-xl text-[#FFF3EA]">
              Add a New Vow
            </h3>
            <p className="text-xs text-[#B89F9E]">
              Add a solemn commitment or personal pledge to be preserved in this sanctuary.
            </p>

            <form onSubmit={handleAddCustomVow} className="space-y-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Vow Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Vow of Constant Respect"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#12070E] border border-[#644E57] focus:border-[#E83F67] text-sm text-[#FFF3EA] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  The Solemn Promise
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="I promise to..."
                  value={newVow}
                  onChange={(e) => setNewVow(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#12070E] border border-[#644E57] focus:border-[#E83F67] text-sm text-[#FFF3EA] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D9B477] block mb-1">
                  Why this vow matters
                </label>
                <textarea
                  rows={2}
                  placeholder="Explanation of the commitment..."
                  value={newExpl}
                  onChange={(e) => setNewExpl(e.target.value)}
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
                  Affix Seal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
