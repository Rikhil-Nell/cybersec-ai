import { serveDownload } from "@/lib/serve-download";

export const runtime = "nodejs";

export async function GET() {
  return serveDownload({
    filename: "ai-cybersecurity-awareness.pdf",
    contentType: "application/pdf",
  });
}
