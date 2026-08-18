import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Award, BrainCircuit, Check, CheckCircle2, ChevronLeft, Compass, ExternalLink,
  Gamepad2, LockKeyhole, MessageCircle, Play, Puzzle, RefreshCcw, Search, Send, ShieldCheck,
  Sparkles, Timer, Trophy, Wifi, X, Zap,
} from "lucide-react";
import "./index.css";
import { getPlayerId } from "./lib/supabase";

type GameId = "adventure" | "cipher" | "reflex";
type ChatMessage = { role: "user" | "assistant"; content: string };
type ExternalResult = { title: string; url: string; description: string };

const games: { id: GameId; title: string; description: string; icon: typeof Compass; tone: string }[] = [
  { id: "adventure", title: "مسارات المملكة", description: "مغامرة اختيارية تتغير حسب قراراتك.", icon: Compass, tone: "blue" },
  { id: "cipher", title: "شفرة BMO", description: "رتّب الإشارات وافتح البوابة الرقمية.", icon: LockKeyhole, tone: "teal" },
  { id: "reflex", title: "نبضة السرعة", description: "اختبر تركيزك قبل أن تختفي الإشارة.", icon: Zap, tone: "violet" },
];

const adventureScenes = [
  { title: "الإشارة الأولى", text: "تظهر ومضة زرقاء على خريطة المملكة. أمامك ممران: أحدهما هادئ والآخر يقود إلى منطقة مجهولة.", options: ["أتبع الضوء بهدوء", "أرسل إشارة صداقة"] },
  { title: "الغرفة الصامتة", text: "تجد بوابة لا تستجيب إلا لصوت قرار واضح. لا تحتاج إلى القوة؛ تحتاج إلى ملاحظة النمط.", options: ["أراقب التكرار", "أجرب المسار الأقصر"] },
  { title: "العودة إلى المنزل", text: "تتصل البوابة بشبكة BMO. كل ما جمعته من قرارات أصبح جزءاً من سجل المغامرة.", options: ["أحفظ الإحداثيات", "أشارك الطريق مع الفريق"] },
];

function cn(...values: Array<string | false | null | undefined>) { return values.filter(Boolean).join(" "); }

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const raw = await response.text();
  let data: any = null;
  try { data = raw ? JSON.parse(raw) : null; } catch { data = null; }
  if (!response.ok) throw new Error(data?.error || "الخدمة غير متاحة حالياً. جرّب مرة أخرى بعد لحظات.");
  if (!data) throw new Error("لم تُرجع الخدمة نتيجة قابلة للقراءة.");
  return data as T;
}

function BMOAvatar({ speaking = false, mood = "ready" }: { speaking?: boolean; mood?: string }) {
  return (
    <div className={cn("bmo-avatar", speaking && "is-speaking")} aria-label={`BMO ${mood}`}>
      <div className="bmo-antenna" />
      <div className="bmo-shell">
        <div className="bmo-display">
          <span className="bmo-eye left" /><span className="bmo-eye right" />
          <span className="bmo-mouth" />
          <span className="bmo-scanline" />
        </div>
        <div className="bmo-speaker"><span /><span /><span /></div>
        <div className="bmo-controls"><span /><span /><span /><span /><span /></div>
      </div>
      <div className="bmo-status"><Wifi size={12} /> متصل</div>
    </div>
  );
}

function TopBar({ active, onSelect }: { active: string; onSelect: (value: string) => void }) {
  return (
    <header className="topbar">
      <div className="brand" onClick={() => onSelect("home")} role="button" tabIndex={0}>
        <div className="brand-mark">B</div>
        <div><strong>BMO / مختبر المغامرة</strong><span>منصة ألعاب تفاعلية</span></div>
      </div>
      <nav className="nav-links" aria-label="التنقل الرئيسي">
        {[{ id: "home", label: "الرئيسية" }, { id: "games", label: "الألعاب" }, { id: "explore", label: "استكشف" }].map((item) => (
          <button key={item.id} className={cn(active === item.id && "active")} onClick={() => onSelect(item.id)}>{item.label}</button>
        ))}
      </nav>
      <div className="topbar-meta"><span className="live-dot" /> <span>النظام يعمل</span></div>
    </header>
  );
}

function GameCard({ game, active, onClick }: { game: typeof games[number]; active: boolean; onClick: () => void }) {
  const Icon = game.icon;
  return (
    <button className={cn("game-card", `tone-${game.tone}`, active && "selected")} onClick={onClick}>
      <span className="game-icon"><Icon size={20} /></span>
      <span className="game-copy"><strong>{game.title}</strong><small>{game.description}</small></span>
      <ChevronLeft size={18} className="card-arrow" />
    </button>
  );
}

function AdventureGame({ onScore, onContext }: { onScore: (score: number) => void; onContext: (text: string) => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const completed = step >= adventureScenes.length;
  const scene = adventureScenes[Math.min(step, adventureScenes.length - 1)];
  const choose = (index: number) => {
    const nextScore = score + (index === 0 ? 12 : 9);
    setScore(nextScore); onScore(nextScore); onContext(`أنهى اللاعب قراراً في مسارات المملكة بمجموع ${nextScore} نقطة.`); setStep(step + 1);
  };
  return <div className="game-stage adventure-stage">
    <div className="stage-header"><div><span className="eyebrow">المشهد {Math.min(step + 1, 3)} / 3</span><h3>{completed ? "اكتملت الرحلة" : scene.title}</h3></div><div className="score-chip"><Trophy size={15} /> {score} نقطة</div></div>
    {completed ? <div className="success-state"><CheckCircle2 size={42} /><h4>تم حفظ المسار</h4><p>اخترت طريقاً واضحاً، وأصبح سجل مغامرتك جاهزاً للجولة القادمة.</p><button className="primary-btn" onClick={() => { setStep(0); setScore(0); onScore(0); }}>ابدأ من جديد</button></div> : <><p className="story-text">{scene.text}</p><div className="choice-grid">{scene.options.map((option, index) => <button key={option} className="choice-btn" onClick={() => choose(index)}><span>0{index + 1}</span>{option}<ArrowLeft size={16} /></button>)}</div></>}
  </div>;
}

function CipherGame({ onScore, onContext }: { onScore: (score: number) => void; onContext: (text: string) => void }) {
  const sequence = [1, 3, 0, 2];
  const [progress, setProgress] = useState<number[]>([]);
  const [failed, setFailed] = useState(false);
  const complete = progress.length === sequence.length;
  const press = (value: number) => {
    if (complete) return;
    if (value === sequence[progress.length]) {
      const next = [...progress, value]; setProgress(next); setFailed(false);
      if (next.length === sequence.length) { onScore(40); onContext("فتح اللاعب شفرة BMO بنجاح وحصل على 40 نقطة."); }
    } else { setFailed(true); setProgress([]); }
  };
  return <div className="game-stage cipher-stage">
    <div className="stage-header"><div><span className="eyebrow">تحدي الذاكرة</span><h3>أعد ترتيب النبضات</h3></div><div className="sequence-readout">{progress.length} / 4</div></div>
    <p className="story-text">راقب الإشارات في الشاشة ثم اضغط الأزرار بالترتيب الصحيح. لا توجد محاولات ضائعة؛ كل إعادة بداية فرصة جديدة.</p>
    <div className={cn("cipher-display", failed && "failed", complete && "complete")}>{complete ? <><CheckCircle2 size={24} /> البوابة مفتوحة</> : failed ? <><RefreshCcw size={20} /> تسلسل غير صحيح، أعد المحاولة</> : <><BrainCircuit size={20} /> الإشارة جاهزة</>}</div>
    <div className="cipher-grid">{[0, 1, 2, 3].map((value) => <button key={value} className={cn("cipher-key", progress.includes(value) && "used")} onClick={() => press(value)}><span>{String(value + 1).padStart(2, "0")}</span><i /></button>)}</div>
    {complete && <button className="text-btn" onClick={() => { setProgress([]); setFailed(false); }}>إعادة التحدي <RefreshCcw size={15} /></button>}
  </div>;
}

function ReflexGame({ onScore, onContext }: { onScore: (score: number) => void; onContext: (text: string) => void }) {
  const [running, setRunning] = useState(false); const [round, setRound] = useState(0); const [hits, setHits] = useState(0); const [time, setTime] = useState(8); const [target, setTarget] = useState({ x: 48, y: 48 });
  useEffect(() => { if (!running) return; const timer = window.setInterval(() => setTime((value) => value <= 1 ? 0 : value - 1), 1000); return () => window.clearInterval(timer); }, [running]);
  useEffect(() => { if (running && time === 0) setRunning(false); }, [running, time]);
  const start = () => { setRunning(true); setRound(0); setHits(0); setTime(8); setTarget({ x: 18 + Math.random() * 64, y: 22 + Math.random() * 56 }); };
  const hit = () => { if (!running) return; const nextRound = round + 1; const nextHits = hits + 1; if (nextRound >= 5) { setRunning(false); setRound(nextRound); setHits(nextHits); onScore(nextHits * 10); onContext(`أنهى اللاعب نبضة السرعة بدقة ${nextHits} من 5 وحصل على ${nextHits * 10} نقطة.`); return; } setRound(nextRound); setHits(nextHits); setTarget({ x: 12 + Math.random() * 74, y: 18 + Math.random() * 64 }); };
  return <div className="game-stage reflex-stage">
    <div className="stage-header"><div><span className="eyebrow">اختبار التركيز</span><h3>التقط الإشارة</h3></div><div className="timer-chip"><Timer size={15} /> {time} ث</div></div>
    <div className="reflex-board">{running ? <button aria-label="الإشارة" className="reflex-target" style={{ left: `${target.x}%`, top: `${target.y}%` }} onClick={hit}><span /></button> : <div className="reflex-idle">{round >= 5 ? <><Award size={30} /><strong>نتيجة ممتازة: {hits} / 5</strong><span>أعد اللعب لتحسين زمن الاستجابة.</span></> : <><Play size={30} /><strong>جاهز للإشارة؟</strong><span>لديك 8 ثوانٍ لالتقاط خمس نبضات.</span></>}</div>}</div>
    {!running && <button className="primary-btn" onClick={start}>{round >= 5 ? "جولة جديدة" : "ابدأ الاختبار"} <Play size={16} /></button>}
    {running && <div className="round-label">النبضة {round + 1} / 5</div>}
  </div>;
}

function ChatPanel({ game, score, context }: { game: GameId; score: number; context: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: "مرحباً. أنا BMO، جاهز لمرافقتك بين الألعاب والقصص. ماذا تريد أن نجرّب؟" }]);
  const [value, setValue] = useState(""); const [busy, setBusy] = useState(false);
  const send = async () => { const message = value.trim(); if (!message || busy) return; setValue(""); const next = [...messages, { role: "user" as const, content: message }]; setMessages(next); setBusy(true); try { const data = await postJson<{ reply: string }>("/api/chat", { message, game, score, history: next.slice(-8) }); setMessages((current) => [...current, { role: "assistant", content: data.reply }]); } catch { setMessages((current) => [...current, { role: "assistant", content: "أحتاج لحظة لإعادة ترتيب دوائري. حاول مرة أخرى." }]); } finally { setBusy(false); } };
  return <aside className="chat-panel"><div className="chat-heading"><div className="chat-identity"><BMOAvatar speaking={busy} /><div><strong>محادثة BMO</strong><span><span className="live-dot" /> يراقب السياق</span></div></div><MessageCircle size={18} /></div><div className="chat-context"><Sparkles size={14} /> {context || "الردهة مفتوحة لاستقبال مغامرتك."}</div><div className="chat-messages">{messages.map((item, index) => <div key={`${item.role}-${index}`} className={cn("message", item.role)}>{item.content}</div>)}{busy && <div className="message assistant typing">يكتب الآن...</div>}</div><div className="chat-input"><input value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="اكتب رسالة إلى BMO" maxLength={500} /><button aria-label="إرسال" onClick={send}><Send size={17} /></button></div></aside>;
}

function ExplorePanel() {
  const [query, setQuery] = useState("BMO Adventure Time games"); const [results, setResults] = useState<ExternalResult[]>([]); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const search = async () => { setLoading(true); setError(""); try { const data = await postJson<{ results: ExternalResult[] }>("/api/search", { query }); setResults(data.results || []); } catch (err) { setError(err instanceof Error ? err.message : "تعذر جلب النتائج"); } finally { setLoading(false); } };
  return <section className="explore-panel"><div className="section-heading"><div><span className="eyebrow">محتوى خارجي مختار</span><h2>استكشف ما وراء المختبر</h2><p>يجلب البحث مصادر عامة عند الطلب، وتظل المفاتيح والاتصالات الحساسة على الخادم.</p></div><div className="secure-badge"><ShieldCheck size={15} /> اتصال محمي</div></div><div className="search-row"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && search()} placeholder="ابحث عن ألعاب ومحتوى" /><button className="primary-btn" onClick={search} disabled={loading}>{loading ? "جارٍ البحث" : "ابحث"}</button></div>{error && <div className="error-box"><X size={16} /> {error}</div>}<div className="results-grid">{results.length ? results.map((item) => <a className="result-card" href={item.url} target="_blank" rel="noreferrer" key={item.url}><div className="result-title"><strong>{item.title}</strong><ExternalLink size={15} /></div><p>{item.description || "مصدر خارجي متعلق بموضوع البحث."}</p><span>{new URL(item.url).hostname}</span></a>) : <div className="empty-results"><Search size={26} /><strong>ابدأ بحثاً قصيراً</strong><span>ستظهر هنا اقتراحات خارجية مرتبطة بعالم BMO ووقت المغامرة.</span></div>}</div></section>;
}

export default function App() {
  const [section, setSection] = useState("home"); const [activeGame, setActiveGame] = useState<GameId>("adventure"); const [score, setScore] = useState(0); const [context, setContext] = useState(""); const active = useMemo(() => games.find((game) => game.id === activeGame)!, [activeGame]);
  const selectGame = (game: GameId) => { setActiveGame(game); setSection("games"); setContext(`أنت الآن في ${games.find((item) => item.id === game)?.title}.`); };
  const saveScore = async (value: number) => { setScore(value); try { const playerId = await getPlayerId(); await postJson("/api/progress", { playerId, gameId: activeGame, score: value, metadata: { section } }); } catch { /* حفظ محلي هادئ عند عدم إعداد Supabase */ } };
  return <div className="app-shell" dir="rtl"><TopBar active={section} onSelect={setSection} /><main className="page-wrap">
    {section === "home" && <section className="hero-grid"><div className="hero-copy"><span className="eyebrow"><span className="live-dot" /> الإصدار التجريبي 01 / جاهز للمغامرة</span><h1>عالم صغير.<br /><em>مغامرات كبيرة.</em></h1><p>منصة تفاعلية تجمع ألعاباً خفيفة، قصصاً متفرعة، ومحادثة ذكية مع BMO في تجربة عربية نظيفة وسريعة.</p><div className="hero-actions"><button className="primary-btn" onClick={() => setSection("games")}>ابدأ التجربة <ArrowLeft size={17} /></button><button className="secondary-btn" onClick={() => setSection("explore")}>اكتشف المحتوى <ExternalLink size={16} /></button></div><div className="hero-stats"><span><strong>03</strong><small>ألعاب أصلية</small></span><span><strong>24/7</strong><small>رفيق متصل</small></span><span><strong>RTL</strong><small>دعم عربي كامل</small></span></div></div><div className="hero-bmo"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><BMOAvatar mood="ready" /><div className="bmo-caption"><span className="caption-line" /> <span>وحدة الاستكشاف / 001</span></div></div></section>}
    {section === "games" && <section className="games-layout"><div className="games-list"><div className="section-heading compact"><div><span className="eyebrow">مركز اللعب</span><h2>اختر مغامرتك</h2></div><div className="total-score"><Trophy size={16} /> {score} نقطة</div></div>{games.map((game) => <GameCard key={game.id} game={game} active={activeGame === game.id} onClick={() => selectGame(game.id)} />)}<div className="games-note"><Gamepad2 size={18} /><div><strong>كل قرار يهم</strong><span>يتابع BMO تقدمك ويقترح الخطوة التالية.</span></div></div></div><div className="active-game"><div className="active-game-top"><div><span className="eyebrow">اللعبة النشطة</span><h2>{active.title}</h2></div><span className={cn("active-dot", `active-${active.tone}`)} /></div>{activeGame === "adventure" && <AdventureGame onScore={saveScore} onContext={setContext} />}{activeGame === "cipher" && <CipherGame onScore={saveScore} onContext={setContext} />}{activeGame === "reflex" && <ReflexGame onScore={saveScore} onContext={setContext} />}</div><ChatPanel game={activeGame} score={score} context={context} /></section>}
    {section === "explore" && <ExplorePanel />}
  </main><footer className="footer"><span>© 2026 مختبر BMO</span><span>واجهة هادئة، ألعاب خفيفة، ومحتوى يُكتشف بمسؤولية.</span><span className="footer-status"><Check size={14} /> جميع الأنظمة مستقرة</span></footer></div>;
}
