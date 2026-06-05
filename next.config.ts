import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "pptxgenjs",
    "deanonymizer",
    "@anthropic-ai/sdk",
    "openai",
  ],
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
