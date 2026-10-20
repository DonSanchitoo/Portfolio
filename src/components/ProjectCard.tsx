import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-line bg-card p-6 transition-colors hover:border-accent/60 sm:p-8"
    >
      <div aria-hidden className="graticule absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="coord uppercase">{project.kind}</p>
          <p className="coord">{String(index + 1).padStart(2, "0")}</p>
        </div>
        <h3 className="mt-6 font-serif text-3xl leading-tight text-fg">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.tagline}</p>
      </div>
      <div className="relative mt-8 flex items-end justify-between gap-4">
        <p className="coord">{project.year} · {project.status}</p>
        <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
