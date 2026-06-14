import { createClient } from "@supabase/supabase-js";

/** Resolve the Supabase URL from any of the supported env var names. */
export function resolveSupabaseUrl(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL
  );
}

/** Resolve the public (anon/publishable) key from any supported env var name. */
export function resolveSupabaseAnonKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY
  );
}

/**
 * Public Supabase client using the anon/publishable key.
 * Used (server-side, inside a server action) to INSERT guest RSVPs.
 * Subject to Row Level Security — anon may only insert.
 */
export function getPublicSupabase() {
  const url = resolveSupabaseUrl();
  const anonKey = resolveSupabaseAnonKey();

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase URL or anon key. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (VITE_* names are also accepted).",
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
