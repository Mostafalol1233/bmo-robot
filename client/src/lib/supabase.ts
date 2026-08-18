import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabase = url && publishableKey ? createClient(url, publishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
}) : null;

export async function getPlayerId() {
  const stored = window.localStorage.getItem("bmo-player");
  if (stored) return stored;
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user.id) {
      window.localStorage.setItem("bmo-player", data.session.user.id);
      return data.session.user.id;
    }
    const anonymous = await supabase.auth.signInAnonymously();
    if (anonymous.data.user?.id) {
      window.localStorage.setItem("bmo-player", anonymous.data.user.id);
      return anonymous.data.user.id;
    }
  }
  const fallback = `guest-${crypto.randomUUID()}`;
  window.localStorage.setItem("bmo-player", fallback);
  return fallback;
}
