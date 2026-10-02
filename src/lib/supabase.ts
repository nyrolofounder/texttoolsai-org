import { createClient } from "@supabase/supabase-js";

// Environment variables with safe mock fallbacks for static build/preview
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-project.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key-for-building";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://dummy-project.supabase.co"
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// TypeScript interfaces for User, History, and Billing
export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  plan: "free" | "pro" | "enterprise";
  wordsUsedThisMonth: number;
  wordLimit: number;
  createdAt: string;
}

export interface GenerationHistoryItem {
  id: string;
  toolId: string;
  toolName: string;
  inputSnippet: string;
  outputSnippet: string;
  fullInput: string;
  fullOutput: string;
  wordsIn: number;
  wordsOut: number;
  wordDeltaPct: number;
  humanScore?: number;
  latencyMs: number;
  isStarred?: boolean;
  createdAt: string;
}

export interface BillingInvoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  plan: string;
  invoiceUrl: string;
}

// Local storage key for offline/demo persistence
const LOCAL_STORAGE_KEY_HISTORY = "texttools_user_generations_v1";
const LOCAL_STORAGE_KEY_PROFILE = "texttools_user_profile_v1";

// Demo initial profile
export const DEFAULT_DEMO_PROFILE: UserProfile = {
  id: "demo-user-001",
  email: "creator@texttoolsai.org",
  fullName: "Alex Rivera",
  avatarUrl: "",
  plan: "free",
  wordsUsedThisMonth: 3420,
  wordLimit: 5000,
  createdAt: new Date().toISOString(),
};

// Demo initial generations history
export const DEFAULT_DEMO_HISTORY: GenerationHistoryItem[] = [
  {
    id: "gen-1",
    toolId: "humanizer",
    toolName: "AI Humanizer",
    inputSnippet: "It is important to remember that in today's rapidly changing corporate landscape...",
    outputSnippet: "Companies pivot fast these days. What clicked last quarter easily falls flat tomorrow...",
    fullInput: "It is important to remember that in today's rapidly changing corporate landscape, organizational agility constitutes a fundamental cornerstone for sustaining competitive advantage.",
    fullOutput: "Companies pivot fast these days. What clicked last quarter easily falls flat tomorrow unless your team moves with actual urgency.",
    wordsIn: 21,
    wordsOut: 19,
    wordDeltaPct: -10,
    humanScore: 99.6,
    latencyMs: 168,
    isStarred: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: "gen-2",
    toolId: "tone-shifter",
    toolName: "Tone Shifter",
    inputSnippet: "We have finalized our quarterly performance evaluation and would like to schedule...",
    outputSnippet: "Q3 reviews are in. Let's sync this Thursday at 2 PM to lock in roadmap priorities...",
    fullInput: "We have finalized our quarterly performance evaluation and would like to schedule an aligned synchronization with department leads.",
    fullOutput: "Q3 reviews are in. Let's sync this Thursday at 2 PM to lock in roadmap priorities and clear bottlenecks.",
    wordsIn: 18,
    wordsOut: 18,
    wordDeltaPct: 0,
    humanScore: 98.9,
    latencyMs: 194,
    isStarred: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
  },
  {
    id: "gen-3",
    toolId: "summarizer",
    toolName: "Transcript Summarizer",
    inputSnippet: "Speaker 1: Hey everyone, thanks for hopping on. Dave, did you finish the DB migration?...",
    outputSnippet: "## Executive Summary\nDatabase migration landed with zero downtime. API latency down 45%...",
    fullInput: "Speaker 1: Hey everyone, thanks for hopping on. Dave, did you finish the DB migration? Dave: Yeah, landed at 3 AM with zero downtime. Latency dropped from 220ms to 120ms.",
    fullOutput: "## Executive Summary\nDatabase migration landed with zero downtime. API latency down 45%.\n\n### Key Decisions & JIRA Items\n- [x] Dave: Run p99 load test on production cluster by Friday.",
    wordsIn: 32,
    wordsOut: 28,
    wordDeltaPct: -12,
    latencyMs: 210,
    isStarred: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "gen-4",
    toolId: "seo-generator",
    toolName: "SEO Meta Generator",
    inputSnippet: "SaaS text tool for writers and engineers looking to rewrite paragraphs without AI detection...",
    outputSnippet: "AI Text Toolkit — Bypass AI Detectors & Rewrite Text in 180ms",
    fullInput: "SaaS text tool for writers and engineers looking to rewrite paragraphs without AI detection and summarize meeting notes with zero retention.",
    fullOutput: "AI Text Toolkit — Bypass AI Detectors & Rewrite Text in 180ms\nTransform robotic drafts into human prose. Zero data retention, sub-200ms latency.",
    wordsIn: 21,
    wordsOut: 20,
    wordDeltaPct: -5,
    latencyMs: 145,
    isStarred: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
  },
  {
    id: "gen-5",
    toolId: "grammar-doctor",
    toolName: "Grammar Doctor",
    inputSnippet: "In order to facilitate the expeditious implementation of the software updates...",
    outputSnippet: "To ship software updates quickly, run automated staging tests first...",
    fullInput: "In order to facilitate the expeditious implementation of the software updates, it is highly recommended that automated staging tests be executed.",
    fullOutput: "To ship software updates quickly, run automated staging tests first.",
    wordsIn: 20,
    wordsOut: 10,
    wordDeltaPct: -50,
    humanScore: 100,
    latencyMs: 130,
    isStarred: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

// Helper functions for reading & writing history
export function getSavedHistory(): GenerationHistoryItem[] {
  if (typeof window === "undefined") return DEFAULT_DEMO_HISTORY;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
    if (!raw) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_HISTORY,
        JSON.stringify(DEFAULT_DEMO_HISTORY)
      );
      return DEFAULT_DEMO_HISTORY;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DEMO_HISTORY;
  }
}

export function saveHistoryItem(item: Omit<GenerationHistoryItem, "id" | "createdAt">): GenerationHistoryItem {
  const newItem: GenerationHistoryItem = {
    ...item,
    id: `gen-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const current = getSavedHistory();
      const updated = [newItem, ...current].slice(0, 50); // Keep last 50
      localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save generation item", err);
    }
  }

  return newItem;
}

export function deleteHistoryItem(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getSavedHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to delete history item", err);
  }
}

export function toggleFavoriteHistoryItem(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getSavedHistory();
    const updated = current.map((item) =>
      item.id === id ? { ...item, isStarred: !item.isStarred } : item
    );
    localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to toggle favorite", err);
  }
}

export function getUserProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_DEMO_PROFILE;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
    if (!raw) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_PROFILE,
        JSON.stringify(DEFAULT_DEMO_PROFILE)
      );
      return DEFAULT_DEMO_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DEMO_PROFILE;
  }
}

export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  const current = getUserProfile();
  const updated = { ...current, ...updates };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  }
  return updated;
}
