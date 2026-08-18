import { z } from "zod";
import { applySecurityHeaders, fetchWithTimeout, isRateLimited, jsonError } from "./_shared";

const requestSchema = z.object({ query: z.string().trim().min(2).max(120) });

const fallbackResults = [
  { title: "Virtual BMO — لعبة متصفح مستقلة", url: "https://gumpyfunction.itch.io/virtual-bmo", description: "تجربة مستقلة مستوحاة من جهاز BMO، وتُفتح في نافذة جديدة." },
  { title: "BMO: Play Along With Me", url: "https://toongo.io/game/adventure-time-bmo-play-along-with-me", description: "صفحة لعبة خارجية مرتبطة بعالم وقت المغامرة." },
];

function isSafeUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export default async function handler(req: any, res: any) {
  applySecurityHeaders(res);
  if (req.method !== "POST") return jsonError(res, 405, "الطريقة غير مسموحة");
  if (isRateLimited(req, "search", 12)) return jsonError(res, 429, "تم تجاوز حد البحث مؤقتاً. حاول بعد قليل.");

  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return jsonError(res, 400, "عبارة البحث غير صالحة");

  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) return res.status(200).json({ source: "demo", results: fallbackResults });

  try {
    const response = await fetchWithTimeout("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query: parsed.data.query, limit: 6, sources: [{ type: "web" }] }),
    });
    if (!response.ok) return jsonError(res, 502, "تعذر الوصول إلى البحث الخارجي");
    const data = await response.json();
    const raw = Array.isArray(data.data?.web) ? data.data.web : Array.isArray(data.data) ? data.data : [];
    const results = raw.slice(0, 6).map((item: any) => ({
      title: String(item.title || "نتيجة خارجية").replace(/[<>]/g, "").slice(0, 160),
      url: String(item.url || ""),
      description: String(item.description || item.snippet || "").replace(/[<>]/g, "").slice(0, 280),
    })).filter((item: any) => isSafeUrl(item.url));
    return res.status(200).json({ source: "firecrawl", results });
  } catch (error) {
    console.error("search_error", error);
    return jsonError(res, 502, "حدث خطأ أثناء جلب النتائج");
  }
}
