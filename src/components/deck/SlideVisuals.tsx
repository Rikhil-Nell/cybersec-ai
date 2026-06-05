import type { Slide, SlideVisual } from "@/content/slides";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Bot,
  Database,
  FileWarning,
  Globe,
  GraduationCap,
  KeyRound,
  Lock,
  MessageSquareWarning,
  ScanFace,
  ServerCrash,
  Shield,
  Skull,
  Terminal,
  Zap,
} from "lucide-react";

/** Shared panel — flat, no gradients. Light matches bullet cards; dark only for code. */
function Panel({
  children,
  variant = "light",
  className,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "alert";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border",
        variant === "light" && "border-stone-200 bg-white shadow-sm",
        variant === "dark" && "border-stone-700 bg-[var(--color-panel-dark)] text-stone-100",
        variant === "alert" && "border-amber-200 bg-amber-50 text-amber-950",
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatGrid({ stats }: { stats: Slide["stats"] }) {
  if (!stats?.length) return null;
  return (
    <div className="grid flex-1 grid-cols-3 gap-3 p-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-stone-50 px-3 py-5 text-center"
        >
          <p className="font-display text-2xl text-[var(--color-accent)] md:text-3xl">
            {s.value}
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function CodePanel() {
  return (
    <Panel variant="dark">
      <div className="flex items-center gap-2 border-b border-stone-700 px-4 py-2.5 text-xs text-stone-400">
        <Terminal className="h-3.5 w-3.5" />
        cbse-osm-portal.js
      </div>
      <pre className="flex-1 overflow-x-auto p-4 font-mono text-xs leading-relaxed text-emerald-400 md:text-sm">
        {`const CONFIG = {
  masterPassword: "CBSE@2026!",
  skipIpCheck: true,
};`}
      </pre>
      <div className="mx-4 mb-4 flex items-start gap-2 rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-xs text-red-200">
        <KeyRound className="mt-0.5 h-4 w-4 shrink-0" />
        Hardcoded in frontend JS. Found in production.
      </div>
    </Panel>
  );
}

function RippleDiagram() {
  const nodes = [
    { icon: FileWarning, label: "One paste" },
    { icon: ServerCrash, label: "Portal gap" },
    { icon: GraduationCap, label: "Exam leak" },
    { icon: ScanFace, label: "Deepfake" },
  ];
  return (
    <Panel>
      <p className="border-b border-stone-100 px-5 py-3 text-xs font-bold uppercase tracking-widest text-stone-500">
        Ripple chain
      </p>
      <div className="flex flex-1 flex-col justify-center gap-4 p-5">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-stone-50">
              <n.icon className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-stone-800">{n.label}</p>
              {i < nodes.length - 1 && (
                <p className="text-xs text-stone-400">amplifies →</p>
              )}
            </div>
          </div>
        ))}
        <p className="rounded-xl border border-[var(--color-accent)]/30 bg-[#fdf6f0] px-4 py-3 text-sm font-medium text-stone-800">
          AI can script each step. Humans optional.
        </p>
      </div>
    </Panel>
  );
}

function ExamGrid() {
  const items = [
    { name: "NEET", status: "Cancelled '26", urgent: true },
    { name: "UGC-NET", status: "9L+ cancelled", urgent: true },
    { name: "CUET", status: "Wrong papers", urgent: false },
    { name: "SSC CGL", status: "Remote hijack", urgent: true },
    { name: "JEE", status: "500 on result day", urgent: false },
    { name: "Railway", status: "Rs 1.17Cr racket", urgent: true },
  ];
  return (
    <Panel>
      <p className="border-b border-stone-100 px-5 py-3 text-xs font-bold uppercase tracking-widest text-stone-500">
        2024–26 incidents
      </p>
      <div className="grid flex-1 grid-cols-2 gap-3 p-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col justify-center rounded-xl border border-stone-200 bg-stone-50 px-4 py-4"
          >
            <p className="font-bold text-stone-900">{item.name}</p>
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                item.urgent ? "text-red-700" : "text-amber-700",
              )}
            >
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DeepfakePanel() {
  return (
    <Panel variant="alert">
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <ScanFace className="h-16 w-16 text-[var(--color-accent)]" />
        <p className="mt-4 text-lg font-bold">Face + voice = trust</p>
        <p className="mt-2 max-w-xs text-sm text-amber-800/80">
          Cloned ministers. Cloned children. Real UPI losses.
        </p>
        <p className="mt-4 rounded-full border border-amber-300 bg-white px-5 py-1.5 text-sm font-bold text-[var(--color-accent)]">
          Helpline 1930
        </p>
      </div>
    </Panel>
  );
}

function ChatbotStack() {
  const layers = [
    { icon: Shield, label: "Guardrails", sub: "PII block · audit" },
    { icon: Bot, label: "API + LLM", sub: "streamed replies" },
    { icon: MessageSquareWarning, label: "System prompt", sub: "refusals · context" },
  ];
  return (
    <Panel>
      <div className="flex flex-1 flex-col justify-center gap-3 p-5">
        {layers.map((l, i) => (
          <div
            key={l.label}
            className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3"
          >
            <l.icon className="h-6 w-6 text-[var(--color-accent)]" />
            <div className="flex-1">
              <p className="font-semibold text-stone-800">{l.label}</p>
              <p className="text-xs text-stone-500">{l.sub}</p>
            </div>
            <span className="text-xs font-bold text-stone-400">{3 - i}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function HeroCollage() {
  const items = [
    { icon: GraduationCap, label: "Exam leaks" },
    { icon: Database, label: "Open buckets" },
    { icon: Bot, label: "ChatGPT habit" },
    { icon: ScanFace, label: "Deepfakes" },
    { icon: Globe, label: "Global threats" },
    { icon: Shield, label: "What to do" },
  ];
  return (
    <Panel>
      <div className="grid h-full flex-1 grid-cols-2 grid-rows-3 gap-3 p-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-stone-50 p-3"
          >
            <item.icon className="mb-2 h-7 w-7 text-[var(--color-accent)]" />
            <span className="text-center text-xs font-semibold text-stone-700">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function MythosPanel() {
  return (
    <Panel>
      <div className="flex h-full flex-col justify-between p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-700">
            Anthropic · Apr 2026
          </p>
          <p className="mt-3 font-display text-2xl text-stone-900">Claude Mythos</p>
          <p className="mt-2 text-sm text-stone-600">
            Most aligned. Highest risk. Not shipped to public.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { label: "Capability", bars: 8 },
            { label: "Autonomy given", bars: 7 },
            { label: "Your ChatGPT paste", bars: 4 },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 text-xs">
              <span className="w-28 text-stone-500">{row.label}</span>
              <div className="flex flex-1 gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-2 flex-1 rounded-sm",
                      i < row.bars ? "bg-[var(--color-accent)]" : "bg-stone-200",
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function PasteWarning() {
  return (
    <Panel variant="alert">
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="h-14 w-14 text-[var(--color-accent)]" />
        <p className="mt-4 text-xl font-bold">Clipboard ≠ private</p>
        <p className="mt-1 text-sm text-amber-800">FinMin advisory · Jan 2025</p>
        <ul className="mt-5 space-y-1.5 text-left text-sm text-amber-900">
          <li>✗ Aadhaar numbers</li>
          <li>✗ Draft circulars</li>
          <li>✗ Citizen complaints</li>
          <li>✗ File notings with names</li>
        </ul>
      </div>
    </Panel>
  );
}

function PortalBreach() {
  return (
    <Panel variant="dark">
      <div className="flex flex-1 flex-col justify-center p-5">
        <p className="text-xs font-bold uppercase text-stone-400">IDOR in e-Filing</p>
        <div className="mt-4 rounded-lg border border-stone-700 bg-stone-800 p-4 font-mono text-xs">
          <p className="text-stone-500">GET /api/taxpayer?pan=</p>
          <p className="text-red-400">AAAAA0000A → your data</p>
          <p className="text-red-400">BBBBB1111B → someone else&apos;s</p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
          <Database className="h-4 w-4" />
          Same class of bug as CBSE S3 buckets
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-xs text-red-200">
          <Skull className="h-4 w-4" />
          135M users. One missing check.
        </div>
      </div>
    </Panel>
  );
}

function AiTruth() {
  const rows = [
    { icon: Globe, text: "Data leaves India", sub: "US/EU servers" },
    { icon: Zap, text: "Guesses fluently", sub: "even when wrong" },
    { icon: Lock, text: "Owes you nothing", sub: "no duty of care" },
  ];
  return (
    <Panel>
      <div className="flex flex-1 flex-col justify-center gap-4 p-5">
        {rows.map((row) => (
          <div
            key={row.text}
            className="flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-accent)]/20 bg-[#fdf6f0]">
              <row.icon className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="font-semibold text-stone-800">{row.text}</p>
              <p className="text-xs text-stone-500">{row.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function IndiaMap() {
  return (
    <Panel>
      <StatGrid
        stats={[
          { value: "NEET", label: "cancelled '26" },
          { value: "CBSE", label: "S3 buckets" },
          { value: "FinMin", label: "AI advisory" },
        ]}
      />
      <p className="border-t border-stone-100 px-5 py-4 text-sm text-stone-600">
        Your voters&apos; kids sit these exams. Your portals hold their data.
      </p>
    </Panel>
  );
}

function NeetPanel({ year }: { year: "2024" | "2026" }) {
  return (
    <Panel>
      <div className="flex flex-1 flex-col justify-center p-6">
        <p className="font-display text-5xl text-[var(--color-accent)]">NEET</p>
        <p className="mt-1 text-3xl font-bold text-stone-900">{year}</p>
        <ul className="mt-6 space-y-2 text-sm text-stone-600">
          {year === "2024" ? (
            <>
              <li>Hazaribagh Oasis School</li>
              <li>155 direct beneficiaries</li>
              <li>SC: leak undisputed</li>
            </>
          ) : (
            <>
              <li className="font-semibold text-red-700">Full exam cancelled</li>
              <li>First time in history</li>
              <li>Same playbook, worse outcome</li>
            </>
          )}
        </ul>
      </div>
    </Panel>
  );
}

function ChecklistVisual() {
  return (
    <Panel>
      <div className="flex flex-1 flex-col justify-center gap-2 p-5">
        {["Call official numbers", "Ask IT first", "Report same day", "Never paste PII"].map(
          (t, i) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-800"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-white">
                {i + 1}
              </span>
              {t}
            </div>
          ),
        )}
      </div>
    </Panel>
  );
}

function DemoVisual() {
  return (
    <Panel>
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <Bot className="h-14 w-14 text-[var(--color-accent)]" />
        <p className="mt-4 text-lg font-bold text-stone-900">/demo</p>
        <p className="mt-1 text-sm text-stone-500">Assistant + exposure audit</p>
      </div>
    </Panel>
  );
}

function RoadmapVisual() {
  const steps = ["AI policy", "Vendor audit", "MFA everywhere", "Verify before panic"];
  return (
    <Panel>
      <div className="flex flex-1 flex-col justify-center gap-3 p-5">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-white">
              {i + 1}
            </div>
            <p className="text-sm font-medium text-stone-800">{s}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function GlobalSpeed() {
  return (
    <Panel>
      <StatGrid
        stats={[
          { value: "19s", label: "per phish email" },
          { value: "9.3", label: "EchoLeak CVSS" },
          { value: "$3", label: "per CVE bot" },
        ]}
      />
      <p className="border-t border-stone-100 px-5 py-4 text-sm text-stone-600">
        Arrives on your phone before the circular does.
      </p>
    </Panel>
  );
}

function GlobalGrid() {
  return (
    <Panel>
      <div className="grid flex-1 grid-cols-2 gap-3 p-4">
        {["EchoLeak", "Snowflake", "Samsung ban", "Fake leaks"].map((t) => (
          <div
            key={t}
            className="flex items-center justify-center rounded-xl border border-stone-200 bg-stone-50 px-3 py-6 text-center text-sm font-semibold text-stone-800"
          >
            {t}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DeanonymizerVisual() {
  return (
    <Panel>
      <p className="border-b border-stone-100 px-5 py-3 text-xs font-bold uppercase tracking-widest text-stone-500">
        Signal fusion
      </p>
      <div className="flex flex-1 flex-col justify-center gap-3 p-5 text-sm">
        {[
          '"GST camp at collectorate"',
          "+ \"TT Nagar branch\"",
          "+ posting timestamps",
        ].map((line) => (
          <p key={line} className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-stone-700">
            {line}
          </p>
        ))}
        <p className="mt-2 font-bold text-[var(--color-accent)]">
          = your department, your city
        </p>
      </div>
    </Panel>
  );
}

export function SlideVisuals({ slide }: { slide: Slide }) {
  const v = slide.visual;
  if (!v) {
    return (
      <Panel>
        <StatGrid stats={slide.stats} />
      </Panel>
    );
  }

  const map: Record<SlideVisual, React.ReactNode> = {
    "hero-collage": <HeroCollage />,
    "ai-truth": <AiTruth />,
    "india-map": <IndiaMap />,
    "neet-2024": <NeetPanel year="2024" />,
    "neet-2026": <NeetPanel year="2026" />,
    "exam-grid": <ExamGrid />,
    "cbse-code": <CodePanel />,
    "portal-breach": <PortalBreach />,
    "paste-warning": <PasteWarning />,
    deepfake: <DeepfakePanel />,
    ripple: <RippleDiagram />,
    deanonymizer: <DeanonymizerVisual />,
    "global-speed": <GlobalSpeed />,
    mythos: <MythosPanel />,
    "global-grid": <GlobalGrid />,
    "chatbot-stack": <ChatbotStack />,
    checklist: <ChecklistVisual />,
    demo: <DemoVisual />,
    roadmap: <RoadmapVisual />,
  };

  return <div className="h-full w-full">{map[v]}</div>;
}
