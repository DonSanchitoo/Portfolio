"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "./actions";

const field =
  "mt-2 w-full rounded-sm border border-line-strong bg-transparent px-4 py-3 text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: "idle" });

  if (state.status === "ok") {
    return (
      <div role="status" className="rounded-sm border border-accent/50 bg-card p-8">
        <p className="map-caps text-xl text-accent">Message reçu</p>
        <p className="mt-3 text-muted">Merci, je vous réponds rapidement.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="coord uppercase">Nom</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="coord uppercase">E-mail</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="coord uppercase">Message</span>
        <textarea name="message" required rows={6} className={field} placeholder="Un poste, une mission, une question…" />
      </label>
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state.status === "error" && (
        <p role="alert" className="text-sm text-sienna">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
