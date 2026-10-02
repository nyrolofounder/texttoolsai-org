import { createClient, SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

/**
 * Returns a Supabase client configured with the service role key.
 * This client bypasses Row Level Security (RLS) and is strictly intended
 * for trusted server-side environments such as background webhooks and cron jobs.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) {
    return adminClient;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "https://dummy-project.supabase.co";

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "dummy-anon-key-for-building";

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      "[Supabase Admin] SUPABASE_SERVICE_ROLE_KEY is not defined. Falling back to ANON key. Database mutations may be rejected by RLS if policies are enforced."
    );
  }

  adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return adminClient;
}

/**
 * Helper to override the admin client in automated testing environments.
 */
export function setSupabaseAdmin(client: SupabaseClient | null): void {
  adminClient = client;
}
