import { z } from "zod";
import { applySecurityHeaders, fetchWithTimeout, isRateLimited, jsonError } from "./_shared";

const requestSchema = z.object({
  playerId: z.string().trim().min(3).max(120).regex(/^[a-zA-Z0-9_-]+$/),
  gameId: z.enum(["adventure", "cipher", "reflex"]),
  score: z.number().int().min(0).max(99999),
  metadata: z.record(z.string().max(40), z.unknown()).optional(),
});

export default async function handler(req: any, res: any) {
  applySecurityHeaders(res);
  if (req.method !== "POST") return jsonError(res, 405, "الطريقة غير مسموحة");
  if (isRateLimited(req, "progress", 30)) return jsonError(res, 429, "تم تجاوز حد الحفظ مؤقتاً. حاول بعد قليل.");

  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return jsonError(res, 400, "بيانات التقدم غير صالحة");
  const metadata = parsed.data.metadata || {};
  if (JSON.stringify(metadata).length > 2000) return jsonError(res, 400, "بيانات التقدم كبيرة جداً");

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(200).json({ saved: false, reason: "local" });

  try {
    const response = await fetchWithTimeout(`${url.replace(/\/$/, "")}/rest/v1/game_scores`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ player_id: parsed.data.playerId, game_id: parsed.data.gameId, score: parsed.data.score, metadata }),
    });
    if (!response.ok) return jsonError(res, 502, "تعذر حفظ النتيجة");
    return res.status(200).json({ saved: true });
  } catch (error) {
    console.error("progress_error", error);
    return jsonError(res, 502, "تعذر حفظ النتيجة");
  }
}
