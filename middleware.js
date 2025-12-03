// middleware.js
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
  const res = NextResponse.next({ request: { headers: req.headers } });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return res;

  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    });

    await supabase.auth.getSession();
  } catch {
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|Images).*)"],
};
