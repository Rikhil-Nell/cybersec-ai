"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuditResult, Finding } from "deanonymizer/types";
import { ExternalLink } from "lucide-react";

function riskMeterFill(risk: AuditResult["overallRisk"]): number {
  return { low: 3, medium: 6, high: 10 }[risk];
}

function RiskMeter({ risk }: { risk: AuditResult["overallRisk"] }) {
  const filled = riskMeterFill(risk);
  const colors = {
    low: "bg-emerald-600",
    medium: "bg-amber-500",
    high: "bg-red-600",
  };
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-sm ${i < filled ? colors[risk] : "bg-stone-200"}`}
          />
        ))}
      </div>
      <span className="text-sm font-bold uppercase tracking-wide text-stone-700">
        {risk} exposure
      </span>
    </div>
  );
}

function FindingCard({ finding, index }: { finding: Finding; index: number }) {
  return (
    <Card className="text-left">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={finding.confidence}>{finding.confidence}</Badge>
          <span className="text-xs text-[var(--color-muted)]">#{index + 1}</span>
          <span className="text-xs font-medium text-[var(--color-accent)]">
            {finding.category.replace(/_/g, " ")}
          </span>
        </div>
        <CardTitle className="text-lg">{finding.claim}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-stone-600">
        <p>
          <span className="font-semibold text-stone-800">Why: </span>
          {finding.rationale}
        </p>
        {(finding.evidence ?? []).map((e, i) => (
          <blockquote
            key={i}
            className="border-l-2 border-[var(--color-accent)] pl-3 italic text-stone-500"
          >
            &ldquo;{e.quote}&rdquo;
            {e.permalink && (
              <footer className="mt-1 text-xs not-italic">
                <a
                  href={e.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                >
                  Source <ExternalLink className="h-3 w-3" />
                </a>
              </footer>
            )}
          </blockquote>
        ))}
        <p>
          <span className="font-semibold text-emerald-800">Fix: </span>
          {finding.remediation}
        </p>
      </CardContent>
    </Card>
  );
}

interface ExposureReportProps {
  result: AuditResult;
}

export function ExposureReport({ result }: ExposureReportProps) {
  const counts = { high: 0, medium: 0, low: 0 };
  for (const f of result.findings) counts[f.confidence] += 1;

  const sorted = [...result.findings].sort(
    (a, b) =>
      ({ high: 0, medium: 1, low: 2 })[a.confidence] -
      ({ high: 0, medium: 1, low: 2 })[b.confidence],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <p className="font-display text-lg text-stone-800">
          Exposure report — u/{result.username}
        </p>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          {result.platforms.join(" + ")} · {result.itemCount} public items
          analyzed
        </p>
        <div className="mt-4">
          <RiskMeter risk={result.overallRisk} />
        </div>
        <p className="mt-2 text-xs text-stone-500">
          {counts.high} high · {counts.medium} medium · {counts.low} low
          findings
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {result.summary}
        </p>
        {result.identity?.exactUser && (
          <div className="mt-4 rounded-lg bg-stone-50 px-4 py-3 text-sm">
            <p className="font-semibold text-stone-800">
              Linked identity: {result.identity.exactUser}
            </p>
            <p className="mt-1 text-stone-600">{result.identity.rationale}</p>
            {(result.identity.publicProofUrls ?? []).length > 0 && (
              <ul className="mt-2 space-y-1">
                {result.identity.publicProofUrls.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--color-accent)] hover:underline"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          No strong identifying signals in the analyzed window.
        </p>
      ) : (
        <div className="grid gap-3">
          {sorted.map((f, i) => (
            <FindingCard key={`${f.category}-${i}`} finding={f} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
