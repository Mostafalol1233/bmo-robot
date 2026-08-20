import { useEffect, useMemo, useState } from 'react';

interface RhythmGridGameProps { onBack: () => void; }

const LANES = ['A', 'S', 'D', 'F'];
const PATTERN = [0, 1, 2, 1, 3, 2, 0, 3, 1, 2, 3, 0];

export default function RhythmGridGame({ onBack }: RhythmGridGameProps) {
  const [started, setStarted] = useState(false);
  const [beat, setBeat] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [misses, setMisses] = useState(0);
  const [message, setMessage] = useState('اضغط الحرف المضيء في اللحظة الصحيحة');

  useEffect(() => {
    if (!started) return;
    const timer = window.setInterval(() => setBeat((current) => (current + 1) % PATTERN.length), 620);
    return () => window.clearInterval(timer);
  }, [started]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const index = LANES.indexOf(event.key.toUpperCase());
      if (index >= 0) hit(index);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const target = useMemo(() => PATTERN[beat], [beat]);
  const start = () => { setStarted(true); setBeat(0); setScore(0); setCombo(0); setMisses(0); setMessage('BMO بدأ الإيقاع!'); };
  const hit = (lane: number) => {
    if (!started) return;
    if (lane === target) { const nextCombo = combo + 1; setCombo(nextCombo); setScore((value) => value + 100 + nextCombo * 10); setMessage(nextCombo > 3 ? 'سلسلة ممتازة!' : 'في الوقت تماماً!'); }
    else { setCombo(0); setMisses((value) => value + 1); setMessage('خارج الإيقاع — جرّب النبضة التالية'); }
  };

  return (
    <div className="bmo-game-shell rhythm-game">
      <div className="bmo-game-topbar"><button onClick={onBack}>← الألعاب</button><div><b>Rhythm Grid</b><small>اضرب الإيقاع مع BMO</small></div><span>النقاط {score} · Combo ×{combo}</span></div>
      <div className="rhythm-stage">
        <div className="rhythm-bmo-orb"><div className="rhythm-face"><span /><span /><i /></div></div>
        <div className="rhythm-copy"><strong>{message}</strong><small>الأخطاء: {misses} · استخدم A S D F أو الأزرار</small></div>
        <div className="rhythm-lanes">
          {LANES.map((lane, index) => <button key={lane} className={`rhythm-lane ${started && target === index ? 'is-target' : ''}`} onClick={() => hit(index)}><span>{lane}</span><i /></button>)}
        </div>
        {!started && <div className="bmo-game-overlay"><strong>BMO Beat Lab</strong><p>انتظر الضوء واضغط المسار المطابق. كل سلسلة تزيد النقاط.</p><button onClick={start}>ابدأ الإيقاع</button></div>}
      </div>
    </div>
  );
}
