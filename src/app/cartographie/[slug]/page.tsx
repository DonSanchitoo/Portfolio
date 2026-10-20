import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeepZoom } from "@/components/DeepZoom";
import { Container } from "@/components/ui";
import { getMap, maps } from "@/content/maps";

export const dynamicParams = false;

export function generateStaticParams() {
  return maps.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cartographie/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = getMap(slug);
  return m ? { title: m.title, description: `${m.subtitle}. ${m.description}`, openGraph: { images: [m.image] } } : {};
}

export default async function MapPage({ params }: PageProps<"/cartographie/[slug]">) {
  const { slug } = await params;
  const map = getMap(slug);
  if (!map) notFound();

  const i = maps.indexOf(map);
  const next = maps[(i + 1) % maps.length];

  return (
    <div className="theme-parchment paper-grain min-h-dvh pb-24 pt-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/cartographie" className="coord uppercase hover:text-fg">
              ← Atlas
            </Link>
            <h1 className="map-caps mt-4 text-5xl leading-none sm:text-7xl">{map.title}</h1>
            <p className="mt-2 font-serif text-xl italic text-muted">{map.subtitle}</p>
          </div>
          <p className="coord">{map.extent}</p>
        </div>

        <div className="mt-10 border border-[#2a2016]/40 bg-[#e3d4b6] p-2 shadow-[0_30px_60px_-30px_rgba(60,40,20,0.5)]">
          <DeepZoom src={map.image} alt={`${map.title}, ${map.subtitle}`} width={map.width} height={map.height} />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <section>
            <p className="coord uppercase">Le propos</p>
            <p className="mt-4 font-serif text-2xl leading-snug">{map.description}</p>

            <p className="coord mt-12 uppercase">Choix graphiques</p>
            <ol className="mt-5 space-y-4">
              {map.choices.map((c, k) => (
                <li key={k} className="flex gap-4">
                  <span className="mt-1 font-mono text-xs text-accent">{String(k + 1).padStart(2, "0")}</span>
                  <p className="leading-relaxed">{c}</p>
                </li>
              ))}
            </ol>
          </section>

          <aside className="self-start border-2 border-[#2a2016] p-1">
            <div className="border border-[#2a2016] p-6">
              <p className="map-caps text-lg">Légende de fabrication</p>
              <dl className="mt-6 space-y-6 text-sm">
                <div>
                  <dt className="coord uppercase">Année</dt>
                  <dd className="mt-1">{map.year}</dd>
                </div>
                <div>
                  <dt className="coord uppercase">Sources</dt>
                  <dd className="mt-1">
                    <ul className="space-y-1">
                      {map.sources.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="coord uppercase">Outils</dt>
                  <dd className="mt-1">{map.tools.join(", ")}</dd>
                </div>
                <div>
                  <dt className="coord uppercase">Style</dt>
                  <dd className="mt-1">{map.style}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <Link href={`/cartographie/${next.slug}`} className="group mt-20 flex items-center justify-between border-t border-line-strong pt-10">
          <div>
            <p className="coord uppercase">Planche suivante</p>
            <p className="map-caps mt-2 text-3xl sm:text-4xl">{next.title}</p>
          </div>
          <span aria-hidden className="text-3xl text-accent transition-transform group-hover:translate-x-2">→</span>
        </Link>
      </Container>
    </div>
  );
}
