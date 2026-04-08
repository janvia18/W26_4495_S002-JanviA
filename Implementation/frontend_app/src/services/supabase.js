import { createClient } from "@supabase/supabase-js";

/** True when both VITE_ vars are set — required for real login and database calls. */
export function isSupabaseConfigured() {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL?.trim() &&
      import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  );
}

// Without a .env, env vars are undefined and createClient would throw (blank screen).
// Placeholders keep the shell loading; login needs a real .env — see supabase/SUPABASE_SETUP.md.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() ||
  "https://example.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  "dev-placeholder-set-vite-env";

if (import.meta.env.DEV && !isSupabaseConfigured()) {
  console.warn(
    "[CyberAware] Add frontend_app/.env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see supabase/SUPABASE_SETUP.md)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
