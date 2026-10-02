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
 * OPTIONS /api/v1/summarize
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return handleApiOptions();
}

/**
 * Map optional 'length' parameter to transformer format preset
 */
function resolveSummarizeFormat(length?: string, format?: string): string {
  if (format) return format;
  if (!length) return "executive";

  switch (length.toLowerCase()) {
    case "short":
    case "flash":
      return "flash";
    case "medium":
    case "bulleted":
    case "bullets":
      return "bulleted";
    case "timeline":
      return "timeline";
    case "long":
    case "detailed":
    case "executive":
    default:
      return "executive";
  }
}

/**
 * POST /api/v1/summarize
 * Synthesizes long documents, notes, or transcripts into structured executive summaries.
 *
 * Payload:
 * {
 *   "text": string,          // Required: text or transcript to summarize (also accepts "transcript")
 *   "length"?: string,       // Optional: 'short' | 'medium' | 'long'
 *   "format"?: string        // Optional: 'executive' | 'bulleted' | 'timeline' | 'flash'
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = performance.now();

  // 1. Parse JSON payload safely
  let body: {
    text?: string;
    transcript?: string;
    length?: string;
    format?: string;
  };

  try {
    body = await request.json();
  } catch (err) {
    console.warn("[API v1 Summarize] Malformed JSON payload:", err);
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

  // Accept 'text' or 'transcript' for seamless SDK & docs compatibility
  const rawInput = body.text || body.transcript;

  if (typeof rawInput !== "string" || rawInput.trim().length === 0) {
    return NextResponse.json(
      {
        error: "Bad Request",
        code: "MISSING_TEXT",
        message:
          "The 'text' field (or 'transcript') is required and must be a non-empty string.",
      },
      { status: 400, headers: API_CORS_HEADERS }
    );
  }

  const wordsIn = countWords(rawInput);

  // 3. Authenticate API key and enforce tier-based word quota
  const authResult = await authenticateApiRequest(request, wordsIn);
  if (!authResult.success) {
    return authResult.response;
  }

  const { user } = authResult;
  const targetFormat = resolveSummarizeFormat(body.length, body.format);

  try {
    // 4. Execute text summarization engine
    const transformation = transformText("summarizer", rawInput, {
      format: targetFormat,
      length: body.length || "medium",
    });

    const executionLatencyMs = Math.round(performance.now() - startTime);
    const totalLatencyMs = Math.max(
      transformation.latencyMs,
      executionLatencyMs
    );

    // 5. Asynchronously record usage telemetry in Supabase generations
    const generationId = await recordGenerationTelemetry({
      userId: user.id,
      toolId: "summarizer",
      toolName: "Transcript Summarizer",
      inputPrompt: rawInput,
      synthesizedResult: transformation.output,
      metrics: {
        ...transformation.stats,
        latencyMs: totalLatencyMs,
        format: targetFormat,
        length: body.length || "medium",
      },
    });

    // 6. Return clean, consistent JSON response
    return NextResponse.json(
      {
        id: generationId,
        tool: "summarizer",
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
    console.error("[API v1 Summarize] Engine error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        code: "TRANSFORMATION_FAILED",
        message: "Failed to summarize text. Please try again.",
      },
      { status: 500, headers: API_CORS_HEADERS }
    );
  }
}
