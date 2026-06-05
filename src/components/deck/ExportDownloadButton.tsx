"use client";

import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import {
  exportFilename,
  exportUrl,
  type ExportFormat,
} from "@/lib/export-downloads";
import { cn } from "@/lib/utils";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

interface ExportDownloadButtonProps extends Omit<ButtonProps, "onClick"> {
  format: ExportFormat;
  label?: string;
  iconOnly?: boolean;
}

export function ExportDownloadButton({
  format,
  label,
  iconOnly = false,
  className,
  variant = "secondary",
  size = "sm",
  ...props
}: ExportDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayLabel = label ?? (format === "pdf" ? "PDF" : "PPTX");

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(exportUrl(format), { cache: "no-store" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error ??
            `Download failed (${res.status})`,
        );
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = exportFilename(format);
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex flex-col items-stretch">
      <Button
        type="button"
        variant={variant}
        size={size}
        className={cn(className)}
        disabled={loading}
        onClick={() => void handleDownload()}
        aria-label={`Download ${displayLabel}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {!iconOnly && displayLabel}
      </Button>
      {error && (
        <span className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
