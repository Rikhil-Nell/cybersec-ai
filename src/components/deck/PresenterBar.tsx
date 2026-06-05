"use client";

import { ExportDownloadButton } from "@/components/deck/ExportDownloadButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";

interface PresenterBarProps {
  current: number;
  total: number;
  presenterMode: boolean;
  onTogglePresenter: () => void;
  onExitPresenter: () => void;
}

export function PresenterBar({
  current,
  total,
  presenterMode,
  onTogglePresenter,
  onExitPresenter,
}: PresenterBarProps) {
  const bar = (
    <header
      className={cn(
        "flex items-center justify-between gap-4 border-b border-[var(--color-border)] bg-white px-4 py-2.5",
        presenterMode ? "deck-presenter-chrome" : "sticky top-0 z-50",
      )}
    >
      <div className="flex items-center gap-3">
        {!presenterMode && (
          <Link
            href="/"
            className="text-sm font-semibold text-stone-800 hover:text-[var(--color-accent)]"
          >
            Cybersec AI
          </Link>
        )}
        <span className="text-sm font-medium text-stone-600">
          {current} / {total}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {!presenterMode && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/demo">Open demo</Link>
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={presenterMode ? onExitPresenter : onTogglePresenter}
          aria-pressed={presenterMode}
        >
          {presenterMode ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
          {presenterMode ? "Exit fullscreen" : "Present (F)"}
        </Button>
        <ExportDownloadButton format="pdf" variant="secondary" size="sm" />
        <ExportDownloadButton format="pptx" variant="default" size="sm" />
      </div>
    </header>
  );

  if (presenterMode) {
    return <div className="deck-chrome-trigger">{bar}</div>;
  }

  return bar;
}
