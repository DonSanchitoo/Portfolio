import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Reveal } from "@/components/Reveal";
import { Container, Stat, Tag } from "@/components/ui";
import { chainProjects, getProject, publishedProjects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.title, description: p.tagline } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = publishedProjects.indexOf(project);
  const next = publishedProjects[(i + 1) % publishedProjects.length];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line pb-16 pt-32 sm:pt-40">
        <div aria-hidden className="graticule absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative">
          <Link href="/projets" className="coord uppercase hover:text-fg">
            ← Projets
          </Link>
          <p className="coord mt-8 uppercase">
            {project.kind} · {project.year} · {project.status}
          </p>
          <h1 className="map-caps mt-4 text-5xl leading-none text-fg sm:text-7xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-snug text-fg/90 sm:text-3xl">{project.tagline}</p>
          {project.chain && <ChainBadge position={project.chain} />}
        </Container>
      </header>

      <Container className="py-16 sm:py-20">
        {project.highlights.length > 0 && (
          <Reveal>
            <div className="grid gap-8 sm:grid-cols-3">
              {project.highlights.map((h) => (
                <Stat key={h.label} {...h} />
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <Block label="Contexte">{project.context}</Block>
            <Block label="Le problème">{project.problem}</Block>
          </Reveal>
          <Reveal delay={100}>
            <p className="coord uppercase">Ce que j&apos;ai construit</p>
            <ol className="mt-5 space-y-5">
              {project.solution.map((s, k) => (
                <li key={k} className="flex gap-4">
                  <span className="mt-1 font-mono text-xs text-sienna">{String(k + 1).padStart(2, "0")}</span>
                  <p className="leading-relaxed text-fg/90">{s}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <FlowDiagram steps={project.flow} />
        </Reveal>

        <Reveal className="mt-16">
          <p className="coord uppercase">Stack</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          {project.links && (
            <div className="mt-8 flex flex-wrap gap-4">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </Container>

      <nav className="border-t border-line" aria-label="Projet suivant">
        <Link href={`/projets/${next.slug}`} className="group block">
          <Container className="flex items-center justify-between gap-6 py-12">
            <div>
              <p className="coord uppercase">Projet suivant</p>
              <p className="mt-2 font-serif text-3xl text-fg sm:text-4xl">{next.title}</p>
            </div>
            <span aria-hidden className="text-3xl text-accent transition-transform group-hover:translate-x-2">→</span>
          </Container>
        </Link>
      </nav>
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="coord uppercase">{label}</p>
      <p className="mt-4 text-lg leading-relaxed text-fg/90">{children}</p>
    </div>
  );
}

function ChainBadge({ position }: { position: number }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <span className="coord uppercase">Récit « de la donnée au camion »</span>
      <ol className="flex items-center gap-2">
        {chainProjects.map((p, k) => (
          <li key={p.slug} className="flex items-center gap-2">
            {k > 0 && <span aria-hidden className="w-6 border-t border-dashed border-sienna" />}
            <Link
              href={`/projets/${p.slug}`}
              aria-current={k + 1 === position ? "page" : undefined}
              className={`rounded-full border px-3 py-1 font-mono text-xs ${
                k + 1 === position ? "border-sienna bg-sienna text-bg" : "border-line-strong text-muted hover:text-fg"
              }`}
            >
              {k + 1}. {p.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
