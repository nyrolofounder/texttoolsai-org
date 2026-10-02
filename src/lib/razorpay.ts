/**
 * Razorpay Checkout SDK client helper and script loader for TextToolsAI
 */

export const RAZORPAY_PLANS = {
  monthly: "plan_Tj1rSRBBENIDog",
  annual: "plan_Tj1sTKCx030tIK",
} as const;

export type RazorpayPlanType = keyof typeof RAZORPAY_PLANS;

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  subscription_id?: string;
  order_id?: string;
  plan_id?: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    animation?: boolean;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

/**
 * Dynamically loads the official Razorpay checkout script if not already present in the DOM.
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`
    );

    if (existingScript) {
      if (existingScript.getAttribute("data-loaded") === "true") {
        resolve(true);
        return;
      }
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-loaded", "false");

    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve(true);
    };

    script.onerror = () => {
      console.error("[Razorpay SDK] Failed to load checkout script from CDN.");
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export interface LaunchRazorpayCheckoutOptions {
  planId?: string;
  billingCycle?: "monthly" | "annual";
  subscriptionId?: string;
  keyId?: string;
  customerName?: string;
  customerEmail?: string;
  userId?: string;
  notes?: Record<string, string>;
  onSuccess?: (response: RazorpaySuccessResponse) => void;
  onDismiss?: () => void;
}

/**
 * Initiates Razorpay checkout popup modal with the specified subscription and styling.
 * Automatically resolves and attaches the active plan ID (monthly or annual).
 */
export async function launchRazorpayCheckout({
  planId,
  billingCycle,
  subscriptionId,
  keyId,
  customerName,
  customerEmail,
  userId,
  notes = {},
  onSuccess,
  onDismiss,
}: LaunchRazorpayCheckoutOptions = {}): Promise<void> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    throw new Error(
      "Razorpay Checkout script could not be loaded. Please disable ad blockers and try again."
    );
  }

  // Resolve target plan ID and cycle
  const resolvedCycle: "monthly" | "annual" =
    billingCycle ||
    (planId === RAZORPAY_PLANS.monthly ? "monthly" : "annual");

  const resolvedPlanId =
    planId ||
    (resolvedCycle === "annual" ? RAZORPAY_PLANS.annual : RAZORPAY_PLANS.monthly);

  let activeSubscriptionId = subscriptionId;
  let activeKey =
    keyId ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    "rzp_test_placeholder";

  // If subscriptionId was not directly passed, create one via backend API
  if (!activeSubscriptionId) {
    try {
      const res = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: resolvedPlanId,
          billingCycle: resolvedCycle,
          userId,
          email: customerEmail,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.subscriptionId) {
          activeSubscriptionId = data.subscriptionId;
        }
        if (data.keyId) {
          activeKey = data.keyId;
        }
      }
    } catch (fetchErr) {
      console.warn(
        "[Razorpay] Could not pre-generate session via server, using client fallback:",
        fetchErr
      );
    }

    // Client-side fallback subscription ID if API was unreachable
    if (!activeSubscriptionId) {
      activeSubscriptionId = `sub_${resolvedPlanId}_${Date.now().toString(36)}`;
    }
  }

  const options: RazorpayOptions = {
    key: activeKey,
    subscription_id: activeSubscriptionId,
    plan_id: resolvedPlanId,
    name: "TextToolsAI",
    description:
      resolvedCycle === "annual"
        ? "Pro Creator Tier (Annual Plan - Save 20%)"
        : "Pro Creator Tier (Monthly Plan)",
    image: "https://texttoolsai.org/favicon.ico",
    handler: (response: RazorpaySuccessResponse) => {
      if (onSuccess) {
        onSuccess(response);
      }
    },
    prefill: {
      name: customerName || "",
      email: customerEmail || "",
    },
    notes: {
      plan_id: resolvedPlanId,
      billing_cycle: resolvedCycle,
      ...notes,
    },
    theme: {
      color: "#6366f1",
      backdrop_color: "rgba(3, 7, 18, 0.85)",
    },
    modal: {
      ondismiss: () => {
        if (onDismiss) onDismiss();
      },
      escape: true,
      animation: true,
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
}

