import type { CSSProperties } from "react";
import type { FlowStep } from "@/content/projects";

// Schéma d'architecture : une chaîne d'étapes reliées par un trait d'itinéraire.
// Horizontal sur grand écran, vertical sur mobile.
export function FlowDiagram({ steps, title = "Chaîne de traitement" }: { steps: FlowStep[]; title?: string }) {
  if (!steps.length) return null;
  return (
    <figure className="rounded-sm border border-line bg-card p-5 sm:p-8">
      <figcaption className="coord mb-6 uppercase">{title}</figcaption>
      <ol
        className="relative grid gap-6 md:gap-0 md:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
        style={{ "--steps": steps.length } as CSSProperties}
      >
        {steps.map((s, i) => (
          <li key={s.label} className="relative flex gap-4 md:block md:pr-4">
            {/* Trait vers l'étape suivante */}
            {i < steps.length - 1 && (
              <>
                <span aria-hidden className="absolute left-[11px] top-7 h-[calc(100%+0.25rem)] w-px border-l border-dashed border-sienna md:hidden" />
                <span aria-hidden className="absolute left-7 right-0 top-[11px] hidden border-t border-dashed border-sienna md:block" />
              </>
            )}
            <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sienna bg-bg">
              <span className="h-2 w-2 rounded-full bg-sienna" />
            </span>
            <div className="md:mt-4">
              <p className="coord">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-serif text-xl leading-tight text-fg">{s.label}</p>
              {s.detail && <p className="mt-1 text-sm text-muted">{s.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
