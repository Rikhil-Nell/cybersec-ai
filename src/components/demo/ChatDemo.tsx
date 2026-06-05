"use client";

import { ChatMarkdown } from "@/components/demo/ChatMarkdown";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, SendHorizontal, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";

const SUGGESTED_PROMPTS = [
  "Is it safe to paste a citizen's Aadhaar number into ChatGPT?",
  "Someone sent me a video of the Finance Minister asking me to invest — is this real?",
  "What happened with the CBSE exam portal security issues in 2026?",
  "How can someone deanonymize me from my Reddit comments?",
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function parseSseChunk(
  buffer: string,
  onEvent: (event: string, data: string) => void,
): string {
  const parts = buffer.split("\n\n");
  const remainder = parts.pop() ?? "";

  for (const part of parts) {
    if (!part.trim()) continue;
    let event = "message";
    let data = "";
    for (const line of part.split("\n")) {
      if (line.startsWith("event: ")) event = line.slice(7);
      else if (line.startsWith("data: ")) data = line.slice(6);
    }
    if (data) onEvent(event, data);
  }

  return remainder;
}

export function ChatDemo({ embedded = false }: { embedded?: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const streamChat = useCallback(
    async (nextMessages: ChatMessage[]) => {
      setIsLoading(true);
      setError(null);
      setStatus(null);

      const assistantId = crypto.randomUUID();
      setMessages([...nextMessages, { id: assistantId, role: "assistant", content: "" }]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(
            (errBody as { error?: string }).error ??
              `Request failed (${res.status})`,
          );
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          buffer = parseSseChunk(buffer, (event, dataStr) => {
            const data = JSON.parse(dataStr) as Record<string, unknown>;

            if (event === "delta" && typeof data.text === "string") {
              setStatus(null);
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + data.text }
                    : m,
                ),
              );
            } else if (event === "status" && data.phase === "searching") {
              setStatus("Searching the web for current information…");
            } else if (event === "error") {
              throw new Error(
                typeof data.message === "string"
                  ? data.message
                  : "Stream error",
              );
            }
          });
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
        setMessages((prev) =>
          prev.filter((m) => m.id !== assistantId || m.content.length > 0),
        );
      } finally {
        setIsLoading(false);
        setStatus(null);
      }
    },
    [],
  );

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setInput("");
      void streamChat(nextMessages);
    },
    [isLoading, messages, streamChat],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const onSuggest = (text: string) => {
    sendMessage(text);
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        embedded ? "w-full" : "mx-auto min-h-screen max-w-3xl px-4 pb-8 pt-24",
      )}
    >
      <div className="mb-6">
        {!embedded && (
          <Link
            href="/deck"
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            ← Back to presentation
          </Link>
        )}
        <h1
          className={cn(
            "font-display text-3xl text-stone-900",
            !embedded && "mt-4",
          )}
        >
          Cybersecurity Assistant
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          The helpful side of AI — guarded answers for government workers. Switch
          to <strong>Exposure audit</strong> tab to see the threat demo.
        </p>
      </div>

      <Alert variant="warning" className="mb-6 flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm">
          <strong>Workshop only.</strong> Do not paste real government data,
          citizen PII, or confidential documents.
        </p>
      </Alert>

      {messages.length === 0 && (
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold text-stone-700">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onSuggest(prompt)}
                disabled={isLoading}
                className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-left text-sm text-stone-700 transition-colors hover:border-[var(--color-accent)] hover:bg-[#fdf6f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 space-y-4 rounded-xl border border-[var(--color-border)] bg-white p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed",
              m.role === "user"
                ? "ml-auto bg-[var(--color-accent)] text-white"
                : "bg-[#f3efe8] text-stone-800",
            )}
          >
            {m.role === "assistant" ? (
              <ChatMarkdown content={m.content} variant="assistant" />
            ) : (
              <ChatMarkdown content={m.content} variant="user" />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            {status ?? "Thinking…"}
          </div>
        )}
        {error && <Alert variant="destructive">{error}</Alert>}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about AI safety, scams, exam leaks, or deanonymization…"
          rows={2}
          className="min-h-[52px] resize-none"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
