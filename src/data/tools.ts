export interface ToolConfig {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  badge: string;
  icon: string;
  accentColor: string; // e.g. "emerald", "purple", "cyan", "amber", "rose"
  gradient: string;
  defaultInput: string;
  defaultOutput: string;
  presets: {
    title: string;
    description: string;
    input: string;
    output: string;
    stats?: { label: string; value: string }[];
  }[];
  options: {
    id: string;
    label: string;
    type: "select" | "toggle" | "slider" | "text";
    default: string | number | boolean;
    choices?: { label: string; value: string }[];
  }[];
  metricsSummary: {
    primaryMetric: string;
    primaryValue: string;
    secondaryMetric: string;
    secondaryValue: string;
  };
}

export const TOOLS: ToolConfig[] = [
  {
    id: "humanizer",
    name: "AI Humanizer",
    tagline: "Bypass AI Detectors with Natural Rhythmic Prose",
    shortDesc: "Re-engineers robotic, formulaic ChatGPT and Claude text into authentic human writing with organic sentence length variation, idiomatic nuance, and high burstiness.",
    badge: "99.4% Detection Bypass",
    icon: "Sparkles",
    accentColor: "emerald",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    defaultInput: `In today's fast-paced digital landscape, it is imperative for modern enterprises to leverage cutting-edge artificial intelligence solutions in order to maximize operational efficiency and foster sustainable competitive advantages. Furthermore, businesses must delve into synergistic methodologies that facilitate seamless digital transformation across disparate organizational silos.`,
    defaultOutput: `If you want your company to survive the next five years, you can't treat AI like an optional weekend experiment. Teams that actually win aren't just buying shiny software—they're quietly tearing down the walls between engineering, sales, and operations so good ideas move without red tape.`,
    presets: [
      {
        title: "Corporate AI Jargon → Authentic Founder Voice",
        description: "Strip corporate cliché and artificial sentence structures",
        input: `In conclusion, it is of paramount importance to acknowledge that the implementation of agile workflows plays an instrumental role in facilitating enhanced stakeholder engagement and optimizing project deliverables within designated timelines.`,
        output: `Bottom line: agile only matters if it helps your team ship reliable work faster and keeps everyone on the same page. Everything else is just calendar clutter.`,
        stats: [
          { label: "Original AI Score", value: "98% AI" },
          { label: "Humanized Score", value: "99.2% Human" },
          { label: "Burstiness Score", value: "94/100" }
        ]
      },
      {
        title: "Academic Paper Draft → Natural Explanatory Flow",
        description: "Transform dense academic syntax into compelling, lucid explanations",
        input: `The empirical data obtained via regression analysis serves to elucidate the multifaceted correlation existing between algorithmic latency metrics and downstream user abandonment propensities.`,
        output: `Our numbers show a clear pattern: when your software takes more than 300 milliseconds to respond, users don't wait around—they close the tab.`,
        stats: [
          { label: "Readability", value: "Grade 8.4" },
          { label: "Turnitin / GPTZero", value: "Passed (1.2%)" },
          { label: "Syllable Rhythm", value: "Balanced" }
        ]
      },
      {
        title: "Product Pitch → Honest Casual Copy",
        description: "Converts repetitive ChatGPT marketing phrases into relatable copy",
        input: `Our state-of-the-art, revolutionary cloud-based platform empowers creators to effortlessly supercharge their productivity and seamlessly elevate their workflows to unprecedented new heights.`,
        output: `We built the tool we needed ourselves: a clean, zero-distraction editor that gets out of your way so you can finish your writing an hour earlier every day.`,
        stats: [
          { label: "Original Fluff", value: "48%" },
          { label: "Human Resonance", value: "97/100" },
          { label: "Bypass Rate", value: "100%" }
        ]
      }
    ],
    options: [
      {
        id: "mode",
        label: "Humanizing Tone",
        type: "select",
        default: "undetectable",
        choices: [
          { label: "Undetectable Stealth (Bypass GPTZero / Turnitin)", value: "undetectable" },
          { label: "Conversational & Relatable", value: "conversational" },
          { label: "Executive & Punchy", value: "executive" },
          { label: "Academic / Thought Leadership", value: "academic" }
        ]
      },
      {
        id: "intensity",
        label: "Burstiness Cadence",
        type: "select",
        default: "high",
        choices: [
          { label: "Natural Dynamic (High Burstiness)", value: "high" },
          { label: "Balanced Smooth Flow", value: "balanced" },
          { label: "Surgical Refinement", value: "surgical" }
        ]
      }
    ],
    metricsSummary: {
      primaryMetric: "Bypass Probability",
      primaryValue: "99.4%",
      secondaryMetric: "AI Score Drop",
      secondaryValue: "-96%"
    }
  },
  {
    id: "tone-shifter",
    name: "Tone Shifter",
    tagline: "Pivot Any Copy Into 8 High-Impact Voices",
    shortDesc: "Repurpose your message across diverse channels without rewriting from scratch. Shift between C-Suite authority, viral X/Twitter wit, direct response sales, and empathetic support.",
    badge: "8 Neural Voices",
    icon: "SlidersHorizontal",
    accentColor: "violet",
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    defaultInput: `Hey guys, so our server had a small issue this morning and went down for like 20 minutes because the database was overloaded. Everything is fine now, sorry for the hassle!`,
    defaultOutput: `Incident Resolution Update: Earlier today at 08:14 UTC, our primary database cluster experienced unexpected query saturation, resulting in 18 minutes of degraded API availability. Our automated failover isolated the root cause, traffic has fully normalized, and preventative connection pooling safeguards are now active. We sincerely regret any disruption to your workflow.`,
    presets: [
      {
        title: "Casual Email → C-Suite Executive Brief",
        description: "Elevate informal updates into boardroom-ready strategic communication",
        input: `We think doing this new feature might get us some more customers because people keep asking for it on Discord, but it will take about three weeks of engineering time.`,
        output: `Strategic Proposal: Accelerating Feature X development addresses top customer acquisition churn. Based on recurring community feedback, allocating 3 engineering sprints will unlock an estimated 14% uplift in top-of-funnel conversion.`,
        stats: [
          { label: "Authority Level", value: "Tier 1 Executive" },
          { label: "Persuasion Score", value: "95/100" }
        ]
      },
      {
        title: "Boring Technical Specs → Viral X / Twitter Hook",
        description: "Turn dry architecture notes into an engaging public thread hook",
        input: `We refactored our caching layer using Redis clusters and partitioned our queries, which reduced our server response times from 800 milliseconds down to 95 milliseconds.`,
        output: `We dropped API latency by 88% in a single weekend. 

No fancy rewrites in Rust. No 6-figure microservices overhaul. 

Just 2 Redis cluster tweaks that 99% of engineering teams overlook. 

Here's the breakdown: 🧵👇`,
        stats: [
          { label: "Hook Retain Rate", value: "+420%" },
          { label: "Engagement Grade", value: "Viral A+" }
        ]
      },
      {
        title: "Cold Feature List → Irresistible Direct Sales Pitch",
        description: "Transform technical capabilities into emotion-driven, problem-solving copy",
        input: `Our tool has a built-in search bar, tags, multi-folder organization, and automated daily backups for your written notes.`,
        output: `Stop losing brilliant ideas in messy desktop folders. With lightning search and automatic daily backups, your notes are protected, organized, and retrieved in under 2 seconds—so you can focus on building, not digging through archives.`,
        stats: [
          { label: "Conversion Lift", value: "+38%" },
          { label: "Clarity Score", value: "98/100" }
        ]
      }
    ],
    options: [
      {
        id: "targetTone",
        label: "Target Voice",
        type: "select",
        default: "executive",
        choices: [
          { label: "Boardroom & C-Suite Executive", value: "executive" },
          { label: "Viral Tech X / Twitter Thread", value: "viral" },
          { label: "High-Converting Direct Response", value: "sales" },
          { label: "Empathetic & Warm Customer Support", value: "empathetic" },
          { label: "Witty & Sarcastic Silicon Valley", value: "witty" },
          { label: "Academic & Thoroughly Rigorous", value: "academic" }
        ]
      },
      {
        id: "urgency",
        label: "Urgency Temperature",
        type: "select",
        default: "measured",
        choices: [
          { label: "Measured & Objective", value: "measured" },
          { label: "High Energy & Inspiring", value: "high_energy" },
          { label: "Urgent & Decisive", value: "urgent" }
        ]
      }
    ],
    metricsSummary: {
      primaryMetric: "Voice Alignment",
      primaryValue: "99.1%",
      secondaryMetric: "Tone Shifts Tested",
      secondaryValue: "8 Styles"
    }
  },
  {
    id: "summarizer",
    name: "Transcript Summarizer",
    tagline: "Turn Rambling Audio & Video Into Executive Action",
    shortDesc: "Ingests raw Zoom, Google Meet, YouTube, or podcast transcripts and extracts crisp executive summaries, concrete decisions, tagged action items, and milestone takeaways.",
    badge: "78% Time Saved",
    icon: "FileText",
    accentColor: "cyan",
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    defaultInput: `[00:01] Sarah: Hey everyone, thanks for hopping on. Let's talk about the Q3 product launch. Dave, did you finish the Stripe billing migration?
[00:14] Dave: Almost, yeah. There's a slight bug with webhooks on tiered pricing, but I should have that patched by Thursday afternoon.
[00:26] Sarah: Perfect. Rachel, what about the landing page redesign?
[00:32] Rachel: The Figma mockups are approved. I'm waiting on the hero copy from Mark, and then frontend can start implementation Monday.
[00:45] Sarah: Great. Let's make sure we test checkout end-to-end on Friday morning before we freeze code. Mark, please send Rachel the copy by EOD tomorrow. Meeting adjourned.`,
    defaultOutput: `## Executive Briefing: Q3 Launch Alignment
**Outcome:** Launch trajectory is on track with two critical dependencies scheduled for completion this week.

### 🎯 Key Decisions
1. **End-to-End Checkout Test:** Set for Friday 10:00 AM prior to production code freeze.
2. **Design Signoff:** Landing page Figma designs officially approved.

### 📋 Action Items & Owners
* **Dave** ➔ Resolve Stripe tiered-pricing webhook bug *(Deadline: Thursday 3 PM)*
* **Mark** ➔ Hand off finalized hero copy to Rachel *(Deadline: Wednesday EOD)*
* **Rachel** ➔ Coordinate frontend sprint kick-off for Monday morning
* **Team** ➔ Conduct joint checkout stress test *(Deadline: Friday morning)*`,
    presets: [
      {
        title: "Sprint Planning Transcript → Crisp JIRA-ready Action Items",
        description: "Parse conversational back-and-forth into clear assignments and deadlines",
        input: `Alex: Okay so who is taking the auth bug? We have users reporting 502s on Safari.
Devon: I looked into it, it's related to cookie samesite attributes in the new update. I can fix it by 2pm today.
Alex: Awesome. Also, Maya, can you update the API rate limit docs before customer support gets flooded?
Maya: Yes, already drafting the markdown. Will PR it by 4pm.`,
        output: `### 🚀 Action Items & Critical Bugs
1. **[P0 Bug] Safari 502 Auth Error**
   - **Owner:** Devon
   - **Root Cause:** Cookie SameSite attribute mismatch
   - **Target ETA:** Today, 2:00 PM
2. **[Documentation] API Rate Limit Guide**
   - **Owner:** Maya
   - **Deliverable:** PR update to '/docs/rate-limits'
   - **Target ETA:** Today, 4:00 PM`,
        stats: [
          { label: "Word Reduction", value: "-72%" },
          { label: "Action Item Recall", value: "100%" }
        ]
      },
      {
        title: "Founder Podcast Interview → 3 Core Playbook Insights",
        description: "Distill 45 minutes of rambling founder advice into punchy strategic principles",
        input: `Interviewer: Looking back at your first year, what was the biggest mistake most founders make?
Founder: Honestly, it's building for 6 months in a cave without talking to a single human. We spent $40,000 on custom infrastructure before we validated if anyone would pay $10/month. When we pivoted to selling before building, our revenue tripled in 60 days. Also, hire generalists early; specialists only make sense when you have product-market fit.`,
        output: `### 💡 Founder Playbook: Key Lessons
* **Rule #1: Pre-sell Before Writing Code**
  Validation beats infrastructure. Testing willingness to pay early prevented costly 6-month false starts.
* **Rule #2: The Generalist Dividend**
  In sub-PMF stages, versatile builders who adapt across product and growth outproduce narrow specialists 3x.
* **Rule #3: Fast Feedback Loops**
  Talking to 5 customers weekly accelerated revenue 300% faster than internal roadmap brainstorming.`,
        stats: [
          { label: "Read Time", value: "45 sec" },
          { label: "Clarity Score", value: "A+" }
        ]
      }
    ],
    options: [
      {
        id: "format",
        label: "Output Format",
        type: "select",
        default: "executive",
        choices: [
          { label: "Executive Brief + Action Items", value: "executive" },
          { label: "Bulleted Key Takeaways", value: "bulleted" },
          { label: "Chronological Timeline & Decisions", value: "timeline" },
          { label: "60-Second Flash Card", value: "flash" }
        ]
      }
    ],
    metricsSummary: {
      primaryMetric: "Condensation Ratio",
      primaryValue: "78% Avg",
      secondaryMetric: "Extraction Accuracy",
      secondaryValue: "99.8%"
    }
  },
  {
    id: "seo-generator",
    name: "SEO Meta Generator",
    tagline: "High-CTR Google SERP Snippets & OpenGraph Tags",
    shortDesc: "Engineered to maximize Google search impressions and click-through rates. Generates pixel-accurate titles, magnetic meta descriptions, and social card previews that prevent truncation.",
    badge: "Pixel-Perfect SERP",
    icon: "Search",
    accentColor: "amber",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    defaultInput: `We are launching TextToolsAI, a fast web app that lets writers, copywriters, and developers rewrite their text, summarize meeting transcripts, humanize ChatGPT content, and fix grammar errors in one place without paying high monthly fees.`,
    defaultOutput: `<!-- Google Search Meta Tags -->
<title>AI Text Toolkit: Humanize, Summarize & Rewrite in Seconds | TextToolsAI</title>
<meta name="description" content="Stop wrestling with AI detection and messy transcripts. TextToolsAI gives you 5 powerful writing tools with instant results, zero latency, and 100% privacy. Try free today.">

<!-- OpenGraph / Social Media -->
<meta property="og:title" content="TextToolsAI — The High-Velocity AI Text Engine">
<meta property="og:description" content="AI Humanizer, Tone Shifter, Transcript Summarizer, and Grammar Doctor in one unified studio.">
<meta property="og:url" content="https://texttoolsai.org">

<!-- Recommended Primary Keywords -->
Keywords: ai text toolkit, ai humanizer, transcript summarizer, undetectable ai text, tone switcher tool`,
    presets: [
      {
        title: "SaaS Landing Page → Search Dominance",
        description: "Target commercial search intent with crisp, high-click meta tags",
        input: `Our product is an automated invoicing and expense tracking software built specifically for freelance software developers and design agencies.`,
        output: `<title>Invoicing & Expense Software for Freelance Devs & Agencies | InvoiceFlow</title>
<meta name="description" content="Automate client invoicing, track multi-currency project expenses, and get paid 2x faster with zero manual reconciliation. Start free in 60 seconds.">
<meta property="og:title" content="InvoiceFlow — Smart Automated Invoicing for Tech Freelancers">`,
        stats: [
          { label: "Title Length", value: "58 chars (524px)" },
          { label: "Description Length", value: "152 chars (Safe)" },
          { label: "Est. CTR Boost", value: "+28%" }
        ]
      },
      {
        title: "Viral Technical Blog Post → OpenGraph & SERP Hook",
        description: "Craft meta tags for dev blogs and tutorials that rank on Google page 1",
        input: `This article explains how to build a real-time multiplayer cursor tracker using WebSockets, Next.js 15, and Redis in 20 minutes without third party hosted services.`,
        output: `<title>Build a Real-Time Multiplayer Cursor with Next.js & Redis | Step-by-Step Guide</title>
<meta name="description" content="Learn how to build lightweight, zero-dependency collaborative cursors in Next.js using WebSockets and Redis in under 20 minutes. Complete code repo included.">
<meta name="keywords" content="nextjs websockets, multiplayer cursors, redis realtime, live collaboration">`,
        stats: [
          { label: "Snippet Width", value: "Optimal SERP" },
          { label: "Social Preview", value: "Verified OG" }
        ]
      }
    ],
    options: [
      {
        id: "intent",
        label: "Search Intent",
        type: "select",
        default: "commercial",
        choices: [
          { label: "Commercial / High-Intent SaaS", value: "commercial" },
          { label: "Informational / Blog & Tutorial", value: "informational" },
          { label: "Transactional / E-Commerce Product", value: "transactional" }
        ]
      },
      {
        id: "brandName",
        label: "Append Brand Suffix",
        type: "select",
        default: "yes",
        choices: [
          { label: "Yes (e.g. | TextToolsAI)", value: "yes" },
          { label: "No (Pure Keyword Title)", value: "no" }
        ]
      }
    ],
    metricsSummary: {
      primaryMetric: "SERP Pixel Width",
      primaryValue: "542 / 600px",
      secondaryMetric: "Click Propensity",
      secondaryValue: "9.4% (Top Tier)"
    }
  },
  {
    id: "grammar-doctor",
    name: "Grammar Doctor",
    tagline: "Surgical Syntax Repair & Fluff Elimination",
    shortDesc: "Goes beyond basic spelling checks. Repairs awkward rhythm, removes unnecessary qualifiers, eliminates passive voice, and tightens prose for maximum persuasion.",
    badge: "Active Voice Engine",
    icon: "Stethoscope",
    accentColor: "rose",
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    defaultInput: `There are numerous reasons why it can be said that many people are really struggling with their writing. Oftentimes, sentences are written by authors in a very passive manner which serves to make the text feel rather boring and excessively verbose.`,
    defaultOutput: `Writers often struggle because they rely on passive phrasing. Passive verbs dilute impact, inflate word count, and bore readers. Switching to active, direct language instantly sharpens every sentence.`,
    presets: [
      {
        title: "Fluffy Corporate Email → Crisp Directive",
        description: "Eliminate hedge words ('just', 'maybe', 'sort of', 'really')",
        input: `I was just wondering if you might perhaps have a quick minute sometime today to possibly take a look at the attached draft report if you are not too busy?`,
        output: `Please review the attached draft report by 4:00 PM today. Let me know if you have any questions or feedback.`,
        stats: [
          { label: "Words Removed", value: "19 Fluff Words" },
          { label: "Confidence Lift", value: "+80%" }
        ]
      },
      {
        title: "Passive Academic Prose → Punchy Active Insights",
        description: "Convert passive constructions into definitive subject-verb assertions",
        input: `A significant reduction in overhead costs was observed to be achieved by the operational team after the new automated software package was installed.`,
        output: `The operations team slashed overhead expenses immediately after installing the automated software.`,
        stats: [
          { label: "Passive Voice", value: "0% (Eliminated)" },
          { label: "Reading Grade", value: "Clear & Punchy" }
        ]
      }
    ],
    options: [
      {
        id: "styleGuide",
        label: "Editorial Standard",
        type: "select",
        default: "concise",
        choices: [
          { label: "Crisp & Concise (Cut 30% Fluff)", value: "concise" },
          { label: "Executive Punch (Strong Active Verbs)", value: "executive" },
          { label: "Oxford Academic (Grammatical Rigor)", value: "oxford" },
          { label: "Sales Copywriter (High Rhythm & Flow)", value: "sales" }
        ]
      }
    ],
    metricsSummary: {
      primaryMetric: "Fluff Reduction",
      primaryValue: "-38% Words",
      secondaryMetric: "Clarity Grade",
      secondaryValue: "100 / 100"
    }
  }
];

export const TOOL_MAP = Object.fromEntries(TOOLS.map((t) => [t.id, t]));
