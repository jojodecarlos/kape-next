// lib/supabaseServer.js
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function supabaseServer() {
  const cookieStore = cookies(); // Readonly cookie store in RSC

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // In Server Components we must provide a read-only cookie adapter.
  // set/remove are NO-OP here; middleware.js keeps the session fresh.
  return createServerClient(url, key, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set() {
        /* no-op in RSC */
      },
      remove() {
        /* no-op in RSC */
      },
    },
  });
}
