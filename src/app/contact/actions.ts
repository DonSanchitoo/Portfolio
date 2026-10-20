"use server";

import { publicClient, supabaseConfigured } from "@/lib/supabase";

export type ContactState = { status: "idle" | "ok" | "error"; message?: string };

export async function sendMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Champ piège : un humain ne le voit pas, un robot le remplit.
  if (form.get("site")) return { status: "ok" };

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  if (!name || !email || !message) return { status: "error", message: "Merci de remplir les trois champs." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "Cette adresse e-mail semble invalide." };
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return { status: "error", message: "Message trop long." };
  }

  if (!supabaseConfigured) {
    return { status: "error", message: "Le formulaire n'est pas encore branché. Écrivez-moi directement par e-mail." };
  }

  const { error } = await publicClient().from("messages").insert({ name, email, message });
  if (error) return { status: "error", message: "L'envoi a échoué. Réessayez, ou écrivez-moi par e-mail." };
  return { status: "ok" };
}
