"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useCallback } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const f = e.currentTarget;

    const get = (id) => f.querySelector(`#${id}`);
    const email = get("email")?.value.trim();
    const password = get("password")?.value || "";
    const confirm = get("confirm_password")?.value || "";

    if (!email || !password) return alert("Email and password are required.");
    if (password !== confirm) return alert("Passwords do not match.");

    // Sign up
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/signin` },
    });
    if (error) return alert(error.message);

    // If a session exists (email confirmation OFF), insert profile immediately
    if (data.session && data.user) {
      const payload = {
        user_id: data.user.id,
        first_name: get("first_name")?.value || null,
        last_name: get("last_name")?.value || null,
        phone: get("phone")?.value || null,
        address: get("address")?.value || null,
        city: get("city")?.value || null,
        postal: get("postal")?.value || null,
        country: get("country")?.value || null,
        interest: get("interest")?.value || null,
        message: get("message")?.value || null,
      };
      const { error: pErr } = await supabase.from("profiles").insert(payload);
      if (pErr) return alert(pErr.message);
    }

    alert("Account created! Check your email to verify (if required), then sign in.");
    router.push("/signin");
  }, [router]);

  return (
    <main className="page-register">
      <section className="hero hero--plain" style={{ minHeight: "34vh" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h1>Register</h1>
          <p>Get brew guides, product drops, and event updates.</p>
        </div>
      </section>

      <section className="lead-capture">
        <div className="container">
          <form className="lead-form" onSubmit={onSubmit}>
            <div className="grid two-col">
              <div className="field">
                <label htmlFor="first_name">First name</label>
                <input id="first_name" name="first_name" type="text" autoComplete="given-name" />
              </div>
              <div className="field">
                <label htmlFor="last_name">Last name</label>
                <input id="last_name" name="last_name" type="text" autoComplete="family-name" />
              </div>
            </div>

            <div className="grid two-col">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>

            <div className="grid three-col">
              <div className="field">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" autoComplete="address-line1" />
              </div>
              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" autoComplete="address-level2" />
              </div>
              <div className="field">
                <label htmlFor="postal">ZIP/Postal code</label>
                <input id="postal" name="postal" type="text" autoComplete="postal-code" />
              </div>
            </div>

            <div className="grid two-col">
              <div className="field">
                <label htmlFor="country">Country</label>
                <select id="country" name="country" autoComplete="country-name">
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="PH">Philippines</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="interest">Interests</label>
                <select id="interest" name="interest">
                  <option value="">Choose one</option>
                  <option value="beans">Coffee drops</option>
                  <option value="pop-ups">Pop-ups &amp; Events</option>
                  <option value="recipes">Recipes</option>
                  <option value="all">All of the above</option>
                </select>
              </div>
            </div>

            <div className="grid three-col">
              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" minLength={8} required />
              </div>
              <div className="field">
                <label htmlFor="confirm_password">Confirm password</label>
                <input id="confirm_password" name="confirm_password" type="password" minLength={8} required />
              </div>
              <div className="field">
                <label htmlFor="message">Message (optional)</label>
                <input id="message" name="message" type="text" />
              </div>
            </div>

            <div className="actions">
              <button type="submit" className="btn cta">Register</button>
            </div>

            <p style={{ marginTop: "10px" }}>
              Already registered? <a className="btn" href="/signin" style={{ padding: "6px 10px" }}>Sign in here</a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
