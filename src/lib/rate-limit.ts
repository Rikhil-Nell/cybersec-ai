/**
 * In-process sliding-window rate limiter.
 *
 * Configure via env (see .env.example). Works per serverless instance —
 * for strict global limits across Vercel regions, use Vercel Firewall (Pro+)
 * or Upstash Redis / Vercel KV.
 */

export type RateLimitBucket = "chat" | "audit";

const stores = new Map<RateLimitBucket, Map<string, number[]>>();

function envInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function config(bucket: RateLimitBucket): { windowMs: number; max: number } {
  if (bucket === "chat") {
    return {
      windowMs: envInt("RATE_LIMIT_CHAT_WINDOW_MS", 60 * 60 * 1000),
      max: envInt("RATE_LIMIT_CHAT_MAX", 30),
    };
  }
  return {
    windowMs: envInt("RATE_LIMIT_AUDIT_WINDOW_MS", 60 * 60 * 1000),
    max: envInt("RATE_LIMIT_AUDIT_MAX", 3),
  };
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function checkRateLimit(
  bucket: RateLimitBucket,
  key: string,
): { ok: boolean; retryAfterSec?: number; limit: number; windowMs: number } {
  const { windowMs, max } = config(bucket);
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!stores.has(bucket)) stores.set(bucket, new Map());
  const hits = stores.get(bucket)!;

  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= max) {
    const oldest = timestamps[0]!;
    return {
      ok: false,
      retryAfterSec: Math.ceil((oldest + windowMs - now) / 1000),
      limit: max,
      windowMs,
    };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { ok: true, limit: max, windowMs };
}

/** Human-readable limit summary for docs / health checks */
export function rateLimitSummary(): Record<
  RateLimitBucket,
  { max: number; windowMinutes: number }
> {
  const chat = config("chat");
  const audit = config("audit");
  return {
    chat: {
      max: chat.max,
      windowMinutes: Math.round(chat.windowMs / 60_000),
    },
    audit: {
      max: audit.max,
      windowMinutes: Math.round(audit.windowMs / 60_000),
    },
  };
}
