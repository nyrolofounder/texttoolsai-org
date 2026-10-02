import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export interface AuthenticatedUser {
  id: string;
  email: string;
  plan: "free" | "pro" | "enterprise";
  wordsUsed: number;
  wordLimit: number;
}

export type AuthResult =
  | {
      success: true;
      user: AuthenticatedUser;
    }
  | {
      success: false;
      response: NextResponse;
    };

export const API_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

/**
 * Handle HTTP OPTIONS preflight for API v1 endpoints
 */
export function handleApiOptions(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: API_CORS_HEADERS,
  });
}

/**
 * Helper to validate UUID strings
 */
function isValidUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
}

/**
 * Count the number of words in an input string
 */
export function countWords(text: string): number {
  if (!text || typeof text !== "string") return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Validates the API key from the Authorization header, retrieves the user profile,
 * and checks tier-based word usage limits.
 *
 * @param request NextRequest or standard Request
 * @param requiredWords Number of words the incoming request requires to process
 */
export async function authenticateApiRequest(
  request: NextRequest | Request,
  requiredWords: number = 0
): Promise<AuthResult> {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Unauthorized",
          code: "MISSING_API_KEY",
          message:
            "Missing or malformed Authorization header. Please provide 'Authorization: Bearer <your_api_key>'.",
        },
        { status: 401, headers: API_CORS_HEADERS }
      ),
    };
  }

  const apiKey = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!apiKey) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Unauthorized",
          code: "EMPTY_API_KEY",
          message: "API key token cannot be empty.",
        },
        { status: 401, headers: API_CORS_HEADERS }
      ),
    };
  }

  const supabase = getSupabaseAdmin();
  let resolvedUserId: string | null = null;
  let keyRecordId: string | null = null;

  // 1. Check development/demo key fallback
  const isDevOrDemoKey =
    apiKey === "tta_dev_demo_key" ||
    apiKey === "demo_api_key" ||
    apiKey === process.env.DEMO_API_KEY;

  if (isDevOrDemoKey) {
    resolvedUserId = "demo-user-001";
  }

  // 2. Query public.api_keys table
  if (!resolvedUserId) {
    try {
      const { data: keyRecord } = await supabase
        .from("api_keys")
        .select("id, user_id, status")
        .eq("key", apiKey)
        .maybeSingle();

      if (keyRecord) {
        if (keyRecord.status === "revoked") {
          return {
            success: false,
            response: NextResponse.json(
              {
                error: "Unauthorized",
                code: "API_KEY_REVOKED",
                message:
                  "This API key has been revoked. Please generate a new key in your dashboard.",
              },
              { status: 401, headers: API_CORS_HEADERS }
            ),
          };
        }
        resolvedUserId = keyRecord.user_id;
        keyRecordId = keyRecord.id;
      }
    } catch {
      // Ignored if api_keys table has not yet been migrated
    }
  }

  // 3. Fallback: Lookup direct user ID or profile api_key
  if (!resolvedUserId) {
    if (isValidUuid(apiKey)) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", apiKey)
          .maybeSingle();

        if (profile?.id) {
          resolvedUserId = profile.id;
        }
      } catch {
        // Ignored
      }
    }
  }

  // 4. Fallback: Check if token is a valid Supabase Auth JWT
  if (!resolvedUserId && apiKey.includes(".")) {
    try {
      const { data: authData } = await supabase.auth.getUser(apiKey);
      if (authData?.user?.id) {
        resolvedUserId = authData.user.id;
      }
    } catch {
      // Ignored
    }
  }

  // If no user could be identified
  if (!resolvedUserId) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Unauthorized",
          code: "INVALID_API_KEY",
          message:
            "Invalid or expired API key. Please check your credentials in the TextToolsAI dashboard.",
        },
        { status: 401, headers: API_CORS_HEADERS }
      ),
    };
  }

  // Update last_used_at on api_keys table asynchronously if applicable
  if (keyRecordId) {
    Promise.resolve(
      supabase
        .from("api_keys")
        .update({ last_used_at: new Date().toISOString() })
        .eq("id", keyRecordId)
    ).catch(() => {});
  }

  // 5. Query user profile to fetch active tier and word quota
  let profileData: {
    id: string;
    email: string;
    plan: "free" | "pro" | "enterprise";
    words_used: number;
    word_limit: number;
  } | null = null;

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, plan, words_used, word_limit")
      .eq("id", resolvedUserId)
      .maybeSingle();

    if (profile) {
      profileData = {
        id: profile.id,
        email: profile.email || "creator@texttoolsai.org",
        plan: (profile.plan as "free" | "pro" | "enterprise") || "free",
        words_used: profile.words_used || 0,
        word_limit:
          profile.word_limit || (profile.plan === "pro" ? 1000000 : 5000),
      };
    }
  } catch (err) {
    console.warn("[API Auth] Error fetching profile for user:", resolvedUserId, err);
  }

  // Fallback profile if record not found in public.profiles (e.g., demo mode)
  if (!profileData) {
    profileData = {
      id: resolvedUserId,
      email: "creator@texttoolsai.org",
      plan: isDevOrDemoKey ? "pro" : "free",
      words_used: 0,
      word_limit: isDevOrDemoKey ? 1000000 : 5000,
    };
  }

  // 6. Tier-based Quota Enforcement
  const currentUsed = profileData.words_used;
  const currentLimit = profileData.word_limit;
  const isUnlimited = profileData.plan === "pro" || profileData.plan === "enterprise";

  if (!isUnlimited && currentUsed + requiredWords > currentLimit) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Forbidden",
          code: "QUOTA_EXCEEDED",
          message: `Monthly word quota exceeded. You have consumed ${currentUsed.toLocaleString()} of ${currentLimit.toLocaleString()} words on the '${profileData.plan}' plan. Please upgrade to Pro Creator for unlimited inference.`,
          usage: {
            plan: profileData.plan,
            wordsUsed: currentUsed,
            wordLimit: currentLimit,
            wordsRequested: requiredWords,
          },
        },
        { status: 403, headers: API_CORS_HEADERS }
      ),
    };
  }

  return {
    success: true,
    user: {
      id: profileData.id,
      email: profileData.email,
      plan: profileData.plan,
      wordsUsed: profileData.words_used,
      wordLimit: profileData.word_limit,
    },
  };
}

/**
 * Record generation telemetry into public.generations and synchronize quota
 */
export async function recordGenerationTelemetry({
  userId,
  toolId,
  toolName,
  inputPrompt,
  synthesizedResult,
  metrics,
}: {
  userId: string;
  toolId: string;
  toolName: string;
  inputPrompt: string;
  synthesizedResult: string;
  metrics: {
    wordsIn: number;
    wordsOut: number;
    wordDeltaPct: number;
    charCount: number;
    humanScore?: number;
    latencyMs: number;
    [key: string]: unknown;
  };
}): Promise<string> {
  const supabase = getSupabaseAdmin();
  const generationId = `gen_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  // If user is demo-user-001 or non-UUID, skip DB insert to avoid foreign key violation
  if (!isValidUuid(userId)) {
    return generationId;
  }

  try {
    const { data, error } = await supabase
      .from("generations")
      .insert({
        user_id: userId,
        tool_id: toolId,
        tool_name: toolName,
        input_prompt: inputPrompt,
        synthesized_result: synthesizedResult,
        metrics,
        starred: false,
      })
      .select("id")
      .maybeSingle();

    if (error) {
      console.warn("[API Telemetry] Error recording generation row:", error);
    } else if (data?.id) {
      return data.id;
    }
  } catch (err) {
    console.warn("[API Telemetry] Exception inserting generation record:", err);
  }

  return generationId;
}
