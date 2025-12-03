// lib/supabaseServer.js
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function supabaseServer() {
  const cookieStore = cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createServerClient(url, key, {
    cookies: {
      get(name) {
        // Return ONLY the value string
        return cookieStore.get(name)?.value;
      },
      set() {
        /* no-op in RSC; middleware updates cookies */
      },
      remove() {
        /* no-op in RSC; middleware updates cookies */
      },
    },
  });
}
