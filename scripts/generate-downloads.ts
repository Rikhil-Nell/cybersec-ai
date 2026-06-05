/**
 * Writes workshop PDF/PPTX to public/downloads/.
 * Run: npx tsx scripts/generate-downloads.ts
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { generatePdfBuffer } from "../src/lib/export-pdf";
import { generatePptxBuffer } from "../src/lib/export-pptx";

const OUT_DIR = path.join(process.cwd(), "public", "downloads");

async function main() {
  const [pdf, pptx] = await Promise.all([
    generatePdfBuffer(),
    generatePptxBuffer(),
  ]);

  await Promise.all([
    writeFile(path.join(OUT_DIR, "ai-cybersecurity-awareness.pdf"), pdf),
    writeFile(path.join(OUT_DIR, "ai-cybersecurity-awareness.pptx"), pptx),
  ]);

  console.log("Wrote public/downloads/ai-cybersecurity-awareness.{pdf,pptx}");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
