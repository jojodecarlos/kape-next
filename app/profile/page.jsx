// app/profile/page.jsx
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const supabase = supabaseServer();

  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  if (error || !user) redirect("/signin");

  await supabase
    .from("profiles")
    .upsert({ user_id: user.id }, { onConflict: "user_id", ignoreDuplicates: true });

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return <ProfileClient initialProfile={profile || null} email={user.email || ""} />;
}
