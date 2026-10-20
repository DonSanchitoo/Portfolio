import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="border-t border-[rgba(206,226,220,0.12)] bg-[#0a1114] text-[#e7eee9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="map-caps text-lg">Matteo Sanchez</p>
          <p className="mt-3 max-w-sm text-sm text-[#93a8a3]">{profile.baseline}</p>
        </div>
        <div className="text-sm">
          <p className="coord mb-3 uppercase">Plan du site</p>
          <ul className="space-y-2 text-[#c9d6d2]">
            <li><Link className="hover:text-white" href="/cartographie">Cartographie</Link></li>
            <li><Link className="hover:text-white" href="/projets">Projets</Link></li>
            <li><Link className="hover:text-white" href="/parcours">Parcours</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="coord mb-3 uppercase">Ailleurs</p>
          <ul className="space-y-2 text-[#c9d6d2]">
            <li><a className="hover:text-white" href={profile.github} rel="noopener" target="_blank">GitHub</a></li>
            {profile.linkedin && (
              <li><a className="hover:text-white" href={profile.linkedin} rel="noopener" target="_blank">LinkedIn</a></li>
            )}
            <li><a className="hover:text-white" href={`mailto:${profile.email}`}>{profile.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[rgba(206,226,220,0.12)]">
        <p className="coord mx-auto max-w-7xl px-4 py-4 sm:px-8">
          Auteur : Sanchez Matteo, {year} · {profile.coords.lat.toFixed(4)}° N {profile.coords.lng.toFixed(4)}° E · Relief : Terrain Tiles (AWS), fond : OpenFreeMap © OpenStreetMap
        </p>
      </div>
    </footer>
  );
}
