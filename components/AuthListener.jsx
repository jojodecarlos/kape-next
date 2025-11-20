"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function AuthListener() {
  const router = useRouter();

  useEffect(() => {
    const supabase = supabaseBrowser();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, _session) => {
      router.refresh();
    });

    return () => sub.subscription.unsubscribe();
  }, [router]);

  return null;
}
