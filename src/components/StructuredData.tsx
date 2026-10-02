import React from "react";

export default function StructuredData() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TextToolsAI",
    "alternateName": "TextToolsAI.org",
    "url": "https://texttoolsai.org",
    "applicationCategory": "UtilitiesApplication",
    "applicationSubCategory": "AI Text Processing & Editing Software",
    "operatingSystem": "Web Browser, macOS, Windows, Linux, iOS, Android",
    "description":
      "High-velocity AI text toolkit designed for creators, software engineers, and growth teams. Features AI Humanizer, Tone Shifter, Transcript Summarizer, SEO Meta Generator, and Grammar Doctor.",
    "softwareVersion": "2.4.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.92",
      "ratingCount": "1420",
      "bestRating": "5",
      "worstRating": "1",
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Community Tier",
        "price": "0",
        "priceCurrency": "USD",
        "category": "Free",
      },
      {
        "@type": "Offer",
        "name": "Pro Creator Monthly",
        "price": "19",
        "priceCurrency": "USD",
        "billingDuration": "P1M",
        "category": "Subscription",
      },
      {
        "@type": "Offer",
        "name": "Pro Creator Annual",
        "price": "180",
        "priceCurrency": "USD",
        "billingDuration": "P1Y",
        "category": "Subscription",
      },
    ],
    "featureList": [
      "AI Humanizer: 99.4% detection bypass for Turnitin, GPTZero, and Copyleaks",
      "Tone Shifter: Instant rewrite across 8 voices (Executive, Viral X Thread, Sales, Witty, Academic)",
      "Transcript Summarizer: Transforms raw Zoom, Meet & YouTube audio into executive action items",
      "SEO Meta Generator: Google SERP pixel-width verification and high-CTR title tags",
      "Grammar Doctor: Passive voice elimination and surgical fluff reduction",
      "Zero Data Retention: In-memory edge execution with zero model training",
    ],
    "author": {
      "@type": "Organization",
      "name": "TextToolsAI",
      "url": "https://texttoolsai.org",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the AI Humanizer bypass Turnitin, GPTZero, and Copyleaks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Commercial AI detectors look for two statistical markers: low perplexity and low burstiness. Our AI Humanizer introduces organic rhythmic variations, human sentence cadences, and nuanced phrasing that shatter robotic statistical patterns while preserving 100% of your original meaning and intent.",
        },
      },
      {
        "@type": "Question",
        "name": "Is my text saved, logged, or used to train future AI models?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Never. We enforce a strict zero-retention architecture. Your inputs and outputs exist only in volatile server memory for the duration of the HTTP inference request (~180 milliseconds) and are immediately purged. We never store, log, sell, or train foundational models on your text.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I use the generated content for client work and commercial publishing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. You retain 100% full copyright and commercial ownership of all text synthesized or rewritten through TextToolsAI. There are no royalty claims, attribution requirements, or usage restrictions.",
        },
      },
      {
        "@type": "Question",
        "name": "How does the Transcript Summarizer handle messy spoken audio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Our engine is trained on conversational audio transcripts filled with filler words, false starts, speaker cross-talk, and stuttering. It ignores spoken noise and parses out clear executive briefs, action items with assigned owners, and concrete milestone decisions in standard Markdown.",
        },
      },
      {
        "@type": "Question",
        "name": "Why use SEO Meta Generator instead of writing titles manually?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Google doesn't measure search titles by character count alone—it cuts off titles strictly by pixel width (typically 600px desktop, 540px mobile). Our SEO engine calculates precise font pixel rendering to ensure your title never gets truncated mid-phrase, while optimizing psychological CTR triggers.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I cancel my Pro subscription at any time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. You can manage or cancel your subscription at any time with a single click inside your billing portal. There are no lock-in contracts or cancellation penalties.",
        },
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TextToolsAI",
    "url": "https://texttoolsai.org",
    "logo": "https://texttoolsai.org/favicon.ico",
    "sameAs": [
      "https://twitter.com",
      "https://github.com",
      "https://discord.com"
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
