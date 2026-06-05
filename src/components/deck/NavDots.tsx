"use client";

import { slides } from "@/content/slides";
import { cn } from "@/lib/utils";

interface NavDotsProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export function NavDots({ activeIndex, onNavigate }: NavDotsProps) {
  return (
    <nav
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      aria-label="Slide navigation"
    >
      {slides.map((slide, i) => (
        <button
          key={slide.id}
          type="button"
          onClick={() => onNavigate(i)}
          className={cn(
            "h-2.5 w-2.5 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
            i === activeIndex
              ? "scale-125 border-[var(--color-accent)] bg-[var(--color-accent)]"
              : "border-stone-300 bg-stone-200 hover:bg-stone-400",
          )}
          aria-label={`Go to slide ${i + 1}: ${slide.title}`}
          aria-current={i === activeIndex ? "true" : undefined}
        />
      ))}
    </nav>
  );
}
