export const EXPORT_PDF_FILENAME = "ai-cybersecurity-awareness.pdf";
export const EXPORT_PPTX_FILENAME = "ai-cybersecurity-awareness.pptx";

export const EXPORT_PDF_URL = "/api/export/pdf";
export const EXPORT_PPTX_URL = "/api/export/pptx";

export type ExportFormat = "pdf" | "pptx";

export function exportUrl(format: ExportFormat): string {
  return format === "pdf" ? EXPORT_PDF_URL : EXPORT_PPTX_URL;
}

export function exportFilename(format: ExportFormat): string {
  return format === "pdf" ? EXPORT_PDF_FILENAME : EXPORT_PPTX_FILENAME;
}
