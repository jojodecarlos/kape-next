import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const supabase = supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/signin");


  const { data: found } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!found) {
    await supabase.from("profiles").insert({ user_id: user.id });
  }


  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return <ProfileClient initialProfile={profile || null} email={user.email || ""} />;
}
