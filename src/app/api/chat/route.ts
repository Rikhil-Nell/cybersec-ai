import OpenAI from "openai";
import type { EasyInputMessage } from "openai/resources/responses/responses";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const maxDuration = 30;

const DEFAULT_MODEL = "gpt-4o-mini";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

function chatModel(): string {
  return process.env.OPENAI_CHAT_MODEL?.trim() || DEFAULT_MODEL;
}

function webSearchEnabled(): boolean {
  const raw = process.env.OPENAI_CHAT_ENABLE_WEB_SEARCH?.trim().toLowerCase();
  if (raw === "false" || raw === "0" || raw === "no") return false;
  return true;
}

function toResponsesInput(messages: ChatMessage[]): EasyInputMessage[] {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role,
      content: m.content,
    }));
}

function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: Request) {
  const rate = checkRateLimit("chat", clientIp(req));
  if (!rate.ok) {
    return new Response(
      JSON.stringify({
        error: `Chat rate limit reached (${rate.limit} per ${Math.round(rate.windowMs / 60_000)} min). Try again in ${rate.retryAfterSec} seconds.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rate.retryAfterSec),
        },
      },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "OPENAI_API_KEY is not configured. Add it in Vercel environment variables.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages array required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const input = toResponsesInput(messages);
  if (input.length === 0) {
    return new Response(
      JSON.stringify({ error: "At least one user or assistant message required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = chatModel();
  const tools = webSearchEnabled()
    ? [{ type: "web_search_preview" as const }]
    : undefined;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(sse(event, data)));
      };

      try {
        const openaiStream = await client.responses.create({
          model,
          instructions: CHAT_SYSTEM_PROMPT,
          input,
          stream: true,
          temperature: 0.4,
          max_output_tokens: 800,
          tools,
          tool_choice: tools ? "auto" : undefined,
        });

        for await (const event of openaiStream) {
          switch (event.type) {
            case "response.output_text.delta":
              if (event.delta) {
                send("delta", { text: event.delta });
              }
              break;
            case "response.web_search_call.searching":
              send("status", { phase: "searching" });
              break;
            case "response.web_search_call.in_progress":
              send("status", { phase: "searching" });
              break;
            case "response.failed":
              send("error", {
                message:
                  event.response?.error?.message ?? "Model response failed",
              });
              break;
            case "error":
              send("error", {
                message: event.message ?? "Stream error",
              });
              break;
          }
        }

        send("done", {});
      } catch (err) {
        const message =
          err instanceof OpenAI.APIError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Chat request failed";
        send("error", { message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
