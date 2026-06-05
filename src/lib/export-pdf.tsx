import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { bulletText, slides } from "@/content/slides";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: "#FAF8F5",
    fontFamily: "Helvetica",
  },
  region: {
    fontSize: 9,
    color: "#C45C26",
    marginBottom: 8,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    color: "#1A1814",
    marginBottom: 12,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B6560",
    marginBottom: 16,
    lineHeight: 1.5,
  },
  bullet: {
    fontSize: 11,
    color: "#1A1814",
    marginBottom: 8,
    paddingLeft: 12,
    lineHeight: 1.45,
  },
  highlight: {
    fontSize: 11,
    color: "#1A1814",
    marginTop: 16,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#C45C26",
    backgroundColor: "#FFFFFF",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    right: 48,
    fontSize: 9,
    color: "#6B6560",
  },
});

function SlidePages() {
  return (
    <Document
      title="AI & Cybersecurity — Government Awareness"
      author="Sibi Chakkaravarthy Sethuraman"
    >
      {slides.map((slide, i) => (
        <Page key={slide.id} size="A4" style={styles.page}>
          {slide.region && (
            <Text style={styles.region}>
              {slide.region.toUpperCase()}
            </Text>
          )}
          <Text style={styles.title}>{slide.title}</Text>
          {slide.subtitle && (
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          )}
          {slide.bullets?.map((b, j) => (
            <Text key={j} style={styles.bullet}>
              • {bulletText(b)}
            </Text>
          ))}
          {slide.highlight && (
            <Text style={styles.highlight}>{slide.highlight}</Text>
          )}
          {slide.callout && slide.variant !== "hero" && (
            <Text style={[styles.subtitle, { marginTop: 12 }]}>
              {slide.callout}
            </Text>
          )}
          <Text style={styles.footer}>
            {i + 1} / {slides.length}
          </Text>
        </Page>
      ))}
    </Document>
  );
}

export async function generatePdfBuffer(): Promise<Buffer> {
  const blob = await pdf(<SlidePages />).toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
