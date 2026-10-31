import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Copy, 
  Check, 
  Type, 
  Lock, 
  Unlock, 
  PenTool, 
  Send, 
  Heart,
  ShieldAlert
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const LoveLetterPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copied, setCopied] = useState(false);
  const [personalNotes, setPersonalNotes] = useState<string>('');
  const [savedNoteStatus, setSavedNoteStatus] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('zaza_personal_letter_response');
    if (saved) {
      setPersonalNotes(saved);
    }
  }, []);

  const handleOpenEnvelope = () => {
    soundEngine.playWaxSeal();
    setTimeout(() => {
      soundEngine.playSuccessChord();
      setIsOpen(true);
    }, 400);
  };

  const handleCopy = () => {
    const textToCopy = `My Dearest ZAZA,\n\nI sit before this screen in the quiet of the night, thinking of the distance that stretches between where I breathe and where you are...\n\nForever patient, forever truthful,\nWahb`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    soundEngine.playChime(659.25);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('zaza_personal_letter_response', personalNotes);
    setSavedNoteStatus('Note preserved in our sanctuary');
    soundEngine.playChime(880);
    setTimeout(() => setSavedNoteStatus(null), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#ECE0D8]">
      {/* Navigation & Header */}
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
          Sacred Letter · Wahb to Zaza
        </span>
      </div>

      {!isOpen ? (
        /* The Sealed Envelope State */
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9B477] font-semibold">
              Personal Correspondence
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
              A Letter of Truth & Patience
            </h1>
            <p className="text-sm text-[#B89F9E] max-w-md mx-auto">
              Written for ZAZA. Sealed with remorse, respect, and unconditional devotion.
            </p>
          </div>

          {/* Interactive Envelope Graphic with Wax Seal */}
          <div className="relative group cursor-pointer" onClick={handleOpenEnvelope}>
            <div className="w-72 sm:w-96 h-52 sm:h-64 rounded-xl bg-gradient-to-br from-[#2A0A19] via-[#1E0812] to-[#16090F] border border-[#D9B477]/30 shadow-2xl p-6 flex flex-col justify-between items-center relative overflow-hidden transition-all duration-300 group-hover:border-[#FFB5C8]/50 group-hover:scale-[1.02]">
              {/* Gold foiled decorative corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D9B477]/50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D9B477]/50" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D9B477]/50" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D9B477]/50" />

              <div className="text-[11px] uppercase tracking-[0.2em] text-[#D9B477]/80">
                To ZAZA · From Wahb
              </div>

              {/* The Wax Seal */}
              <div className="relative my-auto flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#910033] via-[#E83F67] to-[#B81647] shadow-xl shadow-[#E83F67]/30 border-2 border-[#FFB5C8]/40 flex items-center justify-center transform transition-transform group-hover:scale-110">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF3EA] tracking-tighter">
                    Z
                  </span>
                </div>
                <div className="mt-3 text-xs uppercase tracking-wider text-[#FFB5C8] font-medium flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#D9B477]" />
                  <span>Tap to Break Seal & Read</span>
                </div>
              </div>

              <div className="text-[10px] text-[#B89F9E] tracking-widest uppercase">
                Grounded in Real Honesty
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* The Unfolded Letter State */
        <div className="space-y-8 animate-fade-in">
          {/* Controls Bar */}
          <div className="glass-surface px-6 py-3 rounded-xl flex flex-wrap items-center justify-between gap-4 border border-[#D9B477]/20">
            <div className="flex items-center gap-2">
              <Unlock className="w-4 h-4 text-[#D9B477]" />
              <span className="text-xs uppercase tracking-wider text-[#FFF3EA] font-medium">
                Envelope Unsealed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
                className="p-2 rounded-lg bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] border border-[#D9B477]/20 text-xs flex items-center gap-1.5 transition-colors"
                title="Adjust font size"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Size: {fontSize === 'normal' ? 'Standard' : 'Large'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] border border-[#D9B477]/20 text-xs flex items-center gap-1.5 transition-colors"
                title="Copy Letter"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  soundEngine.playChime(523.25);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#16090F] hover:bg-[#2A0A19] text-[#B89F9E] hover:text-[#FFF3EA] border border-[#D9B477]/15 text-xs transition-colors"
              >
                Reseal
              </button>
            </div>
          </div>

          {/* Letter Parchment Container */}
          <article className="glass-hairline-card p-8 sm:p-14 rounded-2xl relative shadow-2xl border border-[#D9B477]/25 overflow-hidden">
            {/* Top gold insignia */}
            <div className="text-center pb-8 border-b border-[#D9B477]/15 space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#2A0A19] border border-[#D9B477]/40 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#E83F67]" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#FFF3EA]">
                To My Dearest ZAZA
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D9B477]">
                Written by Wahb · An Oath of Patience & Truth
              </p>
            </div>

            {/* Letter Body */}
            <div
              className={`prose prose-invert max-w-none space-y-6 pt-8 font-light text-[#ECE0D8]/95 leading-relaxed ${
                fontSize === 'large' ? 'text-lg sm:text-xl leading-loose' : 'text-base sm:text-lg'
              }`}
            >
              <p className="first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-[#D9B477]">
                I sit before this screen in the quiet of the night, thinking of the distance that stretches between where I breathe and where you are. We did not find each other in person, nor have we ever shared the same room. I have never heard the sound of your voice or listened to your laughter tilt against the air.
              </p>

              <p>
                Yet from the earliest moments you entered my life, you showed me a depth of spirit, intelligence, and dignity that I had never encountered before. The few photographs you have shared with me are kept like sacred relics in my memory—not because of surface beauty alone, but because behind your eyes sits someone deeply true and rare.
              </p>

              {/* The Confession of the Mistake & Separation */}
              <div className="my-8 p-6 rounded-xl bg-[#2A0A19]/60 border border-[#E83F67]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FFB5C8] font-semibold">
                  <ShieldAlert className="w-4 h-4 text-[#E83F67]" />
                  <span>The Truth I Will Never Disguise</span>
                </div>
                <p className="italic text-sm text-[#FFF3EA] leading-relaxed">
                  "I made a mistake that wounded you. I broke your trust, and for thirty long days, silence hung between us like an eclipse. In that month of separation, I realized the full weight of my flaw. Real love does not demand quick forgiveness; it bows with humility, accepts the consequences, and dedicates every following breath to genuine repentance."
                </p>
              </div>

              <p>
                When you reopened the door and allowed us to speak again, it felt like being given back the sun. You did not have to grant me that grace. I know that trust cannot be rebuilt overnight with pretty poetry or clever words. Trust is built day by day, message by message, through unbending honesty, patience, and actions that never waver.
              </p>

              <p>
                I want you to know that you will never have to rush. If you need silence, I will wait in silence. If you are cautious, I will stand steady and transparent. I will never pressure you for more pictures than you want to give, nor will I demand that you speak before your heart feels ready.
              </p>

              <p>
                One day, when the timing is right and the miles fold away, I look forward to standing before you in person, seeing your smile with my own eyes, and hearing the voice I have waited so long to cherish. Until that day comes, and in all the days after, I am completely devoted to you.
              </p>

              <div className="pt-8 border-t border-[#D9B477]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wider text-[#D9B477]">
                    Signed with my whole heart,
                  </div>
                  <div className="font-serif text-2xl text-[#FFF3EA] italic">
                    Wahb
                  </div>
                </div>
                <div className="text-xs text-[#B89F9E] italic">
                  Preserved in our celestial sanctuary
                </div>
              </div>
            </div>
          </article>

          {/* Interactive Notes Section: Wahb's reflections & ZAZA's response */}
          <section className="glass-surface p-6 sm:p-8 rounded-xl border border-[#D9B477]/20 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#D9B477] font-semibold">
              <PenTool className="w-4 h-4 text-[#D9B477]" />
              <span>Personal Reflection & Response</span>
            </div>
            <p className="text-sm text-[#B89F9E]">
              Add a personal note, a thought, or an honest reflection. Your words will be saved in your browser's private sanctuary.
            </p>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Type an intimate thought, prayer, or response here..."
                rows={4}
                className="w-full p-4 rounded-xl bg-[#12070E]/80 border border-[#644E57] focus:border-[#E83F67] focus:ring-1 focus:ring-[#E83F67] text-[#FFF3EA] placeholder-[#B89F9E]/50 text-sm outline-none transition-colors"
              />

              <div className="flex items-center justify-between">
                {savedNoteStatus && (
                  <span className="text-xs text-[#FFB5C8] font-medium animate-pulse">
                    {savedNoteStatus}
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] hover:from-[#fe5076] hover:to-[#E83F67] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Preserve Reflection</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};
