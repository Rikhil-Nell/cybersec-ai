export interface LLMOverrides {
  provider?: string;
  baseUrl?: string;
  model?: string;
}

/**
 * Pick deanonymizer LLM provider from env.
 * Prefers OpenAI when OPENAI_API_KEY is set (same key as chatbot demo),
 * otherwise falls back to Anthropic.
 */
export function resolveAuditLlm(): LLMOverrides {
  if (process.env.OPENAI_API_KEY) {
    return {
      provider: "openai",
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    };
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return {
      provider: "anthropic",
      model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5",
    };
  }
  throw new Error(
    "No LLM configured for exposure audit. Set OPENAI_API_KEY or ANTHROPIC_API_KEY.",
  );
}
