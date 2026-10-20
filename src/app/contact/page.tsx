import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { profile } from "@/content/profile";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Écrire à Matteo Sanchez, géomaticien à Nîmes.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker={`${profile.coords.lat.toFixed(4)}° N · ${profile.coords.lng.toFixed(4)}° E`}
        title="Contact"
        lead="Un poste, une mission de cartographie ou de développement SIG, une question sur un projet : je lis tout."
      />
      <Container className="grid gap-16 py-20 lg:grid-cols-[1.5fr_1fr]">
        <ContactForm />
        <aside className="space-y-8">
          <div>
            <p className="coord uppercase">E-mail</p>
            <a href={`mailto:${profile.email}`} className="mt-2 block font-serif text-2xl text-fg hover:text-accent">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="coord uppercase">Code</p>
            <a href={profile.github} target="_blank" rel="noopener" className="mt-2 block font-serif text-2xl text-fg hover:text-accent">
              GitHub ↗
            </a>
          </div>
          {profile.linkedin && (
            <div>
              <p className="coord uppercase">Réseau</p>
              <a href={profile.linkedin} target="_blank" rel="noopener" className="mt-2 block font-serif text-2xl text-fg hover:text-accent">
                LinkedIn ↗
              </a>
            </div>
          )}
          <div>
            <p className="coord uppercase">Basé à</p>
            <p className="mt-2 font-serif text-2xl text-fg">{profile.location}</p>
          </div>
        </aside>
      </Container>
    </>
  );
}
