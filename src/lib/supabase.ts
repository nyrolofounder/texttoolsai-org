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

// Helper to map DB row to GenerationHistoryItem
export interface SupabaseGenerationRow {
  id: string;
  user_id: string;
  tool_id: string;
  tool_name: string;
  input_prompt: string;
  synthesized_result: string;
  metrics: {
    wordsIn?: number;
    wordsOut?: number;
    wordDeltaPct?: number;
    humanScore?: number;
    latencyMs?: number;
  };
  starred: boolean;
  created_at: string;
}

export function mapGenerationRowToItem(row: SupabaseGenerationRow): GenerationHistoryItem {
  const wordsIn = row.metrics?.wordsIn ?? (row.input_prompt ? row.input_prompt.trim().split(/\s+/).length : 0);
  const wordsOut = row.metrics?.wordsOut ?? (row.synthesized_result ? row.synthesized_result.trim().split(/\s+/).length : 0);
  
  return {
    id: row.id,
    toolId: row.tool_id,
    toolName: row.tool_name,
    inputSnippet: row.input_prompt.slice(0, 120),
    outputSnippet: row.synthesized_result.slice(0, 120),
    fullInput: row.input_prompt,
    fullOutput: row.synthesized_result,
    wordsIn,
    wordsOut,
    wordDeltaPct: row.metrics?.wordDeltaPct ?? Math.round(((wordsOut - wordsIn) / (wordsIn || 1)) * 100),
    humanScore: row.metrics?.humanScore ?? 99.4,
    latencyMs: row.metrics?.latencyMs ?? 180,
    isStarred: Boolean(row.starred),
    createdAt: row.created_at,
  };
}

// ------------------------------------------------------------------------------
// ASYNC SUPABASE DATA ACCESS WITH RESILIENT FALLBACKS
// ------------------------------------------------------------------------------

/**
 * Fetch all generations for the active user from Supabase.
 * Gracefully falls back to local storage if offline or in demo mode.
 */
export async function fetchGenerations(userId?: string): Promise<GenerationHistoryItem[]> {
  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from("generations")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return (data as SupabaseGenerationRow[]).map(mapGenerationRowToItem);
      }
    } catch (err) {
      console.warn("Supabase fetchGenerations failed, falling back to local vault:", err);
    }
  }

  return getSavedHistory();
}

/**
 * Save a new generation record to Supabase PostgreSQL and cache locally.
 */
export async function saveGenerationRecord(
  item: Omit<GenerationHistoryItem, "id" | "createdAt">,
  userId?: string
): Promise<GenerationHistoryItem> {
  let createdItem: GenerationHistoryItem | null = null;

  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from("generations")
        .insert({
          user_id: userId,
          tool_id: item.toolId,
          tool_name: item.toolName,
          input_prompt: item.fullInput,
          synthesized_result: item.fullOutput,
          metrics: {
            wordsIn: item.wordsIn,
            wordsOut: item.wordsOut,
            wordDeltaPct: item.wordDeltaPct,
            humanScore: item.humanScore,
            latencyMs: item.latencyMs,
          },
          starred: Boolean(item.isStarred),
        })
        .select()
        .single();

      if (!error && data) {
        createdItem = mapGenerationRowToItem(data as SupabaseGenerationRow);
      }
    } catch (err) {
      console.warn("Supabase saveGenerationRecord failed, falling back to local vault:", err);
    }
  }

  // Fallback or local mirror
  const savedItem = createdItem || saveHistoryItem(item);

  // Cache locally
  if (typeof window !== "undefined") {
    try {
      const current = getSavedHistory();
      const exists = current.some((c) => c.id === savedItem.id);
      if (!exists) {
        const updated = [savedItem, ...current].slice(0, 50);
        localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(updated));
      }
    } catch (err) {
      console.error("Local storage sync error:", err);
    }
  }

  return savedItem;
}

/**
 * Delete a generation record from Supabase and local cache.
 */
export async function deleteGenerationRecord(id: string, userId?: string): Promise<void> {
  if (isSupabaseConfigured && userId) {
    try {
      await supabase
        .from("generations")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
    } catch (err) {
      console.warn("Supabase delete failed:", err);
    }
  }

  deleteHistoryItem(id);
}

/**
 * Toggle favorite status in Supabase and local cache.
 */
export async function toggleFavoriteGeneration(
  id: string,
  currentStarred: boolean,
  userId?: string
): Promise<boolean> {
  const nextStarred = !currentStarred;

  if (isSupabaseConfigured && userId) {
    try {
      await supabase
        .from("generations")
        .update({ starred: nextStarred })
        .eq("id", id)
        .eq("user_id", userId);
    } catch (err) {
      console.warn("Supabase toggle favorite failed:", err);
    }
  }

  toggleFavoriteHistoryItem(id);
  return nextStarred;
}

/**
 * Fetch user profile from Supabase profiles table.
 */
export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  if (!isSupabaseConfigured) return getUserProfile();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        email: data.email,
        fullName: data.full_name || "Creator",
        avatarUrl: data.avatar_url || "",
        plan: data.plan || "free",
        wordsUsedThisMonth: data.words_used || 0,
        wordLimit: data.word_limit || (data.plan === "pro" ? 999999 : 5000),
        createdAt: data.created_at,
      };
    }
  } catch (err) {
    console.warn("Supabase fetchUserProfile error:", err);
  }

  return null;
}

/**
 * Atomic live words quota update via Supabase RPC or direct increment.
 */
export async function incrementWordsUsed(userId: string, wordsToAdd: number): Promise<number> {
  if (isSupabaseConfigured && userId) {
    try {
      // 1. Try atomic RPC function
      const { data, error } = await supabase.rpc("increment_words_used", {
        user_uuid: userId,
        words_to_add: wordsToAdd,
      });

      if (!error && typeof data === "number") {
        updateUserProfile({ wordsUsedThisMonth: data });
        return data;
      }

      // 2. Direct table update fallback
      const { data: profile } = await supabase
        .from("profiles")
        .select("words_used")
        .eq("id", userId)
        .single();

      const newWords = (profile?.words_used || 0) + wordsToAdd;
      await supabase
        .from("profiles")
        .update({
          words_used: newWords,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      updateUserProfile({ wordsUsedThisMonth: newWords });
      return newWords;
    } catch (err) {
      console.warn("Failed to increment words in Supabase, using local fallback:", err);
    }
  }

  // Local storage increment
  const prof = getUserProfile();
  const updatedWords = (prof.wordsUsedThisMonth || 0) + wordsToAdd;
  updateUserProfile({ wordsUsedThisMonth: updatedWords });
  return updatedWords;
}

// ------------------------------------------------------------------------------
// LOCAL STORAGE RESILIENT FALLBACKS
// ------------------------------------------------------------------------------

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
