import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { maps } from "@/content/maps";

export const metadata: Metadata = {
  title: "Cartographie",
  description: "Atlas de cartes : relief, bathymétrie et cartes d'atlas à l'ancienne, avec leurs choix sémiologiques.",
};

export default function AtlasPage() {
  return (
    <div className="theme-parchment paper-grain min-h-dvh">
      <header className="pb-14 pt-32 sm:pt-40">
        <Container>
          <div className="border-y-2 border-[#2a2016] py-1">
            <div className="flex flex-col gap-6 border-y border-[#2a2016] px-2 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div>
                <p className="coord uppercase">Planches · 2023 – 2025</p>
                <h1 className="map-caps mt-3 text-6xl leading-none sm:text-8xl">Atlas</h1>
              </div>
              <p className="max-w-md font-serif text-xl italic leading-snug text-muted">
                Une carte, c&apos;est une suite de choix : ce qu&apos;on garde, ce qu&apos;on efface, ce qu&apos;on met en avant. Chaque planche est
                accompagnée des siens.
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section className="pb-28">
        <Container>
          <ol className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {maps.map((m, i) => (
              <li key={m.slug} className={i === 0 ? "md:col-span-2" : ""}>
                <Reveal delay={(i % 2) * 120}>
                  <Link href={`/cartographie/${m.slug}`} className="group block">
                    <div className="relative overflow-hidden border border-[#2a2016]/40 bg-[#e3d4b6] p-2 shadow-[0_20px_50px_-20px_rgba(60,40,20,0.45)]">
                      <div className="relative overflow-hidden" style={{ aspectRatio: `${m.width} / ${m.height}` }}>
                        <Image
                          src={m.image}
                          alt={`${m.title}, ${m.subtitle}`}
                          fill
                          sizes={i === 0 ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <p className="coord uppercase">
                          Planche {String(i + 1).padStart(2, "0")} · {m.style} · {m.year}
                        </p>
                        <h2 className="map-caps mt-2 text-3xl sm:text-4xl">{m.title}</h2>
                        <p className="mt-1 font-serif text-lg italic text-muted">{m.subtitle}</p>
                      </div>
                      <span className="coord hidden shrink-0 pt-1 text-right sm:block">{m.extent}</span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </div>
  );
}
