import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { chainProjects, publishedProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projets",
  description: "Plugins QGIS, applications web et mobiles, automatisations Python : études de cas du problème à la solution.",
};

export default function ProjectsPage() {
  const rest = publishedProjects.filter((p) => !p.chain);
  return (
    <>
      <PageHeader
        kicker={`${publishedProjects.length} projets · 2025 – 2026`}
        title="Projets"
        lead="Chaque projet part d'un problème concret posé par une équipe métier. Les noms d'entreprises et les données sensibles sont volontairement retirés ; le raisonnement, lui, est complet."
      />

      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading kicker="Le récit" title={<>De la donnée <em className="text-accent">au camion</em></>} />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {chainProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-28">
        <Container>
          <Reveal>
            <SectionHeading kicker="Autres réalisations" title="Analyser, automatiser, outiller." />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} index={i + chainProjects.length} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
