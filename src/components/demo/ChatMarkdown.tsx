"use client";

import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Variant = "assistant" | "user";

function buildComponents(variant: Variant): Components {
  const isUser = variant === "user";

  const linkClass = isUser
    ? "underline underline-offset-2 hover:opacity-90"
    : "font-medium text-[var(--color-accent)] underline underline-offset-2 hover:opacity-80";

  const codeClass = isUser
    ? "rounded bg-white/20 px-1 py-0.5 font-mono text-[0.9em]"
    : "rounded bg-stone-200/80 px-1 py-0.5 font-mono text-[0.9em] text-stone-900";

  return {
    p: ({ children }) => (
      <p className="mb-2 last:mb-0 [&:not(:first-child)]:mt-2">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    ul: ({ children }) => (
      <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {children}
      </a>
    ),
    code: ({ className, children }) => {
      const isBlock = className?.includes("language-");
      if (isBlock) {
        return (
          <code className="block overflow-x-auto whitespace-pre font-mono text-[0.85em]">
            {children}
          </code>
        );
      }
      return <code className={codeClass}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre
        className={cn(
          "mb-2 overflow-x-auto rounded-lg p-3 text-[0.85em] last:mb-0",
          isUser ? "bg-white/15" : "border border-stone-200 bg-stone-100",
        )}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={cn(
          "mb-2 border-l-2 pl-3 italic last:mb-0",
          isUser ? "border-white/50" : "border-stone-300 text-stone-600",
        )}
      >
        {children}
      </blockquote>
    ),
    h1: ({ children }) => (
      <h3 className="mb-2 mt-3 text-base font-semibold first:mt-0">{children}</h3>
    ),
    h2: ({ children }) => (
      <h3 className="mb-2 mt-3 text-base font-semibold first:mt-0">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="mb-1 mt-2 text-sm font-semibold first:mt-0">{children}</h4>
    ),
    hr: () => (
      <hr
        className={cn(
          "my-3 border-0 border-t",
          isUser ? "border-white/30" : "border-stone-200",
        )}
      />
    ),
    table: ({ children }) => (
      <div className="mb-2 overflow-x-auto last:mb-0">
        <table className="w-full border-collapse text-left text-[0.9em]">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th
        className={cn(
          "border px-2 py-1 font-semibold",
          isUser ? "border-white/30" : "border-stone-200 bg-stone-100",
        )}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        className={cn(
          "border px-2 py-1",
          isUser ? "border-white/30" : "border-stone-200",
        )}
      >
        {children}
      </td>
    ),
  };
}

const componentsCache = {
  assistant: buildComponents("assistant"),
  user: buildComponents("user"),
};

export function ChatMarkdown({
  content,
  variant,
}: {
  content: string;
  variant: Variant;
}) {
  if (!content) return null;

  return (
    <div className="chat-markdown break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={componentsCache[variant]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
