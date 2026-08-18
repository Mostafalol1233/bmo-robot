import { z } from "zod";
import { applySecurityHeaders, fetchWithTimeout, isRateLimited, jsonError } from "./_shared";

const requestSchema = z.object({
  message: z.string().trim().min(1).max(500),
  game: z.string().trim().max(80).optional(),
  score: z.number().int().min(0).max(99999).optional(),
  history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(700) })).max(8).optional(),
});

const fallbackReplies = [
  "رائع. أحب أن نحول كل تحدٍّ صغير إلى مغامرة ذكية وواضحة.",
  "دوائري تعمل بكفاءة. جرّب اختياراً جديداً، فقد تكون الإجابة مخبأة في التفاصيل.",
  "هذا سؤال ممتاز. لنحافظ على الهدوء، نراقب الإشارات، ثم نختار الخطوة التالية.",
];

function cleanReply(value: string) {
  return value.replace(/[<>]/g, "").trim().slice(0, 700);
}

export default async function handler(req: any, res: any) {
  applySecurityHeaders(res);
  if (req.method !== "POST") return jsonError(res, 405, "الطريقة غير مسموحة");
  if (isRateLimited(req, "chat", 20)) return jsonError(res, 429, "تم تجاوز حد الطلبات مؤقتاً. حاول بعد قليل.");

  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return jsonError(res, 400, "الرسالة غير صالحة");

  const { message, game, score, history = [] } = parsed.data;
  const apiKey = process.env.OPENAI_API_KEY;
  const apiBase = process.env.OPENAI_API_BASE || "https://api.openai.com/v1";

  try {
    if (apiKey) {
      const response = await fetchWithTimeout(`${apiBase.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: process.env.BMO_CHAT_MODEL || "gpt-4o-mini",
          temperature: 0.75,
          max_tokens: 180,
          messages: [
            { role: "system", content: "أنت BMO، رفيق مغامرات عربي هادئ ومرح دون مبالغة. أجب بالعربية في جملتين أو ثلاث، اربط إجابتك بسياق اللعبة إن وجد، ولا تدّعي أنك شخصية رسمية من عمل محمي." },
            ...history.slice(-6),
            { role: "user", content: `اللعبة الحالية: ${game || "الردهة"}. النقاط: ${score || 0}. رسالة اللاعب: ${message}` },
          ],
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const reply = cleanReply(data.choices?.[0]?.message?.content || "");
        if (reply) return res.status(200).json({ reply, source: "model" });
      }
    }

    const context = game ? ` في لعبة ${game}` : "";
    const reply = `${fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)]}${context}.`;
    return res.status(200).json({ reply, source: "fallback" });
  } catch (error) {
    console.error("chat_error", error);
    return res.status(200).json({ reply: "حدث ارتباك بسيط في دوائري، لكنني ما زلت معك. جرّب إرسال الرسالة مرة أخرى.", source: "fallback" });
  }
}
