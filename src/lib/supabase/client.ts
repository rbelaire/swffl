"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client — used inside client components (the admin area).
 * Returns null when the public env vars are missing, so the app can still
 * render (and prerender) before Supabase is connected.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}
