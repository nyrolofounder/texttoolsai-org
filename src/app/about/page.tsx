import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — Mission, Architecture & Creator Story | texttoolsai.org",
  description: "Learn about the mission, engineering architecture, and creator story behind texttoolsai.org: zero-retention neural text optimization engines engineered for extreme precision.",
  openGraph: {
    title: "About texttoolsai.org | Mission, Architecture & Creator Story",
    description: "Zero-retention neural text optimization engines engineered for high-velocity creators and developers.",
    url: "https://texttoolsai.org/about",
    siteName: "TextToolsAI.org",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
