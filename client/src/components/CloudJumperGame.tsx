import { useCallback, useEffect, useRef, useState } from 'react';

interface CloudJumperGameProps {
  onBack: () => void;
}

const WIDTH = 640;
const HEIGHT = 360;
const PLAYER_W = 34;
const PLAYER_H = 38;
const PLATFORM_W = 92;
const PLATFORM_H = 12;

type Platform = { x: number; y: number; w: number };

const makePlatforms = (): Platform[] => [
  { x: 32, y: 300, w: 115 },
  { x: 188, y: 245, w: 102 },
  { x: 340, y: 188, w: 105 },
  { x: 492, y: 132, w: 112 },
  { x: 365, y: 78, w: 92 },
  { x: 178, y: 126, w: 92 },
];

export default function CloudJumperGame({ onBack }: CloudJumperGameProps) {
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [player, setPlayer] = useState({ x: 56, y: 258 });
  const [collected, setCollected] = useState<number[]>([]);
  const keys = useRef({ left: false, right: false });
  const frame = useRef<number | null>(null);
  const state = useRef({ x: 56, y: 258, vx: 0, vy: 0, jumps: 0, lives: 3, score: 0 });
  const platforms = useRef(makePlatforms());
  const stars = useRef([
    { x: 226, y: 210 }, { x: 385, y: 153 }, { x: 540, y: 96 }, { x: 410, y: 42 }, { x: 215, y: 90 },
  ]);

  const reset = useCallback(() => {
    state.current = { x: 56, y: 258, vx: 0, vy: 0, jumps: 0, lives: 3, score: 0 };
    setPlayer({ x: 56, y: 258 });
    setScore(0); setLives(3); setCollected([]); setWon(false); setRunning(true);
  }, []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') keys.current.left = true;
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') keys.current.right = true;
      if ((event.key === 'ArrowUp' || event.key.toLowerCase() === 'w' || event.key === ' ') && state.current.jumps < 2) {
        state.current.vy = -10.5; state.current.jumps += 1;
      }
    };
    const up = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') keys.current.left = false;
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') keys.current.right = false;
    };
    window.addEventListener('keydown', down); window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const s = state.current;
      s.vx = keys.current.left ? -4.2 : keys.current.right ? 4.2 : s.vx * 0.82;
      s.x = Math.max(0, Math.min(WIDTH - PLAYER_W, s.x + s.vx));
      const previousBottom = s.y + PLAYER_H;
      s.vy += 0.42; s.y += s.vy;
      let landed = false;
      platforms.current.forEach((platform) => {
        const overlaps = s.x + PLAYER_W > platform.x && s.x < platform.x + platform.w;
        const crosses = previousBottom <= platform.y && s.y + PLAYER_H >= platform.y;
        if (overlaps && crosses && s.vy >= 0) { s.y = platform.y - PLAYER_H; s.vy = -9; s.jumps = 0; landed = true; }
      });
      if (s.y > HEIGHT + 30) {
        s.lives -= 1;
        if (s.lives <= 0) { setRunning(false); setLives(0); return; }
        s.x = 56; s.y = 258; s.vy = 0; s.jumps = 0; setLives(s.lives);
      }
      stars.current.forEach((star, index) => {
        const hit = s.x < star.x + 16 && s.x + PLAYER_W > star.x && s.y < star.y + 16 && s.y + PLAYER_H > star.y;
        if (hit && !collected.includes(index)) { s.score += 100; setScore(s.score); setCollected((prev) => [...prev, index]); }
      });
      if (collected.length >= stars.current.length - 1 || (s.score >= 500)) { setWon(true); setRunning(false); }
      setPlayer({ x: s.x, y: s.y });
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [running, collected]);

  return (
    <div className="bmo-game-shell cloud-jumper-game">
      <div className="bmo-game-topbar"><button onClick={onBack}>← الألعاب</button><div><b>Cloud Jumper</b><small>اقفز فوق السحب واجمع نجوم المملكة</small></div><span>النقاط {score} · القلوب {lives}</span></div>
      <div className="cloud-jumper-stage" role="application" aria-label="Cloud Jumper">
        <div className="cloud-jumper-sun" />
        {platforms.current.map((platform, index) => <div key={index} className="cloud-platform" style={{ left: `${(platform.x / WIDTH) * 100}%`, top: `${(platform.y / HEIGHT) * 100}%`, width: `${(platform.w / WIDTH) * 100}%` }} />)}
        {stars.current.map((star, index) => !collected.includes(index) && <div key={index} className="cloud-star" style={{ left: `${(star.x / WIDTH) * 100}%`, top: `${(star.y / HEIGHT) * 100}%` }}>✦</div>)}
        <div className="cloud-player" style={{ left: `${(player.x / WIDTH) * 100}%`, top: `${(player.y / HEIGHT) * 100}%` }}><span>●</span><i /></div>
        {(!running || won) && <div className="bmo-game-overlay"><strong>{won ? 'المملكة آمنة!' : lives === 0 ? 'سقط BMO!' : 'Cloud Jumper'}</strong><p>{won ? 'جمعت النجوم كلها.' : 'تحرك بالأسهم أو A/D واقفز بـ W أو Space.'}</p><button onClick={reset}>{won || lives === 0 ? 'إعادة اللعب' : 'ابدأ المغامرة'}</button></div>}
      </div>
      <div className="bmo-touch-controls"><button onClick={() => { keys.current.left = true; setTimeout(() => keys.current.left = false, 180); }}>◀</button><button onClick={() => { state.current.vy = -10.5; state.current.jumps = Math.min(2, state.current.jumps + 1); }}>▲</button><button onClick={() => { keys.current.right = true; setTimeout(() => keys.current.right = false, 180); }}>▶</button></div>
    </div>
  );
}
