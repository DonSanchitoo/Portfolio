import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Container, PageHeader, Tag } from "@/components/ui";
import { journey, profile, skills } from "@/content/profile";

export const metadata: Metadata = {
  title: "Parcours",
  description: "Parcours et compétences : géomatique, bases de données spatiales, développement SIG et cartographie.",
};

export default function JourneyPage() {
  return (
    <>
      <PageHeader kicker="Itinéraire" title="Parcours" lead={profile.intro} />

      <section className="py-20 sm:py-28">
        <Container>
          <ol className="relative ml-4 sm:ml-40">
            <span aria-hidden className="absolute bottom-2 left-0 top-2 border-l-2 border-dashed border-sienna/70" />
            {journey.map((s, i) => (
              <li key={s.title} className="relative pb-16 pl-10 last:pb-0 sm:pl-14">
                <Reveal delay={i * 80}>
                  <span
                    aria-hidden
                    className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-sienna ${i === 0 ? "bg-sienna" : "bg-bg"}`}
                  />
                  <p className="coord uppercase sm:absolute sm:-left-40 sm:top-1 sm:w-32 sm:text-right">{s.period}</p>
                  <h2 className="mt-2 font-serif text-3xl leading-tight text-fg sm:mt-0">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {s.org} · {s.place}
                  </p>
                  <ul className="mt-4 max-w-2xl space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed text-fg/85">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-sienna" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-line bg-bg-2 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="coord uppercase">Légende</p>
            <h2 className="mt-4 font-serif text-4xl text-fg sm:text-5xl">Compétences, rangées par usage</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={i * 80}>
                <p className="map-caps text-lg text-accent">{g.group}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <Tag key={it}>{it}</Tag>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <p className="text-muted">
              Langues : anglais (B2), espagnol (B1).{" "}
              <span className="text-fg">Permis B.</span>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
