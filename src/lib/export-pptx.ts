import PptxGenJS from "pptxgenjs";
import { bulletText, slides } from "@/content/slides";

const ACCENT = "C45C26";
const TEXT = "1A1814";
const MUTED = "6B6560";

export async function generatePptxBuffer(): Promise<Buffer> {
  const pptx = new PptxGenJS();
  pptx.author = "Sibi Chakkaravarthy Sethuraman";
  pptx.title = "AI & Cybersecurity — Government Awareness";
  pptx.layout = "LAYOUT_16x9";

  for (const slide of slides) {
    const s = pptx.addSlide();
    s.background = { color: "FAF8F5" };

    // Accent bar
    s.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.08,
      fill: { color: ACCENT },
    });

    const region =
      slide.region === "india"
        ? "INDIA"
        : slide.region === "global"
          ? "GLOBAL"
          : slide.region === "action"
            ? "ACTION"
            : "";

    if (region) {
      s.addText(region, {
        x: 0.5,
        y: 0.25,
        w: 2,
        h: 0.35,
        fontSize: 10,
        bold: true,
        color: ACCENT,
      });
    }

    s.addText(slide.title, {
      x: 0.5,
      y: 0.65,
      w: 9,
      h: 1.2,
      fontSize: slide.variant === "hero" ? 32 : 26,
      bold: true,
      color: TEXT,
      fontFace: "Georgia",
    });

    let y = 1.9;

    if (slide.subtitle) {
      s.addText(slide.subtitle, {
        x: 0.5,
        y,
        w: 9,
        h: 0.8,
        fontSize: 14,
        color: MUTED,
      });
      y += 0.9;
    }

    if (slide.bullets?.length) {
      const bulletLines = slide.bullets.map((b) => ({
        text: bulletText(b),
        options: { bullet: true, breakLine: true },
      }));
      s.addText(bulletLines, {
        x: 0.5,
        y,
        w: 9,
        h: 4,
        fontSize: 13,
        color: TEXT,
        valign: "top",
      });
    }

    if (slide.highlight) {
      s.addShape(pptx.ShapeType.rect, {
        x: 0.5,
        y: 5.2,
        w: 9,
        h: 0.9,
        fill: { color: "FFFFFF" },
        line: { color: ACCENT, width: 2 },
      });
      s.addText(slide.highlight, {
        x: 0.65,
        y: 5.35,
        w: 8.7,
        h: 0.7,
        fontSize: 12,
        bold: true,
        color: TEXT,
      });
    }

    if (slide.callout && slide.variant === "hero") {
      s.addText(slide.callout, {
        x: 0.5,
        y: 0.35,
        w: 9,
        h: 0.3,
        fontSize: 10,
        color: ACCENT,
      });
    }
  }

  const arrayBuffer = await pptx.write({ outputType: "arraybuffer" });
  return Buffer.from(arrayBuffer as ArrayBuffer);
}
