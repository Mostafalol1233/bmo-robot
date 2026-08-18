import { z } from "zod";

const requestSchema = z.object({
  playerId: z.string().trim().min(3).max(120),
  gameId: z.enum(["adventure", "cipher", "reflex"]),
  score: z.number().int().min(0).max(99999),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "الطريقة غير مسموحة" });
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "بيانات التقدم غير صالحة" });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(200).json({ saved: false, reason: "local" });

  try {
    const response = await fetch(`${url}/rest/v1/game_scores`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ player_id: parsed.data.playerId, game_id: parsed.data.gameId, score: parsed.data.score, metadata: parsed.data.metadata || {} }),
    });
    if (!response.ok) return res.status(502).json({ error: "تعذر حفظ النتيجة" });
    return res.status(200).json({ saved: true });
  } catch (error) {
    console.error("progress_error", error);
    return res.status(502).json({ error: "تعذر حفظ النتيجة" });
  }
}
