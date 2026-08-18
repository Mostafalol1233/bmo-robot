type ResponseLike = { setHeader?: (name: string, value: string) => void };

type RateEntry = { count: number; resetAt: number };
const buckets = new Map<string, RateEntry>();

export function applySecurityHeaders(res: ResponseLike) {
  res.setHeader?.("Content-Type", "application/json; charset=utf-8");
  res.setHeader?.("Cache-Control", "no-store");
  res.setHeader?.("X-Content-Type-Options", "nosniff");
  res.setHeader?.("X-Frame-Options", "DENY");
  res.setHeader?.("Referrer-Policy", "same-origin");
  res.setHeader?.("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
}

export function requestKey(req: any, route: string) {
  const forwarded = String(req.headers?.["x-forwarded-for"] || "").split(",")[0].trim();
  return `${route}:${forwarded || req.socket?.remoteAddress || "unknown"}`;
}

export function isRateLimited(req: any, route: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const key = requestKey(req, route);
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > limit;
}

export function jsonError(res: any, status: number, error: string) {
  return res.status(status).json({ error });
}

export async function fetchWithTimeout(input: string, init: RequestInit = {}, timeoutMs = 12_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}
