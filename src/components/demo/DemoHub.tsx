"use client";

import { DeanonymizerDemo } from "@/components/deanonymizer/DeanonymizerDemo";
import { ChatDemo } from "@/components/demo/ChatDemo";
import { cn } from "@/lib/utils";
import { Bot, UserSearch } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Tab = "assistant" | "audit";

export function DemoHub() {
  const searchParams = useSearchParams();
  const initial: Tab =
    searchParams.get("tab") === "audit" ? "audit" : "assistant";
  const [tab, setTab] = useState<Tab>(initial);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/deck"
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            ← Back to deck
          </Link>
          <div className="flex rounded-lg border border-stone-200 bg-stone-50 p-1">
            <button
              type="button"
              onClick={() => setTab("assistant")}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                tab === "assistant"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-800",
              )}
            >
              <Bot className="h-4 w-4" />
              Security assistant
            </button>
            <button
              type="button"
              onClick={() => setTab("audit")}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                tab === "audit"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-800",
              )}
            >
              <UserSearch className="h-4 w-4" />
              Exposure audit
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {tab === "assistant" ? <ChatDemo embedded /> : <DeanonymizerDemo />}
      </div>
    </div>
  );
}
