import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI & Cybersecurity — Government Awareness",
  description:
    "India-centric presentation and live cybersecurity chatbot demo for government workers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
