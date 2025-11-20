"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SignInPage() {
  const router = useRouter();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const email = f.querySelector("#signin_email")?.value.trim();
    const password = f.querySelector("#signin_password")?.value || "";

    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    // Ensure a profile row exists (email confirmation ON cases)
    if (data.session?.user) {
      const uid = data.session.user.id;
      const { data: exists } = await supabase.from("profiles").select("user_id").eq("user_id", uid).maybeSingle();
      if (!exists) await supabase.from("profiles").insert({ user_id: uid });
    }

    router.push("/profile");
  }, [router]);

  return (
    <main className="page-register">
      <section className="hero" style={{ minHeight: "40vh" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h1>Sign in</h1>
          <p>Welcome back—sign in to manage your account and orders.</p>
        </div>
      </section>

      <section className="lead-capture">
        <div className="container">
          <form className="lead-form" id="signin-form" onSubmit={onSubmit}>
            <div className="grid two-col">
              <div className="field">
                <label htmlFor="signin_email">Email</label>
                <input id="signin_email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="signin_password">Password</label>
                <input id="signin_password" name="password" type="password" autoComplete="current-password" required />
              </div>
            </div>
            <div className="actions">
              <button type="submit" className="btn">Sign in</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
