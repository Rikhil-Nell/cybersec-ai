import { runAudit, type AnalyzeProgress } from "deanonymizer/run-audit";
import { ConsentError } from "deanonymizer/web-consent";
import { resolveAuditLlm } from "@/lib/audit/resolve-llm";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const maxDuration = 300;
export const runtime = "nodejs";

interface AuditRequestBody {
  redditUsername?: string;
  hnUsername?: string;
  consent?: boolean;
  stream?: boolean;
}

export async function POST(req: Request) {
  let body: AuditRequestBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const reddit = body.redditUsername?.trim().replace(/^u\//i, "");
  const hn = body.hnUsername?.trim();

  if (!reddit && !hn) {
    return Response.json(
      { error: "Provide redditUsername or hnUsername" },
      { status: 400 },
    );
  }

  const rate = checkRateLimit("audit", clientIp(req));
  if (!rate.ok) {
    return Response.json(
      {
        error: `Audit rate limit reached (${rate.limit} per ${Math.round(rate.windowMs / 60_000)} min). Try again in ${rate.retryAfterSec} seconds.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  try {
    const llm = resolveAuditLlm();

    if (body.stream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const send = (event: string, data: unknown) => {
            controller.enqueue(
              encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
            );
          };

          try {
            const result = await runAudit({
              redditUsername: reddit,
              hnUsername: hn,
              consent: body.consent === true,
              maxItems: 80,
              maxChars: 48_000,
              chunkConcurrency: 2,
              llm,
              onProgress: (p: AnalyzeProgress) => send("progress", p),
            });
            send("result", result);
          } catch (err) {
            const message =
              err instanceof ConsentError
                ? err.message
                : err instanceof Error
                  ? err.message
                  : "Audit failed";
            send("error", { message });
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const result = await runAudit({
      redditUsername: reddit,
      hnUsername: hn,
      consent: body.consent === true,
      maxItems: 80,
      maxChars: 48_000,
      chunkConcurrency: 2,
      llm,
    });

    return Response.json(result);
  } catch (err) {
    if (err instanceof ConsentError) {
      return Response.json({ error: err.message }, { status: 403 });
    }
    const message =
      err instanceof Error ? err.message : "Exposure audit failed";
    const status = message.includes("No LLM configured") ? 503 : 500;
    return Response.json({ error: message }, { status });
  }
}
