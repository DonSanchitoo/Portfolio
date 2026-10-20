import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-8 ${className}`}>{children}</div>;
}

/** En-tête de section façon cartouche : index, coordonnée, titre. */
export function SectionHeading({
  index,
  kicker,
  title,
  lead,
}: {
  index?: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <p className="coord flex items-center gap-3 uppercase">
        {index && <span className="text-sienna">{index}</span>}
        <span className="h-px w-8 bg-line-strong" />
        {kicker}
      </p>
      <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">{title}</h2>
      {lead && <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p>}
    </header>
  );
}

export function PageHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-line pb-16 pt-32 sm:pt-40">
      <div aria-hidden className="graticule absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Container className="relative">
        <p className="coord uppercase">{kicker}</p>
        <h1 className="map-caps mt-4 text-5xl leading-none text-fg sm:text-7xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
      </Container>
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-sienna/60 pl-4">
      <p className="font-serif text-4xl leading-none text-fg sm:text-5xl">{value}</p>
      <p className="mt-2 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-line-strong px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted">
      {children}
    </span>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}
