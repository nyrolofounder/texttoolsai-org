import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, TOOL_MAP } from "@/data/tools";
import HomeClient from "./HomeClient";

// Map slugs to tool IDs
const SLUG_TO_TOOL_ID: Record<string, string> = {
  "ai-humanizer": "humanizer",
  "humanizer": "humanizer",
  "tone-shifter": "tone-shifter",
  "transcript-summarizer": "summarizer",
  "summarizer": "summarizer",
  "seo-meta-generator": "seo-generator",
  "seo-generator": "seo-generator",
  "grammar-doctor": "grammar-doctor",
};

export async function generateStaticParams() {
  return Object.keys(SLUG_TO_TOOL_ID).map((toolId) => ({
    toolId,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolId: string }>;
}): Promise<Metadata> {
  const { toolId } = await params;
  const resolvedId = SLUG_TO_TOOL_ID[toolId];
  const tool = resolvedId ? TOOL_MAP[resolvedId] : null;

  if (!tool) {
    return {
      title: "Tool Not Found | TextToolsAI",
    };
  }

  const title = `${tool.name} — ${tool.tagline}`;
  const description = `${tool.shortDesc} Fast, zero-retention, and sub-200ms latency. Try free without signup.`;

  return {
    title,
    description,
    keywords: [
      tool.name,
      tool.badge,
      "text tools ai",
      "ai writing",
      "online text editor",
    ],
    alternates: {
      canonical: `https://texttoolsai.org/tools/${toolId}`,
    },
    openGraph: {
      title,
      description,
      url: `https://texttoolsai.org/tools/${toolId}`,
      siteName: "TextToolsAI",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) {
  const { toolId } = await params;
  const resolvedId = SLUG_TO_TOOL_ID[toolId];

  if (!resolvedId || !TOOL_MAP[resolvedId]) {
    notFound();
  }

  return <HomeClient initialToolId={resolvedId} />;
}
