"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/signin");
        return;
      }
      const u = data.session.user;
      setEmail(u.email || "");

      // ensure a profile row exists
      const { data: prof } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", u.id)
        .maybeSingle();
      if (!prof) await supabase.from("profiles").insert({ user_id: u.id });

      // load profile
      const { data: p } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", u.id)
        .maybeSingle();

      const set = (id, v) => {
        const el = document.getElementById(id);
        if (el) el.value = v || "";
      };
      set("first_name", p?.first_name);
      set("last_name", p?.last_name);
      set("phone", p?.phone);
      set("address", p?.address);
      set("city", p?.city);
      set("postal", p?.postal);
      set("country", p?.country);
      set("interest", p?.interest);
    })();
  }, [router]);

  const onSaveProfile = useCallback(async (e) => {
    e.preventDefault();
    setSaving(true); setMsg("Saving...");
    const f = e.currentTarget;
    const val = (id) => f.querySelector(`#${id}`)?.value || null;

    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session.user.id;

    const payload = {
      first_name: val("first_name"),
      last_name: val("last_name"),
      phone: val("phone"),
      address: val("address"),
      city: val("city"),
      postal: val("postal"),
      country: val("country"),
      interest: val("interest"),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("profiles").update(payload).eq("user_id", uid);
    setSaving(false);
    if (error) setMsg(error.message);
    else setMsg("Profile saved.");
  }, []);

  const onChangePassword = useCallback(async (e) => {
    e.preventDefault();
    setPwSaving(true); setPwMsg("Updating password...");
    const f = e.currentTarget;
    const oldPw = f.querySelector("#old_password")?.value || "";
    const newPw = f.querySelector("#new_password")?.value || "";
    const newPw2 = f.querySelector("#new_password_confirm")?.value || "";

    if (newPw.length < 8) { setPwSaving(false); return setPwMsg("New password must be at least 8 characters."); }
    if (newPw !== newPw2) { setPwSaving(false); return setPwMsg("New passwords do not match."); }

    const { data } = await supabase.auth.getSession();
    const email = data.session.user.email;

    const { error: reauthErr } = await supabase.auth.signInWithPassword({ email, password: oldPw });
    if (reauthErr) { setPwSaving(false); return setPwMsg("Current password is incorrect."); }

    const { error: updErr } = await supabase.auth.updateUser({ password: newPw });
    setPwSaving(false);
    if (updErr) setPwMsg(updErr.message);
    else setPwMsg("Password updated successfully.");
  }, []);

  const onSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  }, [router]);

  return (
    <main className="page-register">
      <section className="hero hero--plain" style={{ minHeight: "34vh" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h1>My Profile</h1>
          <p>Manage your account information and preferences.</p>
          <p style={{ opacity: .9, marginTop: ".4rem" }} id="profile-email">
            Signed in as {email}
          </p>
          <p style={{ marginTop: "12px" }}>
            <button className="btn" onClick={onSignOut}>Sign out</button>
          </p>
        </div>
      </section>

      {/* Profile details */}
      <section className="lead-capture">
        <div className="container">
          <form className="lead-form" id="profile-form" onSubmit={onSaveProfile} autoComplete="on">
            <h2 style={{ margin: "0 0 .5rem" }}>Profile details</h2>

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
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
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

            <div className="actions">
              <button className="btn cta" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save profile"}
              </button>
            </div>

            <p id="profile-status" style={{ margin: ".4rem 0 0", opacity: .9 }}>{msg}</p>
          </form>
        </div>
      </section>

      {/* Change password */}
      <section className="lead-capture">
        <div className="container">
          <form className="lead-form" id="password-form" onSubmit={onChangePassword} autoComplete="off">
            <h2 style={{ margin: "0 0 .5rem" }}>Change password</h2>

            <div className="grid three-col">
              <div className="field">
                <label htmlFor="old_password">Current password</label>
                <input id="old_password" name="old_password" type="password" autoComplete="current-password" required />
              </div>
              <div className="field">
                <label htmlFor="new_password">New password</label>
                <input id="new_password" name="new_password" type="password" minLength={8} required />
              </div>
              <div className="field">
                <label htmlFor="new_password_confirm">Confirm new password</label>
                <input id="new_password_confirm" name="new_password_confirm" type="password" minLength={8} required />
              </div>
            </div>

            <div className="actions">
              <button className="btn" type="submit" disabled={pwSaving}>
                {pwSaving ? "Updating..." : "Update password"}
              </button>
            </div>

            <p id="password-status" style={{ margin: ".4rem 0 0", opacity: .9 }}>{pwMsg}</p>
          </form>
        </div>
      </section>
    </main>
  );
}
