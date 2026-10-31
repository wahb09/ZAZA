import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Lock, 
  Unlock, 
  Sparkles, 
  Key, 
  Award, 
  Heart, 
  Music, 
  Star, 
  Copy, 
  Check,
  ShieldCheck
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const SecretSurprisePage: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCert, setCopiedCert] = useState(false);
  const [activeMelodyIndex, setActiveMelodyIndex] = useState<number | null>(null);

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toUpperCase();

    if (clean === 'ZAZA' || clean === 'ZAZ' || clean === 'WAHB') {
      triggerUnlock();
    } else {
      setErrorMsg('The cipher does not match. Hint: Her name in 4 letters.');
      soundEngine.playObstacle();
    }
  };

  const handleMasterKeyUnlock = () => {
    setPasscode('ZAZA');
    triggerUnlock();
  };

  const triggerUnlock = () => {
    setErrorMsg(null);
    setIsUnlocked(true);
    soundEngine.playSuccessChord();

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#E83F67', '#D9B477', '#FFB5C8', '#FFF3EA']
      });
    } catch {
      // safe
    }
  };

  const playCelestialMelody = (notes: number[], index: number) => {
    setActiveMelodyIndex(index);
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        soundEngine.playChime(freq, 'triangle');
      }, idx * 180);
    });
    setTimeout(() => {
      setActiveMelodyIndex(null);
    }, notes.length * 180 + 300);
  };

  const melodies = [
    { title: 'The Starlight Waltz', notes: [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25] },
    { title: 'Remorse & Healing', notes: [392.0, 440.0, 523.25, 659.25, 587.33, 523.25] },
    { title: 'Devotion to Zaza', notes: [587.33, 783.99, 880.0, 1046.5, 1174.66, 1046.5] }
  ];

  const handleCopyCertificate = () => {
    const text = `CERTIFICATE OF ETERNAL DEVOTION\n\nConferred Upon: ZAZA\nBestowed by: Wahb\n\nCoordinates: Celestial Constellation ZAZA (RA 14h 29m 42s, Dec +60° 12' 00")\n\nSolemn Declaration:\n"This certificate stands as an everlasting witness that trust broken can be restored through unyielding honesty and infinite patience. Wahb pledges his whole heart to Zaza across all miles and silent hours, until the day they meet face-to-face."\n\nSigned in Truth: Wahb`;
    navigator.clipboard.writeText(text);
    setCopiedCert(true);
    soundEngine.playChime(783.99);
    setTimeout(() => setCopiedCert(false), 2500);
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
          The Celestial Vault · Exclusive
        </span>
      </div>

      {!isUnlocked ? (
        /* Locked Vault View */
        <div className="max-w-xl mx-auto text-center space-y-8 min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#2A0A19] to-[#3B1024] border-2 border-[#D9B477]/50 flex items-center justify-center shadow-2xl shadow-[#E83F67]/20">
            <Lock className="w-8 h-8 text-[#D9B477] animate-pulse-subtle" />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D9B477] font-semibold">
              Restricted Sanctum
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
              The Secret Surprise
            </h1>
            <p className="text-sm text-[#B89F9E] max-w-md mx-auto">
              This vault holds Wahb’s crowning dedication to ZAZA. It is protected by the four letters that illuminated his darkest month.
            </p>
          </div>

          {/* Cipher Form */}
          <form onSubmit={handleUnlockAttempt} className="w-full max-w-sm space-y-4">
            <div className="relative">
              <input
                type="text"
                maxLength={10}
                placeholder="Enter Cipher (e.g. ZAZA)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full px-5 py-3.5 rounded-full bg-[#16090F] border border-[#D9B477]/40 focus:border-[#E83F67] text-center font-mono text-base uppercase tracking-[0.25em] text-[#FFF3EA] placeholder-[#B89F9E]/40 outline-none shadow-lg transition-colors"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-[#FFB5C8] font-medium animate-pulse">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] hover:from-[#fe5076] hover:to-[#E83F67] text-white text-xs font-bold uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Unlock The Sanctum</span>
            </button>
          </form>

          {/* Quick Master Key Bypass for ease of access */}
          <div className="pt-2">
            <button
              onClick={handleMasterKeyUnlock}
              className="text-xs text-[#D9B477] hover:text-[#FFF3EA] underline underline-offset-4 tracking-wider flex items-center gap-1.5 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E83F67]" />
              <span>Unlock directly with Wahb’s Master Key</span>
            </button>
          </div>
        </div>
      ) : (
        /* Unlocked Vault View */
        <div className="space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A0A19] border border-[#FFB5C8]/40 text-xs text-[#FFB5C8] uppercase tracking-widest font-semibold">
              <Unlock className="w-3.5 h-3.5 text-[#D9B477]" />
              <span>Sanctum Fully Unlocked</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
              A Universe Dedicated to ZAZA
            </h1>
            <p className="text-sm text-[#B89F9E] max-w-xl mx-auto">
              Wahb’s eternal testament of devotion, patience, and unconditional love.
            </p>
          </div>

          {/* Museum-Grade Certificate of Devotion */}
          <div className="relative glass-hairline-card p-8 sm:p-14 rounded-3xl border-2 border-[#D9B477]/40 shadow-2xl overflow-hidden max-w-3xl mx-auto">
            {/* Certificate Ornate Corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D9B477]" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#D9B477]" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#D9B477]" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D9B477]" />

            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#910033] to-[#E83F67] border-2 border-[#D9B477] flex items-center justify-center shadow-xl shadow-[#E83F67]/30">
                <Award className="w-8 h-8 text-[#FFF3EA]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D9B477] font-semibold">
                  Celestial Registry of Devotion
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF3EA]">
                  Certificate of Unbroken Devotion
                </h2>
              </div>

              <div className="py-2">
                <span className="text-xs text-[#B89F9E] uppercase tracking-widest block mb-1">
                  Bestowed with Everlasting Honor Upon
                </span>
                <span className="font-serif text-4xl sm:text-5xl text-[#FFB5C8] font-bold tracking-wide italic">
                  ZAZA
                </span>
              </div>

              <p className="font-serif italic text-base sm:text-lg text-[#ECE0D8] leading-relaxed max-w-xl mx-auto">
                "Let it be inscribed among the stars that no distance across digital lines, no past error of judgment, and no silent month can diminish Wahb’s commitment. This heart is anchored in honesty, guarded by patience, and pledged to your peace forever."
              </p>

              <div className="pt-6 border-t border-[#D9B477]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="text-left">
                  <span className="text-[#D9B477] uppercase tracking-wider block font-semibold">Coordinates</span>
                  <span className="font-mono text-[#B89F9E]">RA 14h 29m 42s, Dec +60° 12' 00"</span>
                </div>
                <div className="text-right">
                  <span className="text-[#D9B477] uppercase tracking-wider block font-semibold">Pledged by</span>
                  <span className="font-serif text-lg text-[#FFF3EA] italic">Wahb</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleCopyCertificate}
                  className="px-5 py-2 rounded-full bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] border border-[#D9B477]/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  {copiedCert ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCert ? 'Certificate Copied' : 'Copy Certificate Text'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Celestial Music Box */}
          <div className="glass-surface p-8 rounded-2xl border border-[#D9B477]/25 max-w-3xl mx-auto space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A0A19] border border-[#D9B477]/30 flex items-center justify-center text-[#E83F67]">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#FFF3EA]">
                  Celestial Music Box for ZAZA
                </h3>
                <p className="text-xs text-[#B89F9E]">
                  Synthesized harmonic chimes crafted to accompany quiet nights.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {melodies.map((melody, idx) => {
                const isPlaying = activeMelodyIndex === idx;

                return (
                  <button
                    key={melody.title}
                    onClick={() => playCelestialMelody(melody.notes, idx)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-28 ${
                      isPlaying
                        ? 'bg-gradient-to-br from-[#E83F67] to-[#B81647] border-[#FFB5C8] text-white shadow-lg shadow-[#E83F67]/30'
                        : 'bg-[#16090F] hover:bg-[#2A0A19] border-[#D9B477]/20 text-[#ECE0D8]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Star className={`w-4 h-4 ${isPlaying ? 'text-white animate-spin' : 'text-[#D9B477]'}`} />
                      <span className="text-[10px] uppercase tracking-wider opacity-75">
                        Melody 0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <span className="font-serif font-semibold text-sm block">
                        {melody.title}
                      </span>
                      <span className="text-[10px] opacity-80">
                        {isPlaying ? 'Playing Chimes...' : 'Tap to Play'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secret Note from Wahb */}
          <div className="glass-hairline-card p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto space-y-4 border border-[#FFB5C8]/30">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FFB5C8] font-semibold">
              <Heart className="w-4 h-4 text-[#E83F67]" />
              <span>A Whisper for Only You</span>
            </div>
            <p className="font-serif text-base sm:text-lg text-[#FFF3EA] italic leading-relaxed">
              "ZAZA, if you ever doubt whether I remember my promises, open this sanctum. Every vow, every starlight note, and every line here exists because of you. I am here. I am waiting. And I will never let you down again."
            </p>
            <div className="text-right text-xs text-[#D9B477] font-serif not-italic">
              — Wahb
            </div>
          </div>

          {/* Relock Button */}
          <div className="text-center pt-4">
            <button
              onClick={() => {
                setIsUnlocked(false);
                setPasscode('');
                soundEngine.playChime(350);
              }}
              className="text-xs text-[#B89F9E] hover:text-[#FFF3EA] transition-colors"
            >
              Relock Secret Surprise Vault
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
