import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured = Boolean(url && key);

/** Client public : soumis aux règles RLS, sans session. */
export function publicClient() {
  if (!url || !key) throw new Error("Supabase n'est pas configuré");
  return createClient(url, key, { auth: { persistSession: false } });
}
