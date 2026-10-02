import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * TypeScript definitions for Razorpay Webhook Events
 */
interface RazorpaySubscriptionEntity {
  id: string;
  customer_id?: string;
  plan_id?: string;
  status?: string;
  current_start?: number;
  current_end?: number;
  charge_at?: number;
  start_at?: number;
  end_at?: number;
  notes?: Record<string, unknown>;
}

interface RazorpayPaymentEntity {
  id: string;
  order_id?: string;
  subscription_id?: string;
  amount?: number;
  currency?: string;
  status?: string;
  method?: string;
  email?: string;
  contact?: string;
  customer_id?: string;
  notes?: Record<string, unknown>;
}

interface RazorpayWebhookPayload {
  entity: string;
  account_id?: string;
  event: string;
  contains?: string[];
  payload?: {
    subscription?: {
      entity?: RazorpaySubscriptionEntity;
    };
    payment?: {
      entity?: RazorpayPaymentEntity;
    };
    order?: {
      entity?: {
        id?: string;
        amount?: number;
        receipt?: string;
        notes?: Record<string, unknown>;
      };
    };
  };
  created_at?: number;
}

/**
 * Validates whether a string conforms to the standard UUID format.
 * Prevents PostgreSQL '22P02: invalid input syntax for type uuid' errors.
 */
function isValidUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
}

/**
 * Resolve target user UUID in Supabase using multiple candidate identifiers:
 * 1. Explicit userId / user_id from notes (if valid UUID)
 * 2. Customer email from payment or notes
 * 3. Existing subscription record in public.subscriptions
 */
async function resolveUserId(
  supabase: SupabaseClient,
  params: {
    userIdHint?: string;
    emailHint?: string;
    subscriptionId?: string;
  }
): Promise<string | null> {
  const { userIdHint, emailHint, subscriptionId } = params;

  // 1. Direct UUID lookup in public.profiles
  if (userIdHint && isValidUuid(userIdHint)) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userIdHint)
        .maybeSingle();

      if (profile?.id) {
        return profile.id;
      }
    } catch (err) {
      console.warn("[Razorpay Webhook] Error resolving user by UUID:", err);
    }
  }

  // 2. Email lookup in public.profiles
  if (emailHint && emailHint.includes("@")) {
    const cleanEmail = emailHint.trim().toLowerCase();
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .ilike("email", cleanEmail)
        .maybeSingle();

      if (profile?.id) {
        return profile.id;
      }
    } catch (err) {
      console.warn("[Razorpay Webhook] Error resolving user by email:", err);
    }

    // Secondary fallback: lookup via Supabase Auth admin API if available
    try {
      const { data: authData } = await supabase.auth.admin.listUsers();
      const matched = authData?.users?.find(
        (u) => u.email?.toLowerCase() === cleanEmail
      );
      if (matched?.id) {
        return matched.id;
      }
    } catch {
      // Ignored if admin permissions or network policy prevent listUsers
    }
  }

  // 3. Subscription ID lookup in public.subscriptions
  if (subscriptionId) {
    try {
      const { data: subRecord } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("razorpay_subscription_id", subscriptionId)
        .maybeSingle();

      if (subRecord?.user_id) {
        return subRecord.user_id;
      }
    } catch (err) {
      console.warn("[Razorpay Webhook] Error resolving user by subscription ID:", err);
    }
  }

  return null;
}

/**
 * POST /api/webhooks/razorpay
 * Server-side Razorpay webhook handler for texttoolsai.org
 */
export async function POST(request: NextRequest) {
  let rawBody: string;

  // 1. Read raw request body as text
  try {
    rawBody = await request.text();
  } catch (err) {
    console.error("[Razorpay Webhook] Failed to read raw body:", err);
    return NextResponse.json(
      { error: "Failed to read request body" },
      { status: 400 }
    );
  }

  // 2. Extract and verify X-Razorpay-Signature header
  const signature =
    request.headers.get("x-razorpay-signature") ||
    request.headers.get("X-Razorpay-Signature");
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "[Razorpay Webhook] Critical: RAZORPAY_WEBHOOK_SECRET is not configured in server environment"
    );
    return NextResponse.json(
      { error: "Webhook secret is not configured" },
      { status: 400 }
    );
  }

  if (!signature) {
    console.warn("[Razorpay Webhook] Missing X-Razorpay-Signature header");
    return NextResponse.json(
      { error: "Missing X-Razorpay-Signature header" },
      { status: 400 }
    );
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const signatureBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");

    // Timing-safe comparison to prevent timing side-channel attacks
    const isValidSignature =
      signatureBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(signatureBuffer, expectedBuffer);

    if (!isValidSignature) {
      console.warn("[Razorpay Webhook] Invalid signature verification failed");
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("[Razorpay Webhook] Signature verification error:", err);
    return NextResponse.json(
      { error: "Signature verification failed" },
      { status: 400 }
    );
  }

  // 3. Parse JSON payload
  let eventData: RazorpayWebhookPayload;
  try {
    eventData = JSON.parse(rawBody);
  } catch (err) {
    console.error("[Razorpay Webhook] Malformed JSON payload:", err);
    return NextResponse.json(
      { error: "Malformed JSON payload" },
      { status: 400 }
    );
  }

  const { event, payload } = eventData;
  console.info(`[Razorpay Webhook] Received verified event: ${event}`);

  const supabase = getSupabaseAdmin();

  try {
    switch (event) {
      // ----------------------------------------------------------------------
      // EVENT: subscription.charged
      // ----------------------------------------------------------------------
      case "subscription.charged": {
        const subscription = payload?.subscription?.entity;
        const payment = payload?.payment?.entity;

        const subscriptionId = subscription?.id || payment?.subscription_id;

        if (!subscriptionId) {
          console.warn(
            "[Razorpay Webhook] subscription.charged received without subscription ID"
          );
          return NextResponse.json(
            { status: "ok", warning: "Missing subscription ID" },
            { status: 200 }
          );
        }

        // Candidate user identifiers from notes, email, or customer_id
        const userIdHint =
          typeof subscription?.notes?.user_id === "string"
            ? subscription.notes.user_id
            : typeof subscription?.notes?.userId === "string"
            ? subscription.notes.userId
            : typeof payment?.notes?.user_id === "string"
            ? payment.notes.user_id
            : typeof payment?.notes?.userId === "string"
            ? payment.notes.userId
            : undefined;

        const emailHint =
          typeof payment?.email === "string"
            ? payment.email
            : typeof subscription?.notes?.email === "string"
            ? subscription.notes.email
            : typeof subscription?.notes?.customer_email === "string"
            ? subscription.notes.customer_email
            : typeof payment?.notes?.email === "string"
            ? payment.notes.email
            : undefined;

        const targetUserId = await resolveUserId(supabase, {
          userIdHint,
          emailHint,
          subscriptionId,
        });

        if (!targetUserId) {
          console.error(
            `[Razorpay Webhook] Could not associate subscription ${subscriptionId} with any user in public.profiles.`,
            { emailHint, userIdHint, customerId: subscription?.customer_id }
          );
          // Return 200 so Razorpay does not retry indefinitely for unlinked users
          return NextResponse.json(
            {
              status: "ok",
              warning: "User could not be resolved for subscription",
            },
            { status: 200 }
          );
        }

        // 1. Update public.profiles setting plan = 'pro'
        const { error: profileUpdateError } = await supabase
          .from("profiles")
          .update({
            plan: "pro",
            word_limit: 1000000, // Unlimited Pro quota
            updated_at: new Date().toISOString(),
          })
          .eq("id", targetUserId);

        if (profileUpdateError) {
          console.error(
            "[Razorpay Webhook] Error updating profile to pro:",
            profileUpdateError
          );
          throw profileUpdateError;
        }

        // 2. Calculate period start and period end
        const periodStart = subscription?.current_start
          ? new Date(subscription.current_start * 1000).toISOString()
          : new Date().toISOString();

        let periodEnd: string;
        if (subscription?.current_end) {
          periodEnd = new Date(subscription.current_end * 1000).toISOString();
        } else if (subscription?.charge_at) {
          periodEnd = new Date(subscription.charge_at * 1000).toISOString();
        } else if (subscription?.end_at) {
          periodEnd = new Date(subscription.end_at * 1000).toISOString();
        } else {
          // Default to 30 days renewal cycle
          const fallbackEnd = new Date();
          fallbackEnd.setDate(fallbackEnd.getDate() + 30);
          periodEnd = fallbackEnd.toISOString();
        }

        // 3. Upsert record in public.subscriptions with razorpay_subscription_id and updated current_period_end
        const { data: existingSub, error: subQueryError } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("razorpay_subscription_id", subscriptionId)
          .maybeSingle();

        if (subQueryError) {
          console.error(
            "[Razorpay Webhook] Error querying existing subscription:",
            subQueryError
          );
        }

        if (existingSub) {
          const { error: updateSubError } = await supabase
            .from("subscriptions")
            .update({
              user_id: targetUserId,
              status: "active",
              plan: "pro",
              razorpay_order_id: payment?.order_id || null,
              razorpay_payment_id: payment?.id || null,
              current_period_start: periodStart,
              current_period_end: periodEnd,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingSub.id);

          if (updateSubError) {
            console.error(
              "[Razorpay Webhook] Error updating subscription row:",
              updateSubError
            );
            throw updateSubError;
          }
        } else {
          const { error: insertSubError } = await supabase
            .from("subscriptions")
            .insert({
              user_id: targetUserId,
              razorpay_subscription_id: subscriptionId,
              razorpay_order_id: payment?.order_id || null,
              razorpay_payment_id: payment?.id || null,
              plan: "pro",
              status: "active",
              current_period_start: periodStart,
              current_period_end: periodEnd,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (insertSubError) {
            console.error(
              "[Razorpay Webhook] Error inserting subscription row:",
              insertSubError
            );
            throw insertSubError;
          }
        }

        console.info(
          `[Razorpay Webhook] Successfully upgraded user ${targetUserId} to pro for subscription ${subscriptionId}`
        );
        break;
      }

      // ----------------------------------------------------------------------
      // EVENT: subscription.cancelled / subscription.halted
      // ----------------------------------------------------------------------
      case "subscription.cancelled":
      case "subscription.halted": {
        const subscription = payload?.subscription?.entity;
        const payment = payload?.payment?.entity;
        const subscriptionId = subscription?.id || payment?.subscription_id;

        if (!subscriptionId) {
          console.warn(
            `[Razorpay Webhook] ${event} received without subscription ID`
          );
          return NextResponse.json(
            { status: "ok", warning: "Missing subscription ID" },
            { status: 200 }
          );
        }

        // 1. Locate the user via subscription ID in public.subscriptions
        const { data: subRecord, error: subFetchError } = await supabase
          .from("subscriptions")
          .select("id, user_id")
          .eq("razorpay_subscription_id", subscriptionId)
          .maybeSingle();

        if (subFetchError) {
          console.error(
            "[Razorpay Webhook] Error querying subscription for cancellation:",
            subFetchError
          );
        }

        let targetUserId = subRecord?.user_id;

        // Fallback user resolution if subscription record wasn't indexed yet
        if (!targetUserId) {
          const userIdHint =
            typeof subscription?.notes?.user_id === "string"
              ? subscription.notes.user_id
              : typeof subscription?.notes?.userId === "string"
              ? subscription.notes.userId
              : undefined;

          const emailHint =
            typeof payment?.email === "string"
              ? payment.email
              : typeof subscription?.notes?.email === "string"
              ? subscription.notes.email
              : undefined;

          targetUserId = await resolveUserId(supabase, {
            userIdHint,
            emailHint,
            subscriptionId,
          });
        }

        if (!targetUserId && !subRecord) {
          console.warn(
            `[Razorpay Webhook] Could not locate user or subscription for ${subscriptionId}. Acknowledging event.`
          );
          return NextResponse.json(
            {
              status: "ok",
              warning: "Subscription or associated user not found",
            },
            { status: 200 }
          );
        }

        // 2. Update public.profiles setting plan = 'free'
        if (targetUserId) {
          const { error: profileDowngradeError } = await supabase
            .from("profiles")
            .update({
              plan: "free",
              word_limit: 5000, // Standard free tier limit
              updated_at: new Date().toISOString(),
            })
            .eq("id", targetUserId);

          if (profileDowngradeError) {
            console.error(
              "[Razorpay Webhook] Error downgrading profile to free:",
              profileDowngradeError
            );
            throw profileDowngradeError;
          }
        }

        // 3. Update public.subscriptions status to 'cancelled'
        if (subRecord || subscriptionId) {
          const { error: subCancelError } = await supabase
            .from("subscriptions")
            .update({
              status: "cancelled",
              updated_at: new Date().toISOString(),
            })
            .eq("razorpay_subscription_id", subscriptionId);

          if (subCancelError) {
            console.error(
              "[Razorpay Webhook] Error updating subscription status to cancelled:",
              subCancelError
            );
            throw subCancelError;
          }
        }

        console.info(
          `[Razorpay Webhook] Successfully processed ${event} for subscription ${subscriptionId} (User: ${targetUserId || "unmapped"})`
        );
        break;
      }

      default: {
        console.info(
          `[Razorpay Webhook] Unhandled event received: ${event}. Acknowledged with status 200.`
        );
        break;
      }
    }

    // 4. Return clean { status: 'ok' } JSON response with 200 HTTP status code
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error: unknown) {
    console.error("[Razorpay Webhook] Unexpected processing failure:", error);
    return NextResponse.json(
      { error: "Internal server error during webhook processing" },
      { status: 500 }
    );
  }
}
