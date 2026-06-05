import { ExportDownloadButton } from "@/components/deck/ExportDownloadButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Presentation } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        Government cybersecurity awareness
      </p>
      <h1 className="font-display mt-4 text-4xl leading-tight text-stone-900 md:text-5xl">
        AI is not just ChatGPT on your phone
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
        India-first presentation on exam leaks, government portal failures, AI
        misuse — then global threats like Claude Mythos. Includes a live
        cybersecurity chatbot demo and one-click PDF/PPTX export.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <Presentation className="mb-2 h-8 w-8 text-[var(--color-accent)]" />
            <CardTitle>Presentation deck</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[var(--color-muted)]">
              20 scrollable slides — NEET, CBSE, deepfakes, Mythos, and
              action checklists. Share the URL instead of screenshots.
            </p>
            <Button asChild className="w-full">
              <Link href="/deck">
                Open deck
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="mb-2 h-8 w-8 text-[var(--color-accent)]" />
            <CardTitle>Live chatbot demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[var(--color-muted)]">
              Two demos: guarded security chatbot + live deanonymizer exposure
              audit on Reddit OSINT.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/demo">
                Open demos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ExportDownloadButton
          format="pdf"
          label="Download PDF"
          variant="secondary"
          size="default"
        />
        <ExportDownloadButton
          format="pptx"
          label="Download PowerPoint"
          variant="default"
          size="default"
        />
      </div>

      <p className="mt-12 text-sm text-[var(--color-muted)]">
        Research documentation in{" "}
        <code className="rounded bg-stone-100 px-1.5 py-0.5">research/</code>{" "}
        folder. Requires{" "}
        <code className="rounded bg-stone-100 px-1.5 py-0.5">
          OPENAI_API_KEY
        </code>{" "}
        on Vercel for live chat.
      </p>
    </div>
  );
}
