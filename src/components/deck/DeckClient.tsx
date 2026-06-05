"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/content/slides";
import { cn } from "@/lib/utils";
import { NavDots } from "./NavDots";
import { PresenterBar } from "./PresenterBar";
import { SlideRenderer } from "./SlideRenderer";

export function DeckClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const navigateTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, index));
      setActiveIndex(clamped);
      if (!presenterMode) {
        sectionRefs.current[clamped]?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [presenterMode],
  );

  const enterPresenter = useCallback(async () => {
    setPresenterMode(true);
    try {
      if (deckRef.current && !document.fullscreenElement) {
        await deckRef.current.requestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked; slide mode still works
    }
  }, []);

  const exitPresenter = useCallback(async () => {
    setPresenterMode(false);
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    sectionRefs.current[activeIndex]?.scrollIntoView({ behavior: "instant" });
  }, [activeIndex]);

  const togglePresenter = useCallback(() => {
    if (presenterMode) exitPresenter();
    else enterPresenter();
  }, [presenterMode, enterPresenter, exitPresenter]);

  useEffect(() => {
    if (!presenterMode) {
      document.documentElement.classList.add("deck-scroll");
      return () => document.documentElement.classList.remove("deck-scroll");
    }
    document.documentElement.classList.remove("deck-scroll");
  }, [presenterMode]);

  useEffect(() => {
    if (presenterMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(
              entry.target as HTMLElement,
            );
            if (idx >= 0) setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.55 },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [presenterMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          togglePresenter();
        }
      }
      if (e.key === "Escape" && presenterMode) {
        exitPresenter();
      }
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        navigateTo(activeIndex + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        navigateTo(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, navigateTo, presenterMode, togglePresenter, exitPresenter]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && presenterMode) {
        setPresenterMode(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [presenterMode]);

  return (
    <div
      ref={deckRef}
      className={cn(
        "deck-root min-h-screen",
        presenterMode && "deck-presenter",
      )}
    >
      <PresenterBar
        current={activeIndex + 1}
        total={slides.length}
        presenterMode={presenterMode}
        onTogglePresenter={togglePresenter}
        onExitPresenter={exitPresenter}
      />

      {!presenterMode && (
        <NavDots activeIndex={activeIndex} onNavigate={navigateTo} />
      )}

      <main className={presenterMode ? "deck-presenter-stage" : "deck-scroll-main"}>
        {presenterMode ? (
          <section
            className="deck-presenter-slide"
            aria-label={slides[activeIndex].title}
          >
            <SlideRenderer slide={slides[activeIndex]} presenterMode />
          </section>
        ) : (
          slides.map((slide, i) => (
            <section
              key={slide.id}
              id={slide.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="deck-section"
              aria-label={slide.title}
            >
              <div className="deck-slide-inner">
                <SlideRenderer slide={slide} />
              </div>
            </section>
          ))
        )}
      </main>

      {presenterMode && (
        <footer className="deck-presenter-footer">
          <span>
            {activeIndex + 1} / {slides.length}
          </span>
          <span className="hidden sm:inline">
            {slides[activeIndex].title}
          </span>
          <span className="text-stone-500">Hover top for controls · Esc to exit</span>
        </footer>
      )}
    </div>
  );
}
