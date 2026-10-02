import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://texttoolsai.org"),
  title: {
    default: "TextToolsAI — High-Utility AI Text Toolkit SaaS",
    template: "%s | TextToolsAI",
  },
  description:
    "Transform, humanize, rewrite, and optimize content instantly. The high-velocity AI text toolkit featuring AI Humanizer, Tone Shifter, Transcript Summarizer, SEO Meta Generator, and Grammar Doctor.",
  keywords: [
    "AI Humanizer",
    "Undetectable AI Text",
    "Bypass Turnitin",
    "Bypass GPTZero",
    "Tone Shifter",
    "Transcript Summarizer",
    "SEO Meta Generator",
    "Grammar Doctor",
    "Text Tools AI",
    "AI Content Optimizer",
    "High Velocity Copywriting SaaS",
  ],
  authors: [{ name: "TextToolsAI Engineering Team", url: "https://texttoolsai.org" }],
  creator: "TextToolsAI",
  publisher: "TextToolsAI",
  applicationName: "TextToolsAI",
  category: "technology",
  alternates: {
    canonical: "https://texttoolsai.org",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "TextToolsAI — High-Utility AI Text Toolkit SaaS",
    description:
      "Transform, humanize, rewrite, and optimize content in milliseconds. AI Humanizer, Tone Shifter, Transcript Summarizer, SEO Meta Generator & Grammar Doctor.",
    url: "https://texttoolsai.org",
    siteName: "TextToolsAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TextToolsAI — High-Utility AI Text Toolkit",
    description: "The developer & creator standard for neural text transformations. Sub-200ms edge latency.",
    creator: "@texttoolsai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900 flex flex-col font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
