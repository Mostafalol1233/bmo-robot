import { z } from "zod";

const requestSchema = z.object({ query: z.string().trim().min(2).max(120) });

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "الطريقة غير مسموحة" });
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "عبارة البحث غير صالحة" });

  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      source: "demo",
      results: [
        { title: "Virtual BMO — لعبة متصفح مستقلة", url: "https://gumpyfunction.itch.io/virtual-bmo", description: "تجربة مستقلة مستوحاة من جهاز BMO، وتُفتح في نافذة جديدة." },
        { title: "BMO: Play Along With Me", url: "https://toongo.io/game/adventure-time-bmo-play-along-with-me", description: "صفحة لعبة خارجية مرتبطة بعالم وقت المغامرة." },
      ],
    });
  }

  try {
    const response = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query: parsed.data.query, limit: 6, sources: [{ type: "web" }] }),
    });
    if (!response.ok) return res.status(502).json({ error: "تعذر الوصول إلى البحث الخارجي" });
    const data = await response.json();
    const raw = Array.isArray(data.data?.web) ? data.data.web : Array.isArray(data.data) ? data.data : [];
    const results = raw.slice(0, 6).map((item: any) => ({
      title: String(item.title || "نتيجة خارجية").slice(0, 160),
      url: String(item.url || ""),
      description: String(item.description || item.snippet || "").slice(0, 280),
    })).filter((item: any) => /^https?:\/\//.test(item.url));
    return res.status(200).json({ source: "firecrawl", results });
  } catch (error) {
    console.error("search_error", error);
    return res.status(502).json({ error: "حدث خطأ أثناء جلب النتائج" });
  }
}
