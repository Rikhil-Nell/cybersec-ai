import { type Slide } from "@/content/slides";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SlideVisuals } from "./SlideVisuals";

interface SlideRendererProps {
  slide: Slide;
  presenterMode?: boolean;
}

const regionColors = {
  india: "border-orange-200 bg-orange-50 text-orange-900",
  global: "border-violet-200 bg-violet-50 text-violet-900",
  action: "border-emerald-200 bg-emerald-50 text-emerald-900",
  reassure: "border-sky-200 bg-sky-50 text-sky-900",
};

export function SlideRenderer({ slide, presenterMode }: SlideRendererProps) {
  const isHero = slide.variant === "hero";
  const hasVisual = !!slide.visual;

  return (
    <div className="w-full">
      {/* Region tag */}
      {slide.region && (
        <div className="mb-5">
          <span
            className={cn(
              "inline-block rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider",
              regionColors[slide.region],
            )}
          >
            {slide.region}
          </span>
        </div>
      )}

      {isHero ? (
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:min-h-[26rem]">
          <div className="flex flex-col justify-center text-left">
            {slide.callout && (
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">
                {slide.callout}
              </p>
            )}
            <h1
              className={cn(
                "font-display leading-[1.1] text-stone-900",
                presenterMode ? "text-5xl lg:text-6xl" : "text-4xl md:text-5xl lg:text-6xl",
              )}
            >
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="mt-4 text-lg leading-relaxed text-stone-600 md:text-xl">
                {slide.subtitle}
              </p>
            )}
            {!presenterMode && (
              <p className="mt-6 text-sm text-stone-400">
                <kbd className="rounded border border-stone-300 bg-white px-1.5 py-0.5 font-sans">↓</kbd>{" "}
                <kbd className="rounded border border-stone-300 bg-white px-1.5 py-0.5 font-sans">↑</kbd> navigate ·{" "}
                <kbd className="rounded border border-stone-300 bg-white px-1.5 py-0.5 font-sans">F</kbd> fullscreen
              </p>
            )}
          </div>
          <div className="flex min-h-[22rem]">
            <SlideVisuals slide={slide} />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-8",
            hasVisual
              ? "items-stretch lg:grid-cols-2 lg:min-h-[26rem]"
              : "max-w-3xl",
          )}
        >
          {/* Text column */}
          <div className="flex flex-col justify-center text-left">
            <h2
              className={cn(
                "font-display leading-[1.15] text-stone-900",
                presenterMode ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
              )}
            >
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="mt-3 text-base leading-relaxed text-stone-600 md:text-lg">
                {slide.subtitle}
              </p>
            )}

            {slide.bullets && slide.bullets.length > 0 && (
              <ul className="mt-5 space-y-2.5">
                {slide.bullets.map((bullet, i) => {
                  const isDont = bullet.text.startsWith("DON'T");
                  const isDo = bullet.text.startsWith("DO");
                  return (
                    <li
                      key={i}
                      className={cn(
                        "rounded-xl border px-4 py-3",
                        isDont && "border-red-200 bg-red-50",
                        isDo && "border-emerald-200 bg-emerald-50",
                        !isDo && !isDont && "border-stone-200 bg-white",
                      )}
                    >
                      <p
                        className={cn(
                          "text-sm font-semibold leading-snug md:text-base",
                          isDont && "text-red-900",
                          isDo && "text-emerald-900",
                          !isDo && !isDont && "text-stone-800",
                        )}
                      >
                        {bullet.text}
                      </p>
                      {bullet.detail && (
                        <p className="mt-1 text-sm leading-relaxed text-stone-500">
                          {bullet.detail}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {slide.highlight && (
              <p className="mt-4 rounded-xl border-l-4 border-[var(--color-accent)] bg-white px-4 py-3 text-sm font-medium leading-relaxed text-stone-800 md:text-base">
                {slide.highlight}
              </p>
            )}

            {slide.callout && (
              <p className="mt-3 text-sm font-bold text-[var(--color-accent)]">
                {slide.callout}
              </p>
            )}

            {slide.id === "deanonymizer" && (
              <Link
                href="/demo?tab=audit"
                className="mt-5 inline-flex rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#a84d1f]"
              >
                Run live exposure audit →
              </Link>
            )}
          </div>

          {hasVisual && (
            <div className="flex min-h-[22rem]">
              <SlideVisuals slide={slide} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
