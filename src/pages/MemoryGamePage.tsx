import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Timer, 
  Footprints, 
  Heart, 
  Sparkles,
  Flame,
  Award
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface CardItem {
  id: number;
  pairId: string;
  symbol: string;
  label: string;
  sublabel: string;
}

const ALL_CARDS_DATA = [
  { pairId: 'crystal-heart', symbol: '💎', label: 'Crystal Heart', sublabel: 'Pure & Resilient' },
  { pairId: 'wax-letter', symbol: '📜', label: 'Wax-Sealed Vow', sublabel: 'Written in Truth' },
  { pairId: 'crimson-rose', symbol: '🌹', label: 'Crimson Rose', sublabel: 'Everlasting Devotion' },
  { pairId: 'north-star', symbol: '⭐', label: 'North Star', sublabel: 'Our Constant Guide' },
  { pairId: 'golden-key', symbol: '🔑', label: 'Celestial Key', sublabel: 'To Zaza’s Heart' },
  { pairId: 'crescent-moon', symbol: '🌙', label: 'Crescent Moon', sublabel: 'Watching Over You' },
  { pairId: 'pure-dove', symbol: '🕊️', label: 'Gentle Grace', sublabel: 'Patience & Peace' },
  { pairId: 'hourglass', symbol: '⏳', label: 'Hourglass of Time', sublabel: 'Waiting Faithfully' },
];

export const MemoryGamePage: React.FC = () => {
  const [gridSize, setGridSize] = useState<12 | 16>(16);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);

  // Load high scores
  useEffect(() => {
    const savedMoves = localStorage.getItem(`zaza_memory_best_moves_${gridSize}`);
    const savedTime = localStorage.getItem(`zaza_memory_best_time_${gridSize}`);
    setBestMoves(savedMoves ? parseInt(savedMoves, 10) : null);
    setBestTime(savedTime ? parseInt(savedTime, 10) : null);
  }, [gridSize]);

  // Shuffle and start game
  const initializeGame = useCallback(() => {
    const pairCount = gridSize / 2;
    const selectedPairs = ALL_CARDS_DATA.slice(0, pairCount);
    const deck: CardItem[] = [];

    selectedPairs.forEach((item, index) => {
      deck.push({ ...item, id: index * 2 });
      deck.push({ ...item, id: index * 2 + 1 });
    });

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimerSeconds(0);
    setIsRunning(false);
    setGameWon(false);
  }, [gridSize]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !gameWon) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, gameWon]);

  // Handle card click
  const handleCardClick = (index: number) => {
    if (gameWon) return;
    if (flippedIndices.includes(index)) return;
    if (matchedPairs.includes(cards[index].pairId)) return;
    if (flippedIndices.length >= 2) return;

    if (!isRunning) {
      setIsRunning(true);
    }

    soundEngine.playChime(523.25);
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const card1 = cards[newFlipped[0]];
      const card2 = cards[newFlipped[1]];

      if (card1.pairId === card2.pairId) {
        // Matched!
        soundEngine.playSuccessChord();
        const nextMatched = [...matchedPairs, card1.pairId];
        setMatchedPairs(nextMatched);
        setFlippedIndices([]);

        // Check if all pairs matched
        if (nextMatched.length === gridSize / 2) {
          handleWin();
        }
      } else {
        // Not matched - flip back after delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleWin = () => {
    setIsRunning(false);
    setGameWon(true);
    soundEngine.playSuccessChord();

    // Trigger romantic confetti explosion
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E83F67', '#D9B477', '#FFB5C8', '#FFF3EA']
      });
    } catch {
      // safe
    }

    // Save best scores
    const currentMoves = moves + 1;
    const currentTime = timerSeconds;

    if (!bestMoves || currentMoves < bestMoves) {
      setBestMoves(currentMoves);
      localStorage.setItem(`zaza_memory_best_moves_${gridSize}`, String(currentMoves));
    }
    if (!bestTime || currentTime < bestTime) {
      setBestTime(currentTime);
      localStorage.setItem(`zaza_memory_best_time_${gridSize}`, String(currentTime));
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
          Interactive Game · Focus & Devotion
        </span>
      </div>

      {/* Page Title & Narrative Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D9B477] font-semibold">
          Celestial Matching Game
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
          Memories of the Heart
        </h1>
        <p className="text-sm text-[#B89F9E] max-w-lg mx-auto">
          Every matched pair unveils an unyielding truth: distance and silence can never diminish a soul devoted to patience.
        </p>
      </div>

      {/* Controls & Metrics Strip */}
      <div className="glass-surface p-4 sm:p-6 rounded-2xl border border-[#D9B477]/20 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Footprints className="w-4 h-4 text-[#E83F67]" />
            <span className="text-xs uppercase tracking-wider text-[#B89F9E]">Moves:</span>
            <span className="font-mono font-semibold text-[#FFF3EA] text-base">{moves}</span>
          </div>

          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-[#D9B477]" />
            <span className="text-xs uppercase tracking-wider text-[#B89F9E]">Time:</span>
            <span className="font-mono font-semibold text-[#FFF3EA] text-base">{formatTime(timerSeconds)}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FFB5C8]" />
            <span className="text-xs uppercase tracking-wider text-[#B89F9E]">Pairs:</span>
            <span className="font-mono font-semibold text-[#FFF3EA] text-base">
              {matchedPairs.length} / {gridSize / 2}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Difficulty / Grid selector */}
          <div className="flex items-center p-1 rounded-lg bg-[#2A0A19] border border-[#D9B477]/20 text-xs">
            <button
              onClick={() => {
                setGridSize(12);
                soundEngine.playChime(440);
              }}
              className={`px-3 py-1 rounded-md transition-colors ${
                gridSize === 12 ? 'bg-[#E83F67] text-white font-semibold' : 'text-[#ECE0D8]/70 hover:text-white'
              }`}
            >
              12 Cards
            </button>
            <button
              onClick={() => {
                setGridSize(16);
                soundEngine.playChime(440);
              }}
              className={`px-3 py-1 rounded-md transition-colors ${
                gridSize === 16 ? 'bg-[#E83F67] text-white font-semibold' : 'text-[#ECE0D8]/70 hover:text-white'
              }`}
            >
              16 Cards
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              initializeGame();
              soundEngine.playChime(587.33);
            }}
            className="p-2 sm:px-4 sm:py-2 rounded-lg bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] border border-[#D9B477]/30 text-xs flex items-center gap-1.5 transition-colors"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline uppercase tracking-wider font-semibold">Restart</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid gap-3 sm:gap-4 max-w-4xl mx-auto ${
          gridSize === 12
            ? 'grid-cols-3 sm:grid-cols-4'
            : 'grid-cols-4 sm:grid-cols-4'
        }`}
      >
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedPairs.includes(card.pairId);
          const isRevealed = isFlipped || isMatched;

          return (
            <button
              key={`${card.pairId}-${idx}`}
              onClick={() => handleCardClick(idx)}
              disabled={isRevealed || flippedIndices.length >= 2}
              className={`aspect-[3/4] rounded-xl sm:rounded-2xl transition-all duration-300 transform perspective-1000 p-2 sm:p-4 flex flex-col items-center justify-between relative overflow-hidden select-none ${
                isRevealed
                  ? 'bg-gradient-to-br from-[#2A0A19] via-[#3B1024] to-[#16090F] border-2 border-[#FFB5C8]/60 shadow-xl shadow-[#E83F67]/20 scale-100'
                  : 'bg-[#16090F]/90 hover:bg-[#201018] border border-[#D9B477]/25 hover:border-[#D9B477]/60 hover:scale-[1.02] active:scale-95 shadow-md'
              }`}
            >
              {isRevealed ? (
                /* Card Front (Revealed) */
                <div className="w-full h-full flex flex-col items-center justify-between text-center animate-fade-in py-1">
                  <div className="text-[10px] uppercase tracking-widest text-[#D9B477]">
                    ZAZA
                  </div>
                  <div className="text-3xl sm:text-5xl my-auto transform transition-transform scale-110">
                    {card.symbol}
                  </div>
                  <div className="w-full">
                    <div className="text-[11px] sm:text-xs font-serif font-semibold text-[#FFF3EA] truncate">
                      {card.label}
                    </div>
                    <div className="hidden sm:block text-[9px] text-[#FFB5C8]/80 truncate">
                      {card.sublabel}
                    </div>
                  </div>
                </div>
              ) : (
                /* Card Back (Hidden) */
                <div className="w-full h-full flex flex-col items-center justify-between text-center py-2">
                  <div className="w-2 h-2 rounded-full bg-[#D9B477]/30" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2A0A19]/80 border border-[#D9B477]/30 flex items-center justify-center">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#E83F67] opacity-60" />
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-[#D9B477]/60">
                    Wahb & Zaza
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Win Modal Overlay */}
      {gameWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E050A]/85 backdrop-blur-md animate-fade-in">
          <div className="glass-hairline-card max-w-lg w-full p-8 rounded-2xl text-center space-y-6 border border-[#FFB5C8]/40 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#2A0A19] border-2 border-[#D9B477] flex items-center justify-center shadow-lg shadow-[#E83F67]/30">
              <Trophy className="w-8 h-8 text-[#D9B477]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D9B477] font-semibold">
                Sanctuary Solved
              </span>
              <h2 className="font-serif text-3xl text-[#FFF3EA]">
                Every Piece Aligned
              </h2>
              <p className="text-sm text-[#B89F9E] leading-relaxed">
                "Just as every pair was revealed through focus and memory, every day with you is a testament that what was broken can be made whole through patience and love."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#D9B477]/15">
              <div className="bg-[#16090F]/80 p-3 rounded-xl border border-[#D9B477]/10">
                <span className="text-[10px] uppercase text-[#B89F9E] tracking-wider block">Total Moves</span>
                <span className="font-mono text-xl font-bold text-[#FFF3EA]">{moves}</span>
              </div>
              <div className="bg-[#16090F]/80 p-3 rounded-xl border border-[#D9B477]/10">
                <span className="text-[10px] uppercase text-[#B89F9E] tracking-wider block">Completion Time</span>
                <span className="font-mono text-xl font-bold text-[#FFF3EA]">{formatTime(timerSeconds)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  initializeGame();
                  soundEngine.playChime(659.25);
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] hover:from-[#fe5076] hover:to-[#E83F67] text-white text-xs font-semibold uppercase tracking-wider shadow-lg transition-all"
              >
                Play Again
              </button>
              <Link
                to="/letter"
                onClick={() => soundEngine.playWaxSeal()}
                className="w-full py-3 rounded-full bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] border border-[#D9B477]/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Read Love Letter</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
