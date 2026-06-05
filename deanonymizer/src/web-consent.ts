/**
 * Web/API consent gate — throws instead of process.exit so HTTP handlers
 * can return proper status codes.
 */

export class ConsentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConsentError";
  }
}

export function assertWebConsent(opts: {
  consent: boolean;
  redditUsername?: string;
  hnUsername?: string;
}): void {
  if (!opts.consent) {
    throw new ConsentError(
      "Authorization required. Confirm you own this account or are explicitly authorized to audit it.",
    );
  }

  const target = opts.redditUsername
    ? `reddit:${opts.redditUsername}`
    : opts.hnUsername
      ? `hn:${opts.hnUsername}`
      : null;

  if (!target) {
    throw new ConsentError("Provide a Reddit or Hacker News username.");
  }
}
