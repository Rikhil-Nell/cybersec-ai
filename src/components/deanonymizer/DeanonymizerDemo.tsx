"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExposureReport } from "@/components/deanonymizer/ExposureReport";
import type { AuditResult } from "deanonymizer/types";
import {
  AlertTriangle,
  Loader2,
  Search,
  ShieldAlert,
  UserSearch,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface ProgressState {
  phase: string;
  percent: number;
  message: string;
  currentChunk?: number;
  totalChunks?: number;
}

export function DeanonymizerDemo() {
  const [redditUsername, setRedditUsername] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const runAudit = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setProgress({ phase: "starting", percent: 0, message: "Starting audit…" });

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          redditUsername: redditUsername.trim(),
          consent,
          stream: true,
        }),
        signal: ac.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const lines = part.split("\n");
          let event = "message";
          let data = "";
          for (const line of lines) {
            if (line.startsWith("event: ")) event = line.slice(7);
            if (line.startsWith("data: ")) data = line.slice(6);
          }
          if (!data) continue;
          const parsed = JSON.parse(data);
          if (event === "progress") setProgress(parsed);
          if (event === "result") setResult(parsed);
          if (event === "error") throw new Error(parsed.message);
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Audit failed");
    } finally {
      setLoading(false);
      setProgress(null);
    }
  }, [redditUsername, consent]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <UserSearch className="h-6 w-6 text-[var(--color-accent)]" />
          <h2 className="font-display text-2xl text-stone-900">
            deanonymizer — live exposure audit
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
          This is the <strong>dark side of AI</strong> in the workshop: we fetch
          your public Reddit comments, then an LLM fuses small clues — location,
          employer, schedule, writing style — into an identity profile. Same
          technique attackers use. Run only on accounts you own.
        </p>
      </div>

      <Alert variant="warning" className="flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="text-sm">
          <p className="font-semibold">Authorization required</p>
          <p className="mt-1">
            Workshop demo only. 3 audits per hour. Fetches public Reddit history
            via Arctic Shift — no Reddit password needed. Uses OpenAI or
            Anthropic (whichever API key is configured).
          </p>
        </div>
      </Alert>

      <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <label className="block text-sm font-semibold text-stone-800">
          Reddit username
        </label>
        <div className="mt-2 flex gap-2">
          <span className="flex items-center rounded-l-lg border border-r-0 border-stone-200 bg-stone-50 px-3 text-sm text-stone-500">
            u/
          </span>
          <input
            type="text"
            value={redditUsername}
            onChange={(e) => setRedditUsername(e.target.value)}
            placeholder="your_public_username"
            className="flex-1 rounded-r-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            disabled={loading}
          />
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-stone-300"
            disabled={loading}
          />
          <span className="text-stone-700">
            I confirm this is <strong>my account</strong> or I am explicitly
            authorized to audit it. I understand this analyzes public posts only
            and is for defensive privacy education.
          </span>
        </label>

        <Button
          className="mt-4"
          onClick={runAudit}
          disabled={loading || !redditUsername.trim() || !consent}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Run exposure audit
        </Button>
      </div>

      {progress && loading && (
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-stone-700">{progress.message}</span>
            <span className="text-stone-500">{progress.percent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          {progress.currentChunk && progress.totalChunks && (
            <p className="mt-1 text-xs text-stone-500">
              Chunk {progress.currentChunk} / {progress.totalChunks}
            </p>
          )}
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="flex gap-2">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </Alert>
      )}

      {result && <ExposureReport result={result} />}

      {!result && !loading && (
        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50/50 px-6 py-8 text-center text-sm text-stone-500">
          <p>
            Try your own Reddit username, or a well-known public account with
            lots of history for the workshop effect.
          </p>
          <p className="mt-2 text-xs">
            Pipeline: Arctic Shift fetch → chunk → LLM inference → exposure
            report with evidence quotes.
          </p>
        </div>
      )}
    </div>
  );
}
