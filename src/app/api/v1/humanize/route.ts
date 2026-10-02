import { NextRequest, NextResponse } from "next/server";
import {
  authenticateApiRequest,
  recordGenerationTelemetry,
  countWords,
  handleApiOptions,
  API_CORS_HEADERS,
} from "@/lib/api-auth";
import { transformText } from "@/lib/transformer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * OPTIONS /api/v1/humanize
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return handleApiOptions();
}

/**
 * POST /api/v1/humanize
 * Transforms robotic AI drafts into undetectable, natural human prose.
 *
 * Payload:
 * {
 *   "text": string,          // Required: text to humanize
 *   "mode"?: string,         // Optional: 'undetectable' | 'conversational' | 'executive' | 'academic'
 *   "intensity"?: string     // Optional: 'high' | 'medium' | 'low'
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = performance.now();

  // 1. Parse JSON payload safely
  let body: {
    text?: string;
    mode?: string;
    intensity?: string;
  };

  try {
    body = await request.json();
  } catch (err) {
    console.warn("[API v1 Humanize] Malformed JSON payload:", err);
    return NextResponse.json(
      {
        error: "Bad Request",
        code: "INVALID_JSON",
        message: "Failed to parse JSON body. Please provide a valid JSON object.",
      },
      { status: 400, headers: API_CORS_HEADERS }
    );
  }

  // 2. Validate input fields
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      {
        error: "Bad Request",
        code: "INVALID_BODY",
        message: "Request body must be a valid JSON object.",
      },
      { status: 400, headers: API_CORS_HEADERS }
    );
  }

  const { text, mode = "undetectable", intensity = "high" } = body;

  if (typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json(
      {
        error: "Bad Request",
        code: "MISSING_TEXT",
        message: "The 'text' field is required and must be a non-empty string.",
      },
      { status: 400, headers: API_CORS_HEADERS }
    );
  }

  const wordsIn = countWords(text);

  // 3. Authenticate API key and enforce tier-based word quota
  const authResult = await authenticateApiRequest(request, wordsIn);
  if (!authResult.success) {
    return authResult.response;
  }

  const { user } = authResult;

  try {
    // 4. Execute text humanization engine
    const transformation = transformText("humanizer", text, {
      mode: String(mode),
      intensity: String(intensity),
    });

    const executionLatencyMs = Math.round(performance.now() - startTime);
    const totalLatencyMs = Math.max(
      transformation.latencyMs,
      executionLatencyMs
    );

    // 5. Asynchronously record usage telemetry in Supabase generations
    const generationId = await recordGenerationTelemetry({
      userId: user.id,
      toolId: "humanizer",
      toolName: "AI Humanizer",
      inputPrompt: text,
      synthesizedResult: transformation.output,
      metrics: {
        ...transformation.stats,
        latencyMs: totalLatencyMs,
        mode,
        intensity,
      },
    });

    // 6. Return consistent, professional JSON response
    return NextResponse.json(
      {
        id: generationId,
        tool: "ai-humanizer",
        output: transformation.output,
        stats: transformation.stats,
        latencyMs: totalLatencyMs,
        usage: {
          plan: user.plan,
          wordsUsed: user.wordsUsed + wordsIn,
          wordLimit: user.wordLimit,
        },
      },
      { status: 200, headers: API_CORS_HEADERS }
    );
  } catch (error: unknown) {
    console.error("[API v1 Humanize] Engine error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        code: "TRANSFORMATION_FAILED",
        message: "Failed to process text transformation. Please try again.",
      },
      { status: 500, headers: API_CORS_HEADERS }
    );
  }
}
