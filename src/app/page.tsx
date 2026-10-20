import Image from "next/image";
import Link from "next/link";
import { HeroTerrain } from "@/components/HeroTerrain";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, Container, SectionHeading, Stat, Tag } from "@/components/ui";
import { chainProjects, publishedProjects } from "@/content/projects";
import { maps } from "@/content/maps";
import { profile } from "@/content/profile";

const featured = publishedProjects.find((p) => p.featured)!;
const others = publishedProjects.filter((p) => !p.featured && !p.chain);

export default function Home() {
  return (
    <>
      <Hero />
      <TwoCrafts />
      <Chain />
      <Featured />
      <Others />
      <Method />
      <Cta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden" aria-labelledby="hero-title">
      <HeroTerrain />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1114] via-[#0a1114]/30 to-[#0a1114]/60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1114]/85 via-[#0a1114]/20 to-transparent" />

      {/* Rose des vents et échelle, en habillage de carte */}
      <div aria-hidden className="pointer-events-none absolute right-4 top-24 hidden flex-col items-end gap-4 sm:right-16 md:flex">
        <svg width="56" height="56" viewBox="0 0 56 56" className="text-[#e7eee9]/70">
          <circle cx="28" cy="28" r="20" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="28" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 2" />
          <path d="M28 4 L31 28 L28 52 L25 28 Z" fill="currentColor" opacity="0.9" />
          <path d="M4 28 L28 25 L52 28 L28 31 Z" fill="currentColor" opacity="0.4" />
          <text x="28" y="3" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="serif">N</text>
        </svg>
        <div className="text-right">
          <div className="flex h-1.5 w-40 border border-[#e7eee9]/60">
            <span className="w-1/2 bg-[#e7eee9]/60" />
          </div>
          <p className="coord mt-1">0 — 2,5 — 5 km</p>
        </div>
      </div>

      <Container className="relative flex h-full flex-col justify-end pb-24 sm:pb-28">
        <div className="pointer-events-none max-w-3xl">
          <p className="coord flex items-center gap-3 uppercase text-[#e7eee9]/80">
            <span className="h-px w-10 bg-[#d0803f]" />
            {profile.location}
          </p>
          <h1 id="hero-title" className="map-caps mt-6 text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.95] text-[#f3efe4]">
            Matteo
            <br />
            Sanchez
          </h1>
          <p className="mt-6 font-serif text-2xl italic text-[#e7eee9] sm:text-3xl">
            Géomaticien, cartographe et développeur SIG
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#c9d6d2] sm:text-lg">{profile.baseline}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/projets"
            className="rounded-full bg-[#4fc1b3] px-6 py-3 text-sm font-medium text-[#0a1114] transition-colors hover:bg-[#7fd6cb]"
          >
            Voir les projets
          </Link>
          <Link
            href="/cartographie"
            className="rounded-full border border-[#e7eee9]/40 px-6 py-3 text-sm font-medium text-[#e7eee9] transition-colors hover:border-[#e7eee9]"
          >
            Parcourir l&apos;atlas
          </Link>
          <p className="coord hidden lg:block">↻ Faites glisser la carte pour tourner autour de l&apos;Aigoual</p>
        </div>
      </Container>
    </section>
  );
}

function TwoCrafts() {
  const bali = maps[0];
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            index="01"
            kicker="Deux métiers, une même rigueur"
            title={<>Je dessine des cartes. <em className="text-accent">Et les outils qui les font vivre.</em></>}
            lead="D'un côté, la sémiologie : choisir ce qu'on montre et comment on le montre. De l'autre, le code : des plugins, des applications et des automatisations qui font gagner du temps aux équipes de terrain. Les deux se nourrissent."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Link href="/cartographie" className="theme-parchment paper-grain group relative block overflow-hidden rounded-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={bali.image}
                  alt="Carte en relief de Bali, Indonésie"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <div className="flex items-end justify-between gap-6 p-6 sm:p-8">
                <div>
                  <p className="coord uppercase">Cartographie · {maps.length} cartes</p>
                  <p className="mt-2 font-serif text-3xl">L&apos;atlas</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                    Relief, bathymétrie, atlas à l&apos;ancienne. Des cartes à explorer au zoom, avec leurs choix graphiques.
                  </p>
                </div>
                <span aria-hidden className="text-2xl text-accent transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <Link href="/projets" className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-bg-2">
              <div className="graticule relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6">
                <CodeCard />
              </div>
              <div className="flex items-end justify-between gap-6 p-6 sm:p-8">
                <div>
                  <p className="coord uppercase">Développement · {publishedProjects.length} projets</p>
                  <p className="mt-2 font-serif text-3xl">Les outils</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                    Plugins QGIS, applications web et mobiles, automatisations Python. Chaque projet raconté du problème à la solution.
                  </p>
                </div>
                <span aria-hidden className="text-2xl text-accent transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CodeCard() {
  return (
    <pre className="w-full max-w-md overflow-hidden rounded-sm border border-line bg-[#0a1114]/90 p-5 font-mono text-[0.72rem] leading-relaxed text-[#93a8a3] shadow-2xl shadow-black/40 transition-transform duration-700 group-hover:-translate-y-1 sm:text-xs">
      <code>
        <span className="text-[#d0803f]">SELECT</span> o.id, o.geom,{"\n"}
        {"       "}ST_Distance(o.geom, r.geom) <span className="text-[#d0803f]">AS</span> d{"\n"}
        <span className="text-[#d0803f]">FROM</span> ouvrages o{"\n"}
        <span className="text-[#d0803f]">JOIN</span> itineraire r{"\n"}
        {"  "}<span className="text-[#d0803f]">ON</span> ST_DWithin(o.geom, r.geom, <span className="text-[#4fc1b3]">15</span>){"\n"}
        <span className="text-[#d0803f]">WHERE</span> o.hauteur {"<"} <span className="text-[#4fc1b3]">4.30</span>;{"\n"}
        {"\n"}
        <span className="text-[#5f7470]"># 3 ouvrages sous le gabarit du convoi</span>
      </code>
    </pre>
  );
}

function Chain() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-2 py-24 sm:py-32">
      <div aria-hidden className="graticule absolute inset-0 opacity-40" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            index="02"
            kicker="Un récit en trois outils"
            title={<>De la donnée <em className="text-accent">au camion.</em></>}
            lead="Mesurer la hauteur réelle sous les ponts d'un réseau routier, pour que les poids lourds ne s'y coincent pas. Trois outils, conçus pour s'enchaîner : on qualifie les ouvrages, on planifie la collecte, on envoie les trajets aux tablettes des conducteurs."
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-6">
          <span aria-hidden className="absolute left-[15px] top-4 bottom-4 border-l-2 border-dashed border-sienna/70 lg:left-0 lg:right-0 lg:top-[15px] lg:bottom-auto lg:border-l-0 lg:border-t-2" />
          {chainProjects.map((p, i) => (
            <li key={p.slug} className="relative pl-12 lg:pl-0 lg:pt-14">
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-sienna bg-bg-2 font-mono text-xs text-sienna">
                {i + 1}
              </span>
              <Reveal delay={i * 120}>
                <p className="coord uppercase">{["Qualifier", "Planifier", "Livrer"][i]} · {p.kind}</p>
                <h3 className="mt-3 font-serif text-3xl text-fg">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                <div className="mt-6">
                  <ArrowLink href={`/projets/${p.slug}`}>Lire l&apos;étude de cas</ArrowLink>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Featured() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <SectionHeading
              index="03"
              kicker={`Projet phare · ${featured.kind}`}
              title={featured.title}
              lead={featured.tagline}
            />
            <p className="mt-6 max-w-xl leading-relaxed text-muted">{featured.problem}</p>
            <div className="mt-8">
              <ArrowLink href={`/projets/${featured.slug}`}>Comment ça marche</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-3 gap-6">
              {featured.highlights.map((h) => (
                <Stat key={h.label} {...h} />
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-14">
          <FlowDiagram steps={featured.flow} />
        </Reveal>
      </Container>
    </section>
  );
}

function Others() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <SectionHeading index="04" kicker="Et aussi" title="Automatiser, analyser, ouvrir le code." />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const method = [
  {
    title: "Cadrer",
    text: "Chaque évolution part d'un ticket : le besoin métier, les critères d'acceptation, une estimation. On sait ce qu'on livre avant d'écrire une ligne.",
  },
  {
    title: "Construire",
    text: "Je développe avec Claude Code comme binôme : je décide de l'architecture et des règles métier, l'IA accélère l'écriture et explore le code existant.",
  },
  {
    title: "Vérifier",
    text: "Un agent de recette indépendant relit chaque livraison, joue les tests et rend un score de confiance. Rien ne part en production sans ce passage.",
  },
];

function Method() {
  return (
    <section className="border-y border-line bg-bg-2 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            index="05"
            kicker="Méthode"
            title={<>Livrer vite, <em className="text-accent">sans livrer n&apos;importe quoi.</em></>}
            lead="Pour mener plusieurs outils de front, j'ai monté une méthode de travail augmentée par l'IA, mais encadrée : tickets, tests, recette. Les chiffres de chaque projet en sont la trace."
          />
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {method.map((m, i) => (
            <Reveal key={m.title} delay={i * 100}>
              <p className="coord text-sienna">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-serif text-3xl text-fg">{m.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="graticule absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="relative text-center">
        <p className="coord uppercase">Point d&apos;arrivée</p>
        <h2 className="map-caps mx-auto mt-6 max-w-4xl text-4xl leading-tight text-fg sm:text-6xl">Un projet à cartographier ?</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Un poste, une mission ou juste une question sur un projet : écrivez-moi.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-block rounded-full bg-accent px-8 py-4 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Me contacter
        </Link>
      </Container>
    </section>
  );
}
