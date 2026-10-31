import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Heart, 
  Sparkles, 
  Pause, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'heart' | 'star' | 'letter' | 'rose' | 'cloud';
  points: number;
  radius: number;
  color: string;
}

export const CatchMyHeartPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameover'>('idle');
  const [milestoneMessage, setMilestoneMessage] = useState<string | null>(null);

  // Basket state
  const basketRef = useRef({
    x: 250,
    width: 90,
    height: 18,
    speed: 7,
  });

  const keysPressed = useRef<{ left: boolean; right: boolean }>({
    left: false,
    right: false,
  });

  const itemsRef = useRef<FallingItem[]>([]);
  const nextItemId = useRef(1);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('zaza_catch_heart_high_score');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = true;
      }
      if (e.key === ' ' && gameState === 'playing') {
        // Toggle pause
        setGameState('paused');
      } else if (e.key === ' ' && gameState === 'paused') {
        setGameState('playing');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Start / Restart game
  const startGame = () => {
    setScore(0);
    setLives(3);
    setCombo(0);
    setMilestoneMessage(null);
    itemsRef.current = [];
    nextItemId.current = 1;
    lastSpawnTime.current = performance.now();
    setGameState('playing');
    soundEngine.playChime(659.25);

    const canvas = canvasRef.current;
    if (canvas) {
      basketRef.current.x = canvas.width / 2 - basketRef.current.width / 2;
    }
  };

  // Trigger romantic milestones
  const checkMilestone = useCallback((newScore: number) => {
    if (newScore >= 250 && !milestoneMessage?.includes('Eternal')) {
      setMilestoneMessage('Eternal Light: "Distance is powerless against our shared resolve."');
      try {
        confetti({ particleCount: 40, spread: 60, colors: ['#E83F67', '#D9B477'] });
      } catch {
        // safe
      }
    } else if (newScore >= 100 && !milestoneMessage) {
      setMilestoneMessage('Star Bloom: "Every heart caught is a day of patience honored."');
    }
  }, [milestoneMessage]);

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localLives = lives;
    let localScore = score;
    let localCombo = combo;

    const gameLoop = (timestamp: number) => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Update Basket position based on keys
      const basket = basketRef.current;
      if (keysPressed.current.left) {
        basket.x = Math.max(0, basket.x - basket.speed);
      }
      if (keysPressed.current.right) {
        basket.x = Math.min(width - basket.width, basket.x + basket.speed);
      }

      // 2. Spawn items periodically
      if (timestamp - lastSpawnTime.current > 750) {
        lastSpawnTime.current = timestamp;
        const rand = Math.random();
        let type: FallingItem['type'] = 'heart';
        let points = 10;
        let color = '#E83F67';

        if (rand < 0.45) {
          type = 'heart';
          points = 10;
          color = '#E83F67';
        } else if (rand < 0.65) {
          type = 'star';
          points = 25;
          color = '#D9B477';
        } else if (rand < 0.8) {
          type = 'letter';
          points = 15;
          color = '#FFB5C8';
        } else if (rand < 0.9) {
          type = 'rose';
          points = 20;
          color = '#fe5076';
        } else {
          // Cloud of doubt
          type = 'cloud';
          points = -1; // represents losing a life
          color = '#644E57';
        }

        itemsRef.current.push({
          id: nextItemId.current++,
          x: Math.random() * (width - 40) + 20,
          y: -20,
          speed: Math.random() * 2 + 2.5,
          type,
          points,
          radius: 14,
          color,
        });
      }

      // 3. Update & Collide items
      const remainingItems: FallingItem[] = [];
      const basketY = height - 40;

      for (let i = 0; i < itemsRef.current.length; i++) {
        const item = itemsRef.current[i];
        item.y += item.speed;

        // Check collision with basket
        const inBasketX = item.x >= basket.x - 10 && item.x <= basket.x + basket.width + 10;
        const inBasketY = item.y >= basketY && item.y <= basketY + basket.height + 15;

        if (inBasketX && inBasketY) {
          if (item.type === 'cloud') {
            // Hit a storm of doubt
            soundEngine.playObstacle();
            localLives -= 1;
            localCombo = 0;
            setLives(localLives);
            setCombo(0);

            if (localLives <= 0) {
              setGameState('gameover');
              return;
            }
          } else {
            // Caught positive item!
            soundEngine.playHeartCatch();
            localCombo += 1;
            const comboBonus = Math.floor(localCombo / 5);
            localScore += item.points + comboBonus * 5;
            setScore(localScore);
            setCombo(localCombo);
            checkMilestone(localScore);

            // Update high score
            if (localScore > highScore) {
              setHighScore(localScore);
              localStorage.setItem('zaza_catch_heart_high_score', String(localScore));
            }
          }
          // Do not add to remainingItems (it got collected)
          continue;
        }

        // Missed bottom of screen
        if (item.y > height + 20) {
          if (item.type === 'heart') {
            // Dropped a heart drops combo
            localCombo = 0;
            setCombo(0);
          }
          continue;
        }

        remainingItems.push(item);
      }

      itemsRef.current = remainingItems;

      // 4. Render
      ctx.clearRect(0, 0, width, height);

      // Deep celestial canvas background
      ctx.fillStyle = '#16090F';
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial grid lines
      ctx.strokeStyle = 'rgba(217, 180, 119, 0.06)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Basket (Golden Velvet Vessel)
      ctx.save();
      const grad = ctx.createLinearGradient(basket.x, basketY, basket.x + basket.width, basketY + basket.height);
      grad.addColorStop(0, '#E83F67');
      grad.addColorStop(0.5, '#D9B477');
      grad.addColorStop(1, '#B81647');
      ctx.fillStyle = grad;
      ctx.shadowColor = '#E83F67';
      ctx.shadowBlur = 12;

      // Rounded vessel
      ctx.beginPath();
      ctx.roundRect(basket.x, basketY, basket.width, basket.height, [6, 6, 12, 12]);
      ctx.fill();

      // Top vessel rim
      ctx.strokeStyle = '#FFF3EA';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(basket.x + 2, basketY, basket.width - 4, 3, 2);
      ctx.stroke();
      ctx.restore();

      // Draw Falling Items
      for (let i = 0; i < itemsRef.current.length; i++) {
        const item = itemsRef.current[i];
        ctx.save();
        ctx.shadowColor = item.color;
        ctx.shadowBlur = 8;

        if (item.type === 'heart') {
          // Draw heart
          ctx.fillStyle = item.color;
          ctx.beginPath();
          const hx = item.x;
          const hy = item.y;
          const topCurveHeight = item.radius * 0.3;
          ctx.moveTo(hx, hy + topCurveHeight);
          // Top left curve
          ctx.bezierCurveTo(hx, hy, hx - item.radius, hy, hx - item.radius, hy + topCurveHeight);
          // Bottom left curve
          ctx.bezierCurveTo(hx - item.radius, hy + (item.radius + topCurveHeight) / 2, hx, hy + item.radius * 1.3, hx, hy + item.radius * 1.3);
          // Bottom right curve
          ctx.bezierCurveTo(hx, hy + item.radius * 1.3, hx + item.radius, hy + (item.radius + topCurveHeight) / 2, hx + item.radius, hy + topCurveHeight);
          // Top right curve
          ctx.bezierCurveTo(hx + item.radius, hy, hx, hy, hx, hy + topCurveHeight);
          ctx.closePath();
          ctx.fill();
        } else if (item.type === 'star') {
          // Draw Star
          ctx.fillStyle = item.color;
          ctx.font = '20px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⭐', item.x, item.y);
        } else if (item.type === 'letter') {
          // Draw Letter
          ctx.fillStyle = item.color;
          ctx.font = '18px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('💌', item.x, item.y);
        } else if (item.type === 'rose') {
          ctx.fillStyle = item.color;
          ctx.font = '18px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🌹', item.x, item.y);
        } else {
          // Cloud of doubt
          ctx.fillStyle = item.color;
          ctx.font = '22px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('☁️', item.x, item.y);
        }
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, score, lives, combo, highScore, checkMilestone]);

  // Touch and drag support for mobile
  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const touchX = ((touch.clientX - rect.left) / rect.width) * canvas.width;
    basketRef.current.x = Math.max(0, Math.min(canvas.width - basketRef.current.width, touchX - basketRef.current.width / 2));
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    basketRef.current.x = Math.max(0, Math.min(canvas.width - basketRef.current.width, mouseX - basketRef.current.width / 2));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-[#ECE0D8]">
      {/* Navigation */}
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
          Interactive Arcade · Celestial Catch
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D9B477] font-semibold">
          Romantic Arcade Experience
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FFF3EA] font-normal">
          Catch My Heart
        </h1>
        <p className="text-sm text-[#B89F9E] max-w-lg mx-auto">
          Gather falling hearts, stars, and letters while dodging the storm clouds of doubt.
          Keyboard arrows, mouse, or touch controls supported!
        </p>
      </div>

      {/* Score & HUD Strip */}
      <div className="glass-surface p-4 rounded-xl border border-[#D9B477]/20 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-6 text-sm">
          {/* Score */}
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#D9B477]" />
            <span className="text-xs uppercase tracking-wider text-[#B89F9E]">Score:</span>
            <span className="font-mono font-bold text-lg text-[#FFF3EA]">{score}</span>
          </div>

          {/* High Score */}
          <div className="hidden sm:flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFB5C8]" />
            <span className="text-xs uppercase tracking-wider text-[#B89F9E]">Best:</span>
            <span className="font-mono font-semibold text-sm text-[#FFF3EA]">{highScore}</span>
          </div>

          {/* Lives (3 glowing hearts) */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs uppercase tracking-wider text-[#B89F9E] mr-1">Lives:</span>
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${
                  i < lives ? 'text-[#E83F67] fill-[#E83F67] drop-shadow' : 'text-[#644E57]'
                }`}
              />
            ))}
          </div>

          {/* Combo Multiplier */}
          {combo > 3 && (
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E83F67]/20 border border-[#E83F67]/40 text-xs font-semibold text-[#FFB5C8] animate-pulse">
              <Zap className="w-3 h-3 text-[#E83F67]" />
              <span>{combo}x Combo</span>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          {gameState === 'playing' ? (
            <button
              onClick={() => setGameState('paused')}
              className="px-3 py-1.5 rounded-lg bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] border border-[#D9B477]/30 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : gameState === 'paused' ? (
            <button
              onClick={() => setGameState('playing')}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E83F67] to-[#B81647] text-white text-xs flex items-center gap-1.5 font-semibold transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={startGame}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#E83F67] to-[#B81647] hover:from-[#fe5076] hover:to-[#E83F67] text-white text-xs flex items-center gap-1.5 font-semibold uppercase tracking-wider shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Game</span>
            </button>
          )}
        </div>
      </div>

      {/* Milestone Notification Banner */}
      {milestoneMessage && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-[#2A0A19] to-[#3B1024] border border-[#FFB5C8]/40 text-center text-xs font-medium text-[#FFF3EA] shadow-lg animate-fade-in">
          {milestoneMessage}
        </div>
      )}

      {/* Canvas Arena */}
      <div className="relative rounded-2xl overflow-hidden border border-[#D9B477]/25 shadow-2xl bg-[#16090F] aspect-[4/3] sm:aspect-[16/9] w-full max-h-[500px]">
        <canvas
          ref={canvasRef}
          width={700}
          height={450}
          onTouchMove={handleCanvasTouchMove}
          onMouseMove={handleCanvasMouseMove}
          className="w-full h-full block cursor-crosshair touch-none"
        />

        {/* Overlay screens */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-[#0E050A]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#2A0A19] border border-[#D9B477]/40 flex items-center justify-center shadow-lg shadow-[#E83F67]/20">
              <Heart className="w-8 h-8 text-[#E83F67] animate-pulse-subtle" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF3EA]">
                Catch My Heart
              </h3>
              <p className="text-xs sm:text-sm text-[#B89F9E] max-w-sm">
                Control the golden vessel to catch hearts (+10), stars (+25), letters (+15), and roses (+20). Avoid storm clouds!
              </p>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] hover:from-[#fe5076] hover:to-[#E83F67] text-white text-xs font-bold uppercase tracking-widest shadow-xl transition-all"
            >
              Begin Playing
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-[#0E050A]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <h3 className="font-serif text-2xl text-[#FFF3EA]">Game Paused</h3>
            <button
              onClick={() => setGameState('playing')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Resume Journey
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-[#0E050A]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-5 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#2A0A19] border border-[#D9B477] flex items-center justify-center">
              <Trophy className="w-7 h-7 text-[#D9B477]" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#D9B477] font-semibold">
                Round Concluded
              </span>
              <h3 className="font-serif text-3xl text-[#FFF3EA]">
                Final Score: {score}
              </h3>
              <p className="text-xs text-[#B89F9E] max-w-xs mx-auto">
                "No matter how many times doubts drift across the dark, Wahb’s hands will always be here to catch you."
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E83F67] to-[#B81647] text-white text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
              <Link
                to="/"
                onClick={() => soundEngine.playChime(440)}
                className="px-6 py-2.5 rounded-full bg-[#2A0A19] hover:bg-[#3B1024] text-[#D9B477] border border-[#D9B477]/30 text-xs font-semibold uppercase tracking-wider"
              >
                Sanctuary Home
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Touch Controls for small devices */}
      <div className="mt-4 sm:hidden flex items-center justify-between gap-4">
        <button
          onMouseDown={() => (keysPressed.current.left = true)}
          onMouseUp={() => (keysPressed.current.left = false)}
          onTouchStart={() => (keysPressed.current.left = true)}
          onTouchEnd={() => (keysPressed.current.left = false)}
          className="w-1/2 py-4 rounded-xl bg-[#2A0A19] border border-[#D9B477]/30 text-[#FFF3EA] flex items-center justify-center active:bg-[#3B1024] transition-colors select-none shadow-lg"
          aria-label="Move Left"
        >
          <ChevronLeft className="w-6 h-6 text-[#D9B477]" />
          <span className="text-xs font-semibold uppercase tracking-wider ml-1">Left</span>
        </button>

        <button
          onMouseDown={() => (keysPressed.current.right = true)}
          onMouseUp={() => (keysPressed.current.right = false)}
          onTouchStart={() => (keysPressed.current.right = true)}
          onTouchEnd={() => (keysPressed.current.right = false)}
          className="w-1/2 py-4 rounded-xl bg-[#2A0A19] border border-[#D9B477]/30 text-[#FFF3EA] flex items-center justify-center active:bg-[#3B1024] transition-colors select-none shadow-lg"
          aria-label="Move Right"
        >
          <span className="text-xs font-semibold uppercase tracking-wider mr-1">Right</span>
          <ChevronRight className="w-6 h-6 text-[#D9B477]" />
        </button>
      </div>

      {/* Game Legend */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs text-[#B89F9E]">
        <div className="p-3 rounded-lg bg-[#16090F] border border-[#D9B477]/10">
          <div className="text-base mb-1">💖</div>
          <span className="text-[#FFF3EA] font-semibold block">Heart</span>
          <span>+10 pts</span>
        </div>
        <div className="p-3 rounded-lg bg-[#16090F] border border-[#D9B477]/10">
          <div className="text-base mb-1">⭐</div>
          <span className="text-[#FFF3EA] font-semibold block">North Star</span>
          <span>+25 pts</span>
        </div>
        <div className="p-3 rounded-lg bg-[#16090F] border border-[#D9B477]/10">
          <div className="text-base mb-1">💌</div>
          <span className="text-[#FFF3EA] font-semibold block">Love Letter</span>
          <span>+15 pts</span>
        </div>
        <div className="p-3 rounded-lg bg-[#16090F] border border-[#D9B477]/10">
          <div className="text-base mb-1">🌹</div>
          <span className="text-[#FFF3EA] font-semibold block">Crimson Rose</span>
          <span>+20 pts</span>
        </div>
        <div className="p-3 rounded-lg bg-[#16090F] border border-[#D9B477]/10 col-span-2 sm:col-span-1">
          <div className="text-base mb-1">☁️</div>
          <span className="text-[#E83F67] font-semibold block">Doubt Cloud</span>
          <span>-1 Life</span>
        </div>
      </div>
    </div>
  );
};
