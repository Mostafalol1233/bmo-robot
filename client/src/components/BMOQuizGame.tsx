import { useCallback, useEffect, useMemo, useState } from 'react';
import finnMainImg from '@assets/characters/finn_main.jpg';
import jakeMainImg from '@assets/characters/jake_main.jpg';
import princessBubblegumMainImg from '@assets/characters/princess_bubblegum_main.jpg';
import marcelineMainImg from '@assets/characters/marceline_main.jpg';
import bmoMainImg from '@assets/characters/bmo_main.jpg';

interface CharacterQuestGameProps {
  onBack: () => void;
}

type Point = { x: number; y: number };

const BOARD = { width: 9, height: 6 };
const START: Point = { x: 0, y: 5 };
const EXIT: Point = { x: 8, y: 0 };
const OBSTACLES: Point[] = [
  { x: 2, y: 5 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 2 },
  { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 7, y: 1 }, { x: 5, y: 0 },
];
const RELICS: Array<Point & { image: string; name: string }> = [
  { x: 1, y: 4, image: finnMainImg, name: 'شارة فين' },
  { x: 4, y: 5, image: jakeMainImg, name: 'شارة جيك' },
  { x: 4, y: 2, image: princessBubblegumMainImg, name: 'بلورة الأميرة' },
  { x: 7, y: 4, image: marcelineMainImg, name: 'وتر مارسيلين' },
  { x: 7, y: 0, image: bmoMainImg, name: 'نواة بيمو' },
];

const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
const isObstacle = (point: Point) => OBSTACLES.some((item) => samePoint(item, point));

export default function BMOQuizGame({ onBack }: CharacterQuestGameProps) {
  const [player, setPlayer] = useState<Point>(START);
  const [collected, setCollected] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(55);
  const [status, setStatus] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState('اجمع شارات أصدقاء بيمو وافتح بوابة القلعة.');

  const relicCount = RELICS.length;
  const currentRelic = useMemo(
    () => RELICS.find((item) => samePoint(item, player) && !collected.includes(item.name)),
    [collected, player],
  );

  const resetGame = useCallback(() => {
    setPlayer(START);
    setCollected([]);
    setSeconds(55);
    setMoves(0);
    setStatus('ready');
    setMessage('اجمع شارات أصدقاء بيمو وافتح بوابة القلعة.');
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setStatus('playing');
    setMessage('انطلق! استخدم الأسهم أو أزرار التحكم.');
  }, [resetGame]);

  const move = useCallback((dx: number, dy: number) => {
    if (status !== 'playing') return;
    const next = { x: player.x + dx, y: player.y + dy };
    if (next.x < 0 || next.x >= BOARD.width || next.y < 0 || next.y >= BOARD.height) {
      setMessage('الحافة تمنع الطريق. جرّب اتجاهاً آخر.');
      return;
    }
    if (isObstacle(next)) {
      setMessage('صخرة سحرية! ابحث عن طريق آخر.');
      return;
    }

    setPlayer(next);
    setMoves((value) => value + 1);
    const found = RELICS.find((item) => samePoint(item, next) && !collected.includes(item.name));
    if (found) {
      const nextCollected = [...collected, found.name];
      setCollected(nextCollected);
      setMessage(`جمعت ${found.name}. بقي ${relicCount - nextCollected.length}.`);
    } else if (samePoint(next, EXIT)) {
      if (collected.length >= relicCount) {
        setStatus('won');
        setMessage('فتحت البوابة! أرض أوو ترحب بك.');
      } else {
        setMessage(`البوابة مقفلة. تحتاج ${relicCount - collected.length} عناصر أخرى.`);
      }
    } else {
      setMessage('استمر في الاستكشاف وابحث عن اللمعات.');
    }
  }, [collected, player, relicCount, status]);

  useEffect(() => {
    if (status !== 'playing') return;
    const handleKey = (event: KeyboardEvent) => {
      const keys: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };
      const direction = keys[event.key];
      if (direction) {
        event.preventDefault();
        move(direction.x, direction.y);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move, status]);

  useEffect(() => {
    if (status !== 'playing') return;
    if (seconds <= 0) {
      setStatus('lost');
      setMessage('انتهى الوقت. أعد المحاولة وأنقذ أصدقاء بيمو.');
      return;
    }
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [seconds, status]);

  return (
    <div className="quest-game-shell">
      <header className="quest-game-header">
        <button className="game-back-button" onClick={onBack}>← قاعة الألعاب</button>
        <div>
          <p className="game-kicker">العالم الرابع · مغامرة بيمو</p>
          <h2>Character Quest</h2>
        </div>
        <div className="quest-timer">{String(seconds).padStart(2, '0')}<span>ث</span></div>
      </header>

      <div className="quest-game-layout">
        <section className="quest-board-card">
          <div className="quest-board" style={{ gridTemplateColumns: `repeat(${BOARD.width}, 1fr)` }}>
            {Array.from({ length: BOARD.width * BOARD.height }).map((_, index) => {
              const point = { x: index % BOARD.width, y: Math.floor(index / BOARD.width) };
              const obstacle = isObstacle(point);
              const relic = RELICS.find((item) => samePoint(item, point));
              const isPlayer = samePoint(player, point);
              const isExit = samePoint(EXIT, point);
              return (
                <div key={`${point.x}-${point.y}`} className={`quest-cell ${obstacle ? 'is-obstacle' : ''} ${isExit ? 'is-exit' : ''}`}>
                  {obstacle && <span className="quest-rock">◆</span>}
                  {isExit && <span className="quest-gate">⌂</span>}
                  {relic && !collected.includes(relic.name) && <img className="quest-relic" src={relic.image} alt={relic.name} />}
                  {isPlayer && <span className="quest-player" aria-label="بيمو">●</span>}
                </div>
              );
            })}
          </div>
          <div className="quest-message"><span className="quest-signal" />{message}</div>
        </section>

        <aside className="quest-sidebar">
          <div className="quest-stat-row"><span>العناصر</span><strong>{collected.length}/{relicCount}</strong></div>
          <div className="quest-stat-row"><span>الحركات</span><strong>{moves}</strong></div>
          <div className="quest-progress"><span style={{ width: `${(collected.length / relicCount) * 100}%` }} /></div>
          <h3>تحكم</h3>
          <div className="quest-controls">
            <button onClick={() => move(0, -1)}>↑</button>
            <button onClick={() => move(-1, 0)}>←</button>
            <button onClick={() => move(0, 1)}>↓</button>
            <button onClick={() => move(1, 0)}>→</button>
          </div>
          {currentRelic && <div className="quest-found-card"><img src={currentRelic.image} alt="" /><span>{currentRelic.name}</span></div>}
          <div className="quest-actions">
            {status === 'ready' && <button className="game-primary-button" onClick={startGame}>ابدأ المغامرة</button>}
            {status === 'playing' && <button className="game-secondary-button" onClick={resetGame}>إعادة الجولة</button>}
            {(status === 'won' || status === 'lost') && <button className="game-primary-button" onClick={startGame}>{status === 'won' ? 'مغامرة جديدة' : 'حاول مرة أخرى'}</button>}
          </div>
          {status === 'won' && <div className="quest-result is-win">تم فتح البوابة بنجاح</div>}
          {status === 'lost' && <div className="quest-result is-loss">الظلال سبقتك هذه المرة</div>}
        </aside>
      </div>
    </div>
  );
}
