import { DemoHub } from "@/components/demo/DemoHub";
import { Suspense } from "react";

export default function DemoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-stone-500">
          Loading demo…
        </div>
      }
    >
      <DemoHub />
    </Suspense>
  );
}
