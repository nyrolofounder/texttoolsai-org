"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Workspace from "@/components/Workspace";
import ToolShowcase from "@/components/ToolShowcase";
import ComparisonSection from "@/components/ComparisonSection";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";

export default function HomeClient({ initialToolId = "humanizer" }: { initialToolId?: string }) {
  const [activeToolId, setActiveToolId] = useState<string>(initialToolId);

  return (
    <main className="min-h-screen bg-[#05050a] text-white selection:bg-cyan-500/30 selection:text-white relative overflow-x-hidden">
      {/* 3D Glowing Neon Background Lighting Orbs */}
      <NeonBackgroundOrbs />

      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section with Live Usage Counter */}
      <Hero 
        activeToolId={activeToolId} 
        onSelectTool={(id) => setActiveToolId(id)} 
      />

      {/* Flagship Interactive Studio Workspace */}
      <Workspace 
        activeToolId={activeToolId} 
        onToolChange={(id) => setActiveToolId(id)} 
      />

      {/* 5 Core Tools Deep Dive Showcase */}
      <ToolShowcase 
        onSelectTool={(id) => setActiveToolId(id)} 
      />

      {/* Comparison Matrix vs Generic Chatbots */}
      <ComparisonSection />

      {/* Social Proof & Real User Testimonials */}
      <Testimonials />

      {/* Transparent Pricing Plans */}
      <PricingSection />

      {/* FAQ & Objection Handling */}
      <FAQSection />

      {/* High-Converting Final CTA */}
      <CtaBanner />

      {/* Clean Professional Footer */}
      <Footer />
    </main>
  );
}
