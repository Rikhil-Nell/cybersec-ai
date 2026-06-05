import { analyze, type AnalyzeProgress } from "./analyze.js";
import {
  createLLMClient,
  type LLMOverrides,
} from "./llm/index.js";

export type { LLMOverrides };
import { fetchHN } from "./sources/hn.js";
import { fetchReddit } from "./sources/reddit.js";
import type { AuditResult, Profile } from "./types.js";
import { assertWebConsent } from "./web-consent.js";

export type { AnalyzeProgress, AuditResult };

export interface RunAuditOptions {
  redditUsername?: string;
  hnUsername?: string;
  /** User confirmed they own or are authorized to audit this account */
  consent: boolean;
  maxItems?: number;
  maxChars?: number;
  chunkConcurrency?: number;
  llm?: LLMOverrides;
  onProgress?: (progress: AnalyzeProgress) => void;
}

/**
 * Programmatic audit entry for servers (Next.js API routes, etc.).
 * Mirrors the CLI pipeline without TTY consent or process.exit.
 */
export async function runAudit(opts: RunAuditOptions): Promise<AuditResult> {
  const reddit = opts.redditUsername?.trim().replace(/^u\//i, "");
  const hn = opts.hnUsername?.trim();

  assertWebConsent({
    consent: opts.consent,
    redditUsername: reddit,
    hnUsername: hn,
  });

  const llm = createLLMClient(opts.llm ?? {});

  const profiles: Profile[] = [];
  const maxItems = opts.maxItems ?? 120;

  if (reddit) {
    opts.onProgress?.({
      phase: "preparing",
      percent: 5,
      message: `Fetching Reddit history for u/${reddit}…`,
    });
    const profile = await fetchReddit(reddit, maxItems);
    if (profile.items.length) profiles.push(profile);
  }

  if (hn) {
    opts.onProgress?.({
      phase: "preparing",
      percent: 10,
      message: `Fetching HN history for ${hn}…`,
    });
    const profile = await fetchHN(hn, maxItems);
    if (profile.items.length) profiles.push(profile);
  }

  if (!profiles.length) {
    throw new Error(
      "No public posts or comments found for that username. Check spelling or try a more active account.",
    );
  }

  return analyze(profiles, {
    llm,
    maxChars: opts.maxChars ?? 80_000,
    chunkConcurrency: opts.chunkConcurrency ?? 2,
    onProgress: opts.onProgress,
  });
}
